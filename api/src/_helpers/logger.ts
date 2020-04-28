import {configure, getLogger} from 'log4js'
import path from 'path'

// set default log level
const logLevel = process.env.LOG_LEVEL || 'info';

// appenders
configure({
    appenders: {
        console: { type: 'stdout', layout: { type: 'colored' } },
        dateFile: {
            type: 'dateFile',
            filename: path.join(__dirname, './../logs/app.log'),
            layout: {
                type: 'basic'
            },
            compress: true,
            daysToKeep: 14,
            keepFileExt: true
        }
    },
    categories: {
        default: { appenders: ['console', 'dateFile'], level: logLevel }
    }
});

// fetch logger
const logger = getLogger();

export { logger };
