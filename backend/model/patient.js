// model/Patient.js
const {default: mongoose} = require( "mongoose" );

const patientSchema = new mongoose.Schema( {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    dateOfBirth: { type: Date },
    bloodGroup: { type: String },
    weight: { type: Number },
    height: { type: Number },
    allergies: [String],
    emergencyContact: {
        name: String,
        relation: String,
        phone: String
    },
    medicalHistory: [{ 
        condition: String,
        diagnosis: String,
        date: Date,
        doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
        documents: [String]
    }]
}, { timestamps: true });


module.exports = mongoose.model('Patient', patientSchema);
