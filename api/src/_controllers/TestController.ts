import {Router, Response} from 'express'
import {IRequest, TRoute} from "../_types";
import BaseController from "./BaseController";
import {redisClient} from "../_helpers/redis";

export default class TestController extends BaseController {
    prefix = '/test';
    router = Router();
    routes: TRoute[] = [
        {
            path: '/',
            controller: 'test',
            method: 'get',
            isPublic: true
        }
    ];

    protected async test(req: IRequest, res: Response) {
        const sleep = function(ms: number) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
        await sleep(5000);

        redisClient.set('luong3', 'lit');

        const data = await redisClient.getAsync('luong');

        return res.json({redisData: data})
    }

    constructor() {
        super();
        this.initializeRoutes()
    }
}
