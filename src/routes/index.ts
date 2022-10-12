import {Router} from 'express';
import AuthRoutes from './authRoutes';
import WalletRoutes from './walletRoutes';
import PaymentRoutes from './paymentRoutes';

const router = Router();

router.use('/auth', AuthRoutes);
router.use('/wallet', WalletRoutes);
router.use('/payment', PaymentRoutes);

export default router;
