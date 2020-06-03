import mongoose, {Schema} from 'mongoose';
import crudPlugin from '@models/plugins/crud';

export const columns = {

};

const groupDocSchema = new Schema(columns, { timestamps: true } );
groupDocSchema.plugin(crudPlugin);

export default mongoose.model('GroupDoc', groupDocSchema);