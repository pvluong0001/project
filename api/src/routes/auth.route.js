import express from 'express';
import registerMiddleware from '@middlewares/register.middleware';
import * as authController from '@controllers/auth.controller';
import autoValidateMiddleware from '@middlewares/auto-validate.middleware';
import loginMiddleware from '@middlewares/login.middleware';
import authMiddleware from '@middlewares/auth.middleware';

const router = express.Router();

router.post('/register', [...registerMiddleware, autoValidateMiddleware], authController.register);
router.post('/login', [...loginMiddleware, autoValidateMiddleware], authController.login);
/** test for get user */
router.get('/get-user', [authMiddleware], authController.getUser);

export default router;