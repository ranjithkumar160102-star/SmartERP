import {
  AreaChart,
  Area,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    month: "Jan",
    revenue: 25000,
  },
  {
    month: "Feb",
    revenue: 42000,
  },
  {
    month: "Mar",
    revenue: 38000,
  },
  {
    month: "Apr",
    revenue: 61000,
  },
  {
    month: "May",
    revenue: 54000,
  },
  {
    month: "Jun",
    revenue: 78000,
  },
];

function RevenueChart() {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-xl transition-all duration-300">

      {/* Header */}

      <div className="flex items-center justify-between mb-6">

        <div>

          <h2 className="text-xl font-bold text-slate-800">
            Revenue Overview
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Monthly Revenue Trend
          </p>

        </div>

        <div className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold">
          +18%
        </div>

      </div>

      {/* Chart */}

      <ResponsiveContainer width="100%" height={320}>

        <AreaChart data={data}>

          <defs>

            <linearGradient
              id="colorRevenue"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stopColor="#2563eb"
                stopOpacity={0.8}
              />

              <stop
                offset="95%"
                stopColor="#2563eb"
                stopOpacity={0}
              />

            </linearGradient>

          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
          />

          <XAxis
            dataKey="month"
          />

          <YAxis />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#2563eb"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorRevenue)"
          />

        </AreaChart>

      </ResponsiveContainer>

    </div>
  );
}

export default RevenueChart;