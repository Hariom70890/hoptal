// model/Bill.js
const {default: mongoose} = require( "mongoose" );

const billSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' },
    items: [{
        type: { type: String, enum: ['consultation', 'medicine', 'lab_test'] },
        description: String,
        quantity: Number,
        unitPrice: Number,
        amount: Number,
        reference: { type: mongoose.Schema.Types.ObjectId, refPath: 'items.referenceModel' },
        referenceModel: {
            type: String,
            enum: ['Appointment', 'Medicine', 'LabTest']
        }
    }],
    subtotal: { type: Number, required: true },
    tax: { type: Number },
    discount: { type: Number },
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'partial', 'paid'], default: 'pending' },
    paymentMethod: { type: String },
    paymentDetails: {
        transactionId: String,
        paidAmount: Number,
        paidDate: Date
    }
}, { timestamps: true });

module.exports = mongoose.model('Bill', billSchema);