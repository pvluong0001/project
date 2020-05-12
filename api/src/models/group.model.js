import mongoose, {Schema} from 'mongoose';
import crudPlugin from '@models/plugins/crud';

export const columns = {
  name: {
    type: String,
    required: true
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'Group',
    autopopulate: true
  }
};

const groupSchema = new Schema(columns, { timestamps: true } );
groupSchema.plugin(crudPlugin);
groupSchema.virtual('test', {
  ref: 'Group',
  localField: '_id',
  foreignField: 'parent',
  count: true
})

export default mongoose.model('Group', groupSchema);