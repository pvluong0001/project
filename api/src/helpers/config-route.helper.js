import {Router} from 'express';
import authRoute from '@routes/auth.route';
import documentRoute from '@routes/document.route';
import groupRoute from '@routes/group.route';
import userRoute from '@routes/user.route';
import skillRoute from '@routes/skill.route';
import { fetchExplorerRoute } from './base.helper';
import authMiddleware from '@middlewares/auth.middleware';
import mongoose from 'mongoose';
export var acl = require('acl');
const prefix = '/api/v1';

export function configRouter(app) {
  const db = mongoose.connection.db;
  acl = new acl(new acl.mongodbBackend(db, 'acl_'));
  acl.allow([
    {
      roles: ['root', 'staff'],
      allows: [
        {
          resources: `${prefix}/document`,
          permissions: '*'
        }
      ]
    }
  ])

  const router = Router();

  router.get('/', (req, res) => {
    res.send(req.uuid);
  });

  router.use('/auth', authRoute);
  router.use('/group', groupRoute);
  router.use('/user', userRoute);
  router.use('/skill', skillRoute)

  router.use('/document', [authMiddleware, acl.middleware(3, (req) => req.user._id)], documentRoute);

  /** set prefix for all route */
  app.use(prefix, router);

  if(process.env.NODE_ENV !== 'production') {
    app.get('/api/v1/explorer', (req, res) => {
      return res.json({
        api: fetchExplorerRoute({
          auth: authRoute,
          documentRoute,
          groupRoute,
          userRoute,
          skillRoute
        }, 'api/v1')
      })
    })
  }
}
