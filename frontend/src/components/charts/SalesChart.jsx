import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

const data = [
  {
    month: "Jan",
    sales: 45000,
    purchase: 32000,
  },
  {
    month: "Feb",
    sales: 52000,
    purchase: 40000,
  },
  {
    month: "Mar",
    sales: 61000,
    purchase: 47000,
  },
  {
    month: "Apr",
    sales: 70000,
    purchase: 51000,
  },
  {
    month: "May",
    sales: 68000,
    purchase: 55000,
  },
  {
    month: "Jun",
    sales: 83000,
    purchase: 62000,
  },
];

function SalesChart() {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">

      {/* Header */}

      <div className="flex items-center justify-between mb-6">

        <div>

          <h2 className="text-xl font-bold text-slate-800">
            Sales vs Purchase
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Monthly Business Comparison
          </p>

        </div>

        <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
          2026
        </div>

      </div>

      {/* Chart */}

      <ResponsiveContainer width="100%" height={320}>

        <BarChart data={data}>

          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
          />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip
            formatter={(value) => `₹${value.toLocaleString()}`}
          />

          <Legend />

          <Bar
            dataKey="sales"
            name="Sales"
            radius={[8, 8, 0, 0]}
            fill="#3b82f6"
          />

          <Bar
            dataKey="purchase"
            name="Purchase"
            radius={[8, 8, 0, 0]}
            fill="#10b981"
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}

export default SalesChart;