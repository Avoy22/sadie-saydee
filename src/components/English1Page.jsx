import { useState, useEffect } from "react";
import { englishData as englishPapers } from "../data/englishData.js";
import EnglishDetail from "./EnglishDetail.jsx";
import EnglishTopicList from "./EnglishTopicList.jsx";

export default function English1Page({ jumpToPaper, jumpToTopicId, clearJump }) {
  var _p = useState(null);
  var selectedPaper = _p[0];
  var setSelectedPaper = _p[1];

  var _t = useState(null);
  var selectedTopicId = _t[0];
  var setSelectedTopicId = _t[1];

  useEffect(
    function () {
      if (jumpToPaper && jumpToTopicId) {
        setSelectedPaper(jumpToPaper);
        setSelectedTopicId(jumpToTopicId);
        if (clearJump) clearJump();
      }
    },
    [jumpToPaper, jumpToTopicId]
  );

  if (selectedPaper !== null) {
    var paper = englishPapers[selectedPaper];

    if (selectedTopicId !== null && paper) {
      var topic = paper.topics.find(function (tp) {
        return tp.id === selectedTopicId;
      });
      if (topic) {
        return (
          <EnglishDetail
            topic={topic}
            onBack={function () {
              setSelectedTopicId(null);
            }}
          />
        );
      }
    }

    if (paper) {
      return (
        <EnglishTopicList
          paper={paper}
          onBack={function () {
            setSelectedPaper(null);
          }}
          onSelectTopic={function (id) {
            setSelectedTopicId(id);
          }}
        />
      );
    }
  }

  return (
    <div style={{ padding: "10px 0" }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 6 }}>
        English 1st Paper
      </h2>
      <p style={{ color: "#64748b", fontSize: 13, marginBottom: 16 }}>
        {"\u0995\u09CB\u09A8 Paper \u09AA\u09A1\u09BC\u09AC\u09C7?"}
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div
          onClick={function () {
            setSelectedPaper("1st");
          }}
          style={{
            background: "#f8fafc",
            border: "1px solid #e2e8f0",
            borderRadius: 14,
            padding: "22px 18px",
            cursor: "pointer",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: "#6366f1",
              marginBottom: 6,
            }}
          >
            1st Paper
          </p>
          <p
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: "#475569",
              marginBottom: 2,
            }}
          >
            Reading, Vocabulary
          </p>
          <p style={{ fontSize: 12, color: "#94a3b8" }}>
            {"\u09AA\u09A1\u09BC\u09BE \u0993 \u09B6\u09AC\u09CD\u09A6\u09AD\u09BE\u09A8\u09CD\u09A1\u09BE\u09B0"}
          </p>
        </div>

        <div
          onClick={function () {
            setSelectedPaper("2nd");
          }}
          style={{
            background: "#f8fafc",
            border: "1px solid #e2e8f0",
            borderRadius: 14,
            padding: "22px 18px",
            cursor: "pointer",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: "#6366f1",
              marginBottom: 6,
            }}
          >
            2nd Paper
          </p>
          <p
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: "#475569",
              marginBottom: 2,
            }}
          >
            Grammar, Writing
          </p>
          <p style={{ fontSize: 12, color: "#94a3b8" }}>
            {"\u09AC\u09CD\u09AF\u09BE\u0995\u09B0\u09A3 \u0993 \u09B0\u099A\u09A8\u09BE"}
          </p>
        </div>
      </div>
    </div>
  );
}
