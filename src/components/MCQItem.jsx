import { useState } from "react";

export default function MCQItem({ mcq, index }) {
  var _s = useState(null);
  var selected = _s[0];
  var setSelected = _s[1];
  var answered = selected !== null;

  function handleClick(i) {
    if (answered) return;
    setSelected(i);
  }

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #e2e8f0",
        borderRadius: 12,
        padding: "16px",
        marginBottom: 12,
      }}
    >
      <p
        style={{
          fontSize: 14,
          fontWeight: 700,
          color: "#1e293b",
          marginBottom: 12,
          lineHeight: 1.6,
        }}
      >
        {index + 1}. {mcq.question}
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {mcq.options.map(function (opt, i) {
          var bg = "#f8fafc";
          var border = "1px solid #e2e8f0";
          var color = "#334155";
          if (answered) {
            if (i === mcq.correctAnswer) {
              bg = "#dcfce7";
              border = "2px solid #22c55e";
              color = "#166534";
            } else if (i === selected) {
              bg = "#fee2e2";
              border = "2px solid #ef4444";
              color = "#991b1b";
            }
          }
          return (
            <button
              key={i}
              onClick={function () {
                handleClick(i);
              }}
              style={{
                textAlign: "left",
                padding: "12px 14px",
                borderRadius: 10,
                background: bg,
                border: border,
                color: color,
                fontSize: 14,
                fontFamily: "inherit",
                fontWeight: 500,
                cursor: answered ? "default" : "pointer",
                lineHeight: 1.5,
              }}
            >
              {String.fromCharCode(65 + i)}. {opt}
            </button>
          );
        })}
      </div>
      {answered && (
        <div
          style={{
            marginTop: 12,
            padding: "12px 14px",
            borderRadius: 10,
            background: selected === mcq.correctAnswer ? "#f0fdf4" : "#fef2f2",
            border:
              selected === mcq.correctAnswer
                ? "1px solid #bbf7d0"
                : "1px solid #fecaca",
            fontSize: 13,
            lineHeight: 1.7,
            color: "#334155",
          }}
        >
          <p style={{ fontWeight: 700, marginBottom: 4 }}>
            {selected === mcq.correctAnswer
              ? "\u09B8\u09A0\u09BF\u0995! \u09AD\u09BE\u09B2\u09CB \u0995\u09B0\u09C7\u099B\u09CB\u0964"
              : "\u09AD\u09C1\u09B2 \u09B9\u09AF\u09BC\u09C7\u099B\u09C7\u0964 \u0986\u09AC\u09BE\u09B0 \u09A6\u09C7\u0996\u09CB\u0964"}
          </p>
          <p>{mcq.explanation}</p>
        </div>
      )}
    </div>
  );
}
