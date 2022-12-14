import {omit} from 'lodash';
import { wrapServiceAction } from '..';
import UserRepo from '../../database/repositories/UserRepo';
import WalletRepo from '../../database/repositories/WalletRepo';
import { NotFoundError, ServiceError } from '../../lib/errors';
import { bcryptCompare, generateJWTToken } from '../../utils/auth';
import { TokenFlagEnum } from '../../utils/enums';
import { LoginRequest } from '../../utils/validate';




export default wrapServiceAction({
  schema: LoginRequest,
  handler: async (params: LoginRequest) => {
    const { email, password } = params;

    const user = await UserRepo.getUserByEmail(email);
    if (!user) throw new ServiceError('Email or password is not correct');

    const passwordMatch = await bcryptCompare(password, user.password);
    if (!passwordMatch)
      throw new ServiceError('Email or password is not correct');

    const wallet = await WalletRepo.getWalletByUser(user);
    if (!wallet) throw new NotFoundError('A problem occurred getting wallet')

    const accessInfo = {
      token: await generateJWTToken({
        userId: user.id,
        flag: TokenFlagEnum.AUTH,
      }),
    };

    return {
      ...omit(user, ['password']),
      ...accessInfo,
      walletBalance: wallet.balance
    };
  }
})