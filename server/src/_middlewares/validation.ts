import {IRequest} from "../_types";
import {Response, NextFunction} from "express";
import {apiResponse, getValidateErrors} from "../_helpers";
import { check } from "express-validator";

export function validation(req: IRequest, res: Response, next: NextFunction) {
    const errors = getValidateErrors(req);

    if (errors) {
        return apiResponse({
            code: 400,
            err: errors,
            res, req,
            message: 'Form invalid!'
        })
    }

    next()
}

export function validateViaDb(columnConfig: object, except: string[] = []): any[] {
    const requireColumns = Object.keys(columnConfig).filter(item => {
        // @ts-ignore
        return columnConfig[item].required === true && !except.includes(item);
    })
    return requireColumns.map(column => {
        return check(`${column}`).notEmpty().withMessage(`${column} is required!`)
    })
}
