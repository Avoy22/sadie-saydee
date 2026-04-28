export default function EnglishTopicList({ paper, onBack, onSelectTopic }) {
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
        {"< Back to papers"}
      </button>

      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 2 }}>
        {paper.title}
      </h2>
      <p
        style={{
          fontSize: 14,
          color: "#6366f1",
          fontWeight: 600,
          marginBottom: 16,
        }}
      >
        {paper.titleBn}
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {paper.topics.map(function (topic, idx) {
          return (
            <div
              key={topic.id}
              onClick={function () {
                onSelectTopic(topic.id);
              }}
              style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: 14,
                padding: "18px 16px",
                cursor: "pointer",
              }}
            >
              <p
                style={{
                  fontSize: 17,
                  fontWeight: 700,
                  color: "#1e293b",
                  marginBottom: 2,
                }}
              >
                {idx + 1}. {topic.title}
              </p>
              <p
                style={{
                  fontSize: 13,
                  color: "#6366f1",
                  fontWeight: 600,
                  marginBottom: 10,
                }}
              >
                {topic.titleBn}
              </p>
              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.7,
                  color: "#475569",
                  marginBottom: 10,
                }}
              >
                {topic.explanation}
              </p>
              <p
                style={{
                  fontSize: 12,
                  color: "#6366f1",
                  fontWeight: 600,
                }}
              >
                {"Tap to view details >"}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
