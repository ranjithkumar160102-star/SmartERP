import express from "express";

import {
  createCustomer,
  getCustomers,
  updateCustomer,
  deleteCustomer,
} from "../controllers/customerController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protect all routes below
router.use(protect);

// Get All Customers
router.get("/", getCustomers);

// Create Customer
router.post("/", createCustomer);

// Update Customer
router.put("/:id", updateCustomer);

// Delete Customer
router.delete("/:id", deleteCustomer);

export default router;