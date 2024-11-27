// model/Patient.js
const {default: mongoose} = require( "mongoose" );

const patientSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    dateOfBirth: { type: Date },
    bloodGroup: { type: String },
    medicalHistory: [{ 
        condition: String,
        diagnosis: String,
        date: Date
    }]
}, { timestamps: true });
exports.patientSchema = patientSchema;

module.exports = mongoose.model('Patient', patientSchema);
