export default function BackButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        marginBottom: 16,
        padding: "9px 14px",
        border: "1px solid #eadcff",
        borderRadius: 14,
        background: "#fff",
        cursor: "pointer",
        fontFamily: "inherit",
        color: "#7c3aed",
        fontSize: 14,
        fontWeight: 800,
        boxShadow: "0 8px 18px rgba(124, 58, 237, 0.08)",
      }}
    >
      ← Back
    </button>
  );
}
