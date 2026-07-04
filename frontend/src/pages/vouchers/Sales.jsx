import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import AddSaleModal from "../../components/AddSaleModal";

import {
  getSales,
  getSaleById,
  deleteSale,
} from "../../services/saleService";

import {
  FileDown,
  Trash2,
  Plus,
  Receipt,
  Pencil,
} from "lucide-react";

function Sales() {
  const [sales, setSales] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editSale, setEditSale] = useState(null);
  const [search, setSearch] = useState("");

  // ===========================
  // Fetch Sales
  // ===========================

  const fetchSales = async () => {
    try {
      const response = await getSales();
      setSales(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  // ===========================
  // Delete Invoice
  // ===========================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this Invoice?"
    );

    if (!confirmDelete) return;

    try {
      await deleteSale(id);

      alert("Invoice Deleted Successfully");

      fetchSales();
    } catch (error) {
      console.error(error);
      alert("Failed to delete invoice");
    }
  };

  // ===========================
  // Download PDF
  // ===========================

 const handleDownloadPDF = async (id) => {
  try {
    window.open(
      `http://localhost:5000/api/pdf/sale/${id}`,
      "_blank"
    );
  } catch (error) {
    console.error(error);
    alert("Unable to Download PDF");
  }
};

  const filteredSales = sales.filter((sale) => {

  const keyword = search.toLowerCase();

  return (
    sale.invoiceNo.toLowerCase().includes(keyword) ||
    sale.customer?.name?.toLowerCase().includes(keyword)
  );

});


  return (
    <MainLayout>
      <div className="space-y-6">

        {/* Header */}

        <div className="bg-white rounded-2xl shadow p-6 flex justify-between items-center">

          <div>

            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Receipt className="text-blue-600" />
              Sales Invoice
            </h1>

            <p className="text-gray-500 mt-2">
              Manage all Sales Transactions
            </p>

          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl"
          >
            <Plus size={18} />
            New Invoice
          </button>

        </div>

      {/* Search */}

<div className="bg-white rounded-xl shadow p-4">
  <input
    type="text"
    placeholder="Search Invoice / Customer..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>


        {/* Table */}

        <div className="bg-white rounded-2xl shadow overflow-hidden">

          <table className="w-full">

            <thead className="bg-slate-100">

              <tr>

                <th className="px-5 py-4 text-left">
                  Invoice
                </th>

                <th className="px-5 py-4 text-left">
                  Customer
                </th>

                <th className="px-5 py-4 text-left">
                  Date
                </th>

                <th className="px-5 py-4 text-right">
                  Grand Total
                </th>

                <th className="px-5 py-4 text-center">
                  Status
                </th>

                <th className="px-5 py-4 text-center">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredSales.length === 0 ? (

                <tr>

                  <td
                    colSpan="6"
                    className="text-center py-10 text-gray-500"
                  >
                    No Sales Found
                  </td>

                </tr>

              ) : (

                filteredSales.map((sale) => (

                  <tr
                    key={sale._id}
                    className="border-t hover:bg-slate-50"
                  >

                    <td className="px-5 py-4 font-medium">
                      {sale.invoiceNo}
                    </td>

                    <td className="px-5 py-4">
                      {sale.customer?.name}
                    </td>

                    <td className="px-5 py-4">
                      {new Date(
                        sale.saleDate
                      ).toLocaleDateString()}
                    </td>

                    <td className="px-5 py-4 text-right font-semibold text-green-600">
                      ₹
                      {sale.grandTotal?.toLocaleString()}
                    </td>

                    <td className="px-5 py-4 text-center">

                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          sale.status === "Paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {sale.status}
                      </span>

                    </td>

                    <td className="px-5 py-4">

                     <div className="flex justify-center gap-2">

  {/* PDF */}
  <button
    onClick={() =>
      handleDownloadPDF(sale._id)
    }
    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg"
  >
    <FileDown size={16} />
    PDF
  </button>

  {/* Edit */}
  <button
    onClick={() => {
      setEditSale(sale);
      setIsModalOpen(true);
    }}
    className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg"
  >
    <Pencil size={16} />
    Edit
  </button>

  {/* Delete */}
  <button
    onClick={() =>
      handleDelete(sale._id)
    }
    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg"
  >
    <Trash2 size={16} />
    Delete
  </button>

</div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

       <AddSaleModal
  isOpen={isModalOpen}
  onClose={() => {
    setIsModalOpen(false);
    setEditSale(null);
  }}
  onSaleAdded={fetchSales}
  editSale={editSale}
/>

      </div>
    </MainLayout>
  );
}

export default Sales;