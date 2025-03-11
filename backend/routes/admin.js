const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../database');

// Secret key for JWT
const JWT_SECRET = 'your_jwt_secret_key';

// Admin login route
router.post('/login', (req, res) => {
    console.log('Login request received:', req.body); // Add this line
    const { email, password } = req.body;

    db.get('SELECT * FROM admin WHERE email = ?', [email], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Compare password
        bcrypt.compare(password, row.password, (err, isMatch) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (!isMatch) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }

            // Generate JWT
            const token = jwt.sign({ id: row.id, email: row.email }, JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        });
    });
});

module.exports = router;