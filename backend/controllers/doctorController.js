const Doctor = require('../model/Doctor');
const mongoose = require('mongoose');
const AppError = require('../utils/AppError');

// Create a new doctor
const createDoctor = async (req, res, next) => {
    try {
        const newDoctor = await Doctor.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                doctor: newDoctor
            }
        });
    } catch (error) {
        next(new AppError(error.message, 400));
    }
};

// Get all doctors with optional filtering
const getAllDoctors = async (req, res, next) => {
    try {
        const query = { ...req.query };
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(field => delete query[field]);

        let doctors = Doctor.find(query)
            .populate('userId', 'name email')
            .populate('departmentId', 'name');

        // Sorting
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            doctors = doctors.sort(sortBy);
        }

        // Pagination
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        doctors = doctors.skip(skip).limit(limit);

        const result = await doctors;

        res.status(200).json({
            status: 'success',
            results: result.length,
            data: {
                doctors: result
            }
        });
    } catch (error) {
        next(new AppError(error.message, 400));
    }
};

// Get a specific doctor by ID
const getDoctor = async (req, res, next) => {
    try {
        const doctor = await Doctor.findById(req.params.id)
            .populate('userId', 'name email')
            .populate('departmentId', 'name');

        if (!doctor) {
            return next(new AppError('Doctor not found', 404));
        }

        res.status(200).json({
            status: 'success',
            data: {
                doctor
            }
        });
    } catch (error) {
        next(new AppError(error.message, 400));
    }
};

// Update doctor information
const updateDoctor = async (req, res, next) => {
    try {
        const doctor = await Doctor.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!doctor) {
            return next(new AppError('Doctor not found', 404));
        }

        res.status(200).json({
            status: 'success',
            data: {
                doctor
            }
        });
    } catch (error) {
        next(new AppError(error.message, 400));
    }
};

// Update doctor's schedule
const updateSchedule = async (req, res, next) => {
    try {
        const { availableSlots } = req.body;

        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) {
            return next(new AppError('Doctor not found', 404));
        }

        // Validate slots format
        if (!Array.isArray(availableSlots)) {
            return next(new AppError('Available slots must be an array', 400));
        }

        // Validate each slot
        for (const slot of availableSlots) {
            if (!slot.day || !slot.startTime || !slot.endTime) {
                return next(new AppError('Invalid slot format', 400));
            }
        }

        doctor.availableSlots = availableSlots;
        await doctor.save();

        res.status(200).json({
            status: 'success',
            data: {
                doctor
            }
        });
    } catch (error) {
        next(new AppError(error.message, 400));
    }
};

// Get doctor's appointments
const getDoctorAppointments = async (req, res, next) => {
    try {
        const appointments = await mongoose.model('Appointment').find({
            doctorId: req.params.id
        }).populate('patientId', 'name');

        res.status(200).json({
            status: 'success',
            results: appointments.length,
            data: {
                appointments
            }
        });
    } catch (error) {
        next(new AppError(error.message, 400));
    }
};

module.exports = {
    createDoctor,
    getAllDoctors,
    getDoctor,
    updateDoctor,
    updateSchedule,
    getDoctorAppointments
};
