const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const db = require('../db'); // assuming you export your db connection

// Patient Registration
router.post('/register', async (req, res) => {
    const { first_name, last_name, email, password, phone, date_of_birth, gender, address } = req.body;
    const password_hash = await bcrypt.hash(password, 10);
    try {
        await db.query('INSERT INTO Patients (first_name, last_name, email, password_hash, phone, date_of_birth, gender, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
            [first_name, last_name, email, password_hash, phone, date_of_birth, gender, address]);
        res.status(201).json({ message: 'Patient registered successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Error registering patient.' });
    }
});

// Patient Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const [rows] = await db.query('SELECT * FROM Patients WHERE email = ?', [email]);
        const patient = rows[0];
        if (patient && await bcrypt.compare(password, patient.password_hash)) {
            req.session.patientId = patient.id;
            res.json({ message: 'Login successful!' });
        } else {
            res.status(401).json({ error: 'Invalid credentials.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error logging in.' });
    }
});

// Profile Management
router.get('/profile', async (req, res) => {
    if (!req.session.patientId) return res.status(401).json({ error: 'Unauthorized' });
    const [rows] = await db.query('SELECT * FROM Patients WHERE id = ?', [req.session.patientId]);
    res.json(rows[0]);
});

// Update Profile
router.put('/profile', async (req, res) => {
    const { first_name, last_name, phone, date_of_birth, gender, address } = req.body;
    if (!req.session.patientId) return res.status(401).json({ error: 'Unauthorized' });
    
    try {
        await db.query('UPDATE Patients SET first_name = ?, last_name = ?, phone = ?, date_of_birth = ?, gender = ?, address = ? WHERE id = ?',
            [first_name, last_name, phone, date_of_birth, gender, address, req.session.patientId]);
        res.json({ message: 'Profile updated successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Error updating profile.' });
    }
});

// Delete Account
router.delete('/account', async (req, res) => {
    if (!req.session.patientId) return res.status(401).json({ error: 'Unauthorized' });
    
    try {
        await db.query('DELETE FROM Patients WHERE id = ?', [req.session.patientId]);
        req.session.destroy();
        res.json({ message: 'Account deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting account.' });
    }
});

module.exports = router;
