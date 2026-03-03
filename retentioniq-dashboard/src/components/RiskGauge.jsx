import { useEffect, useState } from "react";
import "./RiskGauge.css";

export default function RiskGauge({ value }) {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 900; // ms
    const startTime = performance.now();

    function animate(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const current = Math.floor(progress * value);
      setAnimatedValue(current);

      if (progress < 1) requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }, [value]);

  const angle = animatedValue * 3.6;

  return (
    <div className="gauge-wrapper">
      <svg width="260" height="260">
        <circle
          cx="130"
          cy="130"
          r="110"
          stroke="#1e293b"
          strokeWidth="16"
          fill="none"
        />
        <circle
          cx="130"
          cy="130"
          r="110"
          stroke={value > 70 ? "#ef4444" : value > 40 ? "#eab308" : "#22c55e"}
          strokeWidth="16"
          fill="none"
          strokeDasharray="690"
          strokeDashoffset={690 - (690 * angle) / 360}
          strokeLinecap="round"
        />
      </svg>

      <div className="gauge-center">
        <div className="gauge-value">{animatedValue}%</div>
        <div className="gauge-label">HIGH RISK</div>
      </div>
    </div>
  );
}