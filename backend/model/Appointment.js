// model/Appointment.js
const {default: mongoose} = require( "mongoose" );

const appointmentSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    date: { type: Date, required: true },
    timeSlot: { type: String, required: true },
    status: { type: String, enum: ['scheduled', 'confirmed', 'completed', 'cancelled'], default: 'scheduled' },
    type: { type: String, enum: ['regular', 'followup', 'emergency'], default: 'regular' },
    reason: { type: String },
    notes: { type: String },
    vitals: {
        bloodPressure: String,
        temperature: Number,
        pulseRate: Number,
        respiratoryRate: Number
    }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);