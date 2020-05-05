import cors from 'cors';
import bodyParser from 'body-parser';
import setUuidRequest from '@middlewares/uuid.middleware';
import corsOptions from '@configs/cors.config';

export function appConfig(app) {
  app.use(setUuidRequest);
  app.use(cors(corsOptions))
  app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));
  app.use(bodyParser.json({limit: '50mb'}));
}