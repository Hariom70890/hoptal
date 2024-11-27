// routes/patients.js
const express = require('express');
const patientRouter = express.Router();
const patientController = require('../controllers/patientController');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');
const upload = require('../middleware/upload');

patientRouter.post('/', auth, checkRole(['admin']), patientController.createPatient);
patientRouter.get('/:id', auth, patientController.getPatient);
patientRouter.put('/:id', auth, checkRole(['admin', 'patient']), patientController.updatePatient);
patientRouter.get('/:id/medical-history', auth, checkRole(['admin', 'doctor', 'patient']), patientController.getPatientMedicalHistory);
patientRouter.post('/:id/medical-history', auth, checkRole(['doctor']), upload.array('documents'), patientController.addMedicalHistory);

module.exports = patientRouter;