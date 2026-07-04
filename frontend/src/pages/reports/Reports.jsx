import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { getReport } from "../../services/reportService";

import {
  FileText,
  ShoppingCart,
  Package,
  Users,
  Building2,
  IndianRupee,
  FileSpreadsheet,
  FileDown,
} from "lucide-react";

function Reports() {

  const [summary, setSummary] = useState({
    totalSales: 0,
    totalPurchase: 0,
    totalItems: 0,
    lowStock: [],
  });

  const fetchReport = async () => {
    try {
      const response = await getReport();
      setSummary(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  const reports = [
    {
      title: "Sales Report",
      desc: "View complete sales transactions",
      icon: <ShoppingCart size={34} />,
      color: "from-blue-500 to-blue-700",
    },
    {
      title: "Purchase Report",
      desc: "View all purchase transactions",
      icon: <Package size={34} />,
      color: "from-green-500 to-green-700",
    },
    {
      title: "Stock Report",
      desc: "Current stock availability",
      icon: <Package size={34} />,
      color: "from-orange-500 to-red-500",
    },
    {
      title: "Customer Report",
      desc: "Customer ledger & balances",
      icon: <Users size={34} />,
      color: "from-purple-500 to-purple-700",
    },
    {
      title: "Supplier Report",
      desc: "Supplier ledger & balances",
      icon: <Building2 size={34} />,
      color: "from-pink-500 to-pink-700",
    },
    {
      title: "Profit & Loss",
      desc: "Business profit analysis",
      icon: <IndianRupee size={34} />,
      color: "from-emerald-500 to-emerald-700",
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-8">

        {/* Header */}

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">

          <div>
            <h1 className="text-4xl font-bold text-slate-800">
              Reports
            </h1>

            <p className="text-gray-500 mt-2">
              Business Reports & Analytics
            </p>
          </div>

          <div className="flex gap-3 mt-5 lg:mt-0">

            <button
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700
              text-white px-5 py-3 rounded-xl shadow transition"
            >
              <FileSpreadsheet size={20} />
              Export Excel
            </button>

            <button
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700
              text-white px-5 py-3 rounded-xl shadow transition"
            >
              <FileDown size={20} />
              Export PDF
            </button>

          </div>

        </div>

        {/* Summary Cards */}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">

          <div className="bg-white shadow rounded-xl p-5 border">
            <h3 className="text-gray-500">Total Sales</h3>

            <p className="text-3xl font-bold text-green-600 mt-2">
              ₹{summary.totalSales}
            </p>
          </div>

          <div className="bg-white shadow rounded-xl p-5 border">
            <h3 className="text-gray-500">Total Purchase</h3>

            <p className="text-3xl font-bold text-blue-600 mt-2">
              ₹{summary.totalPurchase}
            </p>
          </div>

          <div className="bg-white shadow rounded-xl p-5 border">
            <h3 className="text-gray-500">Items</h3>

            <p className="text-3xl font-bold text-orange-600 mt-2">
              {summary.totalItems}
            </p>
          </div>

          <div className="bg-white shadow rounded-xl p-5 border">
            <h3 className="text-gray-500">Low Stock</h3>

            <p className="text-3xl font-bold text-red-600 mt-2">
              {summary.lowStock.length}
            </p>
          </div>

        </div>

        {/* Report Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {reports.map((report, index) => (

            <div
              key={index}
              className="bg-white rounded-2xl shadow hover:shadow-xl transition duration-300 overflow-hidden border"
            >

              <div
                className={`h-2 bg-gradient-to-r ${report.color}`}
              />

              <div className="p-6">

                <div className="flex justify-between items-center">

                  <div>

                    <h2 className="text-xl font-bold text-slate-800">
                      {report.title}
                    </h2>

                    <p className="text-gray-500 mt-2">
                      {report.desc}
                    </p>

                  </div>

                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${report.color} flex items-center justify-center text-white shadow-lg`}
                  >
                    {report.icon}
                  </div>

                </div>

                <button
                  className="mt-6 w-full bg-slate-900 hover:bg-slate-700 text-white py-3 rounded-xl transition"
                >
                  View Report
                </button>

              </div>

            </div>

          ))}

        </div>

                {/* Low Stock Table */}

        <div className="bg-white rounded-2xl shadow border">

          <div className="border-b p-5">

            <h2 className="text-2xl font-bold">
              Low Stock Items
            </h2>

          </div>

          <table className="w-full">

            <thead className="bg-gray-100">

              <tr>

                <th className="border p-3">
                  Item Name
                </th>

                <th className="border p-3">
                  Available Stock
                </th>

              </tr>

            </thead>

            <tbody>

              {summary.lowStock.length === 0 ? (

                <tr>

                  <td
                    colSpan="2"
                    className="text-center p-5 text-gray-500"
                  >
                    No Low Stock Items
                  </td>

                </tr>

              ) : (

                summary.lowStock.map((item) => (

                  <tr key={item._id}>

                    <td className="border p-3">
                      {item.name}
                    </td>

                    <td className="border p-3 text-center">
                      {item.openingStock}
                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

        {/* Recent Reports */}

        <div className="bg-white rounded-2xl shadow border">

          <div className="border-b p-5">

            <h2 className="text-2xl font-bold flex items-center gap-2">
              <FileText size={24} />
              Recent Reports
            </h2>

          </div>

          <table className="w-full">

            <thead className="bg-gray-100">

              <tr>

                <th className="text-left px-6 py-4">
                  Report
                </th>

                <th className="text-left px-6 py-4">
                  Generated Date
                </th>

                <th className="text-left px-6 py-4">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              <tr className="border-t">

                <td className="px-6 py-4">
                  Sales Report
                </td>

                <td className="px-6 py-4">
                  Today
                </td>

                <td className="px-6 py-4 text-green-600 font-semibold">
                  Ready
                </td>

              </tr>

              <tr className="border-t">

                <td className="px-6 py-4">
                  Purchase Report
                </td>

                <td className="px-6 py-4">
                  Today
                </td>

                <td className="px-6 py-4 text-green-600 font-semibold">
                  Ready
                </td>

              </tr>

              <tr className="border-t">

                <td className="px-6 py-4">
                  Stock Report
                </td>

                <td className="px-6 py-4">
                  Today
                </td>

                <td className="px-6 py-4 text-green-600 font-semibold">
                  Ready
                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </MainLayout>
  );
}

export default Reports;