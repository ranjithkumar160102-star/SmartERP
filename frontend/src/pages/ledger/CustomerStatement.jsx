import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { getCustomers } from "../../services/customerService";
import { getCustomerLedger } from "../../services/ledgerService";

function CustomerStatement() {
  const [customers, setCustomers] = useState([]);
  const [customerId, setCustomerId] = useState("");

  const [ledger, setLedger] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [closingBalance, setClosingBalance] = useState(0);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await getCustomers();
      setCustomers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadLedger = async () => {
    if (!customerId) {
      alert("Please select a customer");
      return;
    }

    try {
      const response = await getCustomerLedger(customerId);

      console.log(response);

      setLedger(response.data);
      setCustomerName(response.customer);
      setClosingBalance(response.closingBalance);
    } catch (error) {
      console.log(error);
      alert("Failed to load ledger");
    }
  };

  return (
    <MainLayout>
      <div className="p-6">

        <h2 className="text-3xl font-bold mb-6">
          Customer Statement
        </h2>

        {/* Customer Selection */}
        <div className="bg-white shadow rounded-lg p-5 mb-6">

          <div className="flex gap-4">

            <select
              className="border rounded-lg p-3 w-80"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
            >
              <option value="">Select Customer</option>

              {customers.map((customer) => (
                <option
                  key={customer._id}
                  value={customer._id}
                >
                  {customer.name}
                </option>
              ))}

            </select>

            <button
              onClick={loadLedger}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 rounded-lg"
            >
              View Ledger
            </button>

          </div>

        </div>

        {/* Debug */}
        <p className="mb-4 font-semibold">
          Ledger Length : {ledger.length}
        </p>

        {/* Ledger Table */}

        {ledger.length > 0 && (

          <div className="bg-white shadow rounded-lg p-5">

            <h3 className="text-2xl font-bold mb-4">
              {customerName}
            </h3>

            <table className="w-full border">

              <thead className="bg-gray-100">

                <tr>
                  <th className="border p-2">Date</th>
                  <th className="border p-2">Particular</th>
                  <th className="border p-2">Debit</th>
                  <th className="border p-2">Credit</th>
                  <th className="border p-2">Balance</th>
                </tr>

              </thead>

              <tbody>

                {ledger.map((row, index) => (

                  <tr key={index}>

                    <td className="border p-2">

                      {row.date
                        ? new Date(row.date).toLocaleDateString()
                        : "-"}

                    </td>

                    <td className="border p-2">
                      {row.particular}
                    </td>

                    <td className="border p-2 text-right">
                      ₹{row.debit}
                    </td>

                    <td className="border p-2 text-right">
                      ₹{row.credit}
                    </td>

                    <td className="border p-2 text-right font-bold">
                      ₹{row.balance}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

            <div className="mt-5 flex justify-end">

              <div className="bg-blue-100 rounded-lg px-6 py-4">

                <h3 className="font-bold">
                  Closing Balance
                </h3>

                <p className="text-2xl text-blue-700 font-bold">
                  ₹{closingBalance}
                </p>

              </div>

            </div>

          </div>

        )}

      </div>
    </MainLayout>
  );
}

export default CustomerStatement;