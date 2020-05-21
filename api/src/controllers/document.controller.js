import Document from '@models/document.model';
import { validationResult } from 'express-validator';
import { acl } from '@helpers/config-route.helper';

export async function index(req, res) {
  const data = await Document.find({
    $or: [
      {
        isRoot: true
      },
      {
        author: req.user._id
      }
    ]
  });

  res.json({
    data,
    message: 'OK'
  });
}

export async function store(req, res) {
  const roles = await acl.userRoles(req.user._id);
  if (!roles.includes('root') && req.body.isRoot) {
    return res.status(403).json({
      message: 'Permission denied'
    })
  }

  const validateResult = validationResult(req);
  if(!validateResult.isEmpty()) {
    return res.status(422).json({errors: validateResult.array()})
  }
  const data = await Document.store({
    ...req.body,
    author: req.user._id
  });

  return res.json({
    data,
    message: data ? 'Create success!' : 'Create failed!'
  });
}

export async function update(req, res) {
  const validateResult = validationResult(req);
  if (!validateResult.isEmpty()) {
    return res.status(422).json({errors: validateResult.array()});
  }
  const data = await Document.update(req.params.id, req.body);

  return res.json({
    data,
    message: 'OK'
  });
}

export async function destroy(req, res) {
  const data = await Document.delete(req.params.id);

  return res.status(data ? 200 : 422).json({
    message: `Delete ${data ? 'success' : 'failed'}!`,
  });
}

export async function show(req, res) {
  const data = await Document.findById(req.params.id);

  return res.status(data ? 200 : 422).json({
    message: data ? 'OK' : 'Not found!',
    data
  });
}
