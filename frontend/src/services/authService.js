import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

// ==============================
// Register User
// ==============================
export const registerUser = async (userData) => {
  const response = await axios.post(
    `${API_URL}/register`,
    userData
  );

  return response.data;
};

// ==============================
// Login User
// ==============================
export const loginUser = async (loginData) => {
  const response = await axios.post(
    `${API_URL}/login`,
    loginData
  );

  // Save Token
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);

    localStorage.setItem(
      "user",
      JSON.stringify(response.data.data)
    );
  }

  return response.data;
};

// ==============================
// Logout
// ==============================
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// ==============================
// Get Token
// ==============================
export const getToken = () => {
  return localStorage.getItem("token");
};

// ==============================
// Get Logged-in User
// ==============================
export const getCurrentUser = () => {
  const user = localStorage.getItem("user");

  return user ? JSON.parse(user) : null;
};

// ==============================
// Check Login Status
// ==============================
export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};