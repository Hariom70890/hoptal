
// controllers/appointmentController.js
const Appointment = require('../model/Appointment');
const Doctor = require('../model/Doctor');
const Notification = require('../model/Notification');

exports.createAppointment = async (req, res) => {
    try {
        const { doctorId, date, timeSlot, type, reason } = req.body;
        
        // Check doctor availability
        const doctor = await Doctor.findById(doctorId);
        const isSlotAvailable = doctor.availableSlots.some(
            slot => slot.startTime === timeSlot && slot.isAvailable
        );
        
        if (!isSlotAvailable) {
            return res.status(400).json({ message: 'Selected time slot is not available' });
        }

        const appointment = new Appointment({
            patientId: req.user.userId,
            doctorId,
            date,
            timeSlot,
            type,
            reason
        });

        await appointment.save();

        // Create notifications for both patient and doctor
        await Promise.all([
            new Notification({
                userId: req.user.userId,
                title: 'Appointment Scheduled',
                message: `Your appointment has been scheduled for ${date}`,
                type: 'appointment',
                relatedId: appointment._id
            }).save(),
            new Notification({
                userId: doctorId,
                title: 'New Appointment',
                message: `You have a new appointment scheduled for ${date}`,
                type: 'appointment',
                relatedId: appointment._id
            }).save()
        ]);

        res.status(201).json(appointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};