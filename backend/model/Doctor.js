// model/Doctor.js
import * as mongoose from "mongoose";
import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    specialization: { type: String, required: true },
    qualification: { type: String, required: true },
    experience: { type: Number },
    availableSlots: [{
        day: String,
        startTime: String,
        endTime: String
    }]
}, {timestamps: true} );


module.exports = mongoose.model('Doctor', doctorSchema);

