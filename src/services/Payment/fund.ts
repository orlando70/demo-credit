import { wrapServiceAction } from '..';
import config from '../../config';
import TransactionRepo from '../../database/repositories/TransactionsRepo';
import TransactionsRepo, {
  Transaction,
} from '../../database/repositories/TransactionsRepo';
import UserRepo from '../../database/repositories/UserRepo';
import WalletRepo, {Wallet} from '../../database/repositories/WalletRepo';
import {NotFoundError, ServiceError} from '../../lib/errors';
import {errorLogger} from '../../lib/logger';
import PayStack from '../../payment';
import {TransactionStatusEnum, TransactionTypeEnum} from '../../utils/enums';
import {generateReferenceCode} from '../../utils/general';
import { FundRequest } from '../../utils/validate';

const paystack = new PayStack(config.paystack.secretKey);

export default wrapServiceAction({
  schema: FundRequest,
  handler: async (params: FundRequest) => {
    const {userId, amount} = params;

    const user = await UserRepo.getUserById(userId);
  if (!user) throw new NotFoundError('A problem occurred getting user');

  const wallet = (await WalletRepo.getWalletByUser(user)) as Wallet;

  try {
    //Create transaction
    const transaction = (await TransactionsRepo.create({
      userId,
      type: TransactionTypeEnum.DEPOSIT,
      amount: amount,
      reference: await generateReferenceCode(),
      description: 'Fund wallet',
      status: TransactionStatusEnum.PENDING,
      openingBalance: wallet?.balance,
    })) as Transaction;

    //initialize fund payment
    const paymentInit = await paystack.transaction.initialize({
      metadata: {
        transactionId: transaction.id,
        walletId: wallet.id,
      },
      amount: `${amount * 100}`,
      email: user.email,
    });

    await TransactionRepo.updateTransactionById(transaction.id, {
      reference: paymentInit.reference,
    });

    return {
      authorizationUrl: paymentInit.authorizationUrl,
      accessCode: paymentInit.accessCode,
      transactionId: transaction.id,
    };
  } catch (err: any) {
    if (err.message.includes('ETIMEDOUT')) {
      throw new ServiceError(err.message);
    }
    throw err;
  }
  }
})


