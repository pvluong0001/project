import {fetchMiddlewareFromColumns} from '@helpers/db.helper';
import {columns} from '@models/user.model';

export default [
  ...fetchMiddlewareFromColumns(columns)
];