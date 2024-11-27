const LabTest = require('../model/LabTest');
const LabResult = require('../model/LabResult');
const Notification = require('../model/Notification'); // Ensure Notification model is imported
const AppError = require('../utils/AppError'); // Import your custom AppError class

exports.createTest = async (req, res, next) => {
    try {
        const test = new LabTest(req.body);
        await test.save();
        res.status(201).json({
            status: 'success',
            data: {
                test
            }
        });
    } catch (error) {
        next(new AppError(error.message, 500));
    }
};

exports.addTestResult = async (req, res, next) => {
    try {
        const result = new LabResult({
            ...req.body,
            conductedBy: req.user.userId // Assuming req.user is populated by the auth middleware
        });
        await result.save();

        // Create notifications for doctor and patient
        const notifications = [
            {
                userId: result.doctorId,
                title: 'Lab Results Available',
                message: 'New lab results are available for your patient',
                type: 'lab_result',
                relatedId: result._id
            },
            {
                userId: result.patientId,
                title: 'Lab Results Available',
                message: 'Your lab results are ready',
                type: 'lab_result',
                relatedId: result._id
            }
        ];
        await Notification.insertMany(notifications);

        res.status(201).json({
            status: 'success',
            data: {
                result
            }
        });
    } catch (error) {
        next(new AppError(error.message, 500));
    }
};

exports.getTestResult = async (req, res, next) => {
    try {
        const result = await LabResult.findById(req.params.id)
            .populate('conductedBy', 'name')
            .populate('doctorId', 'name')
            .populate('patientId', 'name');

        if (!result) {
            return next(new AppError('Lab result not found', 404));
        }

        res.status(200).json({
            status: 'success',
            data: {
                result
            }
        });
    } catch (error) {
        next(new AppError(error.message, 500));
    }
};

exports.getPatientResults = async (req, res, next) => {
    try {
        const results = await LabResult.find({ patientId: req.params.patientId })
            .populate('conductedBy', 'name')
            .populate('doctorId', 'name');

        res.status(200).json({
            status: 'success',
            results: results.length,
            data: {
                results
            }
        });
    } catch (error) {
        next(new AppError(error.message, 500));
    }
};
