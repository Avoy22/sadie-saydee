export default function AnswerFeedback({ isCorrect, answer, explanation }) {
  return (
    <div
      style={{
        marginTop: 10,
        padding: 14,
        borderRadius: 16,
        background: isCorrect ? "#dcfce7" : "#fee2e2",
        border: isCorrect ? "1px solid #bbf7d0" : "1px solid #fecaca",
        color: isCorrect ? "#166534" : "#991b1b",
        lineHeight: 1.6,
      }}
    >
      <p style={{ fontWeight: 700 }}>
        {isCorrect ? "Correct" : "Wrong"}
      </p>
      <p>
        Correct answer: <strong>{answer}</strong>
      </p>
      <p>{explanation}</p>
    </div>
  );
}
