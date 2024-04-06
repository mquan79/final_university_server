const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema({
  idUser1: String,
  idUser2: String,
  status: String
}, { versionKey: false })

const Friend = mongoose.model('Friend', friendSchema);

module.exports = Friend;
