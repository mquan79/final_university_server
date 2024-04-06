const express = require('express');
const GroupMemberMessage = require('../models/groupMemberMessageModel');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const groupMemberMessages = await GroupMemberMessage.find(); 
        res.json(groupMemberMessages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:groupMemberMessageId', async (req, res) => {
    try {
        const groupMemberMessage = await GroupMemberMessage.findById(req.params.groupMemberMessageId); 
        if (!groupMemberMessage) {
            return res.status(404).json({ error: 'Group member message not found' });
        }
        res.json(groupMemberMessage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const newGroupMemberMessage = new GroupMemberMessage(req.body); 
        const savedGroupMemberMessage = await newGroupMemberMessage.save();
        res.json(savedGroupMemberMessage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:groupMemberMessageId', async (req, res) => {
    try {
        const updatedGroupMemberMessage = await GroupMemberMessage.findByIdAndUpdate(
            req.params.groupMemberMessageId,
            req.body,
            { new: true }
        ); 
        if (!updatedGroupMemberMessage) {
            return res.status(404).json({ error: 'Group member message not found' });
        }
        res.json(updatedGroupMemberMessage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:groupMemberMessageId', async (req, res) => {
    try {
        const deletedGroupMemberMessage = await GroupMemberMessage.findByIdAndDelete(req.params.groupMemberMessageId); 
        if (!deletedGroupMemberMessage) {
            return res.status(404).json({ error: 'Group member message not found' });
        }
        res.json(deletedGroupMemberMessage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
