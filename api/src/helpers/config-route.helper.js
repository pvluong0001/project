import {Router} from 'express';
import authRoute from '@routes/auth.route';
import { fetchExplorerRoute } from './base.helper';

// const routeStack = authRoute.stack.filter(layer => {
//   return layer.roter;
// })
// console.log(authRoute.stack, '====');


export function configRouter(app) {
  const router = Router();

  router.get('/', (req, res) => {
    res.send(req.uuid);
  });

  router.use('/auth', authRoute);

  /** set prefix for all route */
  app.use('/api/v1', router);

  if(process.env.NODE_ENV !== 'production') {
    app.get('/api/v1/explorer', (req, res) => {
      return res.json({
        api: fetchExplorerRoute({
          auth: authRoute
        }, 'api/v1')
      })
    })
  }
}