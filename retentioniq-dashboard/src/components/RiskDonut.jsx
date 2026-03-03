import { PieChart, Pie, Cell } from "recharts";

const COLORS = {
  LOW: "#22c55e",
  MEDIUM: "#eab308",
  HIGH: "#ef4444",
};

export default function RiskDonut({ data }) {
  return (
    <PieChart width={280} height={280}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        innerRadius={70}
        outerRadius={100}
      >
        {data.map((entry) => (
          <Cell key={entry.name} fill={COLORS[entry.name]} />
        ))}
      </Pie>
    </PieChart>
  );
}