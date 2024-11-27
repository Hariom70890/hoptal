// routes/appointments.js 
const express = require("express"); 
const appointmentRouter = express.Router();
const Appointment = require('../model/Appointment');
const auth = require('../middleware/auth');

appointmentRouter.post('/', auth, async (req, res) => {
    try {
        const appointment = new Appointment({
            ...req.body,
            patientId: req.user.role === 'patient' ? req.user.userId : req.body.patientId
        });
        await appointment.save();
        res.status(201).json(appointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

appointmentRouter.get('/', auth, async (req, res) => {
    try {
        let appointments;
        if (req.user.role === 'patient') {
            appointments = await Appointment.find({ patientId: req.user.userId });
        } else if (req.user.role === 'doctor') {
            appointments = await Appointment.find({ doctorId: req.user.userId });
        } else {
            appointments = await Appointment.find();
        }
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = {appointmentRouter}