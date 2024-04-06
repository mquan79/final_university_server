const mongoose = require('mongoose');

const topicGroupSchema = new mongoose.Schema({
    idGroup: String,
    nameTopicGroup: String,
    hostTopic: String,
}, { versionKey: false });
const topicGroup = mongoose.model('topicGroup', topicGroupSchema);

module.exports = topicGroup;
