import {Router} from 'express';
import authRoute from '@routes/auth.route';

export function configRouter(app) {
  const router = Router();

  router.get('/', (req, res) => {
    res.send(req.uuid);
  });

  router.use('/auth', authRoute);

  /** set prefix for all route */
  app.use('/api/v1', router);
}