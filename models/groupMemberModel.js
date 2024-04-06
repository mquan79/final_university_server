const mongoose = require('mongoose');

const groupMemberSchema = new mongoose.Schema({
    idGroup: String,
    idMember: String
}, { versionKey: false });

const GroupMember = mongoose.model('GroupMember', groupMemberSchema);

module.exports = GroupMember;
