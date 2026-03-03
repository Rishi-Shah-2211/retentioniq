"use client";

type User = {
  id: string;
  email: string;
  company_name: string;
  plan: string;
  signup_date: string;
  country: string;
  riskScore?: number;
  riskLevel?: "LOW" | "MEDIUM" | "HIGH";
};

type Props = {
  users: User[];
};

export default function UsersTable({ users }: Props) {
  if (!users || users.length === 0) {
    return (
      <div className="text-center text-slate-400">
        No data available.
      </div>
    );
  }

  const showRiskColumns =
    users.some((u) => u.riskScore !== undefined);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-slate-300">
        <thead className="text-xs uppercase bg-slate-800/60 text-slate-400">
          <tr>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Company</th>
            <th className="px-4 py-3">Plan</th>
            <th className="px-4 py-3">Country</th>
            <th className="px-4 py-3">Signup</th>

            {showRiskColumns && (
              <>
                <th className="px-4 py-3">Risk Score</th>
                <th className="px-4 py-3">Risk Level</th>
              </>
            )}
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
              <td className="px-4 py-3">{u.country}</td>
              <td className="px-4 py-3">
                {new Date(u.signup_date).toLocaleDateString()}
              </td>

              {showRiskColumns && (
                <>
                  <td className="px-4 py-3 font-medium">
                    {u.riskScore ?? 0}%
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        u.riskLevel === "HIGH"
                          ? "bg-red-500/20 text-red-400"
                          : u.riskLevel === "MEDIUM"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-green-500/20 text-green-400"
                      }`}
                    >
                      {u.riskLevel ?? "LOW"}
                    </span>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}