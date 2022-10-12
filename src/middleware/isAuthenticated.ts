import {Response, NextFunction} from 'express';

import UserRepo from '../database/repositories/UserRepo';
import {AuthenticationError, NotFoundError} from '../lib/errors';
import {AuthenticatedRequest, decodeToken} from '../utils/auth';

export default (tokenFlag: string) => {
  return async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const authorization = req.header('authorization') || '';
      const token = authorization.split(' ')[1];
      if (!token) {
        throw new AuthenticationError(
          'you need to be authenticated to access this endpoint'
        );
      }

      const {userId, flag} = await decodeToken(token);

      if (!userId) {
        return next(new AuthenticationError('unable to verify token'));
      }

      if (flag !== tokenFlag) {
        return next(
          new AuthenticationError(`token is not valid for ${tokenFlag}`)
        );
      }

      const user = await UserRepo.getUserById(userId);

      if (!user) {
        return next(new NotFoundError('User not found.'));
      }

      req.session = {
        userId: user.id,
        email: user.email,
      };

      return next();
    } catch (e: any) {
      switch (e.name) {
        case 'TokenExpiredError':
          return next(new AuthenticationError('token has expired'));
        case 'JsonWebTokenError':
          return next(new AuthenticationError(e.message));
        case 'NotBeforeError':
          return next(new AuthenticationError(e.message));
        default:
          return next(e);
      }
    }
  };
};
