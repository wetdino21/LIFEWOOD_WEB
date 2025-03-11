const express = require('express');
const router = express.Router();
const multer = require('multer');
const db = require('../database');

// Set up multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Handle application form submission
router.post('/apply', upload.single('resume'), (req, res) => {
    console.log('Application received:', req.body);
    const { first_name, last_name, email, phone_number, address, position } = req.body;
    const resume = req.file.buffer;

    db.run(`INSERT INTO applications (first_name, last_name, email, phone_number, address, resume, position) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [first_name, last_name, email, phone_number, address, resume, position],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: 'Application submitted successfully', id: this.lastID });
        }
    );
});

module.exports = router;