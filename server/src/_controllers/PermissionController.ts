import BaseController from "./BaseController";
import {Router, Response} from "express";
import {IRequest, TRoute} from "../_types";
import {apiResponse} from "../_helpers";
import {check, body} from "express-validator";
import Permission from "../_models/Permission";
import {IPermission} from "../_types/model";

export default class PermissionController extends BaseController {
    prefix = '/permission';
    router = Router();
    routes: TRoute[] = [
        {
            controller: 'create',
            method: 'post',
            path: '/create',
            middleware: [
                check('name').notEmpty().withMessage('Name field is required')
            ]
        }
    ];

    protected create(req: IRequest, res: Response) {
        const permission = new Permission({
            name: req.body.name
        });

        permission.save((err, doc: IPermission) => {
            if(err)
                return apiResponse({
                    code: 400,
                    message: 'Cannot create permission!',
                    err, req, res
                })

            return apiResponse({
                req, res, result: {
                    status: true
                }
            })
        })
    }

    constructor() {
        super();
        this.initializeRoutes()
    }
}
