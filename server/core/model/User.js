const mongoose = global.db;
const formalStringType = {
  type: String,
  lowercase: true,
};
const User = mongoose.Schema({
  first_name: formalStringType,
  last_name: formalStringType,
  email: formalStringType,
  password: String,
  status: {
    type: Number,
    default: 0,
  },
  hash: String,
  fp_hash: String,
  role: { type: String, enum: ['owner', 'admin', 'user'] },
  last_login: { type: Date, default: Date.now },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('users', User);
