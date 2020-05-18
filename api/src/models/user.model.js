import mongoose, {Schema} from 'mongoose';
import crudPlugin from '@models/plugins/crud';
import authPlugin from '@models/plugins/auth';
import fs from 'fs';

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
  avatar: {
    type: String,
    default: null
  },
  fullName: {
    type: String
  },
  phone: {
    type: String
  },
  address: {
    type: String
  },
  group: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Group'
    }
  ]
};

const userSchema = new Schema(columns, {timestamps: true});
userSchema.plugin(crudPlugin);
userSchema.plugin(authPlugin);

userSchema.methods.changeAvatar = async function(newAvatar) {
  if(this.avatar) {
    fs.unlink(`public/${this.avatar}`, err => {
      if(err)
        return false;
    })
  }

  this.avatar = newAvatar.replace('public/', '');
  const result = await this.save();
  return result;
}

export default mongoose.model('User', userSchema);