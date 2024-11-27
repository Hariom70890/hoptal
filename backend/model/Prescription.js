// model/Prescription.js
const {default: mongoose} = require( "mongoose" );

const prescriptionSchema = new mongoose.Schema({
    appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment', required: true },
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    diagnosis: { type: String },
    medications: [{
        medicine: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine' },
        dosage: String,
        frequency: String,
        duration: String,
        instructions: String
    }],
    labTests: [{
        test: { type: mongoose.Schema.Types.ObjectId, ref: 'LabTest' },
        instructions: String
    }],
    notes: { type: String },
    followUpDate: { type: Date },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Prescription', prescriptionSchema);