import User from '@models/user.model';
import pick from 'lodash/pick';
import {columns} from '@models/user.model';
import { mapErrorHandleMongoose } from '@helpers/db.helper';

export async function register(req, res) {
  try {
    const user = await User.store(pick(req.body, Object.keys(columns)));

    return res.json({
      data: {
        token: user.generateAuthToken()
      },
      message: 'OK'
    });
  } catch(e) {
    return res.status(422).json({
      errors: mapErrorHandleMongoose(e)
    })
  }
}

export async function login(req, res) {
  const query = pick(req.body, ['email']);
  const user = await User.findOne(query);
  
  if(user) {
    const isValid = await user.comparePassword(req.body.password);

    if(isValid) {
      return res.json({
        message: 'OK',
        data: {
          token: user.generateAuthToken()
        }
      });
    }
  }

  return res.status(401).json({
    errors: 'Email or password is not correct!'
  });
}

export async function getUser(req, res) {
  const user = await User.findById(req.user._id);

  return res.json({
    message: 'OK',
    data: user
  })
}

export async function uploadAvatar(req, res) {
  const user = await User.findById(req.user._id);

  if(user) {
    const result = await user.changeAvatar(req.file?.path);

    if(result) {
      return res.json({
        message: 'OK',
        data: result.avatar
      })
    }
    
    return res.status(422).json({
      errors: 'Cannot update avatar!'
    })
  }

  return res.status(401).json({
    errors: 'Unauthorized'
  });
}
