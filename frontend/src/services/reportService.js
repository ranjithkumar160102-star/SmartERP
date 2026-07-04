import api from "./api";

// ==============================
// Dashboard Report
// ==============================
export const getReport = async () => {
  const response = await api.get("/reports");
  return response.data;
};