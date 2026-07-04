import express from "express";

import {
  createSale,
  getSales,
  getSaleById,
  updateSale,
  deleteSale,
} from "../controllers/saleController.js";

import { downloadSaleInvoice } from "../controllers/pdfController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create Sale
router.post("/", protect, createSale);

// Get All Sales
router.get("/", protect, getSales);

// Get Single Sale
router.get("/:id", protect, getSaleById);

// Download Invoice PDF
router.get("/:id/pdf", protect, downloadSaleInvoice);

// Update Sale
router.put("/:id", protect, updateSale);

// Delete Sale
router.delete("/:id", protect, deleteSale);

export default router;