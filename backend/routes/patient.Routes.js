// // patientRoutes.js
const express = require("express");
const Patient = require("../model/patient.Model");
const { auth } = require("../middleware/auth.middleware");

const patientRouter = express.Router();

const roleBaseAuth = (allRole) => (req, res, next) => {
   // console.log(req.user)
   const isRole = allRole.some((role) => req.user.roles.includes(role));
   //  console.log(isRole)
   if (isRole) {
      next();
   } else {
      return res
         .status(403)
         .json({ msg: "You are unauthorized to this operation" });
   }
};

// GET all books
patientRouter.get(
   "/",
    auth,
    // roleBaseAuth(["ADMIN", "USER"]),
   async (req, res) => {
      try {
         const patient = await Patient.find();
         res.status(200).json({ patient });
      } catch (error) {
         res.status(500).json({ error: error.message });
      }
   }
);

// POST a new book
patientRouter.post("/",  (req, res) => {
   console.log(req.body);

   const { name, age } = req.body;
   try {
      const patient = new Patient({ name, age });
      // console.log(patient);
      patient.save();
      res.status(201).json({ msg: "New Patient added" });
   } catch (error) {
      res.status(500).json({
         message: "Error creating patient",
         error: error.message,
      });
   }
});

// Patch a new book
patientRouter.put("/:id",auth, async (req, res) => {
   try {
      const { id } = req.params;
      const patient = await Patient.findOneAndUpdate(
         { _id: id },
         { ...req.body }
      );
      console.log(req.params);

      res.status(201).json({ msg: "Patient updated successfully", patient });
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
});

// router.put('/:id', async (req, res) => {
//   const { name, age } = req.body;
//   const { id } = req.params;

//   try {
//     const updatedPatient = await Patient.findByIdAndUpdate(id, { name, age }, { new: true });
//     if (!updatedPatient) {
//       return res.status(404).json({ message: 'Patient not found' });
//     }
//     res.status(200).json({ msg: 'Patient updated successfully', patient: updatedPatient });
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating patient', error: error.message });
//   }
// });

// DELETE a book (accessible only to "CREATOR" role)
patientRouter.delete("/:id",auth, async (req, res) => {
   const { id } = req.params;

   try {
      const deletedPatient = await Patient.findByIdAndDelete(id);
      if (!deletedPatient) {
         return res.status(404).json({ message: "Patient not found" });
      }
      res.status(200).json({
         msg: "Patient deleted successfully",
         patient: deletedPatient,
      });
   } catch (error) {
      res.status(500).json({
         message: "Error deleting patient",
         error: error.message,
      });
   }
});

module.exports = patientRouter;

// router.delete('/:id', async (req, res) => {
// const { id } = req.params;

// try {
//   const deletedPatient = await Patient.findByIdAndDelete(id);
//   if (!deletedPatient) {
//     return res.status(404).json({ message: 'Patient not found' });
//   }
//   res.status(200).json({ msg: 'Patient deleted successfully', patient: deletedPatient });
// } catch (error) {
//   res.status(500).json({ message: 'Error deleting patient', error: error.message });
// }
// });

// module.exports = router;
