export default function BackButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        marginBottom: 16,
        padding: "8px 12px",
        border: "1px solid #e2e8f0",
        borderRadius: 10,
        background: "#fff",
        cursor: "pointer",
        fontFamily: "inherit",
        color: "#6366f1",
        fontSize: 14,
        fontWeight: 600,
      }}
    >
      ← Back
    </button>
  );
}
