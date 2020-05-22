import User from '@models/user.model';
import { validationResult } from 'express-validator';
import pick from 'lodash/pick';

export async function index(req, res) {
  const data = await User.find({_id: {$ne: req.user._id}});

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

export async function show(req, res) {
  const data = await User.findById(req.params.id);

  return res.status(data ? 200 : 422).json({
    message: data ? 'OK' : 'Not found!',
    data
  });
}

export async function destroy(req, res) {
  if(req.user._id === req.params._id) {
    return res.status(500).json({
      message: 'Cannot delete current user'
    })
  }

  const data = await User.delete(req.params.id);

  return res.status(data ? 200 : 422).json({
    message: `Delete ${data ? 'success' : 'failed'}!`,
  });
}
