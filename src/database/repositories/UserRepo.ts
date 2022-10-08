import connection from '../connection/index';

export interface User {
    id: number;
    email: string;
    password: string;
}

export default class UserRepo {
    public static getUserById = async (id: number) => {
        return connection<User, User>('users')
            .where('id', id)
            .first();
    }

    public static getUserByEmail = async (email: string) => {
        return connection<User>('users')
            .select('email')
            .where('email', email)
            .first();
    }

    public static create = async (data: Partial<User>) => {
        return await connection<User>('users')
            .insert(data)
    }
}
