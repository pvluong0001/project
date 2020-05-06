import User from '@models/user.model';
import { validationResult } from 'express-validator';
import {pick} from 'lodash';
import {columns} from '../models/user.model';

export async function register(req, res) {
  const validateRes = validationResult(req);

  if(!validateRes.isEmpty()) {
    return res.status(422).json({
      errors: validateRes.array()
    })
  }

  const data = await User.store(pick(req.body, Object.keys(columns)));

  return res.json({
    data,
    message: 'OK'
  });
}