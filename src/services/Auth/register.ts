import { omit } from 'lodash';
import { wrapServiceAction } from '..';
import UserRepo from '../../database/repositories/UserRepo';
import WalletRepo from '../../database/repositories/WalletRepo';
import { ServiceError, ValidationError } from '../../lib/errors';
import { bcryptHash } from '../../utils/auth';
import { RegisterRequest } from '../../utils/validate';



export default wrapServiceAction({
  schema: RegisterRequest,
  handler: async (params: RegisterRequest) => {
    const {email, password} = params

    const existingUserWithEmail = await UserRepo.getUserByEmail(email);
    if (existingUserWithEmail) {
      throw new ServiceError('User already exists');
    }

    // Create new user
    const user = await UserRepo.create({
      email: email,
      password: await bcryptHash(password),
    });

    if (!user) throw new ServiceError('A problem occured creating user');

    // Create wallet for user
    await WalletRepo.create({
      userId: user.id,
    });

    return {
      ...omit(user, ['password'])
    };
  }
})



