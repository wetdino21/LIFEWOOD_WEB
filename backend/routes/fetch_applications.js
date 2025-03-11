const express = require('express');
const router = express.Router();
const db = require('../database');

// Fetch all applications
router.get('/fetch_applications', (req, res) => {
    db.all('SELECT id, first_name, last_name, email, phone_number, address, position, created_at FROM applications', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Serve resume files
router.get('/fetch_applications/:id/resume', (req, res) => {
    const id = req.params.id;
    db.get('SELECT resume FROM applications WHERE id = ?', [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: 'Resume not found' });
        }
        res.setHeader('Content-Disposition', 'inline; filename=resume.pdf');
        res.setHeader('Content-Type', 'application/pdf');
        res.send(row.resume);
    });
});

module.exports = router;