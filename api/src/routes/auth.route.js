import express from 'express';
import registerMiddleware from '@middlewares/register.middleware';
import * as authController from '@controllers/auth.controller';
import autoValidateMiddleware from '@middlewares/auto-validate.middleware';
import loginMiddleware from '@middlewares/login.middleware';
import authMiddleware from '@middlewares/auth.middleware';
import uploader from '@helpers/uploader.helper';
import fileRequireMiddleware from '@middlewares/file-require.middleware';

const router = express.Router();

router.post('/register', [...registerMiddleware, autoValidateMiddleware], authController.register);
router.post('/login', [...loginMiddleware, autoValidateMiddleware], authController.login);
/** test for get user */
router.use('/user', [authMiddleware]);
router.get('/user/info', authController.getUser);
router.post('/user/upload-avatar', uploader.single('avatar'), fileRequireMiddleware('avatar'), authController.uploadAvatar);

export default router;