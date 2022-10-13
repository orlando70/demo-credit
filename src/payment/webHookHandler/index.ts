import camelCaseKeys from 'camelcase-keys';
import TransactionRepo from '../../database/repositories/TransactionsRepo';
import UserRepo from '../../database/repositories/UserRepo';
import WalletRepo, {Wallet} from '../../database/repositories/WalletRepo';
import { ServiceError } from '../../lib/errors';
import {TransactionStatusEnum} from '../../utils/enums';
import {
  PaystackChargeEventData,
  PaystackEvent,
  PaystackTransferEventData,
} from '../types';
import {PaystackEventEnum} from '../types/enum';

export class WebhookHandler {
  static async handle<Event extends PaystackEvent<any>>(eventInput: Event) {
    const event = camelCaseKeys(eventInput, {deep: true});
    switch (event.event) {
      case PaystackEventEnum.CHARGE_SUCCESS: {
        await WebhookHandler.handleCharge(
          event as PaystackEvent<PaystackChargeEventData>
        );
        break;
      }
      case PaystackEventEnum.TRANSFER_SUCCESS:
      case PaystackEventEnum.TRANSFER_REVERSED:
      case PaystackEventEnum.TRANSFER_FAILED: {
        await WebhookHandler.handleTransfer(
          event as PaystackEvent<PaystackTransferEventData>
        );
        break;
      }
      default:
        break;
    }
  }

  static async handleCharge(event: PaystackEvent<PaystackChargeEventData>) {
    const {data} = event;
    const amount = data.amount / 100;

    const transaction = await TransactionRepo.getTransactionById(
      data.metadata.transactionId
    );
    if (!transaction) {
      // Save records of unknown transactions
      await TransactionRepo.create({
        amount: data.amount,
      });

      throw new Error('Transaction not found in web hook');
    }

    if (data.status !== 'success') {
      await TransactionRepo.updateTransactionById(transaction.id, {
        status: TransactionStatusEnum.FAIL,
      });

      return;
    }

    const wallet = (await WalletRepo.getWalletById(
      data.metadata.walletId
    )) as Wallet;

    await TransactionRepo.updateTransactionById(transaction.id, {
      status: TransactionStatusEnum.SUCCESS,
      closingBalance: wallet.balance + amount,
    });

    await WalletRepo.updateBalance(wallet, amount);
  }

  static async handleTransfer(
    response: PaystackEvent<PaystackTransferEventData>
  ) {
    const {data} = response;

    if (response.event !== PaystackEventEnum.TRANSFER_SUCCESS) {
      await TransactionRepo.updateTransactionById(data.metadata.transactionId, {
        status: TransactionStatusEnum.SUCCESS
      })

      const user = await UserRepo.getUserByEmail(data.recipient.email);
      if (!user) throw new ServiceError('Error fetching user');

      const wallet = (await WalletRepo.getWalletByUser(user))!;

      await WalletRepo.updateBalance(wallet, -data.amount);
    }
  }
}
