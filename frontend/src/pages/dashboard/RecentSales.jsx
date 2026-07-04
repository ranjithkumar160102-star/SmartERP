function RecentSales({ sales }) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">

      {/* Header */}

      <div className="flex items-center justify-between px-6 py-5 border-b bg-gradient-to-r from-blue-50 to-white">

        <div>

          <h2 className="text-xl font-bold text-slate-800">
            🧾 Recent Sales
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Latest customer invoices
          </p>

        </div>

      </div>

      {/* Table */}

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">
                Invoice
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">
                Customer
              </th>

              <th className="px-5 py-4 text-right text-sm font-semibold text-slate-700">
                Amount
              </th>

            </tr>

          </thead>

          <tbody>

            {sales.length === 0 ? (

              <tr>

                <td
                  colSpan={3}
                  className="text-center py-10 text-gray-400"
                >
                  No Sales Found
                </td>

              </tr>

            ) : (

              sales.map((sale) => (

                <tr
                  key={sale._id}
                  className="border-t hover:bg-blue-50 transition duration-200"
                >

                  {/* Invoice */}

                  <td className="px-5 py-4">

                    <span className="inline-flex px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
                      {sale.invoiceNo}
                    </span>

                  </td>

                  {/* Customer */}

                  <td className="px-5 py-4">

                    <div className="flex items-center gap-3">

                      <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">

                        {sale.customer?.name
                          ?.charAt(0)
                          ?.toUpperCase() || "C"}

                      </div>

                      <div>

                        <p className="font-semibold text-slate-800">
                          {sale.customer?.name || "-"}
                        </p>

                        <p className="text-xs text-gray-500">
                          Customer
                        </p>

                      </div>

                    </div>

                  </td>

                  {/* Amount */}

                  <td className="px-5 py-4 text-right">

                    <span className="font-bold text-emerald-600 text-lg">
                      ₹{sale.grandTotal?.toLocaleString()}
                    </span>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default RecentSales;