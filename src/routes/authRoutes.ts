import {Router} from 'express';
import AuthController from '../controllers/Auth';


const router = Router();

router.post('/register', AuthController.Register);
router.post('/login', AuthController.Login);

export default router;
