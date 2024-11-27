// model/Medicine.js
const {default: mongoose} = require( "mongoose" );

const medicineSchema = new mongoose.Schema({
    name: { type: String, required: true },
    genericName: { type: String },
    category: { type: String },
    manufacturer: { type: String },
    description: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    reorderLevel: { type: Number },
    expiryDate: { type: Date },
    batchNumber: { type: String }
}, {timestamps: true} );

module.exports = mongoose.model('Medicine', medicineSchema);

