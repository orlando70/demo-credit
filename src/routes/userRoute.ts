import {Router} from 'express';
import UserController from '../controllers/User';
import isAuthenticated from '../middleware/isAuthenticated';
import { TokenFlagEnum } from '../utils/enums';

const router = Router();

router.get('/', isAuthenticated(TokenFlagEnum.AUTH) ,UserController.Info);

export default router;
