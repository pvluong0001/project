import {fetchMiddlewareFromColumns} from '@helpers/db.helper';
import {columns} from '@models/group.model';

export default [
  ...fetchMiddlewareFromColumns(columns)
]