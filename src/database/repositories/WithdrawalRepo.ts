import generalLogger from '../../lib/logger';
import {TransactionStatusEnum} from '../../utils/enums';
import connection from '../connection/index';

export interface User {
  id: number;
  email: string;
  password: string;
}

export interface Withdrawal {
  id: number;
  userId: number;
  transactionId: number;
  amount: number;
  status: TransactionStatusEnum;
}

export default class WithdrawalRepo {
  public static getWithdrawalById = async (id: number) => {
    return connection<Withdrawal>('withdrawal').where('id', id).first();
  };

  public static getWithdrawalsByUser = async (user: User) => {
    return connection<Withdrawal>('withdrawal').where('userId', user.id);
  };

  public static create = async (data: Partial<Withdrawal>) => {
    return connection<Withdrawal>('withdrawal')
      .insert(data)
      .then(id => {
        return connection<Withdrawal>('withdrawal').where('id', id).first();
      });
  };
}
