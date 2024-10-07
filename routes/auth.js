const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../db'); // MySQL connection
const router = express.Router();

router.post('/register', async (req, res) => {
    const { first_name, last_name, email, password, phone, date_of_birth, gender, address } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = 'INSERT INTO patients (first_name, last_name, email, password_hash, phone, date_of_birth, gender, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

    db.execute(query, [first_name, last_name, email, hashedPassword, phone, date_of_birth, gender, address], (err, result) => {
        if (err) {
            return res.status(500).send('Error registering patient');
        }
        res.status(200).send('Patient registered successfully');
    });
});

module.exports = router;
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Find the user by email
    const query = 'SELECT * FROM patients WHERE email = ?';
    db.execute(query, [email], async (err, results) => {
        if (err || results.length === 0) {
            return res.status(400).send('User not found');
        }

        const user = results[0];
        const validPassword = await bcrypt.compare(password, user.password_hash);

        if (!validPassword) {
            return res.status(400).send('Invalid password');
        }

        // Initialize session
        req.session.patientId = user.id;
        res.status(200).send('Login successful');
    });
});

router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Logout failed');
        }
        res.status(200).send('Logged out successfully');
    });
});

module.exports = router;

