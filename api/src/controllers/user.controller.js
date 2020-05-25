import User, {columns} from '@models/user.model';
import { validationResult } from 'express-validator';
import pick from 'lodash/pick';
import {acl} from '@helpers/config-route.helper';
import {mapErrorHandleMongoose} from '@helpers/db.helper';

export async function index(req, res) {
  const data = await User.find({_id: {$ne: req.user._id}});

  return res.json({
    data,
    message: 'OK'
  })
}

export async function store(req, res) {
  try {
    const validateResult = validationResult(req);
    if(!validateResult.isEmpty()) {
      return res.status(422).json({errors: validateResult.array()})
    }
    const data = await User.store({
      ...req.body
    });

    acl.addUserRoles(data._id.toString(), 'staff')

    return res.json({
      data,
      message: data ? 'Create success!' : 'Create failed!'
    });
  } catch(e) {
    return res.status(422).json({
      errors: mapErrorHandleMongoose(e)
    })
  }

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
