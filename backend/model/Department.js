const mongoose = require( "mongoose" );

// model/Department.js
const departmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    head: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
    staff: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, {timestamps: true} );


module.exports = mongoose.model('Department', departmentSchema);

