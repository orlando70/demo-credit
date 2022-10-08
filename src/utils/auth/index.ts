import crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '../../database/repositories/UserRepo';
import envConfig from '../../config'

type JwtData = JwtPayload & { accountId: string; counter: string };

export function generateRandomCode(length: number) {
    return crypto
        .randomBytes(length * 3)
        .toString('base64')
        .split('+')
        .join('')
        .split('/')
        .join('')
        .split('=')
        .join('')
        .substr(0, length);
}

export function bcryptHash(password: string) {
    return bcrypt.hash(password, envConfig.app.bcryptRounds);
}

export function bcryptCompare(password: string, hash: string) {
    return bcrypt.compare(password, hash);
}

export async function generateJWTToken<T>(
    payload: T,
    secret: string = envConfig.app.secret,
    expiresIn?: string,
): Promise<string> {
    const jwtPayload = {
        ...payload,
        counter: generateRandomCode(36),
    };
    const options = { expiresIn: expiresIn || '720h' };

    return new Promise((resolve, reject) => {
        jwt.sign(
            jwtPayload,
            secret,
            options,
            (err: any, token: string | undefined) => {
                if (err) {
                    reject(err);
                }
                resolve(token as string);
            },
        );
    });
}

export async function decodeToken(token: string): Promise<JwtData> {
    return new Promise((resolve, reject) => {
        jwt.verify(token, envConfig.app.secret, (err: any, decoded: any) => {
            if (err) {
                reject(err);
            }
            resolve(decoded as JwtData);
        });
    });
}

export const createSession = async (
    user: User,
  ) => {
    const token = await generateJWTToken({
      userId: user.id,
    });
    await decodeToken(token);
  
    return token;
  };