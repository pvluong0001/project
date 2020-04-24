import {IRequest} from "../_types";
import {Response, NextFunction} from "express";
import Token from "../_helpers/token";
import {apiResponse} from "../_helpers";
import User from "../_models/User";
import {IUserDecoded, IUser} from "../_types/model";

export default function (req: IRequest, res: Response, next: NextFunction) {
    try {
        Token.verify(req, async (err, decoded: IUserDecoded) => {
            if (err)
                return apiResponse({
                    err,
                    req, res,
                    code: 401
                })
            const doc = await User.findOne({email: decoded.email});

            if (!doc) {
                return apiResponse({
                    message: 'User not valid',
                    req, res,
                    code: 401,
                    err
                })
            }

            req.user = {
                ...decoded,
                _id: doc._id
            }

            next()
        });
    } catch (e) {
        return apiResponse({
            message: 'Unauthorized',
            req, res,
            code: 401,
            err: e
        })
    }
}
