import mongoose, {Schema} from 'mongoose';
import bcrypt from 'bcryptjs'
import {IUser} from "../_types/model";

const RoleSchema: Schema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

export default mongoose.model<IUser>('User', RoleSchema);
