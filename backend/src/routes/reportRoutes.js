import express from "express";
import { getDashboardReport } from "../controllers/reportController.js";

const router = express.Router();

router.get("/", getDashboardReport);

export default router;