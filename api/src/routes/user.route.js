import express from 'express';
const router = express.Router();
import * as Controller from '@controllers/user.controller';
import updateMiddleware from '@middlewares/user.middleware';
import authMiddleware from '@middlewares/auth.middleware';

router.get('/', authMiddleware, Controller.index)
router.put('/', [authMiddleware, ...updateMiddleware], Controller.update)

export default router