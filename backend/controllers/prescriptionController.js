// controllers/prescriptionController.js
const Prescription = require('../model/Prescription');
const Medicine = require('../model/Medicine');

exports.createPrescription = async (req, res) => {
    try {
        const { appointmentId, diagnosis, medications, labTests, notes, followUpDate } = req.body;

        // Verify medicine stock
        for (const med of medications) {
            const medicine = await Medicine.findById(med.medicine);
            if (!medicine || medicine.stock < 1) {
                return res.status(400).json({ 
                    message: `Medicine ${medicine ? medicine.name : 'Unknown'} is out of stock` 
                });
            }
        }

        const prescription = new Prescription({
            appointmentId,
            patientId: req.body.patientId,
            doctorId: req.user.userId,
            diagnosis,
            medications,
            labTests,
            notes,
            followUpDate
        });

        await prescription.save();

        // Create notification for patient
        await new Notification({
            userId: req.body.patientId,
            title: 'New Prescription',
            message: 'You have a new prescription from your doctor',
            type: 'prescription',
            relatedId: prescription._id
        }).save();

        res.status(201).json(prescription);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
