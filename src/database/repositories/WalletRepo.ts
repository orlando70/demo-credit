import generalLogger from '../../lib/logger';
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

export default class WalletRepo {
  public static getWalletById = async (id: number) => {
    return connection<Wallet>('wallet').where('id', id).first();
  };

  public static getWalletByUser = async (user: User) => {
    return connection<Wallet>('wallet').where('userId', user.id).first();
  };

  public static create = async (data: Partial<Wallet>) => {
    return connection<Wallet>('wallet')
      .insert(data)
      .then(id => {
        return connection<Wallet>('wallet').where('id', id).first();
      });
  };

  public static updateBalance = async (
    wallet: Partial<Wallet>,
    amount: number
  ) => {
    const b = await connection.transaction(async trx => {
      return connection<Wallet>('wallet')
        .where('id', wallet.id)
        .update({
          balance: connection.raw('balance + ?', amount),
        })
        .transacting(trx);
    });
    return b;
  };

  public static transfer = async (
    senderWallet: Partial<Wallet>,
    receiverWallet: Partial<Wallet>,
    amount: number
  ) => {
     await connection.transaction(async trx => {
       //deducts amount from sender's wallet
      await connection<Wallet>('wallet')
        .where('id', senderWallet.id)
        .update({
          balance: connection.raw('balance - ?', amount),
        })
        .transacting(trx)

        // Tops up receiver's wallet with amount
      await connection<Wallet>('wallet')
      .where('id', receiverWallet.id)
      .update({
        balance: connection.raw('balance + ?', amount),
      })
      .transacting(trx)
    });
  };
}
