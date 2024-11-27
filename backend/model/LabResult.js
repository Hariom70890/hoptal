const {default: mongoose} = require( "mongoose" );
const {patientSchema} = require( "./patient" );

// model/LabResult.js
const labResultSchema = new mongoose.Schema({
    testId: { type: mongoose.Schema.Types.ObjectId, ref: 'LabTest', required: true },
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' },
    result: { type: String, required: true },
    remarks: { type: String },
    conductedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    reportFile: { type: String },
    status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' }
}, {timestamps: true} );



module.exports = mongoose.model('LabResult', labResultSchema);

