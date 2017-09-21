const mongoose = global.db;

const Order = mongoose.Schema({
  user_id: {
    type: String,
  },
  food_id: {
    type: String,
  },
  order_approved_by: { type: String },
  status: {
    type: String,
    enum: ['accepted', 'rejected', 'served'],
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('orders', Order);
