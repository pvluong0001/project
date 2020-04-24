import {Router, Response} from 'express'
import {IRequest, TRoute} from "../_types";
import BaseController from "./BaseController";
import {check} from "express-validator";
import {apiResponse, getValidateErrors} from "../_helpers";
import User from "../_models/User";
import {IUser} from "../_types/model";
import Token from "../_helpers/token";

export default class AuthController extends BaseController {
    prefix = '/auth';
    router = Router();
    routes: TRoute[] = [
        {
            path: '/register',
            controller: 'register',
            method: 'post',
            middleware: [
                check('email').isEmail().withMessage('Email is not valid!'),
                check('password').isLength({min: 6, max: 32}).withMessage('Min length 6, max length 32'),
                check('name').isLength({min: 3, max: 32}).withMessage('Min length 3, max length 32'),
            ],
            isPublic: true
        },
        {
            path: '/login',
            controller: 'login',
            method: 'post',
            middleware: [
                check('email').isEmail().withMessage('Email is not valid!'),
                check('password').isLength({min: 6, max: 32}).withMessage('Min length 6, max length 32')
            ],
            isPublic: true
        },
        {
            path: '/get-user',
            controller: 'getAuthUser',
            method: 'get'
        }
    ];

    protected getAuthUser(req: IRequest, res: Response) {
        return apiResponse({
            req, res,
            result: req.user
        })
    }

    protected register(req: IRequest, res: Response) {
        const data = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        }

        const user = new User(data)

        // @ts-ignore
        user.save(err => {
            if (err)
                return apiResponse({
                    code: 400,
                    message: 'Cannot register!',
                    err, req, res
                })

            const publicData = {
                name: user.name,
                email: user.email
            }

            const token = Token.createToken(publicData)

            return apiResponse({
                result: {
                    ...publicData,
                    token
                },
                res, req
            })
        })
    }

    protected login(req: IRequest, res: Response) {
        const params = req.body;

        User.findOne({email: params.email}, (err, doc: IUser) => {
            if (err || !doc)
                return apiResponse({
                    req, res, err,
                    message: 'Email not registed!',
                    code: 400
                })

            if(doc.comparePassword(params.password)) {
                const token = Token.createToken({
                    name: doc.name,
                    email: doc.email
                })

                return apiResponse({
                    req, res,
                    result: {
                        token,
                        name: doc.name,
                        email: doc.email
                    }
                })
            }

            return apiResponse({
                req, res,
                message: 'Password not correct!',
                code: 400
            })
        })
    }

    constructor() {
        super();
        this.initializeRoutes()
    }
}
