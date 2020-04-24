import {Request} from 'express'
import {validationResult} from "express-validator";
import httpCode from "./httpCode";
import {IApiResponse, IError} from "../_types";
import morgan from "morgan"
import {logger} from "./logger";

export const getValidateErrors = (req: Request) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        return errors.array().map(({msg, param}) => {
            return {
                param, msg
            }
        });
    }

    return null
}

export const apiResponse = (options: IApiResponse) => {
    const {result = null, code = 200, message = null, err = null, req, res} = options

    if(options.err) {
        logger.error({
            error: err instanceof Error ? err.message : err,
            reqid: req.id,
            trace: err instanceof Error ? err.stack : ''
        })

        return res.status(code).json({
            error: (err instanceof Error) ? null : err,
            code,
            // @ts-ignore
            message: message || httpCode[code].message
        })
    }

    return res.status(code).json({
        result,
        code,
        // @ts-ignore
        message: message || httpCode[code].message
    })
}

export function applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            Object.defineProperty(derivedCtor.prototype, name, Object.getOwnPropertyDescriptor(baseCtor.prototype, name));
        });
    });
}
