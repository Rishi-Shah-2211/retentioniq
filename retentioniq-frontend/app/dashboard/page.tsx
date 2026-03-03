import DashboardClient from "./DashboardClient";
import type {
  KPIResponse,
  PlanChurnRow,
  ChurnTrendRow,
  ChurnDriversResponse,
  RiskPlanRow,
} from "./DashboardClient";

import { fetcher } from "@/lib/api";

/* ================= FETCHERS ================= */

async function getKPIs(): Promise<KPIResponse> {
  return fetcher("/kpis");
}

async function getPlanChurn(): Promise<{ data: PlanChurnRow[] }> {
  return fetcher("/churn/plan-wise");
}

async function getTrend(): Promise<{ data: ChurnTrendRow[] }> {
  return fetcher("/churn/trend");
}

async function getDrivers(): Promise<{ data: ChurnDriversResponse }> {
  return fetcher("/churn/drivers");
}

async function getRisk(): Promise<{ data: RiskPlanRow[] }> {
  return fetcher("/churn/risk-plan-matrix");
}

async function getInsight(): Promise<{
  churnRate: number;
  message: string;
}> {
  return fetcher("/insight");
}

/* ================= PAGE ================= */

export default async function DashboardPage() {
  const [
    kpis,
    planChurn,
    churnTrend,
    churnDrivers,
    riskPlan,
    insight,
  ] = await Promise.all([
    getKPIs(),
    getPlanChurn(),
    getTrend(),
    getDrivers(),
    getRisk(),
    getInsight(),
  ]);

  return (
    <DashboardClient
      kpis={kpis}
      planChurn={planChurn.data}
      churnTrend={churnTrend.data}
      churnDrivers={churnDrivers.data}
      riskPlan={riskPlan.data}
      insight={insight}
    />
  );
}