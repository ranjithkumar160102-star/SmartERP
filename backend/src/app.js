import express from "express";
import cors from "cors";

import customerRoutes from "./routes/customerRoutes.js";
import supplierRoutes from "./routes/supplierRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";
import saleRoutes from "./routes/saleRoutes.js";
import purchaseRoutes from "./routes/purchaseRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import stockRoutes from "./routes/stockRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import ledgerRoutes from "./routes/ledgerRoutes.js";
import pdfRoutes from "./routes/pdfRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "SmartERP Backend Running Successfully",
  });
});

app.use("/api/customers", customerRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/sales", saleRoutes);
app.use("/api/purchases", purchaseRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/stock", stockRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/ledger", ledgerRoutes);
app.use("/api/pdf", pdfRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API Route Not Found",
  });
});

export default app;