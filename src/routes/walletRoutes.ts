import {Router} from 'express';
import WalletController from '../controllers/Wallet';
import isAuthenticated from '../middleware/isAuthenticated';
import {TokenFlagEnum} from '../utils/enums';

const router = Router();

router.post(
  '/transfer',
  isAuthenticated(TokenFlagEnum.AUTH),
  WalletController.Transfer
);

export default router;
