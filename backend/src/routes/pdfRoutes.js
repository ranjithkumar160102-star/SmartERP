import express from "express";
import { downloadSaleInvoice } from "../controllers/pdfController.js";

const router = express.Router();

// Download Sale Invoice PDF
router.get("/sale/:id", downloadSaleInvoice);

export default router;