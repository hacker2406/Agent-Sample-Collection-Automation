import express from 'express';
import { register, login, getMyProfile } from '../controllers/auth.controller';
import { authenticate } from '../middlewares/authenticate';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', authenticate, getMyProfile); // Protected route

export default router;
