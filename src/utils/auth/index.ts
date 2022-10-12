import * as bcrypt from 'bcrypt';
import jwt, {JwtPayload} from 'jsonwebtoken';
import envConfig from '../../config';
import {Request} from 'express';
import {generateRandomCode} from '../general';

type JwtData = JwtPayload & {accountId: string; counter: string};

export function bcryptHash(password: string) {
  return bcrypt.hash(password, envConfig.app.bcryptRounds);
}

export function bcryptCompare(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export async function generateJWTToken(
  payload: Record<string, any>,
  secret: string = envConfig.app.secret,
  expiresIn?: string
): Promise<string> {
  const jwtPayload = {
    ...payload,
    counter: generateRandomCode(36),
  };
  const options = {expiresIn: expiresIn || '720h'};

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
      }
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

interface Session {
  userId: number;
  email: string;
}

export interface AuthenticatedRequest extends Request {
  session: Session;
}
