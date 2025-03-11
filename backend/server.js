const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./database'); // Import the database connection
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../frontend')));

// Routes
const adminRoutes = require('./routes/admin');
const applyRoutes = require('./routes/submit_applications'); // Ensure this is correctly imported
const applicationRoutes = require('./routes/fetch_applications');
app.use('/api/admin', adminRoutes);
app.use('/api', applyRoutes);
app.use('/api', applicationRoutes);

// Test database connection
app.get('/api/test-db', (req, res) => {
    db.get('SELECT 1', (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Database connection successful', row });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});