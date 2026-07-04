import { useEffect, useMemo, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { getStockLedger } from "../../services/stockService";

function StockLedger() {
  const [stock, setStock] = useState([]);
  const [search, setSearch] = useState("");

  // ==============================
  // Fetch Stock
  // ==============================
  const fetchStock = async () => {
    try {
      const response = await getStockLedger();
      setStock(response.data);
    } catch (error) {
      console.error("Stock Error:", error);
    }
  };

  useEffect(() => {
    fetchStock();
  }, []);

  // ==============================
  // Search Filter
  // ==============================
  const filteredStock = useMemo(() => {
    return stock.filter((item) => {
      const keyword = search.toLowerCase();

      return (
        item.itemName.toLowerCase().includes(keyword) ||
        item.itemCode.toLowerCase().includes(keyword) ||
        item.category.toLowerCase().includes(keyword)
      );
    });
  }, [stock, search]);

  return (
    <MainLayout>

      <div className="p-6">

        {/* Header */}

        <div className="flex justify-between items-center mb-6">

          <div>

            <h1 className="text-3xl font-bold">
              Inventory Report
            </h1>

            <p className="text-gray-500">
              Current Stock Ledger
            </p>

          </div>

          <input
            type="text"
            placeholder="Search Item..."
            className="border rounded-lg px-4 py-2 w-72"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        {/* Table */}

        <div className="bg-white rounded-xl shadow border overflow-hidden">

          <table className="w-full">

            <thead className="bg-slate-100">

              <tr>

                <th className="border p-3 text-left">
                  Item
                </th>

                <th className="border p-3 text-left">
                  Code
                </th>

                <th className="border p-3 text-left">
                  Category
                </th>

                <th className="border p-3 text-center">
                  Unit
                </th>

                <th className="border p-3 text-right">
                  Purchase Price
                </th>

                <th className="border p-3 text-right">
                  Selling Price
                </th>

                <th className="border p-3 text-center">
                  Stock
                </th>

                <th className="border p-3 text-right">
                  Stock Value
                </th>

                <th className="border p-3 text-center">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

                              {filteredStock.length === 0 ? (
                <tr>
                  <td
                    colSpan="9"
                    className="text-center p-6 text-gray-500"
                  >
                    No Stock Records Found
                  </td>
                </tr>
              ) : (
                filteredStock.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-gray-50"
                  >
                    <td className="border p-3 font-medium">
                      {item.itemName}
                    </td>

                    <td className="border p-3">
                      {item.itemCode}
                    </td>

                    <td className="border p-3">
                      {item.category}
                    </td>

                    <td className="border p-3 text-center">
                      {item.unit}
                    </td>

                    <td className="border p-3 text-right">
                      ₹{item.purchasePrice.toLocaleString()}
                    </td>

                    <td className="border p-3 text-right">
                      ₹{item.sellingPrice.toLocaleString()}
                    </td>

                    <td className="border p-3 text-center font-bold">
                      {item.currentStock}
                    </td>

                    <td className="border p-3 text-right font-semibold">
                      ₹{item.stockValue.toLocaleString()}
                    </td>

                    <td className="border p-3 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          item.status === "In Stock"
                            ? "bg-green-100 text-green-700"
                            : item.status === "Low Stock"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">

          <div className="bg-blue-100 rounded-lg p-5">
            <h3 className="text-gray-600">
              Total Items
            </h3>

            <p className="text-3xl font-bold text-blue-700 mt-2">
              {filteredStock.length}
            </p>
          </div>

          <div className="bg-green-100 rounded-lg p-5">
            <h3 className="text-gray-600">
              Total Stock Value
            </h3>

            <p className="text-3xl font-bold text-green-700 mt-2">
              ₹
              {filteredStock
                .reduce(
                  (sum, item) => sum + item.stockValue,
                  0
                )
                .toLocaleString()}
            </p>
          </div>

          <div className="bg-red-100 rounded-lg p-5">
            <h3 className="text-gray-600">
              Low Stock Items
            </h3>

            <p className="text-3xl font-bold text-red-700 mt-2">
              {
                filteredStock.filter(
                  (item) => item.status === "Low Stock"
                ).length
              }
            </p>
          </div>

        </div>

      </div>

    </MainLayout>
  );
}

export default StockLedger;