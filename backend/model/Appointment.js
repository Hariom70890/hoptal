const {default: mongoose} = require( "mongoose" );

// model/Appointment.js
const appointmentSchema = new mongoose.Schema({
    patientId: {type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true},
    doctorId:{type:String},
    // doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    date: { type: Date, required: true },
    timeSlot: { type: String, required: true },
    status: { type: String, enum: ['scheduled', 'completed', 'cancelled'], default: 'scheduled' },
    reason: { type: String },
    notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);