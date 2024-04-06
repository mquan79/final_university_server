const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  password: String,
  passwordLevel2: String,
  avatar: String,
  birthday: String,
  lastTimeConnect: String
}, { versionKey: false });

const User = mongoose.model('User', userSchema);

module.exports = User;
