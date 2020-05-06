import mongoose, {Schema} from 'mongoose';
import crudPlugin from '@models/plugins/crud';
import bcryptjs from 'bcryptjs';

export const columns = {
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    rules: [
      {type: 'isEmail'}
    ]
  },
  password: {
    type: String,
    required: true
  }
};

const userSchema = new Schema(columns, { timestamps: true } );
userSchema.plugin(crudPlugin);

export default mongoose.model('User', userSchema);