import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const TOTAL_USERS = 500;

const COUNTRIES = ["US", "IN", "CA", "UK", "DE", "AU"];
const PLANS = ["Free", "Pro", "Enterprise"];

function randomDate(start: Date, end: Date) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

async function main() {
  console.log("🌱 Reseeding users & subscriptions (schema-aligned)");

  /* ---------- CLEAN (ORDER MATTERS) ---------- */
  await prisma.subscriptions.deleteMany();
  await prisma.users.deleteMany();

  /* ---------- USERS ---------- */
  const users = [];

  for (let i = 1; i <= TOTAL_USERS; i++) {
    const plan =
      i <= 200 ? "Free" : i <= 400 ? "Pro" : "Enterprise";

    users.push({
      id: `user_${i}`,
      email: `user${i}@example.com`,
      company_name: `Company ${i}`,
      plan,
      signup_date: randomDate(
        new Date("2023-01-01"),
        new Date("2024-12-31")
      ),
      country: COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)],
    });
  }

  await prisma.users.createMany({ data: users });

  /* ---------- SUBSCRIPTIONS ---------- */
  const subscriptions = [];

  for (let i = 1; i <= TOTAL_USERS; i++) {
    const userPlan = users[i - 1].plan;

    const monthly_revenue =
      userPlan === "Free"
        ? 0
        : userPlan === "Pro"
        ? 20 + Math.floor(Math.random() * 80)
        : 150 + Math.floor(Math.random() * 200);

    const churnProbability =
      userPlan === "Free" ? 0.3 : userPlan === "Pro" ? 0.18 : 0.08;

    const isChurned = Math.random() < churnProbability;

    const startDate = randomDate(
      new Date("2024-01-01"),
      new Date("2025-01-01")
    );

    const endDate = isChurned
      ? randomDate(startDate, new Date("2025-02-15"))
      : null;

    subscriptions.push({
      id: `sub_${i}`,
      user_id: `user_${i}`,
      start_date: startDate,
      end_date: endDate,
      status: isChurned ? "CHURNED" : "ACTIVE",
      monthly_revenue,
    });
  }

  await prisma.subscriptions.createMany({ data: subscriptions });

  console.log("✅ Seed successful: 500 users + subscriptions created");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });