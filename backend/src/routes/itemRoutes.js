import express from "express";

import {
  createItem,
  getItems,
  updateItem,
  deleteItem,
} from "../controllers/itemController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protect all routes
router.use(protect);

// ==============================
// Get All Items
// ==============================
router.get("/", getItems);

// ==============================
// Create Item
// ==============================
router.post("/", createItem);

// ==============================
// Update Item
// ==============================
router.put("/:id", updateItem);

// ==============================
// Delete Item
// ==============================
router.delete("/:id", deleteItem);

export default router;