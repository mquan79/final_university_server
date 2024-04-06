const express = require('express');
const GroupMember = require('../models/groupMemberModel'); 

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const groupMembers = await GroupMember.find(); 
        res.json(groupMembers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:groupMemberId', async (req, res) => {
    try {
        const groupMember = await GroupMember.findById(req.params.groupMemberId); 
        if (!groupMember) {
            return res.status(404).json({ error: 'Group member not found' });
        }
        res.json(groupMember);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const newGroupMember = new GroupMember(req.body); 
        const savedGroupMember = await newGroupMember.save();
        res.json(savedGroupMember);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:groupMemberId', async (req, res) => {
    try {
        const updatedGroupMember = await GroupMember.findByIdAndUpdate(
            req.params.groupMemberId,
            req.body,
            { new: true }
        ); 
        if (!updatedGroupMember) {
            return res.status(404).json({ error: 'Group member not found' });
        }
        res.json(updatedGroupMember);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:groupMemberId', async (req, res) => {
    try {
        const deletedGroupMember = await GroupMember.findByIdAndDelete(req.params.groupMemberId); 
        if (!deletedGroupMember) {
            return res.status(404).json({ error: 'Group member not found' });
        }
        res.json(deletedGroupMember);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
