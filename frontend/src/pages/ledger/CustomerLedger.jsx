import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import AddCustomerModal from "../../components/AddCustomerModal";
import {
  getCustomers,
  deleteCustomer,
} from "../../services/customerService";

function CustomerLedger() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Fetch Customers
  const fetchCustomers = async () => {
    try {
      const response = await getCustomers();
      setCustomers(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Search Filter
  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(search.toLowerCase())
  );

  // Add Customer
  const handleAddCustomer = () => {
    setSelectedCustomer(null);
    setIsModalOpen(true);
  };

  // Edit Customer
  const handleEditCustomer = (customer) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };

  // Delete Customer
  const handleDeleteCustomer = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this customer?"
    );

    if (!confirmDelete) return;

    try {
      await deleteCustomer(id);

      alert("✅ Customer Deleted Successfully");

      fetchCustomers();
    } catch (error) {
      console.error(error);
      alert("❌ Failed to delete customer");
    }
  };

  return (
    <MainLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold text-slate-800">
              Customer Ledger
            </h2>

            <p className="text-gray-500 mt-1">
              Manage all customers
            </p>
          </div>

          <button
            onClick={handleAddCustomer}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
          >
            + Add Customer
          </button>
        </div>

        {/* Search */}
        <div className="bg-white rounded-lg shadow border p-4 mb-6">
          <input
            type="text"
            placeholder="Search customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Customer Table */}
        <div className="bg-white rounded-lg shadow border overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="text-left p-3 border">
                  Customer Name
                </th>
                <th className="text-left p-3 border">
                  Mobile
                </th>
                <th className="text-left p-3 border">
                  City
                </th>
                <th className="text-left p-3 border">
                  Balance
                </th>
                <th className="text-center p-3 border">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center p-4 border"
                  >
                    No Customers Found
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((customer) => (
                  <tr key={customer._id}>
                    <td className="p-3 border">
                      {customer.name}
                    </td>

                    <td className="p-3 border">
                      {customer.mobile}
                    </td>

                    <td className="p-3 border">
                      {customer.city}
                    </td>

                    <td className="p-3 border">
                      ₹{customer.openingBalance}
                    </td>

                    <td className="p-3 border text-center">
                      <button
                        onClick={() =>
                          handleEditCustomer(customer)
                        }
                        className="text-blue-600 hover:text-blue-800 mr-4"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDeleteCustomer(customer._id)
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

        {/* Add / Edit Customer Modal */}
        <AddCustomerModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedCustomer(null);
          }}
          onCustomerAdded={fetchCustomers}
          customer={selectedCustomer}
        />
      </div>
    </MainLayout>
  );
}

export default CustomerLedger;