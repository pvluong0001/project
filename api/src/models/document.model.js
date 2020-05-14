import mongoose, {Schema} from 'mongoose';
import crudPlugin from '@models/plugins/crud';

export const columns = {
  content: {
    type: String,
    required: true
  },
  extraData: [
    {
      type: String
    }
  ]
};

const documentSchema = new Schema(columns, { timestamps: true } );
documentSchema.plugin(crudPlugin);

export default mongoose.model('Document', documentSchema);