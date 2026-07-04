import { useEffect, useState } from "react";
import { getSuppliers } from "../services/supplierService";
import { getItems } from "../services/itemService";
import {
  createPurchase,
  updatePurchase,
} from "../services/purchaseService";

function AddPurchaseModal({
  isOpen,
  onClose,
  onPurchaseAdded,
  editPurchase,
}) {
  const [suppliers, setSuppliers] = useState([]);
  const [items, setItems] = useState([]);

  const [supplier, setSupplier] = useState("");

  const [purchaseItems, setPurchaseItems] = useState([
    {
      item: "",
      quantity: 1,
      price: 0,
      total: 0,
    },
  ]);

  // ==============================
  // Load Suppliers & Items
  // ==============================
  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  useEffect(() => {

  if (editPurchase) {

    setSupplier(editPurchase.supplier._id);

    setPurchaseItems(
      editPurchase.items.map((item) => ({
        item: item.item._id,
        quantity: item.quantity,
        price: item.price,
        total: item.total,
      }))
    );

  }

}, [editPurchase]);

  const loadData = async () => {
    try {
      const supplierRes = await getSuppliers();
      const itemRes = await getItems();

      setSuppliers(supplierRes.data);
      setItems(itemRes.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!isOpen) return null;

  // ==============================
  // Item Change
  // ==============================
  const handleItemChange = (index, value) => {
    const updatedItems = [...purchaseItems];

    updatedItems[index].item = value;

    const selectedItem = items.find(
      (item) => item._id === value
    );

    if (selectedItem) {
      updatedItems[index].price =
        selectedItem.purchasePrice;

      updatedItems[index].total =
        selectedItem.purchasePrice *
        updatedItems[index].quantity;
    }

    setPurchaseItems(updatedItems);
  };

  // ==============================
  // Quantity Change
  // ==============================
  const handleQuantityChange = (index, qty) => {
    const updatedItems = [...purchaseItems];

    updatedItems[index].quantity = Number(qty);

    updatedItems[index].total =
      updatedItems[index].price *
      updatedItems[index].quantity;

    setPurchaseItems(updatedItems);
  };

  // ==============================
  // Add Row
  // ==============================
  const addRow = () => {
    setPurchaseItems([
      ...purchaseItems,
      {
        item: "",
        quantity: 1,
        price: 0,
        total: 0,
      },
    ]);
  };

  // ==============================
  // Remove Row
  // ==============================
  const removeRow = (index) => {
    const updatedItems = purchaseItems.filter(
      (_, i) => i !== index
    );

    setPurchaseItems(updatedItems);
  };

  // ==============================
  // Grand Total
  // ==============================
  const grandTotal = purchaseItems.reduce(
    (sum, item) => sum + item.total,
    0
  );

  // ==============================
  // Save Purchase
  // ==============================
  // ==============================
// Save / Update Purchase
// ==============================
const handleSubmit = async (e) => {
  e.preventDefault();

  try {

    if (editPurchase) {

      await updatePurchase(editPurchase._id, {
        supplier,
        items: purchaseItems.map((item) => ({
          item: item.item,
          quantity: Number(item.quantity),
          price: Number(item.price),
        })),
        notes: "",
        status: "Paid",
      });

      alert("✅ Purchase Updated Successfully");

    } else {

      await createPurchase({
        supplier,
        items: purchaseItems.map((item) => ({
          item: item.item,
          quantity: Number(item.quantity),
          price: Number(item.price),
        })),
        notes: "",
        status: "Paid",
      });

      alert("✅ Purchase Saved Successfully");

    }

    onPurchaseAdded();
    onClose();

    setSupplier("");

    setPurchaseItems([
      {
        item: "",
        quantity: 1,
        price: 0,
        total: 0,
      },
    ]);

  } catch (error) {

    console.error(error);
    alert("❌ Failed to Save Purchase");

  }
};
  

    return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-11/12 max-w-5xl rounded-lg shadow-lg">

        {/* Header */}
        <div className="flex justify-between items-center border-b p-5">
          <h2 className="text-2xl font-bold">
  {editPurchase
    ? "Edit Purchase Invoice"
    : "New Purchase Invoice"}
</h2>

          <button
            onClick={onClose}
            className="text-3xl font-bold text-gray-500 hover:text-red-500"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="p-6">

            {/* Supplier */}
            <div className="mb-6">
              <label className="block font-semibold mb-2">
                Supplier
              </label>

              <select
                className="w-full border rounded-lg p-3"
                value={supplier}
                onChange={(e) => setSupplier(e.target.value)}
                required
              >
                <option value="">Select Supplier</option>

                {suppliers.map((supplier) => (
                  <option
                    key={supplier._id}
                    value={supplier._id}
                  >
                    {supplier.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Items Table */}
            <div className="overflow-x-auto">

              <table className="w-full border border-gray-300">

                <thead className="bg-gray-100">

                  <tr>
                    <th className="border p-2">Item</th>
                    <th className="border p-2">Qty</th>
                    <th className="border p-2">Price</th>
                    <th className="border p-2">Total</th>
                    <th className="border p-2">Action</th>
                  </tr>

                </thead>

                <tbody>

                  {purchaseItems.map((row, index) => (

                    <tr key={index}>

                      <td className="border p-2">

                        <select
                          className="w-full border rounded p-2"
                          value={row.item}
                          onChange={(e) =>
                            handleItemChange(index, e.target.value)
                          }
                          required
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

                      <td className="border p-2">

                        <input
                          type="number"
                          min="1"
                          className="w-24 border rounded p-2"
                          value={row.quantity}
                          onChange={(e) =>
                            handleQuantityChange(index, e.target.value)
                          }
                          required
                        />

                      </td>

                      <td className="border p-2 text-center">
                        ₹{row.price}
                      </td>

                      <td className="border p-2 text-center font-semibold">
                        ₹{row.total}
                      </td>

                      <td className="border p-2 text-center">

                        {purchaseItems.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeRow(index)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                          >
                            Remove
                          </button>
                        )}

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

            {/* Add Item */}
            <div className="mt-4">
              <button
                type="button"
                onClick={addRow}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                + Add Item
              </button>
            </div>

            {/* Grand Total */}
            <div className="mt-6 flex justify-end">

              <div className="bg-gray-100 rounded-lg p-5 w-72">

                <h3 className="text-xl font-bold">
                  Grand Total
                </h3>

                <p className="text-3xl text-blue-600 font-bold mt-2">
                  ₹{grandTotal}
                </p>

              </div>

            </div>

          </div>

          {/* Footer */}
          <div className="border-t p-5 flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              className="border px-5 py-2 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            >
              {editPurchase
  ? "Update Purchase"
  : "Save Purchase"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default AddPurchaseModal;