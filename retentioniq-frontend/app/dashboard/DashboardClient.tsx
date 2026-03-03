"use client";

import KPICards from "./KPICards";
import PlanChurnComparisonChart from "./PlanChurnComparisonChart";
import ChurnTrendChart from "./ChurnTrendChart";
import ChurnDriversChart from "./ChurnDriversChart";
import RiskPlanMatrixChart from "./RiskPlanMatrixChart";
import AIInsight from "./AIInsight";

/* ================= TYPES ================= */

export type KPIResponse = {
  totalUsers: number;
  churnedUsers: number;
  churnRate: number;
};

export type PlanChurnRow = {
  plan: string;
  active: number;
  churned: number;
};

export type ChurnTrendRow = {
  date: string;
  churnedUsers: number;
};

export type ChurnDriversResponse = {
  shortTenure: number;
  longTenure: number;
};

export type RiskPlanRow = {
  plan: string;
  high: number;
  medium: number;
  low: number;
};

/* ================= PROPS ================= */

interface DashboardClientProps {
  kpis: KPIResponse;
  planChurn: PlanChurnRow[];
  churnTrend: ChurnTrendRow[];
  churnDrivers: ChurnDriversResponse;
  riskPlan: RiskPlanRow[];
  insight: {
    churnRate: number;
    message: string;
  };
}

/* ================= COMPONENT ================= */

export default function DashboardClient({
  kpis,
  planChurn,
  churnTrend,
  churnDrivers,
  riskPlan,
  insight,
}: DashboardClientProps) {
  return (
    <main className="min-h-screen px-8 py-10 space-y-14 bg-gradient-to-br from-slate-950 via-slate-900 to-black">
      <h1 className="text-center text-4xl font-semibold tracking-wide text-pink-400">
        RetentionIQ — Churn Intelligence
      </h1>

      <KPICards
        totalUsers={kpis.totalUsers}
        churnedUsers={kpis.churnedUsers}
        churnRate={kpis.churnRate.toFixed(2)}
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <PlanChurnComparisonChart data={planChurn} />
        <ChurnTrendChart data={churnTrend} />
        <ChurnDriversChart data={churnDrivers} />
        <RiskPlanMatrixChart data={riskPlan} />
      </div>

      <AIInsight
        churnRate={insight.churnRate}
        message={insight.message}
      />
    </main>
  );
}