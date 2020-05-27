import {fetchMiddlewareFromColumns} from '@helpers/db.helper';
import {columns} from '@models/skill.model';

export default [
  ...fetchMiddlewareFromColumns(columns)
]