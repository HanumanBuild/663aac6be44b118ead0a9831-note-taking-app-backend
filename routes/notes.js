const express = require('express');
const Note = require('../models/Note');
const authenticate = require('../middleware/authenticate');
const router = express.Router();

// Create a note
router.post('/', authenticate, async (req, res) => {
    const { content } = req.body;
    const userId = req.user.id; // Assuming user's id is attached to req.user by `authenticate` middleware

    const newNote = new Note({
        content,
        userId
    });

    try {
        await newNote.save();
        res.status(201).json(newNote);
    } catch (error) {
        res.status(400).json({ error: 'Error creating note' });
    }
});

// Retrieve all notes
router.get('/', authenticate, async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.user.id });
        res.json(notes);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving notes' });
    }
});

// Update a note
router.put('/:noteId', authenticate, async (req, res) => {
    const { content } = req.body;
    const { noteId } = req.params;

    try {
        const updatedNote = await Note.findByIdAndUpdate(noteId, { content }, { new: true });
        if (!updatedNote) return res.status(404).json({ error: 'Note not found' });
        res.json(updatedNote);
    } catch (error) {
        res.status(500).json({ error: 'Error updating note' });
    }
});

// Delete a note
router.delete('/:noteId', authenticate, async (req, res) => {
    const { noteId } = req.params;

    try {
        const deletedNote = await Note.findByIdAndDelete(noteId);
        if (!deletedNote) return res.status(404).json({ error: 'Note not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Error deleting note' });
    }
});

module.exports = router;