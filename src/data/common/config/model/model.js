import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  _id: String,
  key: {},
  value: {}
});
export default mongoose.model('config', schema);
