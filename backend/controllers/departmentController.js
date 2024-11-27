// controllers/departmentController.js
const Department = require('../model/Department');
const Doctor = require('../model/Doctor');
const user = require( '../model/user' );

exports.createDepartment = async (req, res) => {
    try {
        const { name, description, head } = req.body;

        // Check if department already exists
        const existingDepartment = await Department.findOne({ name });
        if (existingDepartment) {
            return res.status(400).json({ message: 'Department already exists' });
        }

        // Verify if head doctor exists
        if (head) {
            const doctor = await Doctor.findById(head).populate('userId');
            if (!doctor || doctor.userId.role !== 'doctor') {
                return res.status(400).json({ message: 'Invalid department head' });
            }
        }

        const department = new Department({
            name,
            description,
            head
        });

        await department.save();
        res.status(201).json(department);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllDepartments = async (req, res) => {
    try {
        const departments = await Department.find()
            .populate('head', 'userId')
            .populate('staff', 'name email');
        res.json(departments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getDepartment = async (req, res) => {
    try {
        const department = await Department.findById(req.params.id)
            .populate('head', 'userId')
            .populate('staff', 'name email');
        
        if (!department) {
            return res.status(404).json({ message: 'Department not found' });
        }
        
        res.json(department);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateDepartment = async (req, res) => {
    try {
        const { name, description, head } = req.body;

        // Verify if head doctor exists if provided
        if (head) {
            const doctor = await Doctor.findById(head).populate('userId');
            if (!doctor || doctor.userId.role !== 'doctor') {
                return res.status(400).json({ message: 'Invalid department head' });
            }
        }

        const department = await Department.findByIdAndUpdate(
            req.params.id,
            { name, description, head },
            { new: true, runValidators: true }
        );

        if (!department) {
            return res.status(404).json({ message: 'Department not found' });
        }

        res.json(department);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteDepartment = async (req, res) => {
    try {
        const department = await Department.findById(req.params.id);
        
        if (!department) {
            return res.status(404).json({ message: 'Department not found' });
        }

        // Check if department has associated doctors
        const associatedDoctors = await Doctor.find({ departmentId: department._id });
        if (associatedDoctors.length > 0) {
            return res.status(400).json({ 
                message: 'Cannot delete department with associated doctors' 
            });
        }

        await department.remove();
        res.json({ message: 'Department deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addStaffToDepartment = async (req, res) => {
    try {
        const { staffId } = req.body;
        const department = await Department.findById(req.params.id);
        
        if (!department) {
            return res.status(404).json({ message: 'Department not found' });
        }

        const staff = await user.findById(staffId);
        if (!staff) {
            return res.status(404).json({ message: 'Staff member not found' });
        }

        if (department.staff.includes(staffId)) {
            return res.status(400).json({ message: 'Staff already in department' });
        }

        department.staff.push(staffId);
        await department.save();
        
        res.json(department);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
