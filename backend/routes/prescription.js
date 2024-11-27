// routes/prescriptions.js
const express = require("express"); 
const prescriptionRouter = express.Router();
const Prescription = require('../model/Prescription');
const auth = require('../middleware/auth');

prescriptionRouter.post('/', auth, async (req, res) => {
    try {
        if (req.user.role !== 'doctor') {
            return res.status(403).json({ message: 'Only doctors can create prescriptions' });
        }

        const prescription = new Prescription(req.body);
        await prescription.save();
        res.status(201).json(prescription);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
} );

module.exports = {prescriptionRouter}