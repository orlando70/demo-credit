import {Router} from 'express';
import AuthController from '../controllers/Auth';

const router = Router();

router.post('/register', AuthController.Register);

export default router;