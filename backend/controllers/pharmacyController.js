 const Pharmacy = require( "../model/Pharmacy" );

exports.getMedicineInventory = async (req, res) => {
    try {
        const inventory = await Pharmacy.findOne({ userId: req.user.userId });
        res.json(inventory.medicines);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateMedicineStock = async (req, res) => {
    try {
        const pharmacy = await Pharmacy.findOne({ userId: req.user.userId });
        const { medicineId, quantity } = req.body;
        
        const medicineIndex = pharmacy.medicines.findIndex(m => m._id.toString() === medicineId);
        if (medicineIndex > -1) {
            pharmacy.medicines[medicineIndex].quantity = quantity;
            await pharmacy.save();
            res.json(pharmacy.medicines[medicineIndex]);
        } else {
            res.status(404).json({ message: 'Medicine not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
