const express = require("express");
const billRouter = express.Router();
const auth = require("../middleware/auth"); // Middleware for authentication
const billController = require("../controllers/billController");

// Create a new bill
billRouter.post("/", auth, billController.createBill);

// Update bill status (e.g., paid, pending, cancelled)
billRouter.put("/:id/status", auth, billController.updateBillStatus);

module.exports = billRouter;
