import {Document} from 'mongoose';

export interface IUser extends Document {
    email: string;
    name: string;
    password: string;

    comparePassword(password: string): boolean;
}

export interface IRole extends Document {
    name: string;
    permissions: null | IPermission[];
}

export interface IPermission extends Document {
    name: string;
}

export interface IPaginationOptions {
    select?: object | string;
    sort?: object | string;
    populate?: any[] | object | string;
    lean?: boolean; // default false
    leanWithId?: boolean; // If lean and leanWithId are true, adds id field with string representation of _id to every document
    offset?: number; // default 0
    page?: number; // default 1
    limit?: number; // default 10
}

export interface IEvent extends Document {
    title: string;
    start: Date;
    end: Date | null;
    allDay: boolean;
    url?: string;
    editable?: boolean;
    backgroundColor?: string;
    borderColor?: string;
    textColor?: string;
    user: null | IUser;
}

export interface IUserDecoded {
    email: string;
    name: string;
}
