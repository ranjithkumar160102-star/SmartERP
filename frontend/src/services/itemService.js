import api from "./api";

// ==============================
// Get All Items
// ==============================
export const getItems = async () => {
  const response = await api.get("/items");
  return response.data;
};

// ==============================
// Create Item
// ==============================
export const createItem = async (itemData) => {
  const response = await api.post(
    "/items",
    itemData
  );

  return response.data;
};

// ==============================
// Update Item
// ==============================
export const updateItem = async (
  id,
  itemData
) => {
  const response = await api.put(
    `/items/${id}`,
    itemData
  );

  return response.data;
};

// ==============================
// Delete Item
// ==============================
export const deleteItem = async (id) => {
  const response = await api.delete(
    `/items/${id}`
  );

  return response.data;
};