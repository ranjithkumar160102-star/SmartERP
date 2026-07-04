import { Routes, Route } from "react-router-dom";

// Authentication
import Login from "../pages/auth/Login";

// Protected Route
import ProtectedRoute from "../components/ProtectedRoute";

// Pages
import Dashboard from "../pages/dashboard/Dashboard";
import CustomerLedger from "../pages/ledger/CustomerLedger";
import SupplierLedger from "../pages/ledger/SupplierLedger";
import ItemLedger from "../pages/ledger/ItemLedger";

import Sales from "../pages/vouchers/Sales";
import Purchase from "../pages/vouchers/Purchase";

import Reports from "../pages/reports/Reports";
import StockLedger from "../pages/reports/StockLedger";
import CustomerStatement from "../pages/ledger/CustomerStatement";
import SupplierStatement from "../pages/ledger/SupplierStatement";


function AppRoutes() {
  return (
    <Routes>

      {/* Login */}
      <Route path="/login" element={<Login />} />

      {/* Dashboard */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Customers */}
      <Route
        path="/customers"
        element={
          <ProtectedRoute>
            <CustomerLedger />
          </ProtectedRoute>
        }
      />

      {/* Suppliers */}
      <Route
        path="/suppliers"
        element={
          <ProtectedRoute>
            <SupplierLedger />
          </ProtectedRoute>
        }
      />

      {/* Items */}
      <Route
        path="/items"
        element={
          <ProtectedRoute>
            <ItemLedger />
          </ProtectedRoute>
        }
      />

      {/* Sales */}
      <Route
        path="/sales"
        element={
          <ProtectedRoute>
            <Sales />
          </ProtectedRoute>
        }
      />

      {/* Purchase */}
      <Route
        path="/purchase"
        element={
          <ProtectedRoute>
            <Purchase />
          </ProtectedRoute>
        }
      />

      {/* Reports */}
      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <Reports />
          </ProtectedRoute>
        }
      />

      {/* Stock */}
      <Route
        path="/stock"
        element={
          <ProtectedRoute>
            <StockLedger />
          </ProtectedRoute>
        }
      />

     <Route
  path="/customer-statement"
  element={
    <ProtectedRoute>
      <CustomerStatement />
    </ProtectedRoute>
  }
/>

 <Route
  path="/supplier-statement"
  element={
    <ProtectedRoute>
      <SupplierStatement />
    </ProtectedRoute>
  }
/>

    </Routes>
  );
}

export default AppRoutes;