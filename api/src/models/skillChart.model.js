import mongoose, {Schema} from 'mongoose';
import crudPlugin from '@models/plugins/crud';

const skillConvertSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  parent: {
    type: String
  },
  ref: {
    type: [Array, String]
  },
  label: {
    type: [Array, String]
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