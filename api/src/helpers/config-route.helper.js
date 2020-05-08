import {Router} from 'express';
import authRoute from '@routes/auth.route';
import questionRoute from '@routes/question.route';
import { fetchExplorerRoute } from './base.helper';

export function configRouter(app) {
  const router = Router();

  router.get('/', (req, res) => {
    res.send(req.uuid);
  });

  router.use('/auth', authRoute);
  router.use('/question', questionRoute);

  /** set prefix for all route */
  app.use('/api/v1', router);

  if(process.env.NODE_ENV !== 'production') {
    app.get('/api/v1/explorer', (req, res) => {
      return res.json({
        api: fetchExplorerRoute({
          auth: authRoute,
          question: questionRoute
        }, 'api/v1')
      })
    })
  }
}