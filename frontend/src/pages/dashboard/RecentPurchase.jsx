function RecentPurchase({ purchases }) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">

      {/* Header */}

      <div className="flex items-center justify-between px-6 py-5 border-b bg-gradient-to-r from-green-50 to-white">

        <div>

          <h2 className="text-xl font-bold text-slate-800">
            📥 Recent Purchases
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Latest supplier purchases
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
                Supplier
              </th>

              <th className="px-5 py-4 text-right text-sm font-semibold text-slate-700">
                Amount
              </th>

            </tr>

          </thead>

          <tbody>

            {purchases.length === 0 ? (

              <tr>

                <td
                  colSpan={3}
                  className="text-center py-10 text-gray-400"
                >
                  No Purchases Found
                </td>

              </tr>

            ) : (

              purchases.map((purchase) => (

                <tr
                  key={purchase._id}
                  className="border-t hover:bg-green-50 transition duration-200"
                >

                  {/* Invoice */}

                  <td className="px-5 py-4">

                    <span className="inline-flex px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
                      {purchase.invoiceNo}
                    </span>

                  </td>

                  {/* Supplier */}

                  <td className="px-5 py-4">

                    <div className="flex items-center gap-3">

                      <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">

                        {purchase.supplier?.name
                          ?.charAt(0)
                          ?.toUpperCase() || "S"}

                      </div>

                      <div>

                        <p className="font-semibold text-slate-800">
                          {purchase.supplier?.name || "-"}
                        </p>

                        <p className="text-xs text-gray-500">
                          Supplier
                        </p>

                      </div>

                    </div>

                  </td>

                  {/* Amount */}

                  <td className="px-5 py-4 text-right">

                    <span className="font-bold text-blue-600 text-lg">
                      ₹{purchase.grandTotal?.toLocaleString()}
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

export default RecentPurchase;