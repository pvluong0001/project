import mongoose, {Schema} from 'mongoose';
import {IPermission} from "../_types/model";

const PermissionSchema: Schema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        unique: true
    }
});

export default mongoose.model<IPermission>('Permission', PermissionSchema);
