import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import {ONE_DAY_TIME} from '@configs/const.config';

const SALT_WORK_FACTOR = 10;

export default function(schema) {
  schema.methods.generateAuthToken = function() {
    return jwt.sign({
      _id: this._id,
      name: this.name,
      email: this.email,
    }, process.env.SECRET_KEY, {
      expiresIn: ONE_DAY_TIME
    });
  };

  schema.methods.comparePassword = function(password) {
    return bcrypt.compare(password, this.password);
  };

  schema.methods.toJSON = function() {
    const obj = this.toObject();
    delete obj.password;
    return obj;
  }

  schema.pre('save', function(next) {
    let user = this;

    if (!user.isModified('password'))
      return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
      if (err)
        return next(err);

      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err)
          return next(err);

        user.password = hash;
        next();
      });
    });
  });
}