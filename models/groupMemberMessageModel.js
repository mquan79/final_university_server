const mongoose = require('mongoose');

const groupMemberMessageSchema = new mongoose.Schema({
    idTopic: String,
    idMember: String,
    record: String,
    time: String,
}, { versionKey: false });

const GroupMemberMessage = mongoose.model('GroupMemberMessage', groupMemberMessageSchema);

module.exports = GroupMemberMessage;
