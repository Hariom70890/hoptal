// model/Prescription.js
const {default: mongoose} = require( "mongoose" );

const prescriptionSchema = new mongoose.Schema({
    appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment', required: true },
    medications: [{
        name: String,
        dosage: String,
        frequency: String,
        duration: String
    }],
    instructions: { type: String },
    diagnosis: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Prescription', prescriptionSchema);