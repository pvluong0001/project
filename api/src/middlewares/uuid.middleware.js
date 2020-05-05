require('module-alias/register')

import {v4 as uuidv4} from 'uuid';

export default function(req, res, next) {
  req.uuid = uuidv4();

  next();
}