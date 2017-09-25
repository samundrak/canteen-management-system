const mongoose = global.db;
const { STATUS, SHIFT } = require('../Strings');

const Order = mongoose.Schema({
  user_id: {
    type: String,
  },
  food_id: {
    type: String,
  },
  shift: {
    type: String,
    enum: [SHIFT.MORNING, SHIFT.DAY, SHIFT.NIGHT],
  },
  order_approved_by: { type: String, default: null },
  status: {
    type: String,
    enum: [STATUS.PENDING, STATUS.APPROVED, STATUS.REJECTED, STATUS.SERVED],
    default: STATUS.PENDING,
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('orders', Order);
