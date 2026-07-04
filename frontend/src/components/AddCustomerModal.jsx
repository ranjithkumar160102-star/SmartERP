import { useState, useEffect } from "react";
import {
  createCustomer,
  updateCustomer,
} from "../services/customerService";

function AddCustomerModal({
  isOpen,
  onClose,
  onCustomerAdded,
  customer,
}) {
  const initialState = {
    name: "",
    mobile: "",
    gst: "",
    city: "",
    address: "",
    openingBalance: 0,
  };

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (customer) {
      setFormData({
        name: customer.name || "",
        mobile: customer.mobile || "",
        gst: customer.gst || "",
        city: customer.city || "",
        address: customer.address || "",
        openingBalance: customer.openingBalance || 0,
      });
    } else {
      setFormData(initialState);
    }
  }, [customer, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]:
        name === "openingBalance"
          ? Number(value)
          : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (customer) {
        await updateCustomer(customer._id, formData);

        alert("Customer Updated Successfully");
      } else {
        await createCustomer(formData);

        alert("Customer Added Successfully");
      }

      setFormData(initialState);

      if (onCustomerAdded) {
        onCustomerAdded();
      }

      onClose();
    } catch (error) {
      console.error(error);
      alert("Customer Operation Failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[700px] rounded-xl shadow-xl">

        {/* Header */}
        <div className="flex justify-between items-center border-b p-5">

          <h2 className="text-2xl font-bold">
            {customer ? "Edit Customer" : "Add Customer"}
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
                Customer Name
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
                Mobile Number
              </label>

              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                GST Number
              </label>

              <input
                type="text"
                name="gst"
                value={formData.gst}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                City
              </label>

              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            <div className="col-span-2">
              <label className="block mb-2 font-medium">
                Address
              </label>

              <textarea
                rows="3"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Opening Balance
              </label>

              <input
                type="number"
                name="openingBalance"
                value={formData.openingBalance}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

          </div>

          {/* Footer */}

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
              {customer ? "Update Customer" : "Save Customer"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default AddCustomerModal;