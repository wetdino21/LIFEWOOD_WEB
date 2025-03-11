const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const db = new sqlite3.Database(path.join(__dirname, 'sqlite', 'lifewood.db')); // Use a file-based database

// Create the applications table
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS applications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone_number TEXT NOT NULL,
        address TEXT NOT NULL,
        resume BLOB NOT NULL,
        position TEXT NOT NULL
    )`);
});

// Create the admin table
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS admin (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
    )`);
});

module.exports = db;