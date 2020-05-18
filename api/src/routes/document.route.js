import express from 'express';
const router = express.Router();
import * as Controller from '@controllers/document.controller';
import createMiddleware from '@middlewares/document-create.middleware'
import updateMiddleware from '@middlewares/document-update.middleware'

router.get('/', Controller.index)
router.post('/', createMiddleware, Controller.store)
router.put('/:id', updateMiddleware, Controller.update)
router.delete('/:id', Controller.destroy)
router.get('/:id', Controller.show)

export default router