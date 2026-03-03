import { useEffect, useState, useRef } from "react";
import RiskGauge from "./components/RiskGauge";
import RiskTimeline from "./components/RiskTimeline";
import RiskDonut from "./components/RiskDonut";
import "./App.css";

/* =======================
   Mouse tilt helper
======================= */
function useTilt(ref) {
  function onMouseMove(e) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = -(y / rect.height - 0.5) * 8;
    const rotateY = (x / rect.width - 0.5) * 8;

    ref.current.style.transform = `
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateY(-6px)
    `;
  }

  function onMouseLeave() {
    if (!ref.current) return;
    ref.current.style.transform = "rotateX(0) rotateY(0)";
  }

  return { onMouseMove, onMouseLeave };
}

export default function App() {
  /* =======================
     STATE
  ======================= */
  const [rows, setRows] = useState([]);
  const [riskValue, setRiskValue] = useState(82);
  const [activeRiskFilter, setActiveRiskFilter] = useState(null);

  const gaugeRef = useRef(null);
  const tilt = useTilt(gaugeRef);

  /* =======================
     DATA LOAD
  ======================= */
  useEffect(() => {
    async function loadData() {
      const customerIds = [1, 2, 3, 4];
      const results = [];

      for (let id of customerIds) {
        const res = await fetch(
          `http://localhost:5000/ai/predict-churn/${id}`
        );
        const data = await res.json();

        results.push({
          customerId: id,
          probability: Number(data.churn_probability),
          risk: data.risk,
        });
      }

      setRows(results);

      // Set initial gauge to overall average
      if (results.length > 0) {
        const avg =
          results.reduce((s, r) => s + r.probability, 0) / results.length;
        setRiskValue(Math.round(avg));
      }
    }

    loadData();
  }, []);

  /* =======================
     HELPERS
  ======================= */
  function calculateAverageRisk(riskLabel) {
    if (!rows.length) return 0;

    const filtered = rows.filter((r) =>
      riskLabel ? r.risk === riskLabel : true
    );

    if (!filtered.length) return 0;

    const avg =
      filtered.reduce((sum, r) => sum + r.probability, 0) /
      filtered.length;

    return Math.round(avg);
  }

  function getRiskState() {
    if (riskValue >= 75) return "HIGH";
    if (riskValue >= 45) return "MEDIUM";
    return "LOW";
  }

  function getRiskExplanation() {
    if (riskValue >= 75) {
      return [
        "High churn probability detected based on recent behavior",
        "Short subscription tenure increases churn likelihood",
        "Past cancellation patterns raise risk confidence",
        "Immediate retention action recommended",
      ];
    }
  
    if (riskValue >= 45) {
      return [
        "Moderate churn risk observed",
        "Customer shows some instability signals",
        "Pricing sensitivity may affect retention",
        "Monitoring and engagement advised",
      ];
    }
  
    return [
      "Low churn risk detected",
      "Customer engagement remains stable",
      "No recent cancellation signals",
      "Retention risk currently minimal",
    ];
  }

  /* =======================
     RENDER
  ======================= */
  return (
    <div className="container">
      {/* TITLE */}
      <h1 className="page-title">
        RetentionIQ · Churn Intelligence Command
      </h1>

      {/* ALERT */}
      <div className="alert-strip">
        ⚠ ALERT: High churn probability detected in monitored accounts
      </div>

      {/* GAUGE */}
      <div className="hero">
        <div
          ref={gaugeRef}
          className="card-3d"
          onMouseMove={tilt.onMouseMove}
          onMouseLeave={tilt.onMouseLeave}
        >
          <RiskGauge value={riskValue} />
        </div>
      </div>

      {/* TIMELINE */}
      <div className="card-3d">
      <RiskTimeline
  value={riskValue}
  onChange={setRiskValue}
/>
      </div>

      {/* SIGNAL STRIP */}
      <div className="signal-strip">
        <div className="signal high">
          <span className="dot"></span> Low Tenure Detected
        </div>
        <div className="signal high">
          <span className="dot"></span> Recent Cancellation
        </div>
        <div className="signal medium">
          <span className="dot"></span> Price Sensitivity
        </div>
        <div className="signal low">
          <span className="dot"></span> Engagement Stable
        </div>
      </div>

      {/* DONUT */}
      <RiskDonut
        data={[
          { name: "HIGH", value: rows.filter(r => r.risk === "HIGH").length },
          { name: "MEDIUM", value: rows.filter(r => r.risk === "MEDIUM").length },
          { name: "LOW", value: rows.filter(r => r.risk === "LOW").length },
        ]}
      />

<div className="table-card ai-panel">
  <h3 className="ai-title">AI Risk Analysis</h3>

  <ul className="ai-list">
    {getRiskExplanation().map((point, i) => (
      <li key={i}>• {point}</li>
    ))}
  </ul>

  <div className="ai-footer">
    Model state: <span>{riskValue >= 75 ? "CONFIDENT" : "MONITORING"}</span>
  </div>
</div>
{/* THREAT PANEL */}
<div className="threat-panel">
  <div className="threat-item">
    <div className="threat-label">Risk State</div>
    <div className={`threat-value ${getRiskState().toLowerCase()}`}>
      {getRiskState()}
    </div>
  </div>
  <div className="threat-item">
    <div className="threat-label">Model Confidence</div>
    <div className="threat-value">{riskValue}%</div>
  </div>
  <div className="threat-item">
    <div className="threat-label">System Status</div>
    <div className="threat-value">ACTIVE</div>
  </div>
  <div className="threat-item">
    <div className="threat-label">Recommended Action</div>
    <div className="threat-value">ENGAGE CUSTOMER</div>
  </div>
</div>

{/* KPI CARDS */}
      <div className="kpi-grid">
        <div
          className={`card-3d kpi-card ${activeRiskFilter === null ? "active" : ""}`}
          onClick={() => {
            setActiveRiskFilter(null);
            setRiskValue(calculateAverageRisk(null));
          }}
        >
          <div className="kpi-title">Customers</div>
          <div className="kpi-value">{rows.length}</div>
        </div>

        {["HIGH", "MEDIUM", "LOW"].map((level) => (
          <div
            key={level}
            className={`card-3d kpi-card ${
              activeRiskFilter === level ? "active" : ""
            }`}
            onClick={() => {
              setActiveRiskFilter(level);
              setRiskValue(calculateAverageRisk(level));
            }}
          >
            <div className="kpi-title">{level} Risk</div>
            <div className="kpi-value">
              {rows.filter((r) => r.risk === level).length}
            </div>
          </div>
        ))}
      </div>

      {/* TABLE */}
    </div>
  );
}