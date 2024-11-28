const express = require('express');
const router = express.Router();
const db = require('../db'); // assuming you export your db connection

// Create Appointment
router.post('/', async (req, res) => {
    const { patient_id, doctor_id, appointment_date, appointment_time } = req.body;
    try {
        await db.query('INSERT INTO Appointments (patient_id, doctor_id, appointment_date, appointment_time, status) VALUES (?, ?, ?, ?, ?)', 
            [patient_id, doctor_id, appointment_date, appointment_time, 'scheduled']);
        res.status(201).json({ message: 'Appointment booked successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Error booking appointment.' });
    }
});

// Read all Appointments
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Appointments');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving appointments.' });
    }
});

// Update Appointment
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { appointment_date, appointment_time, status } = req.body;
    
    try {
        await db.query('UPDATE Appointments SET appointment_date = ?, appointment_time = ?, status = ? WHERE id = ?',
            [appointment_date, appointment_time, status, id]);
        res.json({ message: 'Appointment updated successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Error updating appointment.' });
    }
});

// Delete Appointment
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        await db.query('DELETE FROM Appointments WHERE id = ?', [id]);
        res.json({ message: 'Appointment canceled successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Error canceling appointment.' });
    }
});

module.exports = router;
