import {Router} from 'express';
import authRoute from '@routes/auth.route';
import documentRoute from '@routes/document.route';
import groupRoute from '@routes/group.route';
import userRoute from '@routes/user.route';
import { fetchExplorerRoute } from './base.helper';
import authMiddleware from '@middlewares/auth.middleware';

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
  router.use('/group', groupRoute);
  router.use('/user', userRoute);

  router.use('/document', authMiddleware, documentRoute);

  /** set prefix for all route */
  app.use('/api/v1', router);

  if(process.env.NODE_ENV !== 'production') {
    app.get('/api/v1/explorer', (req, res) => {
      return res.json({
        api: fetchExplorerRoute({
          auth: authRoute,
          documentRoute,
          groupRoute,
          userRoute
        }, 'api/v1')
      })
    })
  }
}