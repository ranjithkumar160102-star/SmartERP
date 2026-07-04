import { useState, useEffect } from "react";
import {
  createItem,
  updateItem,
} from "../services/itemService";

function AddItemModal({
  isOpen,
  onClose,
  onItemAdded,
  item,
}) {
  const initialState = {
    name: "",
    code: "",
    category: "",
    unit: "Nos",
    purchasePrice: 0,
    sellingPrice: 0,
    openingStock: 0,
  };

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name || "",
        code: item.code || "",
        category: item.category || "",
        unit: item.unit || "Nos",
        purchasePrice: item.purchasePrice || 0,
        sellingPrice: item.sellingPrice || 0,
        openingStock: item.openingStock || 0,
      });
    } else {
      setFormData(initialState);
    }
  }, [item, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]:
        [
          "purchasePrice",
          "sellingPrice",
          "openingStock",
        ].includes(name)
          ? Number(value)
          : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (item) {
        await updateItem(item._id, formData);
        alert("✅ Item Updated Successfully");
      } else {
        await createItem(formData);
        alert("✅ Item Added Successfully");
      }

      setFormData(initialState);

      if (onItemAdded) {
        onItemAdded();
      }

      onClose();
    } catch (error) {
      console.error(error);
      alert("❌ Operation Failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[750px] rounded-xl shadow-xl">

        {/* Header */}
        <div className="flex justify-between items-center border-b p-5">
          <h2 className="text-2xl font-bold">
            {item ? "Edit Item" : "Add Item"}
          </h2>

          <button
            onClick={onClose}
            className="text-2xl font-bold text-gray-500 hover:text-red-600"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6 grid grid-cols-2 gap-5">

            <div>
              <label className="block mb-2 font-medium">
                Item Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Item Code
              </label>

              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Category
              </label>

              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Unit
              </label>

              <select
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
              >
                <option>Nos</option>
                <option>Kg</option>
                <option>Ltr</option>
                <option>Box</option>
                <option>Pack</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Purchase Price
              </label>

              <input
                type="number"
                name="purchasePrice"
                value={formData.purchasePrice}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Selling Price
              </label>

              <input
                type="number"
                name="sellingPrice"
                value={formData.sellingPrice}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Opening Stock
              </label>

              <input
                type="number"
                name="openingStock"
                value={formData.openingStock}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

          </div>

          <div className="border-t p-5 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg border"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
            >
              {item ? "Update Item" : "Save Item"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default AddItemModal;