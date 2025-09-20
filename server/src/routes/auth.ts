import { Router } from 'express';
import { login, me, refresh, register } from '../controllers/authController';

const router = Router();
router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refresh);
router.get('/me', me);

export default router;
