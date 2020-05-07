import mongoose from 'mongoose';
import {check} from 'express-validator';
import {isDate} from 'moment';
import omit from 'lodash/omit';

export function connectDb() {
  /** connect db */
  mongoose.set('useFindAndModify', false);
  return mongoose.connect(`${process.env.MONGO_DB_URL}/project`, {
    useNewUrlParser: true
  })
}

export function fetchMiddlewareFromColumns(columns = [], excepts = []) {
  columns = omit(columns, excepts);

  return Object.entries(columns).map(([columnName, config]) => {
    let middleware = check(columnName)

    if(config.required) {
      middleware.notEmpty().withMessage(`${columnName} is required!`);
    }

    if(config.type === Number) {
      middleware.isNumeric().withMessage(`${columnName} must be a number!`);
    }

    if(config.type === Date) {
      middleware.custom(value => {
        if(isDate(value)) {
          return true;
        }

        throw new Error(`${columnName} must be a date!`);
      })
    }

    if(config.rules) {
      config.rules.forEach(({type, message}) => {
        middleware[type]();
        message && middleware.withMessage(message);
      })
    }

    return middleware;
  })
}

export function mapErrorHandleMongoose(err) {
  switch(err.code) {
    case 11000:
      let column = Object.keys(err.keyPattern)[0];
      return `${column} is exists!`;
    default:
      return err.message;
  }
}
