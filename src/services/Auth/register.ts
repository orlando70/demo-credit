import UserRepo, { User } from "../../database/repositories/UserRepo";
import WalletRepo from "../../database/repositories/WalletRepo";
import { ServiceError } from "../../lib/errors";
import { bcryptHash, generateJWTToken } from "../../utils/auth";


async function register(params: User) {
        const existingUserWithEmail = await UserRepo.getUserByEmail(params.email);
        if (existingUserWithEmail) {
            throw new ServiceError('User already exists');
        }
        // Create new user
        const [userId] = await UserRepo.create({
            email: params.email,
            password: await bcryptHash(params.password),
        });
        
        // Create wallet for user
        await WalletRepo.create({
            userId
        })
        
        const user = await UserRepo.getUserById(userId) as User; 

        if (!user) throw new ServiceError('User not found');

        const token = await generateJWTToken<User>(user);

        return {
            ...user,
            token,
        }
}

export default register;