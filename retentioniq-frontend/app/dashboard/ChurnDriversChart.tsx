"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export type ChurnDriversData = {
  shortTenure: number;
  longTenure: number;
};

interface Props {
  data: ChurnDriversData;
}

export default function ChurnDriversChart({ data }: Props) {
  const chartData = [
    { name: "Short Tenure", value: data.shortTenure },
    { name: "Long Tenure", value: data.longTenure },
  ];

  return (
    <div className="chart-card">
      <h2 className="chart-title">Top Churn Drivers</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid stroke="rgba(255,255,255,0.05)" />

          <XAxis
            dataKey="name"
            stroke="#9ca3af"
            tick={{ fill: "#9ca3af", fontSize: 12 }}
          />

          <YAxis
            stroke="#9ca3af"
            tick={{ fill: "#9ca3af", fontSize: 12 }}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#0b0f1a",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "10px",
              color: "#fff",
            }}
            cursor={{ fill: "rgba(255,255,255,0.02)" }}
          />

          <Bar
            dataKey="value"
            fill="#ff4da6"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}