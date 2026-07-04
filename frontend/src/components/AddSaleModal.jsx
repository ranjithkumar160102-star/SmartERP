import { useEffect, useState } from "react";
import { X, Plus, Trash2, ShoppingCart } from "lucide-react";

import { getCustomers } from "../services/customerService";
import { getItems } from "../services/itemService";
import {
  createSale,
  updateSale,
} from "../services/saleService";

function AddSaleModal({
  isOpen,
  onClose,
  onSaleAdded,
  editSale = null,
}) {
  const [customers, setCustomers] = useState([]);
  const [items, setItems] = useState([]);

  const [customer, setCustomer] = useState("");

  const [saleItems, setSaleItems] = useState([
    {
      item: "",
      quantity: 1,
      price: 0,
      total: 0,
    },
  ]);

  const [loading, setLoading] = useState(false);

  // ==========================
  // Load Data
  // ==========================

  useEffect(() => {
  if (isOpen) {
    loadData();
  }
}, [isOpen]);

useEffect(() => {
  if (editSale) {

    setCustomer(editSale.customer._id);

    setSaleItems(
      editSale.items.map((item) => ({
        item: item.item._id,
        quantity: item.quantity,
        price: item.price,
        total: item.total,
      }))
    );

  }

}, [editSale]);

  const loadData = async () => {
    try {
      const customerRes = await getCustomers();
      const itemRes = await getItems();

      setCustomers(customerRes.data);
      setItems(itemRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!isOpen) return null;

  // ==========================
  // Item Change
  // ==========================

  const handleItemChange = (index, value) => {
    const updated = [...saleItems];

    updated[index].item = value;

    const selectedItem = items.find(
      (item) => item._id === value
    );

    if (selectedItem) {
      updated[index].price = selectedItem.sellingPrice;

      updated[index].total =
        selectedItem.sellingPrice *
        updated[index].quantity;
    }

    setSaleItems(updated);
  };

  // ==========================
  // Quantity Change
  // ==========================

  const handleQuantityChange = (index, qty) => {
    const updated = [...saleItems];

    updated[index].quantity = Number(qty);

    updated[index].total =
      updated[index].price *
      updated[index].quantity;

    setSaleItems(updated);
  };

  // ==========================
  // Add Row
  // ==========================

  const addRow = () => {
    setSaleItems([
      ...saleItems,
      {
        item: "",
        quantity: 1,
        price: 0,
        total: 0,
      },
    ]);
  };

  // ==========================
  // Remove Row
  // ==========================

  const removeRow = (index) => {
    const updated = saleItems.filter(
      (_, i) => i !== index
    );

    setSaleItems(updated);
  };

  // ==========================
  // Grand Total
  // ==========================

  const grandTotal = saleItems.reduce(
    (sum, item) => sum + item.total,
    0
  );

 // ==========================
// Submit
// ==========================

const handleSubmit = async (e) => {
  e.preventDefault();

  try {

    setLoading(true);

    const saleData = {
      customer,
      items: saleItems.map((item) => ({
        item: item.item,
        quantity: item.quantity,
        price: item.price,
      })),
      notes: "",
      status: "Paid",
    };

    if (editSale) {

      await updateSale(editSale._id, saleData);

      alert("✅ Sale Invoice Updated");

    } else {

      await createSale(saleData);

      alert("✅ Sale Invoice Created");

    }

    onSaleAdded();

    onClose();

    setCustomer("");

    setSaleItems([
      {
        item: "",
        quantity: 1,
        price: 0,
        total: 0,
      },
    ]);

  } catch (error) {

  console.error(error);

  console.log("Full Error:", error);

  console.log("Response:", error.response);

  console.log("Data:", error.response?.data);

  alert(
    error.response?.data?.message || error.message
  );

} finally {

  setLoading(false);

}
};

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl shadow-2xl w-[95%] max-w-6xl overflow-hidden">

                {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-8 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <ShoppingCart size={30} />
            <div>
              <h2 className="text-2xl font-bold">
  {editSale ? "Edit Sales Invoice" : "New Sales Invoice"}
</h2>
              <p className="text-blue-100 text-sm">
                Create a new customer invoice
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="hover:bg-white/20 rounded-full p-2 transition"
          >
            <X size={28} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="p-8">

            {/* Customer */}
            <div className="mb-8">
              <label className="block mb-2 font-semibold text-gray-700">
                Customer
              </label>

              <select
                required
                value={customer}
                onChange={(e) =>
                  setCustomer(e.target.value)
                }
                className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-blue-500 outline-none"
              >
                <option value="">
                  Select Customer
                </option>

                {customers.map((customer) => (
                  <option
                    key={customer._id}
                    value={customer._id}
                  >
                    {customer.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Items Table */}

            <div className="overflow-x-auto rounded-xl border">

              <table className="w-full">

                <thead className="bg-slate-100">

                  <tr>

                    <th className="p-4 text-left">
                      Item
                    </th>

                    <th className="p-4 text-center">
                      Qty
                    </th>

                    <th className="p-4 text-center">
                      Price
                    </th>

                    <th className="p-4 text-center">
                      Total
                    </th>

                    <th className="p-4 text-center">
                      Action
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {saleItems.map((row, index) => (

                    <tr
                      key={index}
                      className="border-t hover:bg-slate-50"
                    >

                      <td className="p-3">

                        <select
                          required
                          value={row.item}
                          onChange={(e) =>
                            handleItemChange(
                              index,
                              e.target.value
                            )
                          }
                          className="w-full border rounded-lg p-2"
                        >

                          <option value="">
                            Select Item
                          </option>

                          {items.map((item) => (

                            <option
                              key={item._id}
                              value={item._id}
                            >
                              {item.name}
                            </option>

                          ))}

                        </select>

                      </td>

                      <td className="p-3 text-center">

                        <input
                          type="number"
                          min="1"
                          value={row.quantity}
                          onChange={(e) =>
                            handleQuantityChange(
                              index,
                              e.target.value
                            )
                          }
                          className="w-20 border rounded-lg p-2 text-center"
                        />

                      </td>

                      <td className="p-3 text-center font-medium">
                        ₹{row.price}
                      </td>

                      <td className="p-3 text-center font-bold text-green-600">
                        ₹{row.total}
                      </td>

                      <td className="p-3 text-center">

                        {saleItems.length > 1 && (

                          <button
                            type="button"
                            onClick={() =>
                              removeRow(index)
                            }
                            className="bg-red-500 hover:bg-red-600 text-white rounded-lg p-2"
                          >
                            <Trash2 size={18} />
                          </button>

                        )}

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

            {/* Add Item */}

            <div className="mt-5">

              <button
                type="button"
                onClick={addRow}
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl flex items-center gap-2"
              >
                <Plus size={18} />

                Add Item

              </button>

            </div>

                        {/* Grand Total */}

            <div className="flex justify-end mt-8">

              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl shadow-xl px-8 py-6 w-80">

                <p className="text-lg opacity-90">
                  Grand Total
                </p>

                <h2 className="text-4xl font-bold mt-2">
                  ₹{grandTotal.toLocaleString()}
                </h2>

              </div>

            </div>

          </div>

          {/* Footer */}

          <div className="border-t bg-gray-50 px-8 py-5 flex justify-end gap-4">

            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 font-medium transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg disabled:opacity-50 transition"
            >
              {loading
  ? "Saving..."
  : editSale
  ? "Update Invoice"
  : "Save Invoice"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AddSaleModal;