const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const databaseConnection = require('./db/connect');
const port = 3000; // Set the port number

const userRoutes = require('./routes/users');
const noteRoutes = require('./routes/notes');

// Import created models - it helps to avoid errors in model referencing
require('./models/User');
require('./models/Note');

databaseConnection();

// Middleware for parsing JSON bodies
app.use(express.json());
app.use(cors());

// Using the imported routes
app.use('/api/users', userRoutes);
app.use('/api/notes', noteRoutes);

// Basic route for testing that the server is up
app.get('/', (req, res) => {
    res.send('Hello, your server is running!');
});

// User Authentication Routes
app.post('/login', (req, res) => {
    // Implementation for user login
});

app.post('/register', (req, res) => {
    // Implementation for user registration
});

// Note Management Routes
app.post('/notes', (req, res) => {
    // Implementation for creating a note
});

app.get('/notes', (req, res) => {
    // Implementation for retrieving all notes
});

app.put('/notes/:id', (req, res) => {
    // Implementation for updating a note
});

app.delete('/notes/:id', (req, res) => {
    // Implementation for deleting a note
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});