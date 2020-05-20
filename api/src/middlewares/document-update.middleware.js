import {fetchMiddlewareFromColumns} from '@helpers/db.helper';
import {columns} from '@models/document.model';

export default [
  ...fetchMiddlewareFromColumns(columns)
]