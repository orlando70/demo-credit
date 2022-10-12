import {TransactionStatusEnum, TransactionTypeEnum} from '../../utils/enums';
import connection from '../connection/index';

export interface User {
  id: number;
  email: string;
  password: string;
}

export interface Wallet {
  id: number;
  balance: number;
  userId: number;
}

export interface Transaction {
  id: number;
  userId: number;
  type: TransactionTypeEnum;
  amount: number;
  reference: string;
  source: number;
  destination: number;
  description: string;
  status: TransactionStatusEnum;
  openingBalance: number;
  closingBalance: number;
}

export default class TransactionRepo {
  public static getTransactionById = async (id: number) => {
    return connection<Transaction>('transactions').where('id', id).first();
  };

  public static getTransactionByUser = async (user: User) => {
    return connection<Transaction>('transactions')
      .where('user_id', user.id)
      .first();
  };

  public static getTransactionByReference = async (reference: string) => {
    return connection<Transaction>('transactions')
      .where('reference', reference)
      .first();
  };

  public static create = async (data: Partial<Transaction>) => {
    return connection<Transaction>('transactions')
      .insert(data)
      .then(id => {
        return connection<Transaction>('transactions').where('id', id).first();
      });
  };

  public static updateTransactionById = async (
    id: number,
    data: Partial<Transaction>
  ) => {
    return connection<Transaction>('transactions').where('id', id).update(data);
  };
}
