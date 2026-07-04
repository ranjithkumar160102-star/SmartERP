import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { getDashboardStats } from "../../services/dashboardService";

import StatCard from "../../components/StatCard";
import RevenueChart from "../../components/charts/RevenueChart";
import SalesChart from "../../components/charts/SalesChart";
import RecentSales from "./RecentSales";
import RecentPurchase from "./RecentPurchase";

import {
  Users,
  Building2,
  Package,
  Receipt,
  ShoppingCart,
  IndianRupee,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";

function Dashboard() {
  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalSuppliers: 0,
    totalItems: 0,
    totalSales: 0,
    totalPurchases: 0,
    totalRevenue: 0,
    totalPurchaseAmount: 0,
    profit: 0,
    lowStockItems: 0,
    recentSales: [],
    recentPurchases: [],
  });

  const fetchDashboard = async () => {
    try {
      const response = await getDashboardStats();
      setStats(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const cards = [
    {
      title: "Customers",
      value: stats.totalCustomers,
      icon: <Users size={30} />,
      color: "from-blue-500 to-blue-700",
    },
    {
      title: "Suppliers",
      value: stats.totalSuppliers,
      icon: <Building2 size={30} />,
      color: "from-green-500 to-green-700",
    },
    {
      title: "Items",
      value: stats.totalItems,
      icon: <Package size={30} />,
      color: "from-orange-400 to-orange-600",
    },
    {
      title: "Sales",
      value: stats.totalSales,
      icon: <Receipt size={30} />,
      color: "from-purple-500 to-purple-700",
    },
    {
      title: "Purchases",
      value: stats.totalPurchases,
      icon: <ShoppingCart size={30} />,
      color: "from-pink-500 to-pink-700",
    },
    {
      title: "Revenue",
      value: `Rs. ${stats.totalRevenue.toLocaleString()}`,
      icon: <TrendingUp size={30} />,
      color: "from-emerald-500 to-emerald-700",
    },
    {
      title: stats.profit >= 0 ? "Net Profit" : "Net Loss",
      value: `Rs. ${Math.abs(stats.profit).toLocaleString()}`,
      icon: <IndianRupee size={30} />,
      color:
        stats.profit >= 0
          ? "from-green-600 to-green-800"
          : "from-red-500 to-red-700",
    },
    {
      title: "Purchase Amount",
      value: `Rs. ${stats.totalPurchaseAmount.toLocaleString()}`,
      icon: <IndianRupee size={30} />,
      color: "from-cyan-500 to-blue-600",
    },
    {
      title: "Low Stock",
      value: stats.lowStockItems,
      icon: <AlertTriangle size={30} />,
      color: "from-red-500 to-red-700",
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-8">

        {/* Header */}

        <div>
          <h1 className="text-4xl font-bold text-slate-800">
            Dashboard
          </h1>

          <p className="text-gray-500 mt-2">
            Welcome to SmartERP Billing & Inventory Management System
          </p>
        </div>

        {/* Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          {cards.map((card, index) => (
            <StatCard
              key={index}
              title={card.title}
              value={card.value}
              icon={card.icon}
              color={card.color}
            />
          ))}

        </div>

        {/* Charts */}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          <RevenueChart />

          <SalesChart />

        </div>

        {/* Recent Tables */}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          <RecentSales sales={stats.recentSales} />

          <RecentPurchase purchases={stats.recentPurchases} />

        </div>

      </div>
    </MainLayout>
  );
}

export default Dashboard;