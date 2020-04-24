import {Controller, ICRUD, ICrudOptions, ICrudRouteOptions, IRequest} from "../_types";
import {apiResponse} from "../_helpers";
import {Response} from "express";
import {Schema} from "mongoose";
import {Router} from "express";
import auth from "../_middlewares/auth";
import {validateViaDb, validation} from "../_middlewares/validation";
import {logger} from "../_helpers/logger";
import {get} from "lodash";
import {Document} from "mongoose";
import {check} from "express-validator";
import {IPaginationOptions} from "../_types/model";

export default class CRUD implements ICRUD {
    private useCrud: ICrudOptions;
    private routes: ICrudRouteOptions[] = [
        // 'create', 'update', 'select', 'delete'
        {
            name: 'create',
            path: '/create',
            method: 'post'
        },
        {
            name: 'update',
            path: '/:id',
            method: 'put'
        },
        {
            name: 'delete',
            path: '/:id',
            method: 'delete'
        },
        {
            name: 'list',
            path: '/list',
            method: 'get'
        }
    ];
    private validateRoutes: any = ['create'];

    initCrudRoutes(router: Router): any {
        //
        if (this.useCrud.validateFromDb && (this.useCrud.validateFromDb !== '*')) {
            this.validateRoutes = this.useCrud.validateFromDb;
        }
        this.routes.forEach(({name, path, method, middleware = []}: ICrudRouteOptions) => {
            let combineMiddleware = this.useCrud.publicRoutes.includes(name) ? middleware : [...middleware, auth]

            if (this.useCrud.validateFromDb) {
                if (this.validateRoutes.includes(name)) {
                    combineMiddleware = [
                        ...combineMiddleware,
                        ...validateViaDb(this.useCrud.validateOptions, this.useCrud.validateExcept)
                    ]
                }
            }

            combineMiddleware.push(validation)
            // @ts-ignore
            router[method](path, combineMiddleware, this[name].bind(this))
        })
        return router;
    }

    async list(req: IRequest, res: Response) {
        const page = req.body.page || 1;
        const limit = this.useCrud.limit || 10;
        const query = req.body.query || {};
        let sort: object|string;
        sort = {
            created_at: 'desc'
        };
        const lean = this.useCrud.hasOwnProperty('lean') ? this.useCrud.lean : false;

        if(this.useCrud.sort) {
            sort = this.useCrud.sort
        }

        if(req.body.sort) {
            sort = req.body.sort
        }

        const options: IPaginationOptions = {
            page,
            limit,
            lean,
            sort
        };

        if(this.useCrud.populate) {
            options.populate = this.useCrud.populate
        }
        // @ts-ignore
        const result = await this.useCrud.model.paginate(query, options)

        return apiResponse({
            res, req, result
        })
    }

    create(req: IRequest, res: Response) {
        const bonusData = this.getBonusDataFromReq('create', req)
        const data = req.body;
        let row: Document = new this.useCrud.model({
            ...data,
            ...bonusData
        });

        row.save(async (err: any) => {
            if (err)
                return apiResponse({
                    code: 400,
                    message: 'Create failed!',
                    err, req, res
                });
            row = await this.withPopulate(row)

            return apiResponse({
                res, req, result: row
            })
        })
    }

    private async withPopulate(doc: Document): Promise<Document> {
        if (this.useCrud.populate && this.useCrud.populate.length) {
            doc = await doc.populate(this.useCrud.populate).execPopulate()
        }

        return doc
    }

    update(req: IRequest, res: Response) {
        const id = req.params.id;
        const bonusData = this.getBonusDataFromReq('create', req)
        const data = req.body;
        const updateData = {
            ...bonusData,
            ...data
        };

        this.useCrud.model.findOneAndUpdate({_id: id}, updateData, {new: true}, async (err, doc: Document) => {
            if (err)
                return apiResponse({
                    code: 400,
                    message: 'Update failed!',
                    err, req, res
                });
            doc = await this.withPopulate(doc)

            return apiResponse({
                res, req, result: doc
            })
        });
    }

    delete(req: IRequest, res: Response) {
        const id = req.params.id

        this.useCrud.model.findOneAndDelete({_id: id}, err => {
            if (err)
                return apiResponse({
                    code: 400,
                    message: 'Delete failed!',
                    err, req, res
                });

            return apiResponse({
                res, req, result: true
            })
        })
    }

    public getBonusDataFromReq(type: string, req: IRequest): any {
        //
        const bonusObject = this.useCrud.dataFromReq;
        if (bonusObject.hasOwnProperty(type)) {
            const temp = {}

            // @ts-ignore
            Object.keys(bonusObject[type]).forEach(attr => {
                // @ts-ignore
                temp[attr] = get(req, bonusObject[type][attr])
            })

            return temp;
        } else {
            return {}
        }
    }

    constructor(controller: Controller) {
        //
        this.useCrud = {
            ...controller.useCrud,
            publicRoutes: []
        }
    }
}
