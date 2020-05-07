import mongoose, {Schema} from 'mongoose';
import crudPlugin from '@models/plugins/crud';
import authPlugin from '@models/plugins/auth';

export const columns = {
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    rules: [
      {type: 'isEmail'},
    ],
    index: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
};

const userSchema = new Schema(columns, {timestamps: true});
userSchema.plugin(crudPlugin);
userSchema.plugin(authPlugin);

export default mongoose.model('User', userSchema);