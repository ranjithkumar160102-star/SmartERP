import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../services/authService";

function ProtectedRoute({ children }) {
  // User logged in?
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  // Allow access
  return children;
}

export default ProtectedRoute;