import authRouter from '@routes/auth.route';
import {Router} from 'express';

export function configRouter(app) {
  const router = Router();

  router.get('/', (req, res) => {
    res.send(req.uuid);
  });

  router.use('/auth', authRouter);

  /** set prefix for all route */
  app.use('/api/v1', router);
}