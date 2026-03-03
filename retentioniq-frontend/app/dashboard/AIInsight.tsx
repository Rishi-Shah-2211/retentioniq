"use client";

interface Props {
  churnRate: number;
  message: string;
}

export default function AIInsight({ churnRate, message }: Props) {
  return (
    <div className="mt-10 rounded-2xl border border-pink-500/20 bg-gradient-to-br from-[#0f0c29] via-[#1a1a2e] to-[#090617] p-8 shadow-[0_0_40px_rgba(255,0,128,0.08)] backdrop-blur-xl transition-all duration-500 hover:shadow-[0_0_60px_rgba(255,0,128,0.15)] animate-fadeIn">
      <h2 className="mb-4 text-2xl font-semibold text-pink-400">
        🤖 AI Insight
      </h2>

      <p className="text-lg text-gray-300 mb-2">
        Current Churn Rate:{" "}
        <span className="font-semibold text-pink-400">
          {churnRate}%
        </span>
      </p>

      <p className="text-gray-400 leading-relaxed">
        {message}
      </p>
    </div>
  );
}