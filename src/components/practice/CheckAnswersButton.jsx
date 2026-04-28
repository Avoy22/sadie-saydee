export default function CheckAnswersButton({ onClick, label = "Check Answers" }) {
  return (
    <button
      onClick={onClick}
      style={{
        marginTop: 16,
        width: "100%",
        padding: "14px 20px",
        border: "none",
        borderRadius: 12,
        background: "#6366f1",
        color: "#fff",
        fontWeight: 700,
        cursor: "pointer",
        fontFamily: "inherit",
      }}
    >
      {label}
    </button>
  );
}
