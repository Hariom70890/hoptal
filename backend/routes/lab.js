const express = require('express');
const labRouter = express.Router();
const auth = require('../middleware/auth'); // Auth middleware for user authentication
const checkRole = require('../middleware/checkRole'); // Middleware to validate roles
const labController = require('../controllers/labController');

// Routes for lab-related operations
labRouter.post(
    '/tests',
    auth,
    checkRole(['admin', 'lab_technician']),
    labController.createTest
);

labRouter.post(
    '/results',
    auth,
    checkRole(['lab_technician']),
    labController.addTestResult
);

labRouter.get('/results/:id', auth, labController.getTestResult);

labRouter.get(
    '/patient/:patientId/results',
    auth,
    labController.getPatientResults
);

module.exports = labRouter;
