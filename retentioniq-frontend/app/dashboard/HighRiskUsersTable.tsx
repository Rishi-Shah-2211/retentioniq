"use client";

import { useState, Fragment } from "react";

type HighRiskUser = {
  user_id: number;
  risk_level: "high";
  users: {
    email: string;
    company_name: string;
    plan: string;
  };
};

export default function HighRiskUsersTable({
  data,
}: {
  data: HighRiskUser[];
}) {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <div className="rounded-xl bg-slate-900 p-6 border border-slate-800">
      <h2 className="text-lg font-semibold text-slate-100 mb-4">
        High-Risk Users
      </h2>

      <div className="overflow-x-auto">
        {data.length === 0 ? (
          <p className="text-slate-400 text-sm">
            No high-risk users detected.
          </p>
        ) : (
          <table className="min-w-full text-sm text-slate-200">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="py-2 text-left">Company</th>
                <th className="py-2 text-left">Email</th>
                <th className="py-2 text-left">Plan</th>
                <th className="py-2 text-left">Risk</th>
              </tr>
            </thead>

            <tbody>
              {data.map((row) => (
                <Fragment key={row.user_id}>
                  <tr
                    onClick={() =>
                      setExpandedId(
                        expandedId === row.user_id ? null : row.user_id
                      )
                    }
                    className="
                      border-b border-slate-800 last:border-none
                      transition-colors duration-200
                      hover:bg-slate-800/50
                      cursor-pointer
                    "
                  >
                    <td className="py-2 font-medium">
                      {row.users.company_name}
                    </td>
                    <td className="py-2 text-slate-400">
                      {row.users.email}
                    </td>
                    <td className="py-2">
                      {row.users.plan}
                    </td>
                    <td className="py-2">
                      <span
                        className="
                          inline-flex items-center rounded-full
                          bg-red-500/10 px-3 py-1
                          text-xs font-medium text-red-400
                        "
                      >
                        High
                      </span>
                    </td>
                  </tr>

                  {expandedId === row.user_id && (
                    <tr className="bg-slate-900/60">
                      <td
                        colSpan={4}
                        className="px-2 py-4 text-sm text-slate-300"
                      >
                        <p>
                          <span className="font-medium text-slate-200">
                            Churn Probability:
                          </span>{" "}
                          82%
                        </p>
                        <p className="mt-1 text-slate-400">
                          Recommended action: Offer retention discount or
                          schedule a proactive check-in.
                        </p>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}