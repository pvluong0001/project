import express from 'express';
const router = express.Router();
import * as Controller from '@controllers/group.controller';
import createMiddleware from '@middlewares/group-create.middleware'
import updateMiddleware from '@middlewares/group-update.middleware'

router.get('/', Controller.index)
router.post('/', createMiddleware, Controller.store)
router.put('/:id', updateMiddleware, Controller.update)
router.delete('/:id', Controller.destroy)
router.get('/:id', Controller.show)

export default router