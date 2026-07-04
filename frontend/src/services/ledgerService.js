import api from "./api";

// ==============================
// Customer Ledger
// ==============================
export const getCustomerLedger = async (customerId) => {
  const response = await api.get(
    `/ledger/customer/${customerId}`
  );

  return response.data;
};

// ==============================
// Supplier Ledger
// ==============================
export const getSupplierLedger = async (supplierId) => {
  const response = await api.get(
    `/ledger/supplier/${supplierId}`
  );

  return response.data;
};