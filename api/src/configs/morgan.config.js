import morgan from 'morgan';
import path from 'path';
import {MORGAN_TEMPLATE} from '@config/base.config';
import fs from 'fs';

morgan.token('uuid', (req) => {
  return req.uuid;
})

export default function morganConfig(dirname, logPath) {
  return morgan(MORGAN_TEMPLATE, {
    stream: fs.createWriteStream(path.join(dirname, `../${logPath}`), {
      flags: 'a'
    })
  })
}