import express from "express";

import {
  createPurchase,
  getPurchases,
  getPurchaseById,
  updatePurchase,
  deletePurchase,
} from "../controllers/purchaseController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protect all routes
router.use(protect);

// ==============================
// Purchase Routes
// ==============================

// Get All Purchases
router.get("/", getPurchases);

// Get Single Purchase
router.get("/:id", getPurchaseById);

// Create Purchase
router.post("/", createPurchase);

// Update Purchase
router.put("/:id", updatePurchase);

// Delete Purchase
router.delete("/:id", deletePurchase);

export default router;