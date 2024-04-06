const express = require('express');
const Friend = require('../models/friendModel'); 

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const friends = await Friend.find(); 
        res.json(friends);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:friendId', async (req, res) => {
    try {
        const friend = await Friend.findById(req.params.friendId);
        if (!friend) {
            return res.status(404).json({ error: 'Friend not found' });
        }
        res.json(friend);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const newFriend = new Friend(req.body); 
        const savedFriend = await newFriend.save();
        res.json(savedFriend);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:friendId', async (req, res) => {
    try {
        const updatedFriend = await Friend.findByIdAndUpdate(
            req.params.friendId,
            req.body,
            { new: true }
        ); // Update model usage
        if (!updatedFriend) {
            return res.status(404).json({ error: 'Friend not found' });
        }
        res.json(updatedFriend);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:friendId', async (req, res) => {
    try {
        const deletedFriend = await Friend.findByIdAndDelete(req.params.friendId); 
        if (!deletedFriend) {
            return res.status(404).json({ error: 'Friend not found' });
        }
        res.json(deletedFriend);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
