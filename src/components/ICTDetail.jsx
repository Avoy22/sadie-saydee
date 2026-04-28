import MCQItem from "./MCQItem.jsx";

export default function ICTDetail({ topic, onBack }) {
  return (
    <div style={{ padding: "10px 0" }}>
      <button
        onClick={onBack}
        style={{
          background: "transparent",
          border: "1px solid #e2e8f0",
          color: "#6366f1",
          fontSize: 14,
          fontWeight: 600,
          fontFamily: "inherit",
          padding: "8px 14px",
          borderRadius: 10,
          cursor: "pointer",
          marginBottom: 16,
        }}
      >
        {"< Back"}
      </button>

      <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 2 }}>
        {topic.title}
      </h2>
      <p
        style={{
          fontSize: 15,
          color: "#6366f1",
          fontWeight: 600,
          marginBottom: 18,
        }}
      >
        {topic.titleBn}
      </p>

      <div
        style={{
          background: "#f8fafc",
          border: "1px solid #e2e8f0",
          borderRadius: 12,
          padding: "16px",
          marginBottom: 14,
        }}
      >
        <p
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: "#6366f1",
            marginBottom: 8,
          }}
        >
          {"\u09AC\u09CD\u09AF\u09BE\u0996\u09CD\u09AF\u09BE"}
        </p>
        <p style={{ fontSize: 14, lineHeight: 1.8, color: "#334155" }}>
          {topic.explanation}
        </p>
      </div>

      <div
        style={{
          background: "#eef2ff",
          border: "1px solid #c7d2fe",
          borderRadius: 12,
          padding: "14px 16px",
          marginBottom: 14,
        }}
      >
        <p
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: "#6366f1",
            marginBottom: 6,
          }}
        >
          Key Terms
        </p>
        <p style={{ fontSize: 14, lineHeight: 1.6, color: "#334155" }}>
          {topic.keyTerms}
        </p>
      </div>

      <div
        style={{
          background: "#fef3c7",
          border: "1px solid #fde68a",
          borderRadius: 12,
          padding: "14px 16px",
          marginBottom: 16,
        }}
      >
        <p
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: "#92400e",
            marginBottom: 6,
          }}
        >
          {"\u0995\u09C7\u09A8 \u0997\u09C1\u09B0\u09C1\u09A4\u09CD\u09AC\u09AA\u09C2\u09B0\u09CD\u09A3"}
        </p>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: "#78350f" }}>
          {topic.importance}
        </p>
      </div>

      {topic.mcqs && topic.mcqs.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <p
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: "#1e293b",
              marginBottom: 4,
            }}
          >
            {"\u09AA\u09CD\u09B0\u09CD\u09AF\u09BE\u0995\u099F\u09BF\u09B8 MCQ"}
          </p>
          <p
            style={{
              fontSize: 13,
              color: "#64748b",
              marginBottom: 14,
            }}
          >
            {"\u09AA\u09CD\u09B0\u09A4\u09BF\u099F\u09BE \u09AA\u09CD\u09B0\u09B6\u09CD\u09A8\u09C7\u09B0 \u0989\u09A4\u09CD\u09A4\u09B0 \u09A6\u09BE\u0993"}
          </p>
          {topic.mcqs.map(function (mcq, i) {
            return <MCQItem key={mcq.id} mcq={mcq} index={i} />;
          })}
        </div>
      )}

      <button
        onClick={onBack}
        style={{
          width: "100%",
          padding: "12px 20px",
          fontSize: 15,
          fontWeight: 600,
          fontFamily: "inherit",
          border: "none",
          borderRadius: 12,
          background: "#6366f1",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        {"Back to topics"}
      </button>
    </div>
  );
}
