import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { getSuppliers } from "../../services/supplierService";
import { getSupplierLedger } from "../../services/ledgerService";

function SupplierStatement() {

  const [suppliers, setSuppliers] = useState([]);
  const [supplierId, setSupplierId] = useState("");

  const [ledger, setLedger] = useState([]);
  const [supplierName, setSupplierName] = useState("");
  const [closingBalance, setClosingBalance] = useState(0);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
  try {
    const response = await getSuppliers();

    console.log("SUPPLIERS:", response);

    setSuppliers(response.data);

  } catch (error) {
    console.log(error);
  }
};

  const loadLedger = async () => {
    if (!supplierId) {
      alert("Select Supplier");
      return;
    }

    try {

      const response = await getSupplierLedger(supplierId);

      setLedger(response.data);
      setSupplierName(response.supplier);
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
          Supplier Statement
        </h2>

        <div className="bg-white shadow rounded-lg p-5">

          <div className="flex gap-4">

            <select
              className="border rounded-lg p-3 w-80"
              value={supplierId}
              onChange={(e) =>
                setSupplierId(e.target.value)
              }
            >

              <option value="">
                Select Supplier
              </option>

              {suppliers.map((supplier) => (

                <option
                  key={supplier._id}
                  value={supplier._id}
                >
                  {supplier.name}
                </option>

              ))}

            </select>

            <button
              onClick={loadLedger}
              className="bg-blue-600 text-white px-5 rounded-lg"
            >
              View Ledger
            </button>

          </div>

        </div>

        {ledger.length > 0 && (

          <div className="bg-white shadow rounded-lg p-5 mt-6">

            <h3 className="text-2xl font-bold mb-4">
              {supplierName} Ledger
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

                    <td className="border p-2 text-right font-semibold">
                      ₹{row.balance}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

            <div className="mt-5 text-right">

              <h2 className="text-2xl font-bold text-green-700">
                Closing Balance
              </h2>

              <p className="text-3xl font-bold">
                ₹{closingBalance}
              </p>

            </div>

          </div>

        )}

      </div>

    </MainLayout>
  );
}

export default SupplierStatement;