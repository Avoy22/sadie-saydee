import { useState, useEffect } from "react";
import { ictTopics } from "../data/ictTopics.js";
import ICTDetail from "./ICTDetail.jsx";

export default function ICTPage({ jumpToTopicId, clearJump }) {
  var _s = useState(null);
  var selectedId = _s[0];
  var setSelectedId = _s[1];

  useEffect(
    function () {
      if (jumpToTopicId !== null && jumpToTopicId !== undefined) {
        setSelectedId(jumpToTopicId);
        if (clearJump) clearJump();
      }
    },
    [jumpToTopicId]
  );

  if (selectedId !== null) {
    var topic = ictTopics.find(function (t) {
      return t.id === selectedId;
    });
    if (topic) {
      return (
        <ICTDetail
          topic={topic}
          onBack={function () {
            setSelectedId(null);
          }}
        />
      );
    }
  }

  return (
    <div style={{ padding: "10px 0" }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 6 }}>ICT</h2>
      <p style={{ color: "#64748b", fontSize: 13, marginBottom: 16 }}>
        {"\u09EA\u099F\u09BF Topic -- \u098F\u0995\u099F\u09BE \u098F\u0995\u099F\u09BE \u0995\u09B0\u09C7 \u09B6\u09BF\u0996\u09CB"}
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {ictTopics.map(function (topic) {
          return (
            <div
              key={topic.id}
              onClick={function () {
                setSelectedId(topic.id);
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
                {topic.id}. {topic.title}
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
              <p style={{ fontSize: 12, color: "#94a3b8" }}>
                Key Terms: {topic.keyTerms}
              </p>
              <p
                style={{
                  fontSize: 12,
                  color: "#6366f1",
                  fontWeight: 600,
                  marginTop: 10,
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
