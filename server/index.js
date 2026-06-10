const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const PORT = 3000;
const MESSAGES_FILE = path.join(__dirname, 'messages.json');

// Middleware to parse JSON bodies
app.use(express.json());

// Custom CORS middleware to avoid external packages
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

// Root Route
app.get('/', (req, res) => {
    res.send('Server is running 🚀. API endpoint: POST /api/contact');
});

// Contact Route
app.post('/api/contact', (req, res) => {
    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: 'All fields (name, email, subject, message) are required.' });
    }

    // Email validation regex check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Please provide a valid email address.' });
    }

    const newMessage = {
        id: Date.now(),
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim(),
        message: message.trim(),
        receivedAt: new Date().toISOString()
    };

    // Read and write file synchronously or asynchronously
    fs.readFile(MESSAGES_FILE, 'utf8', (err, data) => {
        let messages = [];

        if (!err && data) {
            try {
                messages = JSON.parse(data);
            } catch (parseErr) {
                console.error('Error parsing messages.json:', parseErr);
            }
        }

        messages.push(newMessage);

        fs.writeFile(MESSAGES_FILE, JSON.stringify(messages, null, 2), 'utf8', (writeErr) => {
            if (writeErr) {
                console.error('Error writing to messages.json:', writeErr);
                return res.status(500).json({ error: 'Failed to write message data to disk.' });
            }

            res.status(201).json({
                success: true,
                message: 'Message stored successfully!',
                data: newMessage
            });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});