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

const skillSchema = new Schema(columns, { timestamps: true, toJSON: { virtuals: true } } );
skillSchema.plugin(crudPlugin);

skillSchema.virtual('skills', {
  ref: 'SkillChart',
  localField: '_id',
  foreignField: 'skill'
})

export default mongoose.model('Skill', skillSchema);