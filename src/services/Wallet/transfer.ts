import { wrapServiceAction } from '..';
import TransactionsRepo, {
  Transaction,
} from '../../database/repositories/TransactionsRepo';
import UserRepo from '../../database/repositories/UserRepo';
import WalletRepo from '../../database/repositories/WalletRepo';
import { NotFoundError, ServiceError } from '../../lib/errors';
import { TransactionStatusEnum, TransactionTypeEnum } from '../../utils/enums';
import { generateReferenceCode } from '../../utils/general';
import { TransferRequest } from '../../utils/validate';


export default wrapServiceAction({
  schema: TransferRequest,
  handler: async (params: TransferRequest) => {

    const { walletId, userId, amount } = params;

    const reference = await generateReferenceCode()

    const user = await UserRepo.getUserById(userId);
    if (!user) throw new NotFoundError('A problem occurred getting user');

    const receiverWallet = await WalletRepo.getWalletById(walletId);
    if (!receiverWallet)
      throw new NotFoundError('A problem occurred getting recipient wallet');

    const senderWallet = await WalletRepo.getWalletByUser(user);
    if (!senderWallet)
      throw new NotFoundError('A problem occurred getting sender wallet');

    if (senderWallet.balance < amount) throw new ServiceError('Insufficient funds in wallet')

    //Create sender transaction
    const senderTrx = (await TransactionsRepo.create({
      userId,
      type: TransactionTypeEnum.TRANSFER,
      amount: amount,
      reference,
      description: `Fund Transfer to ${receiverWallet.id}`,
      source: senderWallet.id,
      destination: receiverWallet.id,
      status: TransactionStatusEnum.PENDING,
      openingBalance: senderWallet.balance,
    })) as Transaction;

    //Create receiver transaction
    const receiverTrx = (await TransactionsRepo.create({
      userId: receiverWallet.userId,
      type: TransactionTypeEnum.TRANSFER,
      amount: amount,
      reference,
      description: `Recieve Transfer from ${senderWallet.id}`,
      source: senderWallet.id,
      destination: receiverWallet.id,
      status: TransactionStatusEnum.PENDING,
      openingBalance: receiverWallet.balance,
    })) as Transaction;

    //deduct and credit sender and reciever wallet's respectively
    await WalletRepo.transfer(senderWallet, receiverWallet, amount);

    //Update sender transaction
    await TransactionsRepo.updateTransactionById(senderTrx.id, {
      status: TransactionStatusEnum.SUCCESS,
      closingBalance: +senderWallet.balance - +amount,
    });

    //Update receiver's transaction
    await TransactionsRepo.updateTransactionById(receiverTrx.id, {
      status: TransactionStatusEnum.SUCCESS,
      closingBalance: +receiverWallet.balance + +amount,
    });
  }
})

