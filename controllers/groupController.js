const express = require('express');
const Group = require('../models/groupModel'); 

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const groups = await Group.find(); 
        res.json(groups);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:groupId', async (req, res) => {
    try {
        const group = await Group.findById(req.params.groupId); 
        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }
        res.json(group);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const newGroup = new Group(req.body); 
        const savedGroup = await newGroup.save();
        res.json(savedGroup);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:groupId', async (req, res) => {
    try {
        const updatedGroup = await Group.findByIdAndUpdate(
            req.params.groupId,
            req.body,
            { new: true }
        ); 
        if (!updatedGroup) {
            return res.status(404).json({ error: 'Group not found' });
        }
        res.json(updatedGroup);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:groupId', async (req, res) => {
    try {
        const deletedGroup = await Group.findByIdAndDelete(req.params.groupId);
        if (!deletedGroup) {
            return res.status(404).json({ error: 'Group not found' });
        }
        res.json(deletedGroup);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
