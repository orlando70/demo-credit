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
        return connection<Wallet, Wallet>('wallet')
            .where('id', id)
            .first();
    }

    public static getWalletByUser = async (user: User) => {
        return connection<Wallet>('wallet')
            .select('wallet')
            .where('user_id', user.id)
            .first();
    }

    public static create = async (data: Partial<Wallet>) => {        
        return connection<Wallet>('wallet')
            .insert(data)
    }
}
