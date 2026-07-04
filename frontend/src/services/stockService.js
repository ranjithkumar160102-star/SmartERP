import api from "./api";

// ==============================
// Get Complete Stock Ledger
// ==============================
export const getStockLedger = async () => {
  const response = await api.get("/stock");
  return response.data;
};

// ==============================
// Get Low Stock Items
// ==============================
export const getLowStockItems = async () => {
  const response = await api.get("/stock/low-stock");
  return response.data;
};

// ==============================
// Get Single Item Stock
// ==============================
export const getStockById = async (id) => {
  const response = await api.get(`/stock/${id}`);
  return response.data;
};