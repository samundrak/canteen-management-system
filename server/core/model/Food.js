const mongoose = global.db;
const formalStringType = {
  type: String,
  lowercase: true,
};
const Food = mongoose.Schema({
  name: formalStringType,
  images: { type: Array, default: [] },
  created_by: { type: String, default: null },
  price: {
    type: Number,
    default: 0,
  },
  description: formalStringType,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('foods', Food);
