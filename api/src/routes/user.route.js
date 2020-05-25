import express from 'express';
const router = express.Router();
import * as Controller from '@controllers/user.controller';
import updateMiddleware from '@middlewares/user.middleware';
import authMiddleware from '@middlewares/auth.middleware';

router.get('/', authMiddleware, Controller.index)
router.put('/', [authMiddleware, ...updateMiddleware], Controller.update)
router.post('/', authMiddleware, Controller.store)
router.delete('/:id', authMiddleware, Controller.destroy)
router.get('/:id', authMiddleware, Controller.show)

export default router
