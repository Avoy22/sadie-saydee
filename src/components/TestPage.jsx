import { useState } from "react";
import { collectAllMCQs, shuffleAndPick } from "../utils/mcq.js";
import { saveProgress } from "../utils/storage.js";
import { formatDateISO } from "../utils/date.js";

export default function TestPage({ goToTopic }) {
  var _st = useState("intro");
  var stage = _st[0];
  var setStage = _st[1];

  var _q = useState([]);
  var questions = _q[0];
  var setQuestions = _q[1];

  var _a = useState({});
  var answers = _a[0];
  var setAnswers = _a[1];

  function startTest() {
    var all = collectAllMCQs();
    var picked = shuffleAndPick(all, Math.min(10, all.length));
    setQuestions(picked);
    setAnswers({});
    setStage("running");
  }

  function selectOption(qId, optionIndex) {
    var next = {};
    Object.keys(answers).forEach(function (k) {
      next[k] = answers[k];
    });
    next[qId] = optionIndex;
    setAnswers(next);
  }

  function submitTest() {
    // Build weak topics list: group wrong answers by their source topic
    var weakMap = {};
    questions.forEach(function (q) {
      var isWrong = answers[q.id] !== q.correctAnswer;
      if (isWrong) {
        var key = q.subjectKey + ":" + q.topicId;
        if (!weakMap[key]) {
          weakMap[key] = {
            subjectKey: q.subjectKey,
            topicId: q.topicId,
            paperKey: q.paperKey,
            source: q.source,
            subject: q.subject,
            count: 0,
          };
        }
        weakMap[key].count++;
      }
    });
    var weakTopicList = Object.keys(weakMap).map(function (k) {
      return weakMap[k];
    });

    // Calculate score
    var correctCount = 0;
    questions.forEach(function (q) {
      if (answers[q.id] === q.correctAnswer) correctCount++;
    });

    // Save to localStorage
    saveProgress({
      score: correctCount,
      total: questions.length,
      weakTopics: weakTopicList,
      date: formatDateISO(new Date()),
    });

    setStage("done");
  }

  function retake() {
    setStage("intro");
    setQuestions([]);
    setAnswers({});
  }

  if (stage === "intro") {
    return (
      <div style={{ padding: "30px 0", textAlign: "center" }}>
        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>
          Mini Test
        </h2>
        <p
          style={{
            fontSize: 14,
            color: "#64748b",
            marginBottom: 6,
            lineHeight: 1.6,
          }}
        >
          ICT + English \u09A5\u09C7\u0995\u09C7 \u09E7\u09E6\u099F\u09BF Mixed MCQ
        </p>
        <p
          style={{
            fontSize: 13,
            color: "#94a3b8",
            marginBottom: 24,
            lineHeight: 1.6,
          }}
        >
          \u09AD\u09AF\u09BC \u09AA\u09C7\u09AF\u09BC\u09CB \u09A8\u09BE -- \u0986\u09B8\u09CD\u09A4\u09C7 \u0986\u09B8\u09CD\u09A4\u09C7 \u09A6\u09BE\u0993
        </p>
        <button
          onClick={startTest}
          style={{
            padding: "14px 24px",
            fontSize: 16,
            fontWeight: 700,
            fontFamily: "inherit",
            border: "none",
            borderRadius: 12,
            background: "#6366f1",
            color: "#fff",
            cursor: "pointer",
            width: "100%",
          }}
        >
          Start Test
        </button>
      </div>
    );
  }

  if (stage === "running") {
    var answeredCount = Object.keys(answers).length;
    return (
      <div style={{ padding: "10px 0" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 14,
          }}
        >
          <h2 style={{ fontSize: 20, fontWeight: 800 }}>Mini Test</h2>
          <span
            style={{
              fontSize: 13,
              color: "#6366f1",
              fontWeight: 600,
              background: "#eef2ff",
              padding: "4px 10px",
              borderRadius: 8,
            }}
          >
            {answeredCount}/{questions.length}
          </span>
        </div>

        {questions.map(function (q, idx) {
          var selected = answers[q.id];
          var hasSelected = typeof selected === "number";
          return (
            <div
              key={q.id}
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
                  fontSize: 11,
                  color: "#94a3b8",
                  marginBottom: 6,
                  fontWeight: 600,
                }}
              >
                {q.subject} - {q.source}
              </p>
              <p
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#1e293b",
                  marginBottom: 12,
                  lineHeight: 1.6,
                }}
              >
                {idx + 1}. {q.question}
              </p>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 8 }}
              >
                {q.options.map(function (opt, i) {
                  var isSelected = hasSelected && selected === i;
                  return (
                    <button
                      key={i}
                      onClick={function () {
                        selectOption(q.id, i);
                      }}
                      style={{
                        textAlign: "left",
                        padding: "12px 14px",
                        borderRadius: 10,
                        background: isSelected ? "#eef2ff" : "#f8fafc",
                        border: isSelected
                          ? "2px solid #6366f1"
                          : "1px solid #e2e8f0",
                        color: isSelected ? "#4338ca" : "#334155",
                        fontSize: 14,
                        fontFamily: "inherit",
                        fontWeight: isSelected ? 600 : 500,
                        cursor: "pointer",
                        lineHeight: 1.5,
                      }}
                    >
                      {String.fromCharCode(65 + i)}. {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}

        <button
          onClick={submitTest}
          style={{
            marginTop: 6,
            padding: "14px 20px",
            fontSize: 16,
            fontWeight: 700,
            fontFamily: "inherit",
            border: "none",
            borderRadius: 12,
            background: "#6366f1",
            color: "#fff",
            cursor: "pointer",
            width: "100%",
          }}
        >
          Submit Test
        </button>
      </div>
    );
  }

  var correct = 0;
  questions.forEach(function (q) {
    if (answers[q.id] === q.correctAnswer) correct++;
  });
  var total = questions.length;
  var percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

  var feedbackText = "";
  var feedbackColor = "";
  var feedbackBg = "";
  if (percentage >= 70) {
    feedbackText = "Great job! \uD83C\uDF1F";
    feedbackColor = "#166534";
    feedbackBg = "#dcfce7";
  } else if (percentage >= 40) {
    feedbackText = "Keep practicing \uD83D\uDCAA";
    feedbackColor = "#92400e";
    feedbackBg = "#fef3c7";
  } else {
    feedbackText = "Read again and try again \uD83D\uDCDA";
    feedbackColor = "#991b1b";
    feedbackBg = "#fee2e2";
  }

  var weakMap = {};
  questions.forEach(function (q) {
    var isWrong = answers[q.id] !== q.correctAnswer;
    if (isWrong) {
      var key = q.subjectKey + ":" + q.topicId;
      if (!weakMap[key]) {
        weakMap[key] = {
          subjectKey: q.subjectKey,
          topicId: q.topicId,
          paperKey: q.paperKey,
          source: q.source,
          subject: q.subject,
          count: 0,
        };
      }
      weakMap[key].count++;
    }
  });
  var weakTopics = Object.keys(weakMap).map(function (k) {
    return weakMap[k];
  });

  function handleWeakTopicClick(w) {
    if (!goToTopic) return;
    if (w.subjectKey === "ict") {
      goToTopic({ subject: "ict", topicId: w.topicId });
    } else if (w.subjectKey === "english") {
      goToTopic({
        subject: "english",
        paperKey: w.paperKey,
        topicId: w.topicId,
      });
    }
  }

  return (
    <div style={{ padding: "10px 0" }}>
      <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 16 }}>
        Test Result
      </h2>

      <div
        style={{
          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
          borderRadius: 14,
          padding: "24px 16px",
          color: "#fff",
          textAlign: "center",
          marginBottom: 16,
        }}
      >
        <p style={{ fontSize: 13, opacity: 0.85, marginBottom: 4 }}>
          Your score
        </p>
        <p style={{ fontSize: 48, fontWeight: 800, margin: "2px 0" }}>
          {correct}/{total}
        </p>
        <p style={{ fontSize: 16, opacity: 0.95, fontWeight: 600 }}>
          {percentage}%
        </p>
      </div>

      <div
        style={{
          background: feedbackBg,
          color: feedbackColor,
          borderRadius: 12,
          padding: "14px 16px",
          textAlign: "center",
          fontWeight: 700,
          fontSize: 15,
          marginBottom: 16,
        }}
      >
        {feedbackText}
      </div>

      {weakTopics.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <p
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: "#1e293b",
              marginBottom: 4,
            }}
          >
            Weak topics
          </p>
          <p
            style={{
              fontSize: 12,
              color: "#64748b",
              marginBottom: 10,
            }}
          >
            {"\u098F\u0987 Topic\u0997\u09C1\u09B2\u09CB \u0986\u09B0\u09CB \u09AA\u09CD\u09B0\u09CD\u09AF\u09BE\u0995\u099F\u09BF\u09B8 \u0995\u09B0\u09CB -- Tap to study"}
          </p>
          <div
            style={{ display: "flex", flexDirection: "column", gap: 8 }}
          >
            {weakTopics.map(function (w, idx) {
              return (
                <button
                  key={idx}
                  onClick={function () {
                    handleWeakTopicClick(w);
                  }}
                  style={{
                    textAlign: "left",
                    padding: "12px 14px",
                    borderRadius: 10,
                    background: "#fef3c7",
                    border: "1px solid #fde68a",
                    color: "#78350f",
                    fontSize: 14,
                    fontFamily: "inherit",
                    fontWeight: 600,
                    cursor: "pointer",
                    lineHeight: 1.5,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <span>
                    <span style={{ display: "block", fontSize: 11, color: "#92400e", fontWeight: 600, marginBottom: 2 }}>
                      {w.subject}
                    </span>
                    {w.source}
                  </span>
                  <span style={{ fontSize: 12, color: "#92400e" }}>
                    {w.count} wrong {">"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <p
        style={{
          fontSize: 15,
          fontWeight: 700,
          color: "#1e293b",
          marginBottom: 10,
        }}
      >
        Review
      </p>

      {questions.map(function (q, idx) {
        var userAns = answers[q.id];
        var isCorrect = userAns === q.correctAnswer;
        var unanswered = typeof userAns !== "number";
        return (
          <div
            key={q.id}
            style={{
              background: "#fff",
              border: "1px solid #e2e8f0",
              borderRadius: 12,
              padding: "14px 16px",
              marginBottom: 10,
            }}
          >
            <p
              style={{
                fontSize: 11,
                color: "#94a3b8",
                marginBottom: 4,
                fontWeight: 600,
              }}
            >
              {q.subject} - {q.source}
            </p>
            <p
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "#1e293b",
                marginBottom: 8,
                lineHeight: 1.6,
              }}
            >
              {idx + 1}. {q.question}
            </p>
            <p
              style={{
                fontSize: 13,
                color: isCorrect ? "#166534" : "#991b1b",
                fontWeight: 600,
                marginBottom: 4,
              }}
            >
              {unanswered
                ? "Skipped"
                : isCorrect
                ? "Correct"
                : "Wrong"}
            </p>
            <p style={{ fontSize: 13, color: "#475569", marginBottom: 2 }}>
              Correct answer:{" "}
              <strong>
                {String.fromCharCode(65 + q.correctAnswer)}.{" "}
                {q.options[q.correctAnswer]}
              </strong>
            </p>
          </div>
        );
      })}

      <button
        onClick={retake}
        style={{
          marginTop: 10,
          padding: "14px 20px",
          fontSize: 16,
          fontWeight: 700,
          fontFamily: "inherit",
          border: "none",
          borderRadius: 12,
          background: "#6366f1",
          color: "#fff",
          cursor: "pointer",
          width: "100%",
        }}
      >
        Retake Test
      </button>
    </div>
  );
}
