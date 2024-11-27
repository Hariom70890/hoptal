
// controllers/patientController.js
// const Patient = require('../model/Patient');
// const User = require('../model/User');

const Appointment = require('../model/Appointment');
const Prescription = require('../model/Prescription');
const LabResult = require( '../model/LabResult' );


exports.createPatient = async (req, res) => {
    try {
        const { userId, dateOfBirth, bloodGroup, weight, height, allergies, emergencyContact } = req.body;

        // Verify if user exists and is a patient
        const user = await User.findById(userId);
        if (!user || user.role !== 'patient') {
            return res.status(400).json({ message: 'Invalid user' });
        }

        // Check if patient profile already exists
        const existingPatient = await Patient.findOne({ userId });
        if (existingPatient) {
            return res.status(400).json({ message: 'Patient profile already exists' });
        }

        const patient = new Patient({
            userId,
            dateOfBirth,
            bloodGroup,
            weight,
            height,
            allergies,
            emergencyContact
        });

        await patient.save();
        res.status(201).json(patient);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getPatient = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id)
            .populate('userId', 'name email contactNumber address');
        
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        res.json(patient);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updatePatient = async (req, res) => {
    try {
        const updates = req.body;
        const patient = await Patient.findByIdAndUpdate(
            req.params.id,
            updates,
            { new: true, runValidators: true }
        );

        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        res.json(patient);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getPatientMedicalHistory = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        const [appointments, prescriptions, labResults] = await Promise.all([
            Appointment.find({ patientId: patient._id })
                .populate('doctorId', 'userId')
                .sort({ date: -1 }),
            Prescription.find({ patientId: patient._id })
                .populate('doctorId', 'userId')
                .sort({ createdAt: -1 }),
            LabResult.find({ patientId: patient._id })
                .populate('testId')
                .sort({ createdAt: -1 })
        ]);

        res.json({
            appointments,
            prescriptions,
            labResults,
            medicalHistory: patient.medicalHistory
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addMedicalHistory = async (req, res) => {
    try {
        const { condition, diagnosis, date, doctorId, documents } = req.body;
        
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        patient.medicalHistory.push({
            condition,
            diagnosis,
            date,
            doctorId,
            documents
        });

        await patient.save();
        res.json(patient);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};