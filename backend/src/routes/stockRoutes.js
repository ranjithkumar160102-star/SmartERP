import express from "express";

import {
  getStockLedger,
  getStockById,
  getLowStockItems,
} from "../controllers/stockController.js";

const router = express.Router();

// ==============================
// Stock Routes
// ==============================

// Get Complete Stock Ledger
router.get("/", getStockLedger);

// Get Low Stock Items
router.get("/low-stock", getLowStockItems);

// Get Single Item Stock
router.get("/:id", getStockById);

export default router;