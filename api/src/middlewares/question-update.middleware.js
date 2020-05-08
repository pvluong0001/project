import {fetchMiddlewareFromColumns} from '@helpers/db.helper';
import {columns} from '@models/question.model';

export default [
  ...fetchMiddlewareFromColumns(columns)
]