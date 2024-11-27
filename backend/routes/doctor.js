 const express = require('express');
const doctorRouter = express.Router();
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');
const {createDoctor, getAllDoctors, getDoctor, updateDoctor, updateSchedule, getDoctorAppointments} = require( '../controllers/doctorController' );

doctorRouter.post( '/', auth, checkRole( ['admin'] ), createDoctor );
doctorRouter.get('/', auth, getAllDoctors);
doctorRouter.get('/:id', auth, getDoctor);
doctorRouter.put('/:id', auth, checkRole(['admin', 'doctor']), updateDoctor);
doctorRouter.put('/:id/schedule', auth, checkRole(['doctor']), updateSchedule);
doctorRouter.get('/:id/appointments', auth, checkRole(['doctor']), getDoctorAppointments);

module.exports = doctorRouter;