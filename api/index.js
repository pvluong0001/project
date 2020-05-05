import moduleAlias from './alias.config';
require('dotenv').config();
moduleAlias();

import express from 'express';
import setUuidRequest from '@middleware/uuid.middleware';
import morganConfig from '@config/morgan.config';

const app = express();
const port = process.env.PORT || 81;

app.use(setUuidRequest);
app.use(morganConfig(__dirname, 'storage/logs/access.log'));

app.get('/', (req, res) => {
  res.send('1232123 - edited - good');
});

app.listen(port, () => {
  console.log(`server is runnning in port ${port}`);
  console.log(`http://localhost:${port}`);
});