// app.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const {appointmentRouter} = require( './routes/appointment' );
const {authRouter} = require( './routes/Auth' );
const {prescriptionRouter} = require( './routes/prescription' );

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to Database
connectDB();

// Routes
// app.use('/api/auth', require('./routes/auth.js'));
app.use('/api/auth', authRouter) 
app.use('/api/appointments', appointmentRouter);
app.use('/api/prescriptions', prescriptionRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});