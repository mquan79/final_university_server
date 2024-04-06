const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  senderUser: String,
  receiverUser: String,
  receiverGroup: String,
  content: String,
  file: String,
  location: {
    latitude: Number,
    longitude: Number,
  },
  time: String,
  status: String,
  deleteByReceiverUser: String,
  deleteBySenderUser: String,
  replyMessageId: String
}, { versionKey: false });

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
