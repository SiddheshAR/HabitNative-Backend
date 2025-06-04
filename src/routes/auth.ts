import {Router} from 'express'
import { validateLoginRequest, validateRegisteration } from '../middleware/validation';
import { AuthController } from '../controllers/authController';
import { authenticatedToken } from '../middleware/authService';


const router = Router();

router.post('register',validateRegisteration,AuthController.register);
router.post('login',validateLoginRequest,AuthController.login)

router.get('/profile',authenticatedToken,AuthController.getProfile);

export default router;