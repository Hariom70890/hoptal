const mongoose = require('mongoose');

const pharmacySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    medicines: [{
        name: String,
        quantity: Number,
        price: Number,
        description: String
    }]
}, { timestamps: true });

module.exports = mongoose.model('Pharmacy', pharmacySchema);
