function CustomerTable() {
  return (
    <div className="bg-white rounded-lg shadow border overflow-hidden">
      <table className="w-full">
        <thead className="bg-slate-100">
          <tr>
            <th className="text-left p-3 border">Customer Name</th>
            <th className="text-left p-3 border">Mobile</th>
            <th className="text-left p-3 border">City</th>
            <th className="text-left p-3 border">Balance</th>
            <th className="text-center p-3 border">Action</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td className="p-3 border">No Customers Found</td>
            <td className="p-3 border">-</td>
            <td className="p-3 border">-</td>
            <td className="p-3 border">₹0</td>
            <td className="p-3 border text-center">-</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default CustomerTable;