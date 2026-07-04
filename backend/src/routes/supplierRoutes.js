import express from "express";

import {
  createSupplier,
  getSuppliers,
  updateSupplier,
  deleteSupplier,
} from "../controllers/supplierController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protect all routes
router.use(protect);

// ==============================
// Get All Suppliers
// ==============================
router.get("/", getSuppliers);

// ==============================
// Create Supplier
// ==============================
router.post("/", createSupplier);

// ==============================
// Update Supplier
// ==============================
router.put("/:id", updateSupplier);

// ==============================
// Delete Supplier
// ==============================
router.delete("/:id", deleteSupplier);

export default router;