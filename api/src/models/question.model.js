import mongoose, {Schema} from 'mongoose';
import crudPlugin from '@models/plugins/crud';

export const columns = {
  title: {
    type: String,
    required: true
  },
  class: {
    type: Number,
    default: 0,
  },
  answers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Answer'
    }
  ]
};

const questionSchema = new Schema(columns, { timestamps: true } );
questionSchema.plugin(crudPlugin);

export default mongoose.model('Question', questionSchema);