const express = require('express');
const Message = require('../models/messageModel');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const messages = await Message.find();
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:messageId', async (req, res) => {
    try {
        const message = await Message.findOne({
            $or: [
                { 'senderUser': req.params.messageId },
                { 'receiverUser': req.params.messageId }
            ]
        });

        if (!message) {
            return res.status(404).json({ error: 'Message not found' });
        }

        res.json(message);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:messageId', async (req, res) => {
    try {
        const updatedMessage = await Message.findByIdAndUpdate(
            req.params.messageId,
            req.body,
            { new: true }
        );

        if (!updatedMessage) {
            return res.status(404).json({ error: 'Message not found' });
        }

        res.json(updatedMessage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.post('/', async (req, res) => {
    try {
        const newMessage = new Message(req.body);
        const savedMessage = await newMessage.save();

        res.json(savedMessage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:messageId', async (req, res) => {
    try {
        const deletedMessage = await Message.findByIdAndDelete(req.params.messageId);
        if (!deletedMessage) {
            return res.status(404).json({ error: 'Message not found' });
        }
        res.json(deletedMessage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
