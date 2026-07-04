import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import AddItemModal from "../../components/AddItemModal";
import {
  getItems,
  deleteItem,
} from "../../services/itemService";

function ItemLedger() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  // Fetch Items
  const fetchItems = async () => {
    try {
      const response = await getItems();
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Search Filter
  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.code.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())
  );

  // Add Item
  const handleAddItem = () => {
    setSelectedItem(null);
    setIsModalOpen(true);
  };

  // Edit Item
  const handleEditItem = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  // Delete Item
  const handleDeleteItem = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (!confirmDelete) return;

    try {
      await deleteItem(id);

      alert("✅ Item Deleted Successfully");

      fetchItems();
    } catch (error) {
      console.error(error);
      alert("❌ Failed to delete item");
    }
  };

  return (
    <MainLayout>
      <div className="p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold text-slate-800">
              Item Ledger
            </h2>

            <p className="text-gray-500 mt-1">
              Manage all inventory items
            </p>
          </div>

          <button
            onClick={handleAddItem}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
          >
            + Add Item
          </button>
        </div>

        {/* Search */}
        <div className="bg-white rounded-lg shadow border p-4 mb-6">
          <input
            type="text"
            placeholder="Search item..."
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
                <th className="text-left p-3 border">Item Name</th>
                <th className="text-left p-3 border">Code</th>
                <th className="text-left p-3 border">Category</th>
                <th className="text-left p-3 border">Unit</th>
                <th className="text-right p-3 border">Purchase</th>
                <th className="text-right p-3 border">Selling</th>
                <th className="text-right p-3 border">Stock</th>
                <th className="text-center p-3 border">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredItems.length === 0 ? (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center p-4 border"
                  >
                    No Items Found
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <tr key={item._id}>
                    <td className="p-3 border">
                      {item.name}
                    </td>

                    <td className="p-3 border">
                      {item.code}
                    </td>

                    <td className="p-3 border">
                      {item.category}
                    </td>

                    <td className="p-3 border">
                      {item.unit}
                    </td>

                    <td className="p-3 border text-right">
                      ₹{item.purchasePrice}
                    </td>

                    <td className="p-3 border text-right">
                      ₹{item.sellingPrice}
                    </td>

                    <td className="p-3 border text-right">
                      {item.openingStock}
                    </td>

                    <td className="p-3 border text-center">
                      <button
                        onClick={() =>
                          handleEditItem(item)
                        }
                        className="text-blue-600 hover:text-blue-800 mr-4"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDeleteItem(item._id)
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

        {/* Add / Edit Item Modal */}
        <AddItemModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedItem(null);
          }}
          onItemAdded={fetchItems}
          item={selectedItem}
        />
      </div>
    </MainLayout>
  );
}

export default ItemLedger;