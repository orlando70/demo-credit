import {Request, Response} from "express";
import {Router} from 'express';
import AuthRoutes from './authRoutes';
import WalletRoutes from './walletRoutes';
import PaymentRoutes from './paymentRoutes';
import UserRoutes from './userRoute';

const router = Router();

router.get('/', (_:Request, res: Response)=> {
    return res.status(200).send({
        'Auth Endpoints': {
            'register POST': '/auth/register',
            'login POST': '/auth/login',
        },
        'Wallet Endpoints': {
            'transfer to another wallet POST': '/wallet/transfer'
        },
        'Payment Endpoints': {
            'webhook POST': '/payment/webhook',
            'fund wallet POST':'/payment/fund',
            'withdraw from wallet POST':'/payment/withdraw'
        }, 
        'User Endpoints': {
            'fetch userInfo GET': '/user'
        }
    })
}) 

router.use('/auth', AuthRoutes);
router.use('/wallet', WalletRoutes);
router.use('/payment', PaymentRoutes);
router.use('/user', UserRoutes);

export default router;
