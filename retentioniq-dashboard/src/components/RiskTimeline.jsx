import "./RiskTimeline.css";

export default function RiskTimeline({ value, onChange }) {
  function handleChange(e) {
    onChange(Number(e.target.value));
  }

  return (
    <div className="timeline-card card-3d">
      <div className="timeline-header">
        <span>Risk Over Time</span>
        <span className="timeline-value">{value}%</span>
      </div>

      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={handleChange}
        className="timeline-slider"
      />

      <div className="timeline-labels">
        <span>90d ago</span>
        <span>60d</span>
        <span>30d</span>
        <span>Now</span>
      </div>
    </div>
  );
}