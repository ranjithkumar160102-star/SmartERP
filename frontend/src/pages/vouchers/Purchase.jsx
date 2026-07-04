import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import AddPurchaseModal from "../../components/AddPurchaseModal";
import {
  getPurchases,
  deletePurchase,
} from "../../services/purchaseService";

import { Pencil } from "lucide-react";

function Purchase() {
  const [purchases, setPurchases] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editPurchase, setEditPurchase] = useState(null);
  const [search, setSearch] = useState("");

  // ==============================
  // Fetch Purchases
  // ==============================
  const fetchPurchases = async () => {
    try {
      const response = await getPurchases();
      setPurchases(response.data);
    } catch (error) {
      console.error("Error fetching purchases:", error);
    }
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  // ==============================
  // Delete Purchase
  // ==============================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this purchase?"
    );
 
   const filteredPurchases = purchases.filter((purchase) => {
  const keyword = search.toLowerCase();

  return (
    purchase.invoiceNo.toLowerCase().includes(keyword) ||
    purchase.supplier?.name?.toLowerCase().includes(keyword)
  );
});


    if (!confirmDelete) return;

    try {
      await deletePurchase(id);

      alert("✅ Purchase Deleted Successfully");

      fetchPurchases();
    } catch (error) {
      console.error(error);
      alert("❌ Failed to Delete Purchase");
    }
  };

const filteredPurchases = purchases.filter((purchase) => {
  const keyword = search.toLowerCase();

  return (
    purchase.invoiceNo.toLowerCase().includes(keyword) ||
    purchase.supplier?.name?.toLowerCase().includes(keyword)
  );
});


  return (
    <MainLayout>
      <div className="p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">

          <div>
            <h1 className="text-3xl font-bold">
              Purchase Ledger
            </h1>

            <p className="text-gray-500">
              Manage Purchase Transactions
            </p>
          </div>

          <button
           onClick={() => {
  setEditPurchase(null);
  setIsModalOpen(true);
}}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
          >
            + New Purchase
          </button>

        </div>

        {/* Search */}
<div className="bg-white rounded-lg shadow p-4 mb-4">
  <input
    type="text"
    placeholder="Search Invoice / Supplier..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
  />
</div>


        {/* Purchase Table */}
        <div className="bg-white rounded-lg shadow border overflow-hidden">

          <table className="w-full">

            <thead className="bg-slate-100">

              <tr>
                <th className="border p-3 text-left">
                  Invoice No
                </th>

                <th className="border p-3 text-left">
                  Supplier
                </th>

                <th className="border p-3 text-left">
                  Date
                </th>

                <th className="border p-3 text-right">
                  Grand Total
                </th>

                <th className="border p-3 text-center">
                  Status
                </th>

                <th className="border p-3 text-center">
                  Action
                </th>
              </tr>

            </thead>

            <tbody>

              {filteredPurchases.length === 0 ? (

                <tr>

                  <td
                    colSpan="6"
                    className="text-center p-5"
                  >
                    No Purchase Records Found
                  </td>

                </tr>

              ) : (

               filteredPurchases.map((purchase) => (

                  <tr key={purchase._id}>

                    <td className="border p-3">
                      {purchase.invoiceNo}
                    </td>

                    <td className="border p-3">
                      {purchase.supplier?.name}
                    </td>

                    <td className="border p-3">
                      {new Date(
                        purchase.purchaseDate
                      ).toLocaleDateString()}
                    </td>

                    <td className="border p-3 text-right">
                      ₹{purchase.grandTotal}
                    </td>

                    <td className="border p-3 text-center">

                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          purchase.status === "Paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {purchase.status}
                      </span>

                    </td>

                    <td className="border p-3 text-center">

  <div className="flex justify-center gap-3">

    <button
  onClick={() => {
    setEditPurchase(purchase);
    setIsModalOpen(true);
  }}
  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
>
  Edit
</button>

    <button
      onClick={() => handleDelete(purchase._id)}
      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
    >
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

        {/* Add Purchase Modal */}

        <AddPurchaseModal
  isOpen={isModalOpen}
  onClose={() => {
    setIsModalOpen(false);
    setEditPurchase(null);
  }}
  onPurchaseAdded={fetchPurchases}
  editPurchase={editPurchase}
/>

      </div>
    </MainLayout>
  );
}

export default Purchase;