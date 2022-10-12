import config from '../../config';
import TransactionRepo, {
  Transaction,
} from '../../database/repositories/TransactionsRepo';
import UserRepo from '../../database/repositories/UserRepo';
import WalletRepo, { Wallet } from '../../database/repositories/WalletRepo';
import WithdrawalRepo from '../../database/repositories/WithdrawalRepo';
import { ServiceError } from '../../lib/errors';
import { TransactionStatusEnum, TransactionTypeEnum } from '../../utils/enums';
import { generateReferenceCode } from '../../utils/general';
import Paystack from '../../payment';
import { TransferReciepientType } from '../../payment/types/enum';
import { wrapServiceAction } from '..';
import { WithdrawRequest } from '../../utils/validate';

const paystack = new Paystack(config.paystack.secretKey);

export default wrapServiceAction({
  schema: WithdrawRequest,
  handler: async (params: WithdrawRequest) => {
    const { bankCode, accountNumber, userId, amount } = params;

    const user = await UserRepo.getUserById(userId);
    if (!user) {
      throw new ServiceError('A problem occurred getting user');
    }

    const wallet = (await WalletRepo.getWalletByUser(user)) as Wallet;

    if (wallet.balance < amount) throw new ServiceError('Insufficient funds in wallet');

    //Creates a transaction record
    const transaction = await TransactionRepo.create({
      userId,
      description: 'Withdraw from wallet to bank',
      reference: await generateReferenceCode(),
      type: TransactionTypeEnum.WITHDRAWAL,
      amount: amount,
      openingBalance: wallet.balance,
      status: TransactionStatusEnum.PENDING,
    }) as Transaction;

    //Creates a withdrawal record
    await WithdrawalRepo.create({
      userId,
      amount: amount,
      transactionId: transaction.id,
      status: TransactionStatusEnum.PENDING,
    });

    //Creates paystack recipient
    const recipient = await paystack.transfer.recipient.create({
      type: TransferReciepientType.NUBAN,
      currency: 'NGN',
      bank_code: bankCode,
      account_number: accountNumber,
      email: user.email,
    });

    const initData = {
      source: 'DemoCredit',
      amount,
      recipient: recipient.recipientCode,
      reference: await generateReferenceCode(),
      reason: 'Wallet withdrawal',
    };

    //Initialize bank transfer
    const initializeTransfer = await paystack.transfer.initiate(initData);

    const finalizeTransfer = await paystack.transfer.finalize({
      transferCode: initializeTransfer.transferCode,
    });

    await WalletRepo.updateBalance(wallet, -amount);

    return { finalizeTransfer };
  }
})

