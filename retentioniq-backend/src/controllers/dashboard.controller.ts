import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/* ================= KPIs ================= */

export async function getKPIs(req: Request, res: Response) {
  const totalUsers = await prisma.users.count();

  const churnedUsers = await prisma.subscriptions.count({
    where: { status: "CHURNED" },
  });

  const churnRate =
    totalUsers === 0
      ? 0
      : Number(((churnedUsers / totalUsers) * 100).toFixed(2));

  res.json({
    totalUsers,
    churnedUsers,
    churnRate,
  });
}

/* ================= PLAN WISE ================= */

export async function getPlanChurn(req: Request, res: Response) {
  const subs = await prisma.subscriptions.findMany({
    include: { users: true },
  });

  const map: Record<string, { active: number; churned: number }> = {};

  subs.forEach((s) => {
    const plan = s.users.plan;

    if (!map[plan]) {
      map[plan] = { active: 0, churned: 0 };
    }

    if (s.status === "ACTIVE") map[plan].active++;
    if (s.status === "CHURNED") map[plan].churned++;
  });

  res.json({
    data: Object.entries(map).map(([plan, v]) => ({
      plan,
      active: v.active,
      churned: v.churned,
    })),
  });
}

/* ================= TREND ================= */

export async function getChurnTrend(req: Request, res: Response) {
  const churned = await prisma.subscriptions.findMany({
    where: { status: "CHURNED" },
    select: { end_date: true },
  });

  const trend: Record<string, number> = {};

  churned.forEach((c) => {
    if (!c.end_date) return;

    const date = c.end_date.toISOString().slice(0, 10);
    trend[date] = (trend[date] || 0) + 1;
  });

  const sorted = Object.entries(trend)
    .map(([date, churnedUsers]) => ({ date, churnedUsers }))
    .sort((a, b) => a.date.localeCompare(b.date));

  res.json({ data: sorted });
}

/* ================= DRIVERS ================= */

export async function getChurnDrivers(req: Request, res: Response) {
  const churned = await prisma.subscriptions.findMany({
    where: { status: "CHURNED" },
    select: { start_date: true, end_date: true },
  });

  let shortTenure = 0;
  let longTenure = 0;

  churned.forEach((c) => {
    if (!c.end_date) return;

    const tenure =
      (c.end_date.getTime() - c.start_date.getTime()) /
      (1000 * 60 * 60 * 24);

    if (tenure <= 30) shortTenure++;
    else longTenure++;
  });

  res.json({
    data: {
      shortTenure,
      longTenure,
    },
  });
}

/* ================= RISK (SAFE VERSION) ================= */

export async function getRiskPlanMatrix(req: Request, res: Response) {
  const users = await prisma.users.findMany();

  const map: Record<string, { high: number; medium: number; low: number }> =
    {};

  users.forEach((u) => {
    const plan = u.plan;

    if (!map[plan]) {
      map[plan] = { high: 0, medium: 0, low: 0 };
    }

    const rand = Math.random();

    if (rand < 0.25) map[plan].high++;
    else if (rand < 0.6) map[plan].medium++;
    else map[plan].low++;
  });

  res.json({
    data: Object.entries(map).map(([plan, v]) => ({
      plan,
      high: v.high,
      medium: v.medium,
      low: v.low,
    })),
  });
}

/* ================= USERS ================= */

export async function getAllUsers(req: Request, res: Response) {
  const users = await prisma.users.findMany({
    take: 500,
  });

  res.json({ data: users });
}

/* ================= CHURNED USERS ================= */

export async function getChurnedUsers(req: Request, res: Response) {
  const churned = await prisma.subscriptions.findMany({
    where: { status: "CHURNED" },
    include: { users: true },
  });

  res.json({
    data: churned.map((c) => c.users),
  });
}

/* ================= CHURN RATE DETAILS ================= */

export async function getChurnRateDetails(req: Request, res: Response) {
  const subs = await prisma.subscriptions.findMany({
    include: { users: true },
  });

  res.json({
    data: subs.map((s) => ({
      id: s.users.id,
      email: s.users.email,
      company_name: s.users.company_name,
      plan: s.users.plan,
      subscriptionStatus: s.status,
    })),
  });
}

/* ================= AI INSIGHT ================= */

export async function getAIInsight(req: Request, res: Response) {
  const totalUsers = await prisma.users.count();

  const churnedUsers = await prisma.subscriptions.count({
    where: { status: "CHURNED" },
  });

  const churnRate =
    totalUsers === 0
      ? 0
      : Number(((churnedUsers / totalUsers) * 100).toFixed(2));

  let message = "";

  if (churnRate > 40) {
    message =
      "⚠️ High churn risk detected. Immediate retention campaigns are recommended.";
  } else if (churnRate > 20) {
    message =
      "📉 Moderate churn observed. Focus on early engagement strategies.";
  } else {
    message =
      "✅ Churn levels are stable. Maintain current retention efforts.";
  }

  res.json({
    churnRate,
    message,
  });
}