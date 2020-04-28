import jwt, {VerifyCallback} from "jsonwebtoken";
import {getConfig} from "./config";
import constant from "./const";
import {IRequest} from "../_types";

export default class Token {
    static createToken(publicData: any, options = {expiresIn: constant.ONE_DAY_TIME}) {
        return jwt.sign(publicData, getConfig('SECRET_KEY'), options)
    }

    static verify(req: IRequest, callback: VerifyCallback) {
        const authHeader = req.header('Authorization');
        const token = authHeader.split(' ')[1];

        jwt.verify(token, getConfig('SECRET_KEY'), callback)
    }
}
