import mongoose, {Schema} from 'mongoose';
import crudPlugin from '@models/plugins/crud';

export const columns = {
  title: {
    type: String,
    required: true
  },
  isCorrect: {
    type: Boolean,
    default: false
  }
};

const answerSchema = new Schema(columns, { timestamps: true } );
answerSchema.plugin(crudPlugin);

export default mongoose.model('Answer', answerSchema);