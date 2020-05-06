import express from 'express';
import registerMiddleware from '@middlewares/register.middleware';
import * as authController from '@controllers/auth.controller';

const router = express.Router();
router.post('/register', registerMiddleware, authController.register);

export default router;