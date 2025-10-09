import { useState } from "react";
import {
  Chart,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

Chart.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

const stats = [
  {
    label: "Products",
    value: 120,
    icon: "📦",
    color: "bg-purple-100 text-purple-700",
  },
  {
    label: "Orders",
    value: 340,
    icon: "🛒",
    color: "bg-pink-100 text-pink-700",
  },
  {
    label: "Users",
    value: 89,
    icon: "👤",
    color: "bg-blue-100 text-blue-700",
  },
  {
    label: "Income",
    value: "$12,400",
    icon: "💰",
    color: "bg-green-100 text-green-700",
  },
];

const incomeData = [
  { date: "2024-08-01", value: 1200 },
  { date: "2024-08-02", value: 1800 },
  { date: "2024-08-03", value: 900 },
  { date: "2024-08-04", value: 2200 },
  { date: "2024-08-05", value: 1500 },
  { date: "2024-08-06", value: 1700 },
  { date: "2024-08-07", value: 2100 },
];

function Dashboard() {
  const [dateRange, setDateRange] = useState({
    from: "2024-08-01",
    to: "2024-08-07",
  });

  // Filter data by date range
  const filteredIncome = incomeData.filter(
    (d) => d.date >= dateRange.from && d.date <= dateRange.to
  );

  const chartData = {
    labels: filteredIncome.map((d) => d.date),
    datasets: [
      {
        label: "Income ($)",
        data: filteredIncome.map((d) => d.value),
        backgroundColor: "rgba(139, 92, 246, 0.6)",
        borderRadius: 8,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <h1 className="text-3xl font-bold mb-6 text-primary">
        Dashboard Overview
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`rounded-xl shadow flex flex-col items-center justify-center py-8 ${stat.color}`}
          >
            <span className="text-4xl mb-2">{stat.icon}</span>
            <span className="text-2xl font-bold">{stat.value}</span>
            <span className="text-sm mt-1">{stat.label}</span>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
          <h2 className="text-xl font-bold text-purple-700">Income Analysis</h2>
          <div className="flex items-center gap-2 min-w-[350px]">
            <label className="font-semibold">From</label>
            <input
              type="date"
              className="input input-bordered"
              value={dateRange.from}
              onChange={(e) =>
                setDateRange((r) => ({ ...r, from: e.target.value }))
              }
              max={dateRange.to}
            />
            <label className="font-semibold">To</label>
            <input
              type="date"
              className="input input-bordered"
              value={dateRange.to}
              onChange={(e) =>
                setDateRange((r) => ({ ...r, to: e.target.value }))
              }
              min={dateRange.from}
            />
          </div>
        </div>
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: { display: false },
              tooltip: { enabled: true },
            },
            scales: {
              x: { grid: { display: false } },
              y: { beginAtZero: true, grid: { color: "#f3f1fe" } },
            },
          }}
        />
      </div>
    </div>
  );
}

export default Dashboard;
