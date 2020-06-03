import mongoose, {Schema} from 'mongoose';
import crudPlugin from '@models/plugins/crud';

const skillConvertSchema = new Schema({
  id: {
    type: String
  },
  title: {
    type: String
  },
  parent: {
    type: String
  },
  ref: {
    type: Schema.Types.Mixed
  },
  label: {
    type: Schema.Types.Mixed
  }
}, { timestamps: false, _id: false })

export const columns = {
  date: {
    type: Date,
    required: true
  },
  skills: [skillConvertSchema],
  skill: {
    type: Schema.Types.ObjectId,
    ref: 'Skill',
    required: true
  }
};

const skillChartSchema = new Schema(columns);
skillChartSchema.plugin(crudPlugin);

export default mongoose.model('SkillChart', skillChartSchema);