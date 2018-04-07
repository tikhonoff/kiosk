import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
  title: { type: String, required: true, max: 200 },
  parent: { type: Schema.Types.ObjectId, ref: 'Slide' },
  icon: { type: Schema.Types.ObjectId, ref: 'Attachment' },
  content: { type: String },
  internalIdent: { type: String },
});

const Slide = mongoose.model('Slide', schema);
export default Slide;
