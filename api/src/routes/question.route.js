import express from 'express';
const router = express.Router();
import * as Controller from '@controllers/question.controller';
import createMiddleware from '@middlewares/question-create.middleware'
import updateMiddleware from '@middlewares/question-update.middleware'
import authMiddleware from '@middlewares/auth.middleware';

router.get('/', Controller.index)
router.use('/', [authMiddleware])
router.post('/', createMiddleware, Controller.store)
router.put('/:id', updateMiddleware, Controller.update)
router.delete('/:id', Controller.destroy)
router.get('/:id', Controller.show)

export default router