import express from "express";
import { getDashboardStats } from "../controllers/dashboardController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protect all dashboard routes
router.use(protect);

// ==============================
// Dashboard Routes
// ==============================

// Get Dashboard Statistics
router.get("/", getDashboardStats);

export default router;