import express from "express";
import {
  getCustomerLedger,
  getSupplierLedger,
} from "../controllers/ledgerController.js";

const router = express.Router();

router.get("/customer/:customerId", getCustomerLedger);

router.get("/supplier/:supplierId", getSupplierLedger);

export default router;