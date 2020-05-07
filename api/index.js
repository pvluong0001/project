import moduleAlias from './alias.config';

moduleAlias();
require('dotenv').config();

import express from 'express';
import compression from 'compression';
import {appConfig} from '@helpers/config.helper';
import morganConfig from '@configs/morgan.config';
import {connectDb} from '@helpers/db.helper';
import {configRouter} from '@helpers/config-route.helper';

const app = express();
app.use(compression());
app.use(express.static('public'));
const port = process.env.PORT || 81;

/** config */
app.use(morganConfig(__dirname, 'storage/logs/access.log'));
appConfig(app);
configRouter(app);

(async () => {
  try {
    await connectDb();

    app.listen(port, () => {
      console.log(`server is runnning in port ${port}`);
      console.log(`http://localhost:${port}`);
    });
  } catch(e) {
    console.log('Cannot connect database. Server stopped!');
  }
})()
