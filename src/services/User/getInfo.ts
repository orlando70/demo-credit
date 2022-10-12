import {omit} from 'lodash';
import { wrapServiceAction } from '..';
import UserRepo from '../../database/repositories/UserRepo';
import WalletRepo from '../../database/repositories/WalletRepo';
import { NotFoundError, ServiceError } from '../../lib/errors';
import { bcryptCompare, generateJWTToken } from '../../utils/auth';
import { TokenFlagEnum } from '../../utils/enums';
import { GetUserRequest } from '../../utils/validate';




export default wrapServiceAction({
  schema: GetUserRequest,
  handler: async (params: GetUserRequest) => {
    const { userId} = params;

    const user = await UserRepo.getUserById(userId);
    if (!user) throw new NotFoundError('A problem occurred while getting user information');

    const wallet = await WalletRepo.getWalletByUser(user);
    if (!wallet) throw new NotFoundError('A problem occurred getting wallet')

    return {
      ...omit(user, ['password']),
      walletBalance: wallet.balance
    };
  }
})