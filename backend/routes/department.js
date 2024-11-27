// routes/departments.js
const express = require('express');
const departmentRouter = express.Router();
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');
const departmentController = require( '../controllers/departmentController' );

departmentRouter.post('/', auth, checkRole(['admin']), departmentController.createDepartment);
departmentRouter.get('/', auth, departmentController.getAllDepartments);
departmentRouter.get('/:id', auth, departmentController.getDepartment);
departmentRouter.put('/:id', auth, checkRole(['admin']), departmentController.updateDepartment);
departmentRouter.delete('/:id', auth, checkRole(['admin']), departmentController.deleteDepartment);
departmentRouter.post('/:id/staff', auth, checkRole(['admin']), departmentController.addStaffToDepartment);

module.exports = departmentRouter;