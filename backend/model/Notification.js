// model/Notification.js
const {default: mongoose} = require( "mongoose" );
const {patientSchema} = require( "./patient" );

const notificationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: { type: String, enum: ['appointment', 'prescription', 'lab_result', 'payment', 'general'] },
    status: { type: String, enum: ['unread', 'read'], default: 'unread' },
    relatedId: { type: mongoose.Schema.Types.ObjectId },
    relatedModel: { type: String }
}, {timestamps: true} );


module.exports = mongoose.model('Notification', notificationSchema);