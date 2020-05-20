import mongoose, {Schema} from 'mongoose';
import crudPlugin from '@models/plugins/crud';

export const columns = {
  content: {
    type: String,
    required: true
  },
  extraData: [
    {
      key: String,
      label: String,
      _id: false
    }
  ],
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    require: true
  },
  isRoot: {
    type: Boolean,
    default: false
  }
};

const documentSchema = new Schema(columns, { timestamps: true } );
documentSchema.plugin(crudPlugin);

export default mongoose.model('Document', documentSchema);