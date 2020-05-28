import mongoose, {Schema} from 'mongoose';
import crudPlugin from '@models/plugins/crud';

export const columns = {
  name: {
    type: String,
    required: true
  },
  mode: {
    type: String,
    required: true
  }
};

const skillSchema = new Schema(columns, { timestamps: true } );
skillSchema.plugin(crudPlugin);

export default mongoose.model('Skill', skillSchema);