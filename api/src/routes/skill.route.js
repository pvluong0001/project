import express from 'express';
const router = express.Router();
import * as Controller from '@controllers/skill.controller';
import createMiddleware from '@middlewares/skill-create.middleware'
import updateMiddleware from '@middlewares/skill-update.middleware'

router.get('/', Controller.index)
router.post('/', createMiddleware, Controller.store)
router.put('/:id', updateMiddleware, Controller.update)
router.delete('/:id', Controller.destroy)
router.get('/:id', Controller.show)

export default router