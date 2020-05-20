import mongoose, {Schema} from 'mongoose';
import crudPlugin from '@models/plugins/crud';

export const columns = {
  name: {
    type: String,
    required: true
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'Group'
  },
  description: {
    type: String,
    default: null
  }
};

const groupSchema = new Schema(columns, { timestamps: true, toJSON: { virtuals: true } } );
groupSchema.plugin(crudPlugin);
// groupSchema.virtual('children', {
//   ref: 'Group',
//   localField: '_id',
//   foreignField: 'parent'
// })
// groupSchema.virtual('children').get(() => [])

export default mongoose.model('Group', groupSchema);