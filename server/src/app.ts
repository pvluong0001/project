import express from 'express'
import bodyParser from 'body-parser';
import {Controller, IRequest} from "./_types";
import mongoose from "mongoose";
import fs from "fs";
import morgan from "morgan";
import path from "path";
import uuid from "node-uuid";
import {apiResponse} from "./_helpers";
import {logger} from './_helpers/logger';
import cors from 'cors';
import {corsOptions} from './_config/config';

class App {
    public app: express.Application

    constructor(controllers: any[], private port: number) {
        this.app = express()

        this.connectDb()

        this.setup()

        this.initializeMiddlewares();
        this.initializeControllers(controllers)

        /** error handler */
        this.app.use(function (err: any, req: IRequest, res: express.Response, next: express.NextFunction) {
            const {message} = err || 'Undefined';

            logger.error({
                reqid: req.id,
                error: message
            })

            return apiResponse({
                code: 500,
                message,
                req, res
            })
        })
    }
    private initializeMiddlewares() {
        this.app.use(cors(corsOptions))
        this.app.use(bodyParser.urlencoded({limit: '50mb', extended: false}))
        this.app.use(bodyParser.json({limit: '50mb'}));
    }

    private initializeControllers(controllers: any[]) {
        controllers = controllers.map(controller => new controller())
        controllers.forEach((controller: Controller) => {
            this.app.use(controller.prefix, controller.router);
        });
    }

    private connectDb() {
        mongoose.connect('mongodb://main-mongo:27017/product', {useNewUrlParser: true});

        mongoose.set('useFindAndModify', true)

        mongoose.connection.on('connected', (err) => {
            console.log('Connect db')
        })
    }

    private setup() {
        morgan.token('id', function getId(req: any) {
            return req.id
        })

        /** set request id */
        this.app.use(this.assignId)

        /** add request id to response */
        this.app.use(this.automaticAddReqUid)

        /** config access log */
        this.app.use(morgan('ReqId: :id === Method: :method === Url: :url === Ref: :referrer === UA: :user-agent === Restime: :response-time', {
            stream: fs.createWriteStream(path.join(__dirname, 'logs/access.log'), {flags: 'a'})
        }))

    }

    private automaticAddReqUid(req: IRequest, res: express.Response, next: express.NextFunction) {
        const originalSend = res.json;

        // @ts-ignore
        res.json = function (json) {
            json = {
                // @ts-ignore
                reqid: req.id,
                ...json
            }

            return originalSend.call(this, json)
        }

        next()
    }

    private assignId(req: IRequest, res: express.Response, next: express.NextFunction) {
        // @ts-ignore
        req.id = uuid.v4()
        next()
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App is starting at http://localhost:${this.port}`)
        })
    }
}

export default App;
