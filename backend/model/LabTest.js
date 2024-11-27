// model/LabTest.js
const {default: mongoose} = require( "mongoose" );

const labTestSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    cost: { type: Number, required: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    normalRange: { type: String },
    method: { type: String }
}, {timestamps: true} );

module.exports = mongoose.model('LabTest', labTestSchema);
