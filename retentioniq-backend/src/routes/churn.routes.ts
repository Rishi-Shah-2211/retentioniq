import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

/* ============================
   B1 — Plan-wise Churn
============================ */
router.get("/plan-wise", async (_, res) => {
  try {
    const subs = await prisma.subscriptions.findMany({
      select: { end_date: true },
    });

    const totalUsers = subs.length;
    const churnedUsers = subs.filter(s => s.end_date !== null).length;

    res.json({
      data: [
        {
          plan: "ALL",
          totalUsers,
          churnedUsers,
          churnRate: totalUsers
            ? Number(((churnedUsers / totalUsers) * 100).toFixed(2))
            : 0,
        },
      ],
    });
  } catch {
    res.status(500).json({ message: "Plan-wise churn failed" });
  }
});

/* ============================
   B2 — Churn Trend (WEEKLY)
============================ */
router.get("/trend", async (_, res) => {
  try {
    const subs = await prisma.subscriptions.findMany({
      where: { end_date: { not: null } },
      select: { end_date: true },
    });

    const weekly: Record<string, number> = {};

    subs.forEach(s => {
      const d = new Date(s.end_date!);
      const week = `${d.getFullYear()}-W${Math.ceil(d.getDate() / 7)}`;
      weekly[week] = (weekly[week] || 0) + 1;
    });

    const data = Object.entries(weekly)
      .map(([week, churnedUsers]) => ({ week, churnedUsers }))
      .sort((a, b) => a.week.localeCompare(b.week));

    res.json({ data });
  } catch {
    res.status(500).json({ message: "Churn trend failed" });
  }
});

/* ============================
   B3 — Churn Drivers
============================ */
router.get("/drivers", async (_, res) => {
  try {
    const subs = await prisma.subscriptions.findMany({
      where: { end_date: { not: null } },
      select: { start_date: true, end_date: true },
    });

    let shortTenure = 0;

    subs.forEach(s => {
      const days =
        (s.end_date!.getTime() - s.start_date.getTime()) /
        (1000 * 60 * 60 * 24);
      if (days <= 14) shortTenure++;
    });

    res.json({
      data: {
        short_tenure: shortTenure,
        inactive_before_churn: 0,
      },
    });
  } catch {
    res.status(500).json({ message: "Churn drivers failed" });
  }
});

/* ============================
   B4 — Risk Distribution
============================ */
router.get("/risk-plan-matrix", async (_, res) => {
  try {
    const subs = await prisma.subscriptions.findMany({
      select: { start_date: true, end_date: true },
    });

    const buckets = { LOW: 0, MEDIUM: 0, HIGH: 0 };

    subs.forEach(s => {
      if (!s.end_date) return;

      const days =
        (s.end_date.getTime() - s.start_date.getTime()) /
        (1000 * 60 * 60 * 24);

      if (days <= 7) buckets.HIGH++;
      else if (days <= 30) buckets.MEDIUM++;
      else buckets.LOW++;
    });

    res.json({
      data: Object.entries(buckets).map(([risk, users]) => ({
        plan: "ALL",
        risk,
        users,
      })),
    });
  } catch {
    res.status(500).json({ message: "Risk matrix failed" });
  }
});

export default router;