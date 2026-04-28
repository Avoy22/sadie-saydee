export default function ScoreFeedback({ score, total, onRetry, message }) {
  return (
    <div
      style={{
        marginTop: 16,
        padding: 16,
        borderRadius: 12,
        background: "#eef2ff",
        border: "1px solid #c7d2fe",
        textAlign: "center",
      }}
    >
      <h3>Score: {score}/{total}</h3>
      {message && <p style={{ color: "#475569" }}>{message}</p>}
      <button
        onClick={onRetry}
        style={{
          marginTop: 10,
          padding: "10px 16px",
          border: "none",
          borderRadius: 10,
          background: "#6366f1",
          color: "#fff",
          fontWeight: 700,
          cursor: "pointer",
        }}
      >
        Try Again
      </button>
    </div>
  );
}
