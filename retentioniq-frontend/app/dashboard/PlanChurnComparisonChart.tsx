"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

export type PlanChurnRow = {
  plan: string;
  active: number;
  churned: number;
};

interface Props {
  data: PlanChurnRow[];
}

export default function PlanChurnComparisonChart({ data }: Props) {
  return (
    <div className="chart-card">
      <h2 className="chart-title">Plan-wise Churn Comparison</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid stroke="rgba(255,255,255,0.05)" />

          <XAxis
            dataKey="plan"
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

          <Legend />

          <Bar dataKey="active" fill="#22c55e" radius={[6, 6, 0, 0]} />
          <Bar dataKey="churned" fill="#ff4da6" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}