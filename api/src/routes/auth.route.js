import * as authController from '@controllers/auth.controller'
import express from 'express';
const router = express.Router();

router.get('/login', authController.login)

export default router