export default function CheckAnswersButton({ onClick, label = "Check Answers" }) {
  return (
    <button
      onClick={onClick}
      style={{
        marginTop: 16,
        width: "100%",
        padding: "14px 20px",
        border: "none",
        borderRadius: 18,
        background: "linear-gradient(135deg, #7c3aed, #ec4899)",
        color: "#fff",
        fontWeight: 800,
        cursor: "pointer",
        fontFamily: "inherit",
        boxShadow: "0 12px 24px rgba(124, 58, 237, 0.22)",
      }}
    >
      {label}
    </button>
  );
}
