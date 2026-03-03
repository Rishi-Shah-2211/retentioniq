"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export type ChurnTrendRow = {
  date: string;
  churnedUsers: number;
};

interface Props {
  data: ChurnTrendRow[];
}

export default function ChurnTrendChart({ data }: Props) {
  return (
    <div className="chart-card">
      <h2 className="chart-title">Churned Over Time</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid stroke="rgba(255,255,255,0.05)" />

          <XAxis
            dataKey="date"
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
              border: "1px solid rgba(255,0,128,0.3)",
              borderRadius: "10px",
              color: "#fff",
            }}
            cursor={{ stroke: "rgba(255,0,128,0.2)" }}
          />

          {/* Glow Layer */}
          <Line
            type="natural"
            dataKey="churnedUsers"
            stroke="#ff4da6"
            strokeWidth={6}
            dot={false}
            activeDot={false}
            strokeOpacity={0.2}
          />

          {/* Main Line */}
          <Line
            type="natural"
            dataKey="churnedUsers"
            stroke="#ff4da6"
            strokeWidth={3}
            dot={false}
            activeDot={false}
            animationDuration={1000}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}