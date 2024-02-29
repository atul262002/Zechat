// modules/user/userModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: String,
  profilePhoto: {type:String},
  status: { type: String, default: 'pending' },
  verificationToken: String,
});

module.exports = mongoose.model('User', userSchema);
