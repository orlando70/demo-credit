import {Router} from 'express';
import AuthRoutes from './authRoutes';
import WalletRoutes from './walletRoutes';
import PaymentRoutes from './paymentRoutes';
import UserRoutes from './userRoute';

const router = Router();

router.use('/auth', AuthRoutes);
router.use('/wallet', WalletRoutes);
router.use('/payment', PaymentRoutes);
router.use('/user', UserRoutes)

export default router;
