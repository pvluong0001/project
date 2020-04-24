import BaseController from "./BaseController";
import {Router, Response} from "express";
import {IRequest, TRoute} from "../_types";
import {apiResponse, getValidateErrors} from "../_helpers";
import {check, body} from "express-validator";
import User from "../_models/User";
import {IUser} from "../_types/model";
import Token from "../_helpers/token";

export default class UserController extends BaseController {
    prefix = '/user';
    router = Router();
    routes: TRoute[] = [
        {
            path: '/change-password',
            controller: 'changePassword',
            method: 'post',
            middleware: [
                check('old_password').isLength({min: 1}).withMessage('Require old password'),
                check('new_password').isLength({min: 6, max: 32}).withMessage('Min length 6, max length 32'),
                body('confirm_new_password').custom((value, {req}) => {
                    if(value !== req.body.new_password) {
                        throw new Error('Password confirmation does not match new password')
                    }

                    return true;
                })
            ]
        }
    ];

    protected async changePassword(req: IRequest, res: Response) {
        User.findOne({email: req.user.email}, (err, doc: IUser) => {
            if (err)
                return apiResponse({
                    req, res, err,
                    message: 'Unknown',
                    code: 400
                })

            if(doc.comparePassword(req.body.old_password)) {
                doc.password = req.body.new_password;

                const result = doc.save();

                return apiResponse({
                    req, res, result: {
                        status: !!result,
                        token: Token.createToken({
                            name: req.user.name,
                            email: req.user.email
                        })
                    }
                })
            }

            return apiResponse({
                req, res,
                message: 'Old password not correct!',
                code: 400
            })
        })
    }

    constructor() {
        super();
        this.initializeRoutes()
    }
}
