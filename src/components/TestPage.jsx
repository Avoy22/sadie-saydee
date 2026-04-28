import { useState } from "react";
import { collectAllMCQs, shuffleAndPick } from "../utils/mcq.js";
import { saveProgress } from "../utils/storage.js";
import { formatDateISO } from "../utils/date.js";
import {
  getWeakTopicBoosterData,
  getWeakTopicKey,
} from "../utils/weakTopicBooster.js";

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

  var _time = useState(null);
  var testStartedAt = _time[0];
  var setTestStartedAt = _time[1];

  var _used = useState(null);
  var timeUsedSeconds = _used[0];
  var setTimeUsedSeconds = _used[1];

  var _review = useState(false);
  var showWrongOnly = _review[0];
  var setShowWrongOnly = _review[1];

  var _mode = useState("regular");
  var testMode = _mode[0];
  var setTestMode = _mode[1];

  var _bt = useState([]);
  var boosterTopics = _bt[0];
  var setBoosterTopics = _bt[1];

  var _bm = useState("");
  var boosterMessage = _bm[0];
  var setBoosterMessage = _bm[1];

  function getTestTitle() {
    return testMode === "booster" ? "Weak Area Mini Test" : "Mini Test";
  }

  function startTest() {
    var all = collectAllMCQs();
    var picked = shuffleAndPick(all, Math.min(10, all.length));
    setQuestions(picked);
    setAnswers({});
    setShowWrongOnly(false);
    setTimeUsedSeconds(null);
    setTestStartedAt(Date.now());
    setTestMode("regular");
    setBoosterTopics([]);
    setBoosterMessage("");
    setStage("running");
  }

  function startWeakBooster() {
    var boosterData = getWeakTopicBoosterData();
    if (boosterData.questionPool.length === 0) {
      setBoosterMessage("Take a test or save mistakes first.");
      return;
    }

    var picked = shuffleAndPick(
      boosterData.questionPool,
      Math.min(10, boosterData.questionPool.length)
    );
    setQuestions(picked);
    setAnswers({});
    setShowWrongOnly(false);
    setTimeUsedSeconds(null);
    setTestStartedAt(Date.now());
    setTestMode("booster");
    setBoosterTopics(boosterData.topTopics);
    setBoosterMessage("");
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

    var finishedAt = Date.now();
    var nextTimeUsedSeconds = testStartedAt
      ? Math.max(0, Math.round((finishedAt - testStartedAt) / 1000))
      : null;
    setTimeUsedSeconds(nextTimeUsedSeconds);

    // Save to localStorage
    saveProgress({
      score: correctCount,
      total: questions.length,
      weakTopics: weakTopicList,
      timeUsedSeconds: nextTimeUsedSeconds,
      date: formatDateISO(new Date()),
    });

    setStage("done");
  }

  function retake() {
    setStage("intro");
    setQuestions([]);
    setAnswers({});
    setShowWrongOnly(false);
    setTimeUsedSeconds(null);
    setTestStartedAt(null);
    setTestMode("regular");
    setBoosterTopics([]);
    setBoosterMessage("");
  }

  function formatTime(seconds) {
    if (seconds === null || seconds === undefined) return "Not available";
    var minutes = Math.floor(seconds / 60);
    var rest = seconds % 60;
    return minutes + "m " + String(rest).padStart(2, "0") + "s";
  }

  if (stage === "intro") {
    var boosterData = getWeakTopicBoosterData();
    var canStartBooster = boosterData.questionPool.length > 0;

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
          ICT + English থেকে Mixed MCQ
        </p>
        <p
          style={{
            fontSize: 13,
            color: "#94a3b8",
            marginBottom: 24,
            lineHeight: 1.6,
          }}
        >
          ভয় নেই, শুধু চেষ্টা করো। ভুল করলে শিখবে।
        </p>
        <div
          style={{
            textAlign: "left",
            background: "linear-gradient(145deg, #ffffff, #fff7fb)",
            border: "1px solid #eadcff",
            borderRadius: 22,
            padding: "16px",
            marginBottom: 14,
            boxShadow: "0 14px 34px rgba(124, 58, 237, 0.08)",
          }}
        >
          <p
            style={{
              fontSize: 12,
              fontWeight: 900,
              color: "#7c3aed",
              marginBottom: 8,
              letterSpacing: 0.3,
            }}
          >
            WEAK TOPIC BOOSTER
          </p>
          {boosterData.topTopics.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {boosterData.topTopics.map(function (topic, index) {
                return (
                  <div
                    key={getWeakTopicKey(topic)}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 10,
                      padding: "10px 12px",
                      borderRadius: 16,
                      background: index === 0 ? "#f5edff" : "#fff1f8",
                      border:
                        index === 0 ? "1px solid #eadcff" : "1px solid #fbcfe8",
                    }}
                  >
                    <span
                      style={{
                        minWidth: 0,
                        fontSize: 13,
                        fontWeight: 800,
                        color: "#334155",
                        lineHeight: 1.45,
                      }}
                    >
                      {topic.subject} - {topic.source}
                    </span>
                    <span
                      style={{
                        flexShrink: 0,
                        fontSize: 12,
                        fontWeight: 900,
                        color: "#be185d",
                      }}
                    >
                      {topic.count} wrong
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <p
              style={{
                color: "#64748b",
                fontSize: 13,
                fontWeight: 700,
                lineHeight: 1.6,
                marginBottom: 10,
              }}
            >
              No weak topics saved yet.
            </p>
          )}
          <button
            onClick={startWeakBooster}
            disabled={!canStartBooster}
            style={{
              marginTop: 12,
              padding: "13px 18px",
              fontSize: 15,
              fontWeight: 900,
              fontFamily: "inherit",
              border: "none",
              borderRadius: 16,
              background: canStartBooster
                ? "linear-gradient(135deg, #7c3aed, #ec4899)"
                : "#e2e8f0",
              color: canStartBooster ? "#fff" : "#94a3b8",
              cursor: canStartBooster ? "pointer" : "not-allowed",
              width: "100%",
              boxShadow: canStartBooster
                ? "0 12px 24px rgba(124, 58, 237, 0.22)"
                : "none",
            }}
          >
            Fix My Weak Areas
          </button>
          {boosterMessage && (
            <p
              style={{
                marginTop: 8,
                color: "#92400e",
                fontSize: 12,
                fontWeight: 700,
                textAlign: "center",
              }}
            >
              {boosterMessage}
            </p>
          )}
        </div>
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
          <h2 style={{ fontSize: 20, fontWeight: 800 }}>{getTestTitle()}</h2>
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

        {testMode === "booster" && boosterTopics.length > 0 && (
          <div
            style={{
              background: "#f5edff",
              border: "1px solid #eadcff",
              borderRadius: 16,
              padding: "12px",
              marginBottom: 14,
            }}
          >
            <p
              style={{
                fontSize: 12,
                fontWeight: 900,
                color: "#7c3aed",
                marginBottom: 6,
              }}
            >
              Top weak topics
            </p>
            <p style={{ fontSize: 13, color: "#475569", lineHeight: 1.6 }}>
              {boosterTopics
                .map(function (topic) {
                  return topic.source;
                })
                .join(" + ")}
            </p>
          </div>
        )}

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
  var wrongQuestions = questions.filter(function (q) {
    return answers[q.id] !== q.correctAnswer;
  });
  var reviewQuestions = showWrongOnly ? wrongQuestions : questions;
  var sectionMap = {};

  questions.forEach(function (q) {
    var label = q.subject + " - " + q.source;
    if (!sectionMap[label]) {
      sectionMap[label] = {
        label: label,
        subjectKey: q.subjectKey,
        correct: 0,
        total: 0,
      };
    }
    sectionMap[label].total++;
    if (answers[q.id] === q.correctAnswer) {
      sectionMap[label].correct++;
    }
  });

  var sectionBreakdown = Object.keys(sectionMap).map(function (key) {
    return sectionMap[key];
  });

  var feedbackText = "";
  var feedbackColor = "";
  var feedbackBg = "";
  if (percentage >= 70) {
    feedbackText = "Passed. Strong work - keep this rhythm.";
    feedbackColor = "#166534";
    feedbackBg = "#dcfce7";
  } else if (percentage >= 40) {
    feedbackText = "Improving. Review the weak spots and try again.";
    feedbackColor = "#92400e";
    feedbackBg = "#fef3c7";
  } else {
    feedbackText = "Needs practice. Start with the wrong answers below.";
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
      <h2 style={{ fontSize: 22, fontWeight: 900, marginBottom: 16 }}>
        {testMode === "booster" ? "Weak Area Result" : "Test Result"}
      </h2>

      <div
        style={{
          background: "linear-gradient(135deg, #7c3aed, #ec4899)",
          borderRadius: 24,
          padding: "24px 18px",
          color: "#fff",
          textAlign: "center",
          marginBottom: 16,
          boxShadow: "0 18px 38px rgba(124, 58, 237, 0.24)",
        }}
      >
        <p style={{ fontSize: 13, opacity: 0.85, marginBottom: 4 }}>
          Your score
        </p>
        <p style={{ fontSize: 48, fontWeight: 900, margin: "2px 0" }}>
          {correct}/{total}
        </p>
        <p style={{ fontSize: 16, opacity: 0.95, fontWeight: 800 }}>
          {percentage}%
        </p>
        <p style={{ fontSize: 13, opacity: 0.9, marginTop: 8 }}>
          Time used: {formatTime(timeUsedSeconds)}
        </p>
      </div>

      <div
        style={{
          background: feedbackBg,
          color: feedbackColor,
          borderRadius: 18,
          padding: "14px 16px",
          textAlign: "center",
          fontWeight: 800,
          fontSize: 15,
          marginBottom: 16,
          border: "1px solid rgba(255,255,255,0.65)",
        }}
      >
        {feedbackText}
      </div>

      {sectionBreakdown.length > 0 && (
        <div
          style={{
            background: "#fff",
            border: "1px solid #eadcff",
            borderRadius: 20,
            padding: "16px",
            marginBottom: 16,
            boxShadow: "0 12px 30px rgba(124, 58, 237, 0.08)",
          }}
        >
          <p
            style={{
              fontSize: 15,
              fontWeight: 900,
              color: "#27103f",
              marginBottom: 10,
            }}
          >
            Section-wise feedback
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {sectionBreakdown.map(function (item) {
              var itemPercentage = Math.round((item.correct / item.total) * 100);
              return (
                <div
                  key={item.label}
                  style={{
                    padding: "10px 12px",
                    borderRadius: 14,
                    background: item.subjectKey === "ict" ? "#f5edff" : "#fff1f8",
                    border:
                      item.subjectKey === "ict"
                        ? "1px solid #eadcff"
                        : "1px solid #fbcfe8",
                  }}
                >
                  <p
                    style={{
                      fontSize: 13,
                      fontWeight: 800,
                      color: "#334155",
                      lineHeight: 1.5,
                      marginBottom: 3,
                    }}
                  >
                    {item.label}
                  </p>
                  <p style={{ fontSize: 12, color: "#64748b", fontWeight: 700 }}>
                    {item.correct}/{item.total} correct - {itemPercentage}%
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

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
            এই Topicগুলো আরও প্র্যাকটিস করো -- Tap to study
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
          <button
            onClick={startWeakBooster}
            style={{
              marginTop: 12,
              padding: "13px 18px",
              border: "none",
              borderRadius: 16,
              background: "linear-gradient(135deg, #7c3aed, #ec4899)",
              color: "#fff",
              fontSize: 14,
              fontWeight: 900,
              fontFamily: "inherit",
              cursor: "pointer",
              width: "100%",
              boxShadow: "0 12px 24px rgba(124, 58, 237, 0.22)",
            }}
          >
            Fix My Weak Areas
          </button>
        </div>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 10,
          marginBottom: 10,
        }}
      >
        <p
          style={{
            fontSize: 15,
            fontWeight: 900,
            color: "#27103f",
          }}
        >
          Review
        </p>
        {wrongQuestions.length > 0 && (
          <button
            onClick={function () {
              setShowWrongOnly(!showWrongOnly);
            }}
            style={{
              padding: "8px 12px",
              border: "1px solid #eadcff",
              borderRadius: 14,
              background: showWrongOnly ? "#7c3aed" : "#fff",
              color: showWrongOnly ? "#fff" : "#7c3aed",
              fontSize: 12,
              fontWeight: 800,
              fontFamily: "inherit",
              cursor: "pointer",
            }}
          >
            {showWrongOnly ? "Show All" : "Review Wrong Answers"}
          </button>
        )}
      </div>

      {reviewQuestions.map(function (q, idx) {
        var userAns = answers[q.id];
        var isCorrect = userAns === q.correctAnswer;
        var unanswered = typeof userAns !== "number";
        return (
          <div
            key={q.id}
            style={{
              background: "#fff",
              border: isCorrect ? "1px solid #dcfce7" : "1px solid #fecaca",
              borderRadius: 18,
              padding: "14px 16px",
              marginBottom: 10,
              boxShadow: "0 10px 24px rgba(124, 58, 237, 0.06)",
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
              {showWrongOnly ? "Wrong " + (idx + 1) : idx + 1}. {q.question}
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
              Your answer:{" "}
              <strong>
                {unanswered
                  ? "No answer"
                  : String.fromCharCode(65 + userAns) + ". " + q.options[userAns]}
              </strong>
            </p>
            <p style={{ fontSize: 13, color: "#475569", marginBottom: 2 }}>
              Correct answer:{" "}
              <strong>
                {String.fromCharCode(65 + q.correctAnswer)}.{" "}
                {q.options[q.correctAnswer]}
              </strong>
            </p>
            {q.explanation && (
              <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.7 }}>
                {q.explanation}
              </p>
            )}
          </div>
        );
      })}

      <button
        onClick={retake}
        style={{
          marginTop: 10,
          padding: "14px 20px",
          fontSize: 16,
          fontWeight: 800,
          fontFamily: "inherit",
          border: "none",
          borderRadius: 18,
          background: "linear-gradient(135deg, #7c3aed, #ec4899)",
          color: "#fff",
          cursor: "pointer",
          width: "100%",
          boxShadow: "0 12px 24px rgba(124, 58, 237, 0.22)",
        }}
      >
        Retake Test
      </button>
    </div>
  );
}
