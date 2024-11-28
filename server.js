const express = require('express');
const dotenv = require('dotenv');
const mysql = require('mysql2/promise');
const session = require('express-session');
const adminRouter = require('./routes/admin');
const appointmentsRouter = require('./routes/appointments');
const patientsRouter = require('./routes/patients');
const doctorsRouter = require('./routes/doctors');

dotenv.config();

const app = express();
app.use(express.json());
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
}));

// Database connection
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Define a root route
app.get('/', (req, res) => {
    res.send('Welcome to the Telemedicine Application API');
});

// Define Routes
app.use('/admin', adminRouter);
app.use('/patients', patientsRouter);
app.use('/doctors', doctorsRouter);
app.use('/appointments', appointmentsRouter);

// Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
