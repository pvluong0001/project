import {Router} from 'express';
import authRoute from '@routes/auth.route';
import documentRoute from '@routes/document.route';
import groupRoute from '@routes/group.route';
import userRoute from '@routes/user.route';
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

  acl.addUserRoles('5eb4f62528506c154b166666', 'root')
  acl.addUserRoles('5eb503b528506c154b166667', 'staff')

  const router = Router();

  router.get('/', (req, res) => {
    res.send(req.uuid);
  });

  router.use('/auth', authRoute);
  router.use('/group', groupRoute);
  router.use('/user', userRoute);

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
          userRoute
        }, 'api/v1')
      })
    })
  }
}