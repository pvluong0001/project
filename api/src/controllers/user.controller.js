import User from '@models/user.model';
import { validationResult } from 'express-validator';
import pick from 'lodash/pick';

export async function index(req, res) {
  const data = await User.find({});

  return res.json({
    data,
    message: 'OK'
  })
}

export async function update(req, res) {
  const validateResult = validationResult(req);
  if (!validateResult.isEmpty()) {
    return res.status(422).json({errors: validateResult.array()});
  }
  const data = await User.update(req.user._id, pick(req.body, ['name', 'fullName', 'address', 'phone']));

  return res.json({
    data,
    message: 'OK'
  });
}
