//run (node create_admin.js) to create admin if none

const bcrypt = require('bcryptjs');
const db = require('./database');

const email = 'admin@gmail.com';
const password = 'admin123';

// Check if the admin user already exists
db.get('SELECT * FROM admin WHERE email = ?', [email], (err, row) => {
    if (err) {
        console.error(err.message);
        return;
    }

    if (row) {
        console.log('Admin user already exists');
    } else {
        // Hash the password and create the admin user
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                console.error(err);
                return;
            }

            db.run('INSERT INTO admin (email, password) VALUES (?, ?)', [email, hash], (err) => {
                if (err) {
                    console.error(err.message);
                } else {
                    console.log('Admin user created successfully');
                }
            });
        });
    }
});