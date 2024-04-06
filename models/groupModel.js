const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    nameGroup: String,
    urlGroup: String,
    hostGroup: String
}, { versionKey: false });
const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
