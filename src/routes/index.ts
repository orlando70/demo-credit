import { Router } from 'express';
import AuthRoutes from './authRoutes'

const router = Router();

router.use('/auth', AuthRoutes);

export default router;