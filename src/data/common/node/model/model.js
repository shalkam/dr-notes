import mongoose from 'mongoose';
const schema = new mongoose.Schema(
  {
    _id: String,
    carType: {},
    title: {},
    brand: {},
    model: {},
    type: {},
    pattern: {},
    year: {},
    hp: {},
    cc: {},
    fuel: {},
    kliks: {},
    price: {},
    gearbox: {},
    color: {},
    validFor: {},
    gallery: [{}],
    userId: {},
    created: {},
    updated: {},
    expiration: {},
    published: {}
  },
  { discriminatorKey: 'carType' }
);
export default mongoose.model('car', schema);
