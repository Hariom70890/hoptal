const {default: mongoose} = require( "mongoose" );

// model/Doctor.js
const doctorSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    specialization: { type: String, required: true },
    qualification: { type: String, required: true },
    experience: { type: Number },
    fees: { type: Number },
    availableSlots: [{
        day: String,
        startTime: String,
        endTime: String,
        isAvailable: { type: Boolean, default: true }
    }],
    ratings: [{
        patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
        rating: Number,
        review: String,
        date: { type: Date, default: Date.now }
    }]
}, {timestamps: true} );

module.exports = mongoose.model('Doctor', doctorSchema);
