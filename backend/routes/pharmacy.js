
const express = require('express');
const pharmacyRouter = express.Router();
const auth = require('../middleware/auth');
const pharmacyController = require('../controllers/pharmacyController');

pharmacyRouter.get('/inventory', auth, pharmacyController.getMedicineInventory);
pharmacyRouter.put('/medicine/:id', auth, pharmacyController.updateMedicineStock);

module.exports = pharmacyRouter;