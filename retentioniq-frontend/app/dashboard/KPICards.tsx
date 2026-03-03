"use client";

import { useState, useEffect } from "react";
import { fetcher } from "@/lib/api";

/* ================= TYPES ================= */

interface Props {
  totalUsers: number;
  churnedUsers: number;
  churnRate: string;
}

interface User {
  id: string;
  email: string;
  company_name: string;
  plan: string;
}

/* ================= COMPONENT ================= */

export default function KPICards({
  totalUsers,
  churnedUsers,
  churnRate,
}: Props) {
  const [modalType, setModalType] = useState<
    "total" | "churned" | "rate" | null
  >(null);

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH ================= */

  useEffect(() => {
    if (!modalType) return;

    async function loadData() {
      setLoading(true);

      try {
        let endpoint = "";

        if (modalType === "total") endpoint = "/users";
        if (modalType === "churned") endpoint = "/churned-users";
        if (modalType === "rate") endpoint = "/churn-rate-details";

        const res = await fetcher<{ data: User[] }>(endpoint);
        setUsers(res.data);
      } catch (err) {
        console.error("Failed loading users:", err);
        setUsers([]);
      }

      setLoading(false);
    }

    loadData();
  }, [modalType]);

  return (
    <>
      <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <KPICard
          title="Total Users"
          value={totalUsers}
          subtitle="All registered users"
          accent="from-cyan-500/20 to-blue-600/10"
          onClick={() => setModalType("total")}
        />

        <KPICard
          title="Churned Users"
          value={churnedUsers}
          subtitle="Users who cancelled"
          accent="from-rose-500/20 to-pink-600/10"
          onClick={() => setModalType("churned")}
        />

        <KPICard
          title="Churn Rate"
          value={`${churnRate}%`}
          subtitle="Overall churn percentage"
          accent="from-purple-500/20 to-indigo-600/10"
          onClick={() => setModalType("rate")}
        />
      </section>

      {/* ================= MODAL ================= */}

      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="w-[90%] max-w-4xl rounded-2xl bg-[#0f172a] p-8 shadow-2xl border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-pink-400">
                {modalType === "total" && "All Customers"}
                {modalType === "churned" && "Churned Customers"}
                {modalType === "rate" && "Churn Rate Details"}
              </h2>

              <button
                onClick={() => setModalType(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {loading ? (
              <p className="text-gray-400">Loading...</p>
            ) : users.length === 0 ? (
              <p className="text-gray-400">No data available.</p>
            ) : (
              <div className="max-h-[400px] overflow-y-auto">
                <table className="w-full text-sm text-left text-gray-300">
                  <thead className="text-xs uppercase bg-slate-800 text-gray-400">
                    <tr>
                      <th className="px-4 py-3">Email</th>
                      <th className="px-4 py-3">Company</th>
                      <th className="px-4 py-3">Plan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr
                        key={u.id}
                        className="border-b border-white/5 hover:bg-white/5 transition"
                      >
                        <td className="px-4 py-3">{u.email}</td>
                        <td className="px-4 py-3">{u.company_name}</td>
                        <td className="px-4 py-3">{u.plan}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

/* ================= CARD ================= */

interface CardProps {
  title: string;
  value: string | number;
  subtitle: string;
  accent: string;
  onClick: () => void;
}

function KPICard({
  title,
  value,
  subtitle,
  accent,
  onClick,
}: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`relative cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-br ${accent}
        border border-white/10 p-6 backdrop-blur-xl
        shadow-[0_20px_40px_rgba(0,0,0,0.5)]
        transition-all duration-300 hover:scale-[1.03]`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

      <div className="relative z-10">
        <p className="text-sm text-white/70">{title}</p>
        <h2 className="mt-2 text-4xl font-semibold tracking-tight text-white">
          {value}
        </h2>
        <p className="mt-2 text-xs text-white/50">{subtitle}</p>
      </div>
    </div>
  );
}