// app.js
const express = require('express');
const cors = require('cors');
require( 'dotenv' ).config();
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const {appointmentRouter} = require( './routes/appointment' );
const {authRouter} = require( './routes/Auth' );
const {prescriptionRouter} = require( './routes/prescription' );
const departmentRouter = require( './routes/department' );
const doctorRouter = require( './routes/doctor' );
const labRouter = require( './routes/lab' );
const pharmacyRouter = require( './routes/pharmacy' );
const billRouter = require( './routes/bill' );
const {sendNotification} = require( './utils/notification' );
const patientRouter = require( './routes/patient' );

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use( express.json() );
app.use( morgan( 'combined' ) );

// Rate limiting
app.use('/api/', rateLimit({
    windowMs: 15 * 60 * 1000,
        max: 100,
    message: 'Too many requests from this IP, please try again later.'
} ) );

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Routes 
app.use('/api/auth', authRouter)
app.use('/api/appointments',appointmentRouter);
app.use('/api/prescriptions',prescriptionRouter);
app.use('/api/departments', departmentRouter);
app.use('/api/doctors', doctorRouter);
app.use('/api/patients', patientRouter);
app.use('/api/lab',labRouter);
app.use('/api/pharmacy',pharmacyRouter);
app.use('/api/bills', billRouter);
app.use('/api/notifications', sendNotification);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 