const express = require('express');
const router = express.Router();
const db = require('../db'); // assuming you export your db connection

// Create Doctor
router.post('/', async (req, res) => {
    const { first_name, last_name, specialization, email, phone, schedule } = req.body;
    try {
        await db.query('INSERT INTO Doctors (first_name, last_name, specialization, email, phone, schedule) VALUES (?, ?, ?, ?, ?, ?)', 
            [first_name, last_name, specialization, email, phone, schedule]);
        res.status(201).json({ message: 'Doctor added successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Error adding doctor.' });
    }
});

// Read all Doctors
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Doctors');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving doctors.' });
    }
});

// Update Doctor
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, specialization, email, phone, schedule } = req.body;
    
    try {
        await db.query('UPDATE Doctors SET first_name = ?, last_name = ?, specialization = ?, email = ?, phone = ?, schedule = ? WHERE id = ?',
            [first_name, last_name, specialization, email, phone, schedule, id]);
        res.json({ message: 'Doctor updated successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Error updating doctor.' });
    }
});

// Delete Doctor
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        await db.query('DELETE FROM Doctors WHERE id = ?', [id]);
        res.json({ message: 'Doctor deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting doctor.' });
    }
});

module.exports = router;
