const express = require('express');
const TopicGroup = require('../models/topicGroupModel'); 

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const topicGroups = await TopicGroup.find(); 
        res.json(topicGroups);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:topicGroupId', async (req, res) => {
    try {
        const topicGroup = await TopicGroup.findById(req.params.topicGroupId); 
        if (!topicGroup) {
            return res.status(404).json({ error: 'Topic Group not found' });
        }
        res.json(topicGroup);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const newTopicGroup = new TopicGroup(req.body); 
        const savedTopicGroup = await newTopicGroup.save();
        res.json(savedTopicGroup);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:topicGroupId', async (req, res) => {
    try {
        const updatedTopicGroup = await TopicGroup.findByIdAndUpdate(
            req.params.topicGroupId,
            req.body,
            { new: true }
        ); 
        if (!updatedTopicGroup) {
            return res.status(404).json({ error: 'Topic Group not found' });
        }
        res.json(updatedTopicGroup);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:topicGroupId', async (req, res) => {
    try {
        const deletedTopicGroup = await TopicGroup.findByIdAndDelete(req.params.topicGroupId);
        if (!deletedTopicGroup) {
            return res.status(404).json({ error: 'Topic Group not found' });
        }
        res.json(deletedTopicGroup);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
