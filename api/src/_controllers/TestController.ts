import {Router, Response} from 'express'
import {IRequest, TRoute} from "../_types";
import BaseController from "./BaseController";

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

    protected test(req: IRequest, res: Response) {
        return res.send('good')
    }

    constructor() {
        super();
        this.initializeRoutes()
    }
}
