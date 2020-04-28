import {Controller, ICrudOptions, TRoute} from "../_types";
import {Router, Application} from "express";
import auth from "../_middlewares/auth";
import {validation} from "../_middlewares/validation";
import CRUD from "./CRUD";
import {check} from "express-validator";

export default class BaseController implements Controller {
    prefix: string;
    router: Router;
    routes: TRoute[];
    useCrud?: ICrudOptions;

    initializeRoutes(): void {
        if (this.useCrud) {
            // @ts-ignore
            const crud = new CRUD(this);
            crud.initCrudRoutes(this.router);
        }

        this.routes.forEach(({method, path, middleware = [], controller, isPublic = false, validate = false}) => {
            // @ts-ignore
            const combineMiddleware = isPublic ? middleware : [...middleware, auth]
            combineMiddleware.push(validation);
            // @ts-ignore
            this.router[method](path, combineMiddleware, this[controller])
        })
    }
}
