import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import AddSupplierModal from "../../components/AddSupplierModal";
import {
  getSuppliers,
  deleteSupplier,
} from "../../services/supplierService";

function SupplierLedger() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  // Fetch Suppliers
  const fetchSuppliers = async () => {
    try {
      const response = await getSuppliers();
      setSuppliers(response.data);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  // Search
  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.name.toLowerCase().includes(search.toLowerCase())
  );

  // Add Supplier
  const handleAddSupplier = () => {
    setSelectedSupplier(null);
    setIsModalOpen(true);
  };

  // Edit Supplier
  const handleEditSupplier = (supplier) => {
    setSelectedSupplier(supplier);
    setIsModalOpen(true);
  };

  // Delete Supplier
  const handleDeleteSupplier = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this supplier?"
    );

    if (!confirmDelete) return;

    try {
      await deleteSupplier(id);

      alert("✅ Supplier Deleted Successfully");

      fetchSuppliers();
    } catch (error) {
      console.error(error);
      alert("❌ Failed to delete supplier");
    }
  };

  return (
    <MainLayout>
      <div className="p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold text-slate-800">
              Supplier Ledger
            </h2>

            <p className="text-gray-500 mt-1">
              Manage all suppliers
            </p>
          </div>

          <button
            onClick={handleAddSupplier}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
          >
            + Add Supplier
          </button>
        </div>

        {/* Search */}
        <div className="bg-white rounded-lg shadow border p-4 mb-6">
          <input
            type="text"
            placeholder="Search supplier..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow border overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="text-left p-3 border">Supplier Name</th>
                <th className="text-left p-3 border">Mobile</th>
                <th className="text-left p-3 border">City</th>
                <th className="text-left p-3 border">Balance</th>
                <th className="text-center p-3 border">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredSuppliers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center p-4 border">
                    No Suppliers Found
                  </td>
                </tr>
              ) : (
                filteredSuppliers.map((supplier) => (
                  <tr key={supplier._id}>
                    <td className="p-3 border">
                      {supplier.name}
                    </td>

                    <td className="p-3 border">
                      {supplier.mobile}
                    </td>

                    <td className="p-3 border">
                      {supplier.city}
                    </td>

                    <td className="p-3 border">
                      ₹{supplier.openingBalance}
                    </td>

                    <td className="p-3 border text-center">
                      <button
                        onClick={() =>
                          handleEditSupplier(supplier)
                        }
                        className="text-blue-600 hover:text-blue-800 mr-4"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDeleteSupplier(supplier._id)
                        }
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Add / Edit Modal */}
        <AddSupplierModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedSupplier(null);
          }}
          onSupplierAdded={fetchSuppliers}
          supplier={selectedSupplier}
        />
      </div>
    </MainLayout>
  );
}

export default SupplierLedger;