import BaseController from "./BaseController";
import {Router, Response} from "express";
import {ICrudOptions, IRequest, TRoute} from "../_types";
import {apiResponse} from "../_helpers";
import {validateViaDb} from "../_middlewares/validation";
import Event, {eventOptions} from "../_models/Event";
import EventService from "../_services/EventService";

export default class EventController extends BaseController {
    prefix = '/api/event';
    router = Router();
    routes: TRoute[] = [
        // {
        //     controller: 'create',
        //     method: 'test',
        //     path: '/create',
        //     middleware: [
        //         ...validateViaDb(eventOptions)
        //     ]
        // }
    ];
    useCrud: ICrudOptions = {
        crud: true,
        model: Event,
        dataFromReq: {
            create: {
                user: 'user._id'
            }
        },
        validateFromDb: '*',
        validateOptions: eventOptions,
        validateExcept: ['user'],
        populate: [
            {
                path: 'user',
                select: 'name email -_id'
            }
        ],
        limit: 5,
        lean: true
    };

    constructor() {
        super();
        this.initializeRoutes()
    }
}
