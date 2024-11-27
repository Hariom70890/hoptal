// controllers/reportController.js
exports.generateDepartmentReport = async (req, res) => {
    try {
        const { departmentId, startDate, endDate } = req.query;
        
        const appointments = await Appointment.find({
            departmentId,
            date: { $gte: startDate, $lte: endDate }
        }).populate('doctorId patientId');

        const revenue = await Bill.aggregate([
            {
                $match: {
                    createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
                    status: 'paid',
                    'items.referenceModel': 'Appointment'
                }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: '$totalAmount' }
                }
            }
        ]);

        const report = {
            totalAppointments: appointments.length,
            completedAppointments: appointments.filter(a => a.status === 'completed').length,
            cancelledAppointments: appointments.filter(a => a.status === 'cancelled').length,
            revenue: revenue[0]?.total || 0
        };

        res.json(report);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};