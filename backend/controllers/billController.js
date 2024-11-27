const Bill = require("../model/Bill");
const Notification = require("../model/Notification"); // Ensure Notification model is imported
const AppError = require("../utils/AppError"); // Import your custom AppError class

// Create a new bill
exports.createBill = async (req, res, next) => {
    try {
        const { items, patientId } = req.body;

        if (!items || items.length === 0) {
            return next(new AppError("Items are required to create a bill", 400));
        }

        if (!patientId) {
            return next(new AppError("Patient ID is required", 400));
        }

        // Calculate totals
        const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
        const tax = subtotal * 0.1; // 10% tax
        const totalAmount = subtotal + tax;

        const bill = new Bill({
            patientId,
            items,
            subtotal,
            tax,
            totalAmount,
            status: "pending",
        });

        await bill.save();

        // Create notification for patient
        await new Notification({
            userId: patientId,
            title: "New Bill Generated",
            message: `A new bill of ${totalAmount} has been generated.`,
            type: "payment",
            relatedId: bill._id,
        }).save();

        res.status(201).json({
            status: "success",
            data: {
                bill,
            },
        });
    } catch (error) {
        next(new AppError(error.message, 500));
    }
};

// Update bill status
exports.updateBillStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!["paid", "pending", "cancelled"].includes(status)) {
            return next(new AppError("Invalid status provided", 400));
        }

        const bill = await Bill.findByIdAndUpdate(
            id,
            { status },
            { new: true, runValidators: true }
        );

        if (!bill) {
            return next(new AppError("Bill not found", 404));
        }

        // Create a notification for patient about status update
        await new Notification({
            userId: bill.patientId,
            title: "Bill Status Updated",
            message: `Your bill status has been updated to '${status}'.`,
            type: "payment",
            relatedId: bill._id,
        }).save();

        res.status(200).json({
            status: "success",
            data: {
                bill,
            },
        });
    } catch (error) {
        next(new AppError(error.message, 500));
    }
};
