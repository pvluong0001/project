import {Router, Application, Request, Response} from 'express'
import {Model} from "mongoose";
import {RedisClient} from 'redis';

export interface Controller {
    router: Router;
    prefix: string;
    routes: TRoute[];
    useCrud?: ICrudOptions;

    initializeRoutes(): void;
}

export interface ICrudOptions {
    crud: boolean;
    except?: string[];
    before?: (() => any)[];
    publicRoutes?: string[];
    model: Model<any>;
    dataFromReq?: object;
    validateFromDb?: null | string | string[];
    validateOptions?: object;
    validateExcept?: string[];
    populate?: {
        path: string,
        select: string
    }[];
    limit?: number;
    lean?: boolean;
    sort?: object | string;
}

export interface ICrudRouteOptions {
    name: string;
    path: string;
    method: string;
    middleware?: any[];
}

export interface ICRUD {
    initCrudRoutes(router: Router): Router;

    getBonusDataFromReq(type: string, req: IRequest): any;
}

export interface IRequest extends Request {
    id: string;
    user?: any;
}

interface IRoute {
    path: string;
    controller: string;
    method: string;
    middleware?: any[];
    isPublic?: boolean;
    validate?: boolean;
}

export interface IError {
    err?: Error;
    req?: Request
}

export interface IApiResponse {
    result?: any;
    code?: number;
    message?: string;
    err?: Error | any;
    req: IRequest;
    res: Response;
}

export interface AsyncRedisClient extends RedisClient {
    [x: string]: any
}

export type TRoute = IRoute;
