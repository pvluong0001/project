import mongoose, {Schema} from 'mongoose';
import {IEvent} from "../_types/model";
import mongoosePaginate from "mongoose-paginate"

export const eventOptions = {
    title: {
        type: String,
        trim: true,
        required: true
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date
    },
    allDay: {
        type: Boolean,
        default: true
    },
    url: {
        type: String
    },
    editable: {
        type: Boolean,
        default: true
    },
    backgroundColor: {
        type: String
    },
    borderColor: {
        type: String
    },
    textColor: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}

const EventSchema: Schema = new Schema(eventOptions, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});
EventSchema.plugin(mongoosePaginate)

export default mongoose.model<IEvent>('Event', EventSchema);
