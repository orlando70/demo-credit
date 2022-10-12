import {Router} from 'express';
import config from '../config';
import PaymentController from '../controllers/Payment';
import isAuthenticated from '../middleware/isAuthenticated';
import PayStack from '../payment';
import {TokenFlagEnum} from '../utils/enums';

const router = Router();

router.post(
  '/webhook',
  PayStack.webHook(config.paystack.secretKey),
  PaymentController.verifyTransaction
);
router.post(
  '/fund',
  isAuthenticated(TokenFlagEnum.AUTH),
  PaymentController.Fund
);
router.post(
  '/withdraw',
  isAuthenticated(TokenFlagEnum.AUTH),
  PaymentController.withdrawal
);

export default router;
