import { useState, useEffect } from "react";

var PROGRESS_KEY = "study_progress";
var BOARD_PROGRESS_KEY = "board_practice_progress";

function saveProgress(data) {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(data));
  } catch (e) {
    // ignore
  }
}

function loadProgress() {
  try {
    var raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

function loadBoardProgress() {
  try {
    var raw = localStorage.getItem(BOARD_PROGRESS_KEY);
    if (!raw) return { completedSections: [] };
    var parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.completedSections)) {
      return { completedSections: [] };
    }
    return parsed;
  } catch (e) {
    return { completedSections: [] };
  }
}

function saveBoardSectionProgress(entry) {
  try {
    var progress = loadBoardProgress();
    var completedSections = progress.completedSections.filter(function (item) {
      return item.id !== entry.id;
    });
    completedSections.push(entry);
    localStorage.setItem(
      BOARD_PROGRESS_KEY,
      JSON.stringify({ completedSections: completedSections })
    );
  } catch (e) {
    // ignore
  }
}

function formatDateISO(d) {
  var year = d.getFullYear();
  var month = String(d.getMonth() + 1).padStart(2, "0");
  var day = String(d.getDate()).padStart(2, "0");
  return year + "-" + month + "-" + day;
}

function Dashboard({ setPage }) {
  var examDate = new Date("2026-06-01T00:00:00");
  var today = new Date();
  var daysLeft = Math.max(0, Math.ceil((examDate - today) / 86400000));

  var progress = loadProgress();
  var boardProgress = loadBoardProgress();
  var completedBoardSections = boardProgress.completedSections || [];
  var lastBoardSection =
    completedBoardSections.length > 0
      ? completedBoardSections[completedBoardSections.length - 1]
      : null;
  var weakTopics =
    progress && progress.weakTopics ? progress.weakTopics : [];
  var recommendation = {
    paper: "English 2nd Paper",
    section: "Q1 Prepositions",
    reason: "Start with small grammar practice.",
  };

  if (progress && weakTopics.length > 0) {
    var firstWeakTopic = weakTopics[0];
    recommendation = {
      paper: firstWeakTopic.subject || "Recommended section",
      section: firstWeakTopic.source || "First weak topic",
      reason: "Practice your first weak topic from the last test.",
    };
  } else if (progress) {
    recommendation = {
      paper: "English 1st Paper",
      section: "Q3 Summary Writing",
      reason: "Good for writing improvement.",
    };
  }

  return (
    <div style={{ padding: "20px 0" }}>
      <div
        style={{
          textAlign: "center",
          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
          borderRadius: 14,
          padding: "24px 16px",
          color: "#fff",
          marginBottom: 14,
        }}
      >
        <p style={{ fontSize: 13, opacity: 0.85, marginBottom: 2 }}>
          HSC Exam Countdown
        </p>
        <p style={{ fontSize: 44, fontWeight: 800, margin: "4px 0" }}>
          {daysLeft}
        </p>
        <p style={{ fontSize: 14, opacity: 0.9 }}>days remaining</p>
      </div>

      <div
        style={{
          background: "#f8fafc",
          border: "1px solid #e2e8f0",
          borderRadius: 12,
          padding: "14px 16px",
          marginBottom: 20,
        }}
      >
        <p
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: "#6366f1",
            marginBottom: 8,
            letterSpacing: 0.3,
          }}
        >
          YOUR PROGRESS
        </p>
        {progress ? (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 6,
              }}
            >
              <span style={{ fontSize: 13, color: "#64748b" }}>Last score</span>
              <span
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#1e293b",
                }}
              >
                {progress.score}/{progress.total}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 6,
              }}
            >
              <span style={{ fontSize: 13, color: "#64748b" }}>Weak topics</span>
              <span
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color:
                    progress.weakTopics && progress.weakTopics.length > 0
                      ? "#92400e"
                      : "#166534",
                }}
              >
                {progress.weakTopics ? progress.weakTopics.length : 0}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: 13, color: "#64748b" }}>Last test</span>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#475569",
                }}
              >
                {progress.date}
              </span>
            </div>
          </div>
        ) : (
          <p style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.5 }}>
            No test taken yet
          </p>
        )}
      </div>

      <div
        style={{
          background: "#fff",
          border: "1px solid #e2e8f0",
          borderRadius: 12,
          padding: "14px 16px",
          marginBottom: 20,
        }}
      >
        <p
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: "#6366f1",
            marginBottom: 8,
            letterSpacing: 0.3,
          }}
        >
          Recommended Practice
        </p>
        <h3 style={{ fontSize: 17, marginBottom: 4 }}>
          {recommendation.paper}
        </h3>
        <p
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: "#334155",
            marginBottom: 6,
            lineHeight: 1.5,
          }}
        >
          {recommendation.section}
        </p>
        <p
          style={{
            fontSize: 13,
            color: "#64748b",
            lineHeight: 1.6,
            marginBottom: 12,
          }}
        >
          {recommendation.reason}
        </p>
        <button
          onClick={function () {
            setPage("practice");
          }}
          style={{
            padding: "10px 14px",
            border: "none",
            borderRadius: 10,
            background: "#6366f1",
            color: "#fff",
            fontSize: 14,
            fontWeight: 700,
            fontFamily: "inherit",
            cursor: "pointer",
            width: "100%",
          }}
        >
          Practice Now
        </button>
      </div>

      <div
        style={{
          background: "#f8fafc",
          border: "1px solid #e2e8f0",
          borderRadius: 12,
          padding: "14px 16px",
          marginBottom: 20,
        }}
      >
        <p
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: "#6366f1",
            marginBottom: 8,
            letterSpacing: 0.3,
          }}
        >
          Board Practice Progress
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 6,
          }}
        >
          <span style={{ fontSize: 13, color: "#64748b" }}>
            Completed/reviewed
          </span>
          <span style={{ fontSize: 15, fontWeight: 700, color: "#1e293b" }}>
            {completedBoardSections.length}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 12,
            marginBottom: 6,
          }}
        >
          <span style={{ fontSize: 13, color: "#64748b", flexShrink: 0 }}>
            Last section
          </span>
          <span
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "#475569",
              textAlign: "right",
            }}
          >
            {lastBoardSection ? lastBoardSection.title : "None yet"}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: 13, color: "#64748b" }}>Last date</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: "#475569" }}>
            {lastBoardSection ? lastBoardSection.date : "-"}
          </span>
        </div>
      </div>

      <p
        style={{
          textAlign: "center",
          fontSize: 15,
          color: "#6366f1",
          fontWeight: 600,
          marginBottom: 20,
          lineHeight: 1.5,
        }}
      >
        Tumi parbe! You can do this!
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <button
          onClick={function () {
            setPage("ict");
          }}
          style={{
            padding: "14px 20px",
            fontSize: 16,
            fontWeight: 600,
            fontFamily: "inherit",
            border: "none",
            borderRadius: 12,
            background: "#6366f1",
            color: "#fff",
            cursor: "pointer",
            width: "100%",
          }}
        >
          Start ICT
        </button>
        <button
          onClick={function () {
            setPage("english1");
          }}
          style={{
            padding: "14px 20px",
            fontSize: 16,
            fontWeight: 600,
            fontFamily: "inherit",
            border: "none",
            borderRadius: 12,
            background: "#eef2ff",
            color: "#6366f1",
            cursor: "pointer",
            width: "100%",
          }}
        >
          Start English 1st Paper
        </button>
        <button
          onClick={function () {
            setPage("english2");
          }}
          style={{
            padding: "14px 20px",
            fontSize: 16,
            fontWeight: 600,
            fontFamily: "inherit",
            border: "none",
            borderRadius: 12,
            background: "#eef2ff",
            color: "#6366f1",
            cursor: "pointer",
            width: "100%",
          }}
        >
          Start English 2nd Paper
        </button>
        <button
          onClick={function () {
            setPage("test");
          }}
          style={{
            padding: "14px 20px",
            fontSize: 16,
            fontWeight: 600,
            fontFamily: "inherit",
            border: "1px solid #e2e8f0",
            borderRadius: 12,
            background: "transparent",
            color: "#6366f1",
            cursor: "pointer",
            width: "100%",
          }}
        >
          Start Test
        </button>
      </div>
    </div>
  );
}

var ictTopics = [
  {
    id: 1,
    title: "Global Village",
    titleBn: "\u09AC\u09BF\u09B6\u09CD\u09AC\u0997\u09CD\u09B0\u09BE\u09AE",
    explanation:
      "\u0987\u09A8\u09CD\u099F\u09BE\u09B0\u09A8\u09C7\u099F \u0986\u09B0 " +
      "\u09A4\u09A5\u09CD\u09AF\u09AA\u09CD\u09B0\u09AF\u09C1\u0995\u09CD\u09A4\u09BF\u09B0 " +
      "\u0995\u09BE\u09B0\u09A3\u09C7 \u09AA\u09C1\u09B0\u09CB \u09AA\u09C3\u09A5\u09BF\u09AC\u09C0 " +
      "\u098F\u0996\u09A8 \u098F\u0995\u099F\u09BE \u0997\u09CD\u09B0\u09BE\u09AE\u09C7\u09B0 " +
      "\u09AE\u09A4\u09CB\u0964 \u09A4\u09C1\u09AE\u09BF \u0998\u09B0\u09C7 " +
      "\u09AC\u09B8\u09C7 Video Call \u0995\u09B0\u09A4\u09C7 \u09AA\u09BE\u09B0\u09CB, " +
      "Online-\u098F \u0995\u09C7\u09A8\u09BE\u0995\u09BE\u099F\u09BE \u0995\u09B0\u09A4\u09C7 " +
      "\u09AA\u09BE\u09B0\u09CB, Freelancing \u0995\u09B0\u09A4\u09C7 \u09AA\u09BE\u09B0\u09CB\u0964 " +
      "\u098F\u099F\u09BE\u0987 Global Village \u09AC\u09BE " +
      "\u09AC\u09BF\u09B6\u09CD\u09AC\u0997\u09CD\u09B0\u09BE\u09AE\u0964",
    keyTerms: "Globalization, E-commerce, Outsourcing, Telecommuting",
    importance:
      "\u09AC\u09CB\u09B0\u09CD\u09A1 \u09AA\u09B0\u09C0\u0995\u09CD\u09B7\u09BE\u09AF\u09BC " +
      "\u098F\u0987 \u0985\u09A7\u09CD\u09AF\u09BE\u09AF\u09BC \u09A5\u09C7\u0995\u09C7 " +
      "\u09AC\u09B0\u09CD\u09A3\u09A8\u09BE\u09AE\u09C2\u09B2\u0995 \u09AA\u09CD\u09B0\u09B6\u09CD\u09A8 " +
      "\u0986\u09B8\u09C7 -- \u09B8\u0982\u099C\u09CD\u099E\u09BE \u0986\u09B0 " +
      "\u09B8\u09C1\u09AC\u09BF\u09A7\u09BE \u099C\u09BE\u09A8\u09BE \u09A6\u09B0\u0995\u09BE\u09B0\u0964",
    mcqs: [
      {
        id: "gv-q1",
        question:
          "\u09AC\u09BF\u09B6\u09CD\u09AC\u0997\u09CD\u09B0\u09BE\u09AE " +
          "\u09A7\u09BE\u09B0\u09A3\u09BE\u09B0 \u09AE\u09C2\u09B2 " +
          "\u09AD\u09BF\u09A4\u09CD\u09A4\u09BF \u0995\u09C0?",
        options: [
          "\u0995\u09C3\u09B7\u09BF",
          "Internet \u0993 \u09A4\u09A5\u09CD\u09AF\u09AA\u09CD\u09B0\u09AF\u09C1\u0995\u09CD\u09A4\u09BF",
          "\u09B6\u09BF\u09B2\u09CD\u09AA \u09AC\u09BF\u09AA\u09CD\u09B2\u09AC",
          "\u09AA\u09B0\u09BF\u09AC\u09B9\u09A8",
        ],
        correctAnswer: 1,
        explanation:
          "Internet \u0993 \u09A4\u09A5\u09CD\u09AF\u09AA\u09CD\u09B0\u09AF\u09C1\u0995\u09CD\u09A4\u09BF " +
          "\u099B\u09BE\u09A1\u09BC\u09BE \u09AC\u09BF\u09B6\u09CD\u09AC\u0997\u09CD\u09B0\u09BE\u09AE " +
          "\u09B8\u09AE\u09CD\u09AD\u09AC \u09A8\u09AF\u09BC\u0964 " +
          "\u098F\u099F\u09BE\u0987 \u09AE\u09C2\u09B2 \u09AD\u09BF\u09A4\u09CD\u09A4\u09BF\u0964",
      },
      {
        id: "gv-q2",
        question:
          "E-commerce \u098F\u09B0 \u0989\u09A6\u09BE\u09B9\u09B0\u09A3 \u0995\u09CB\u09A8\u099F\u09BF?",
        options: [
          "Daraz",
          "Notepad",
          "MS Word",
          "Calculator",
        ],
        correctAnswer: 0,
        explanation:
          "Daraz \u098F\u0995\u099F\u09BF Online Shopping Site -- " +
          "\u098F\u099F\u09BE E-commerce \u098F\u09B0 \u09AD\u09BE\u09B2\u09CB " +
          "\u0989\u09A6\u09BE\u09B9\u09B0\u09A3\u0964 Online-\u098F " +
          "\u0995\u09C7\u09A8\u09BE\u09AC\u09C7\u099A\u09BE\u0995\u09C7 E-commerce \u09AC\u09B2\u09C7\u0964",
      },
      {
        id: "gv-q3",
        question:
          "Outsourcing \u09AC\u09B2\u09A4\u09C7 \u0995\u09C0 \u09AC\u09CB\u099D\u09BE\u09AF\u09BC?",
        options: [
          "\u09A8\u09BF\u099C\u09C7 \u0985\u09AB\u09BF\u09B8\u09C7 \u0995\u09BE\u099C \u0995\u09B0\u09BE",
          "Computer \u0995\u09C7\u09A8\u09BE",
          "\u09AC\u09BE\u0987\u09B0\u09C7\u09B0 \u0995\u09BE\u09B0\u09CB \u09A6\u09BF\u09AF\u09BC\u09C7 " +
            "\u0995\u09BE\u099C \u0995\u09B0\u09BE\u09A8\u09CB",
          "Software \u09AC\u09BE\u09A8\u09BE\u09A8\u09CB",
        ],
        correctAnswer: 2,
        explanation:
          "Outsourcing \u09AE\u09BE\u09A8\u09C7 \u0995\u09CB\u09A8\u09CB " +
          "\u09AA\u09CD\u09B0\u09A4\u09BF\u09B7\u09CD\u09A0\u09BE\u09A8 " +
          "\u09A4\u09BE\u09A6\u09C7\u09B0 \u0995\u09BE\u099C \u09AC\u09BE\u0987\u09B0\u09C7\u09B0 " +
          "\u0995\u09BE\u09B0\u09CB\u0995\u09C7 \u09A6\u09BF\u09AF\u09BC\u09C7 \u0995\u09B0\u09BE\u09A8\u09CB\u0964 " +
          "Freelancing \u098F\u09B0 \u098F\u0995\u099F\u09BE \u09AE\u09C2\u09B2 \u0995\u09BE\u09B0\u09A3 " +
          "\u098F\u0987 Outsourcing\u0964",
      },
    ],
  },
  {
    id: 2,
    title: "Data Communication",
    titleBn: "\u09A1\u09C7\u099F\u09BE \u0995\u09AE\u09BF\u0989\u09A8\u09BF\u0995\u09C7\u09B6\u09A8",
    explanation:
      "\u098F\u0995 \u099C\u09BE\u09AF\u09BC\u0997\u09BE \u09A5\u09C7\u0995\u09C7 " +
      "\u0986\u09B0\u09C7\u0995 \u099C\u09BE\u09AF\u09BC\u0997\u09BE\u09AF\u09BC Data " +
      "\u09AA\u09BE\u09A0\u09BE\u09A8\u09CB\u0995\u09C7 Data Communication " +
      "\u09AC\u09B2\u09C7\u0964 \u09AF\u09C7\u09AE\u09A8 \u09A4\u09C1\u09AE\u09BF " +
      "Phone-\u098F Message \u09AA\u09BE\u09A0\u09BE\u0993 -- " +
      "\u09B8\u09C7\u099F\u09BE\u0993 Data Communication\u0964 " +
      "\u098F\u09B0 \u09EA\u099F\u09BE \u0989\u09AA\u09BE\u09A6\u09BE\u09A8 " +
      "\u09AE\u09A8\u09C7 \u09B0\u09BE\u0996\u09CB: " +
      "Sender, Receiver, Message, Medium, \u0986\u09B0 Protocol\u0964",
    keyTerms: "Sender, Receiver, Message, Medium, Protocol, Bandwidth",
    importance:
      "Bandwidth, Transmission Mode, \u0993 Media-\u098F\u09B0 \u0989\u09AA\u09B0 " +
      "\u09B8\u09B0\u09BE\u09B8\u09B0\u09BF MCQ \u0986\u09B8\u09C7 \u0993 " +
      "\u09B8\u09C3\u099C\u09A8\u09B6\u09C0\u09B2 \u09AA\u09CD\u09B0\u09B6\u09CD\u09A8\u09C7 " +
      "\u09AC\u09CD\u09AF\u09BE\u0996\u09CD\u09AF\u09BE \u099A\u09BE\u0993\u09AF\u09BC\u09BE \u09B9\u09AF\u09BC\u0964",
    mcqs: [
      {
        id: "dc-q1",
        question:
          "Data Communication-\u098F\u09B0 \u0989\u09AA\u09BE\u09A6\u09BE\u09A8 \u0995\u09AF\u09BC\u099F\u09BF?",
        options: ["3", "4", "5", "6"],
        correctAnswer: 2,
        explanation:
          "Data Communication-\u098F\u09B0 \u09AE\u09CB\u099F \u09EB\u099F\u09BF " +
          "\u0989\u09AA\u09BE\u09A6\u09BE\u09A8: Sender, Receiver, Message, " +
          "Medium, \u0986\u09B0 Protocol\u0964",
      },
      {
        id: "dc-q2",
        question:
          "Bandwidth \u09AC\u09B2\u09A4\u09C7 \u0995\u09C0 \u09AC\u09CB\u099D\u09BE\u09AF\u09BC?",
        options: [
          "\u09A4\u09BE\u09B0\u09C7\u09B0 \u09A6\u09C8\u09B0\u09CD\u0998\u09CD\u09AF",
          "\u09A1\u09C7\u099F\u09BE \u09AA\u09BE\u09A0\u09BE\u09A8\u09CB\u09B0 \u0995\u09CD\u09B7\u09AE\u09A4\u09BE",
          "Computer-\u098F\u09B0 \u09B0\u0982",
          "Software-\u098F\u09B0 \u09A8\u09BE\u09AE",
        ],
        correctAnswer: 1,
        explanation:
          "Bandwidth \u09AE\u09BE\u09A8\u09C7 \u098F\u0995\u0995 \u09B8\u09AE\u09AF\u09BC\u09C7 " +
          "\u0995\u09A4\u099F\u09C1\u0995\u09C1 \u09A1\u09C7\u099F\u09BE \u09AA\u09BE\u09A0\u09BE\u09A8\u09CB " +
          "\u09AF\u09BE\u09AF\u09BC \u09B8\u09C7\u0987 \u0995\u09CD\u09B7\u09AE\u09A4\u09BE\u0964 " +
          "\u098F\u0995\u0995: bps (bits per second)\u0964",
      },
      {
        id: "dc-q3",
        question:
          "Fiber Optic Cable \u0995\u09CB\u09A8 \u09A7\u09B0\u09A8\u09C7\u09B0 Media?",
        options: ["Wireless", "Guided", "Unguided", "Manual"],
        correctAnswer: 1,
        explanation:
          "Fiber Optic Cable \u098F\u0995\u099F\u09BF \u09A4\u09BE\u09B0\u09AF\u09C1\u0995\u09CD\u09A4 " +
          "\u09AE\u09BE\u09A7\u09CD\u09AF\u09AE, \u09A4\u09BE\u0987 \u098F\u099F\u09BF Guided Media\u0964 " +
          "Guided \u09AE\u09BE\u09A8\u09C7 \u09A4\u09BE\u09B0 \u09A6\u09BF\u09AF\u09BC\u09C7 " +
          "\u09A1\u09C7\u099F\u09BE \u09AA\u09BE\u09A0\u09BE\u09A8\u09CB \u09B9\u09AF\u09BC\u0964",
      },
    ],
  },
  {
    id: 3,
    title: "Number System",
    titleBn: "\u09B8\u0982\u0996\u09CD\u09AF\u09BE \u09AA\u09A6\u09CD\u09A7\u09A4\u09BF",
    explanation:
      "\u0986\u09AE\u09B0\u09BE \u09B8\u09BE\u09A7\u09BE\u09B0\u09A3\u09A4 Decimal " +
      "(0-9) \u09AC\u09CD\u09AF\u09AC\u09B9\u09BE\u09B0 \u0995\u09B0\u09BF\u0964 " +
      "Computer \u09B6\u09C1\u09A7\u09C1 Binary (0 \u0986\u09B0 1) " +
      "\u09AC\u09CB\u099D\u09C7\u0964 \u0986\u09B0\u09CB \u0986\u099B\u09C7 " +
      "Octal (0-7) \u0986\u09B0 Hexadecimal (0-9 \u0993 A-F)\u0964 " +
      "Conversion \u09B6\u09C7\u0996\u09BE \u0996\u09C1\u09AC " +
      "\u0997\u09C1\u09B0\u09C1\u09A4\u09CD\u09AC\u09AA\u09C2\u09B0\u09CD\u09A3\u0964",
    keyTerms: "Binary, Decimal, Octal, Hexadecimal, Conversion",
    importance:
      "Number System-\u098F\u09B0 Conversion \u0993 " +
      "\u0997\u09BE\u09A3\u09BF\u09A4\u09BF\u0995 \u09AA\u09CD\u09B0\u09B6\u09CD\u09A8 " +
      "\u09AA\u09CD\u09B0\u09BE\u09AF\u09BC \u09AA\u09CD\u09B0\u09A4\u09BF \u09AC\u099B\u09B0 " +
      "\u09AA\u09B0\u09C0\u0995\u09CD\u09B7\u09BE\u09AF\u09BC \u0986\u09B8\u09C7\u0964",
    mcqs: [
      {
        id: "ns-q1",
        question:
          "Binary \u09B8\u0982\u0996\u09CD\u09AF\u09BE\u09B0 \u09AD\u09BF\u09A4\u09CD\u09A4\u09BF \u0995\u09A4?",
        options: ["2", "8", "10", "16"],
        correctAnswer: 0,
        explanation:
          "Binary \u098F\u09B0 \u09AD\u09BF\u09A4\u09CD\u09A4\u09BF 2, " +
          "\u0995\u09BE\u09B0\u09A3 \u098F\u09A4\u09C7 \u09B6\u09C1\u09A7\u09C1 " +
          "\u09A6\u09C1\u0987\u099F\u09BF \u0985\u0999\u09CD\u0995: 0 \u0986\u09B0 1\u0964",
      },
      {
        id: "ns-q2",
        question:
          "(1010)\u2082 \u098F\u09B0 Decimal \u09AE\u09BE\u09A8 \u0995\u09A4?",
        options: ["8", "10", "12", "14"],
        correctAnswer: 1,
        explanation:
          "1x2\u00B3 + 0x2\u00B2 + 1x2\u00B9 + 0x2\u2070 = " +
          "8 + 0 + 2 + 0 = 10\u0964 \u09A4\u09BE\u0987 \u0989\u09A4\u09CD\u09A4\u09B0 10\u0964",
      },
      {
        id: "ns-q3",
        question:
          "Hexadecimal-\u098F A \u098F\u09B0 \u09AE\u09BE\u09A8 \u0995\u09A4?",
        options: ["9", "10", "11", "15"],
        correctAnswer: 1,
        explanation:
          "Hexadecimal-\u098F A = 10, B = 11, C = 12, D = 13, E = 14, F = 15\u0964 " +
          "\u098F\u0987 \u09AE\u09BE\u09A8\u0997\u09C1\u09B2\u09CB \u09AE\u09C1\u0996\u09B8\u09CD\u09A5 " +
          "\u0995\u09B0\u09BE \u09A6\u09B0\u0995\u09BE\u09B0\u0964",
      },
    ],
  },
  {
    id: 4,
    title: "HTML Basics",
    titleBn: "HTML \u09AE\u09CC\u09B2\u09BF\u0995",
    explanation:
      "HTML \u09A6\u09BF\u09AF\u09BC\u09C7 Website " +
      "\u09A4\u09C8\u09B0\u09BF \u0995\u09B0\u09BE \u09B9\u09AF\u09BC\u0964 " +
      "\u09AA\u09C1\u09B0\u09CB \u09A8\u09BE\u09AE: HyperText Markup Language\u0964 " +
      "Tag \u09A6\u09BF\u09AF\u09BC\u09C7 \u0995\u09BE\u099C \u0995\u09B0\u09C7, " +
      "\u09AF\u09C7\u09AE\u09A8 <p> \u09AE\u09BE\u09A8\u09C7 Paragraph, " +
      "<h1> \u09AE\u09BE\u09A8\u09C7 \u09AC\u09A1\u09BC Heading, " +
      "<img> \u09A6\u09BF\u09AF\u09BC\u09C7 \u099B\u09AC\u09BF " +
      "\u09AF\u09CB\u0997 \u0995\u09B0\u09BE \u09B9\u09AF\u09BC, " +
      "<a> \u09A6\u09BF\u09AF\u09BC\u09C7 Link " +
      "\u09A4\u09C8\u09B0\u09BF \u09B9\u09AF\u09BC\u0964",
    keyTerms: "Tag, Element, Attribute, Hyperlink, Table",
    importance:
      "\u09AC\u09CD\u09AF\u09BE\u09AC\u09B9\u09BE\u09B0\u09BF\u0995 \u0985\u0982\u09B6\u09C7 " +
      "HTML Code \u09B2\u09BF\u0996\u09A4\u09C7 \u09AC\u09B2\u09BE \u09B9\u09AF\u09BC " +
      "\u09AC\u09BE Tag \u099A\u09BF\u09A8\u09BE\u09A8\u09CB \u09B2\u09BE\u0997\u09C7\u0964",
    mcqs: [
      {
        id: "html-q1",
        question:
          "HTML \u098F\u09B0 \u09AA\u09C1\u09B0\u09CD\u09A3 \u09B0\u09C2\u09AA \u0995\u09C0?",
        options: [
          "HyperText Markup Language",
          "High Tech Modern Language",
          "Home Tool Markup Language",
          "Hyperlink Text Main Language",
        ],
        correctAnswer: 0,
        explanation:
          "HTML \u098F\u09B0 \u09AA\u09C1\u09B0\u09CD\u09A3 \u09B0\u09C2\u09AA " +
          "HyperText Markup Language\u0964 \u098F\u099F\u09BF \u098F\u0995\u099F\u09BF " +
          "Markup Language, Programming Language \u09A8\u09AF\u09BC\u0964",
      },
      {
        id: "html-q2",
        question:
          "\u099B\u09AC\u09BF \u09AF\u09CB\u0997 \u0995\u09B0\u09BE\u09B0 Tag \u0995\u09CB\u09A8\u099F\u09BF?",
        options: ["<pic>", "<image>", "<img>", "<photo>"],
        correctAnswer: 2,
        explanation:
          "\u099B\u09AC\u09BF \u09AF\u09CB\u0997 \u0995\u09B0\u09A4\u09C7 <img> Tag " +
          "\u09AC\u09CD\u09AF\u09AC\u09B9\u09BE\u09B0 \u0995\u09B0\u09BE \u09B9\u09AF\u09BC\u0964 " +
          "\u0989\u09A6\u09BE\u09B9\u09B0\u09A3: <img src='photo.jpg'>\u0964",
      },
      {
        id: "html-q3",
        question:
          "Hyperlink \u09A4\u09C8\u09B0\u09BF\u09B0 Tag \u0995\u09CB\u09A8\u099F\u09BF?",
        options: ["<link>", "<a>", "<href>", "<url>"],
        correctAnswer: 1,
        explanation:
          "Hyperlink \u09A4\u09C8\u09B0\u09BF\u09B0 \u099C\u09A8\u09CD\u09AF <a> Tag " +
          "\u09AC\u09CD\u09AF\u09AC\u09B9\u09BE\u09B0 \u09B9\u09AF\u09BC\u0964 " +
          "\u0989\u09A6\u09BE\u09B0\u09A3: <a href='url'>Click here</a>\u0964",
      },
    ],
  },
];

function MCQItem({ mcq, index }) {
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

function ICTDetail({ topic, onBack }) {
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

function ICTPage({ jumpToTopicId, clearJump }) {
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

var englishPapers = {
  "1st": {
    id: "1st",
    title: "1st Paper",
    description: "Reading, Vocabulary",
    titleBn: "\u09AA\u09CD\u09B0\u09A5\u09AE \u09AA\u09A4\u09CD\u09B0",
    topics: [
      {
        id: "e1-1",
        title: "Reading Comprehension",
        titleBn: "\u09AA\u09A1\u09BC\u09C7 \u09AC\u09CB\u099D\u09BE",
        explanation:
          "\u098F\u0995\u099F\u09BF \u0987\u0982\u09B0\u09C7\u099C\u09BF Passage " +
          "\u09A6\u09C7\u0993\u09AF\u09BC\u09BE \u09A5\u09BE\u0995\u09AC\u09C7\u0964 " +
          "\u09AA\u09A1\u09BC\u09C7 \u09AA\u09CD\u09B0\u09B6\u09CD\u09A8\u09C7\u09B0 " +
          "\u0989\u09A4\u09CD\u09A4\u09B0 \u09A6\u09BF\u09A4\u09C7 \u09B9\u09AC\u09C7\u0964 " +
          "\u098F\u0995\u099F\u09BE \u099F\u09BF\u09AA\u09B8: \u0986\u0997\u09C7 \u09AA\u09CD\u09B0\u09B6\u09CD\u09A8 \u09AA\u09A1\u09BC\u09CB, " +
          "\u09A4\u09BE\u09B0\u09AA\u09B0 Passage-\u098F \u0989\u09A4\u09CD\u09A4\u09B0 \u0996\u09CB\u0981\u099C\u09CB\u0964",
        keyTerms: "Passage, MCQ, True/False, Information Transfer, Summary",
        importance:
          "Reading Comprehension-\u098F \u09AC\u09BE\u09A1\u09BC\u09A4\u09BF " +
          "Marks \u09AA\u09BE\u0993\u09AF\u09BC\u09BE \u09AF\u09BE\u09AF\u09BC -- " +
          "\u0989\u09A4\u09CD\u09A4\u09B0 Passage-\u098F\u0987 \u09A5\u09BE\u0995\u09C7, " +
          "\u09B6\u09C1\u09A7\u09C1 \u09AD\u09BE\u09B2\u09CB\u09AD\u09BE\u09AC\u09C7 " +
          "\u09AA\u09A1\u09BC\u09C7 \u0996\u09C1\u0981\u099C\u09A4\u09C7 \u09B9\u09AC\u09C7\u0964",
        mcqs: [
          {
            id: "rc-q1",
            question: "Reading Comprehension \u09AA\u09A1\u09BC\u09BE\u09B0 \u0986\u0997\u09C7 \u0995\u09CB\u09A8\u099F\u09BF \u0995\u09B0\u09A4\u09C7 \u09B9\u09AF\u09BC?",
            options: [
              "Answer \u09B2\u09BF\u0996\u09A4\u09C7 \u09B9\u09AF\u09BC",
              "Passage \u09AE\u09C1\u0996\u09B8\u09CD\u09A5 \u0995\u09B0\u09A4\u09C7 \u09B9\u09AF\u09BC",
              "\u09AA\u09CD\u09B0\u09B6\u09CD\u09A8\u0997\u09C1\u09B2\u09CB \u0986\u0997\u09C7 \u09AA\u09A1\u09BC\u09A4\u09C7 \u09B9\u09AF\u09BC",
              "\u0996\u09BE\u09A4\u09BE\u09AF\u09BC \u0986\u0981\u0995\u09BE \u09A6\u09BF\u09A4\u09C7 \u09B9\u09AF\u09BC",
            ],
            correctAnswer: 2,
            explanation:
              "\u0986\u0997\u09C7 \u09AA\u09CD\u09B0\u09B6\u09CD\u09A8 \u09AA\u09A1\u09BC\u09B2\u09C7 " +
              "\u099C\u09BE\u09A8\u09BE \u09AF\u09BE\u09AF\u09BC \u0995\u09CB\u09A8 \u09A4\u09A5\u09CD\u09AF " +
              "\u0996\u09C1\u0981\u099C\u09A4\u09C7 \u09B9\u09AC\u09C7\u0964 \u0989\u09A4\u09CD\u09A4\u09B0 " +
              "Passage-\u098F\u0987 \u09A5\u09BE\u0995\u09C7 -- \u09A6\u09CD\u09B0\u09C1\u09A4 \u0996\u09C1\u0981\u099C\u09C7 \u09AA\u09BE\u0993\u09AF\u09BC\u09BE \u09AF\u09BE\u09AF\u09BC\u0964",
          },
          {
            id: "rc-q2",
            question: "Read: \"Trees give us oxygen and shelter.\" What do trees give us?",
            options: [
              "Money",
              "Oxygen and shelter",
              "Books",
              "Food only",
            ],
            correctAnswer: 1,
            explanation:
              "Passage-\u098F \u09B8\u09B0\u09BE\u09B8\u09B0\u09BF \u09B2\u09C7\u0996\u09BE \u0986\u099B\u09C7: " +
              "\"oxygen and shelter\"\u0964 \u09AA\u09CD\u09B0\u09B6\u09CD\u09A8\u09C7\u09B0 \u0989\u09A4\u09CD\u09A4\u09B0 " +
              "\u09B8\u09AC\u09B8\u09AE\u09AF\u09BC Passage \u09A5\u09C7\u0995\u09C7\u0987 \u0996\u09C1\u0981\u099C\u09A4\u09C7 \u09B9\u09AC\u09C7\u0964",
          },
          {
            id: "rc-q3",
            question: "\"Deforestation\" \u09B6\u09AC\u09CD\u09A6\u09C7\u09B0 \u09B8\u09A0\u09BF\u0995 \u0985\u09B0\u09CD\u09A5 \u0995\u09C0?",
            options: [
              "\u0997\u09BE\u099B \u09B2\u09BE\u0997\u09BE\u09A8\u09CB",
              "\u09AC\u09A8 \u0989\u099C\u09BE\u09A1\u09BC \u0995\u09B0\u09BE",
              "\u09AC\u09C3\u09B7\u09CD\u099F\u09BF \u09AA\u09A1\u09BC\u09BE",
              "\u09AE\u09BE\u099F\u09BF \u0996\u09A8\u09A8",
            ],
            correctAnswer: 1,
            explanation:
              "De + forest + ation = \u09AC\u09A8 \u0989\u099C\u09BE\u09A1\u09BC \u0995\u09B0\u09BE\u0964 " +
              "Reading \u09A4\u09C7 Vocabulary \u0985\u09A8\u09C7\u0995 \u09B8\u09BE\u09B9\u09BE\u09AF\u09CD\u09AF \u0995\u09B0\u09C7 -- " +
              "\u09B6\u09AC\u09CD\u09A6\u09C7\u09B0 \u0985\u0982\u09B6 \u09A6\u09C7\u0996\u09C7 \u0985\u09B0\u09CD\u09A5 \u099A\u09C7\u09A8\u09BE \u09AF\u09BE\u09AF\u09BC\u0964",
          },
        ],
      },
      {
        id: "e1-2",
        title: "Vocabulary",
        titleBn: "\u09B6\u09AC\u09CD\u09A6\u09AD\u09BE\u09A8\u09CD\u09A1\u09BE\u09B0",
        explanation:
          "\u09A8\u09A4\u09C1\u09A8 \u09A8\u09A4\u09C1\u09A8 \u0987\u0982\u09B0\u09C7\u099C\u09BF " +
          "\u09B6\u09AC\u09CD\u09A6 \u09B6\u09BF\u0996\u09A4\u09C7 \u09B9\u09AC\u09C7\u0964 " +
          "\u09AA\u09CD\u09B0\u09A4\u09BF\u099F\u09BE \u09B6\u09AC\u09CD\u09A6\u09C7\u09B0 " +
          "\u0985\u09B0\u09CD\u09A5, \u09AC\u09BF\u09AA\u09B0\u09C0\u09A4 \u09B6\u09AC\u09CD\u09A6, " +
          "\u0986\u09B0 \u09AC\u09BE\u0995\u09CD\u09AF\u09C7 \u09AC\u09CD\u09AF\u09AC\u09B9\u09BE\u09B0 " +
          "\u099C\u09BE\u09A8\u09A4\u09C7 \u09B9\u09AC\u09C7\u0964",
        keyTerms: "Synonym, Antonym, Word Meaning, Gap Filling",
        importance:
          "Vocabulary \u09AD\u09BE\u09B2\u09CB \u09B9\u09B2\u09C7 " +
          "Reading \u0993 Writing \u09A6\u09C1\u09A4\u09CB\u0987 \u09B8\u09B9\u099C " +
          "\u09B9\u09AF\u09BC\u0964 Gap Filling \u0993 Synonym-Antonym \u0985\u0982\u09B6\u09C7 " +
          "\u09B8\u09B0\u09BE\u09B8\u09B0\u09BF \u09A8\u09AE\u09CD\u09AC\u09B0 \u09AA\u09BE\u0993\u09AF\u09BC\u09BE \u09AF\u09BE\u09AF\u09BC\u0964",
        mcqs: [
          {
            id: "vocab-q1",
            question: "Synonym of \"Happy\" is:",
            options: ["Sad", "Angry", "Joyful", "Tired"],
            correctAnswer: 2,
            explanation:
              "Synonym \u09AE\u09BE\u09A8\u09C7 \u098F\u0995\u0987 \u0985\u09B0\u09CD\u09A5\u09C7\u09B0 \u09B6\u09AC\u09CD\u09A6\u0964 " +
              "Happy = \u0986\u09A8\u09A8\u09CD\u09A6\u09BF\u09A4, Joyful \u0993 \u098F\u0995\u0987 \u0985\u09B0\u09CD\u09A5\u0964",
          },
          {
            id: "vocab-q2",
            question: "Antonym of \"Begin\" is:",
            options: ["Start", "End", "Continue", "Try"],
            correctAnswer: 1,
            explanation:
              "Antonym \u09AE\u09BE\u09A8\u09C7 \u09AC\u09BF\u09AA\u09B0\u09C0\u09A4 \u09B6\u09AC\u09CD\u09A6\u0964 " +
              "Begin \u09AE\u09BE\u09A8\u09C7 \u09B6\u09C1\u09B0\u09C1 \u0995\u09B0\u09BE, " +
              "\u09A4\u09BE\u09B0 \u09AC\u09BF\u09AA\u09B0\u09C0\u09A4 End = \u09B6\u09C7\u09B7 \u0995\u09B0\u09BE\u0964",
          },
          {
            id: "vocab-q3",
            question: "Fill in the gap: Education is the key to ___.",
            options: ["money", "success", "sleep", "traffic"],
            correctAnswer: 1,
            explanation:
              "\u098F\u099F\u09BF \u098F\u0995\u099F\u09BF \u099C\u09A8\u09AA\u09CD\u09B0\u09BF\u09AF\u09BC proverb: " +
              "\"Education is the key to success.\" " +
              "\u09B6\u09BF\u0995\u09CD\u09B7\u09BE\u0987 \u09B8\u09BE\u09AB\u09B2\u09CD\u09AF\u09C7\u09B0 \u099A\u09BE\u09AC\u09BF\u0995\u09BE\u09A0\u09BF\u0964",
          },
        ],
      },
    ],
  },
  "2nd": {
    id: "2nd",
    title: "2nd Paper",
    description: "Grammar, Writing",
    titleBn: "\u09A6\u09CD\u09AC\u09BF\u09A4\u09C0\u09AF\u09BC \u09AA\u09A4\u09CD\u09B0",
    topics: [
      {
        id: "e2-1",
        title: "Tense",
        titleBn: "\u0995\u09BE\u09B2",
        explanation:
          "Tense \u09A4\u09BF\u09A8 \u09AA\u09CD\u09B0\u0995\u09BE\u09B0: Present, Past, " +
          "\u0986\u09B0 Future\u0964 \u09AA\u09CD\u09B0\u09A4\u09BF\u099F\u09BE\u09B0 \u0986\u09AC\u09BE\u09B0 " +
          "\u09EA\u099F\u09BF \u0995\u09B0\u09C7 \u09B0\u09C2\u09AA \u0986\u099B\u09C7, " +
          "\u09AE\u09CB\u099F \u09E7\u09E8\u099F\u09BF\u0964 " +
          "Signal Word \u099A\u09BF\u09A8\u09A4\u09C7 \u09B9\u09AC\u09C7: " +
          "now, yesterday, tomorrow \u0987\u09A4\u09CD\u09AF\u09BE\u09A6\u09BF\u0964",
        keyTerms: "Present, Past, Future, Indefinite, Continuous, Perfect",
        importance:
          "Tense \u09AD\u09BE\u09B2\u09CB\u09AD\u09BE\u09AC\u09C7 \u09A8\u09BE \u09B6\u09BF\u0996\u09B2\u09C7 " +
          "Right Form of Verb, Transformation, Narration -- \u0995\u09CB\u09A8\u099F\u09BE\u0987 \u09AA\u09BE\u09B0\u09AC\u09C7 \u09A8\u09BE\u0964 " +
          "\u098F\u099F\u09BE\u0987 Grammar-\u098F\u09B0 \u09AD\u09BF\u09A4\u09CD\u09A4\u09BF\u0964",
        mcqs: [
          {
            id: "tense-q1",
            question: "She ___ to school every day.",
            options: ["go", "goes", "going", "gone"],
            correctAnswer: 1,
            explanation:
              "\"every day\" \u09A6\u09C7\u0996\u09C7 \u09AC\u09CB\u099D\u09BE \u09AF\u09BE\u09AF\u09BC " +
              "\u098F\u099F\u09BE Present Indefinite Tense\u0964 " +
              "Subject \"She\" \u09A4\u09C3\u09A4\u09C0\u09AF\u09BC \u09AA\u09C1\u09B0\u09C1\u09B7 " +
              "\u098F\u0995\u09AC\u099A\u09A8, \u09A4\u09BE\u0987 Verb-\u098F\u09B0 \u09B6\u09C7\u09B7\u09C7 " +
              "\"es\" \u09AC\u09B8\u09C7: go \u2192 goes\u0964",
          },
          {
            id: "tense-q2",
            question: "They ___ football yesterday.",
            options: ["play", "plays", "played", "playing"],
            correctAnswer: 2,
            explanation:
              "\"yesterday\" \u098F\u0995\u099F\u09BF Signal Word -- " +
              "\u098F\u099F\u09BE Past Indefinite Tense\u0964 " +
              "Past Tense-\u098F Verb-\u098F\u09B0 Past Form \u09AC\u09B8\u09C7: " +
              "play \u2192 played\u0964",
          },
          {
            id: "tense-q3",
            question: "I ___ reading a book now.",
            options: ["am", "is", "are", "was"],
            correctAnswer: 0,
            explanation:
              "\"now\" \u09A6\u09C7\u0996\u09C7 \u09AC\u09CB\u099D\u09BE \u09AF\u09BE\u09AF\u09BC " +
              "\u098F\u099F\u09BE Present Continuous Tense\u0964 " +
              "Structure: Subject + am/is/are + verb-ing\u0964 " +
              "\"I\" \u098F\u09B0 \u09B8\u09BE\u09A5\u09C7 \u09B8\u09AC\u09B8\u09AE\u09AF\u09BC " +
              "\"am\" \u09AC\u09B8\u09C7\u0964",
          },
        ],
      },
      {
        id: "e2-2",
        title: "Right Form of Verb",
        titleBn: "\u0995\u09CD\u09B0\u09BF\u09AF\u09BC\u09BE\u09B0 \u09B8\u09A0\u09BF\u0995 \u09B0\u09C2\u09AA",
        explanation:
          "Bracket-\u098F \u098F\u0995\u099F\u09BF Verb \u09A6\u09C7\u0993\u09AF\u09BC\u09BE " +
          "\u09A5\u09BE\u0995\u09AC\u09C7, \u09A4\u09BE\u09B0 \u09B8\u09A0\u09BF\u0995 \u09B0\u09C2\u09AA " +
          "\u09AC\u09B8\u09BE\u09A4\u09C7 \u09B9\u09AC\u09C7\u0964 \u0986\u0997\u09C7 Tense \u099A\u09BF\u09A8\u09CB, " +
          "Subject \u09A6\u09C7\u0996\u09CB, \u09A4\u09BE\u09B0\u09AA\u09B0 Verb \u098F\u09B0 " +
          "\u09B8\u09A0\u09BF\u0995 \u09B0\u09C2\u09AA \u09AC\u09B8\u09BE\u0993\u0964",
        keyTerms: "Verb Form, Auxiliary, Subject-Verb Agreement, Participle",
        importance:
          "\u0985\u09A8\u09C7\u0995 \u09AC\u09A1\u09BC Mark-\u098F\u09B0 \u0985\u0982\u09B6 -- " +
          "Tense \u0986\u09B0 Subject \u09AE\u09BF\u09B2\u09BF\u09AF\u09BC\u09C7 \u09AC\u09BE\u0995\u09CD\u09AF " +
          "\u099A\u09BF\u09A8\u09A4\u09C7 \u09AA\u09BE\u09B0\u09B2\u09C7 \u09AA\u09C1\u09B0\u09CB \u09A8\u09AE\u09CD\u09AC\u09B0 \u09A4\u09CB\u09B2\u09BE \u09B8\u09B9\u099C\u0964",
        mcqs: [
          {
            id: "rfv-q1",
            question: "He (go) to Dhaka tomorrow.",
            options: ["go", "goes", "will go", "went"],
            correctAnswer: 2,
            explanation:
              "\"tomorrow\" \u09A6\u09C7\u0996\u09C7 \u09AC\u09CB\u099D\u09BE \u09AF\u09BE\u09AF\u09BC " +
              "\u098F\u099F\u09BE Future Indefinite Tense\u0964 " +
              "Structure: Subject + will/shall + verb \u098F\u09B0 base form\u0964 " +
              "\u09A4\u09BE\u0987 \u0989\u09A4\u09CD\u09A4\u09B0 \"will go\"\u0964",
          },
          {
            id: "rfv-q2",
            question: "She has already (finish) her work.",
            options: ["finish", "finished", "finishing", "finishes"],
            correctAnswer: 1,
            explanation:
              "Has/Have + past participle = Present Perfect Tense\u0964 " +
              "finish \u098F\u09B0 past participle form \"finished\"\u0964 " +
              "\"already\" \u09B6\u09AC\u09CD\u09A6\u099F\u09BF\u0993 Present Perfect \u098F\u09B0 signal\u0964",
          },
          {
            id: "rfv-q3",
            question: "Every student (want) to pass.",
            options: ["want", "wants", "wanting", "wanted"],
            correctAnswer: 1,
            explanation:
              "\"Every\" \u09B6\u09C1\u09B0\u09C1 \u09B9\u09B2\u09C7 Subject \u09B8\u09BF\u0999\u09CD\u0997\u09C1\u09B2\u09BE\u09B0 " +
              "\u09AC\u09B2\u09C7 \u09A7\u09B0\u09BE \u09B9\u09AF\u09BC\u0964 " +
              "\u09A4\u09BE\u0987 Verb-\u098F\u09B0 \u09B6\u09C7\u09B7\u09C7 \"s\" \u09AC\u09B8\u09C7: " +
              "want \u2192 wants\u0964",
          },
        ],
      },
      {
        id: "e2-3",
        title: "Paragraph / Email / Application",
        titleBn: "\u09AA\u09CD\u09AF\u09BE\u09B0\u09BE\u0997\u09CD\u09B0\u09BE\u09AB / \u0987\u09AE\u09C7\u0987\u09B2 / \u0986\u09AC\u09C7\u09A6\u09A8",
        explanation:
          "Paragraph-\u098F \u09A4\u09BF\u09A8\u099F\u09BF \u0985\u0982\u09B6: " +
          "Topic Sentence, Supporting Sentences, \u0986\u09B0 Concluding Sentence\u0964 " +
          "Email \u0993 Application-\u098F Format \u09AE\u09A8\u09C7 \u09B0\u09BE\u0996\u09CB: " +
          "To, Subject, Body, \u0986\u09B0 Closing\u0964 " +
          "Formal \u09B2\u09BF\u0996\u09A4\u09C7 Dear Sir/Madam \u09AC\u09CD\u09AF\u09AC\u09B9\u09BE\u09B0 \u0995\u09B0\u09CB\u0964",
        keyTerms: "Topic Sentence, Format, Salutation, Body, Closing",
        importance:
          "Writing Section-\u098F \u098F\u0987 \u0985\u0982\u09B6 \u09A5\u09C7\u0995\u09C7 " +
          "\u09AC\u09A1\u09BC \u09A8\u09AE\u09CD\u09AC\u09B0 \u0986\u09B8\u09C7\u0964 " +
          "Format \u09A0\u09BF\u0995 \u09A5\u09BE\u0995\u09B2\u09C7\u0987 \u0985\u09B0\u09CD\u09A7\u09C7\u0995 \u09A8\u09AE\u09CD\u09AC\u09B0 \u09AA\u09BE\u0993\u09AF\u09BC\u09BE \u09AF\u09BE\u09AF\u09BC\u0964",
        mcqs: [
          {
            id: "pw-q1",
            question: "Paragraph \u098F\u09B0 \u09AA\u09CD\u09B0\u09A5\u09AE \u09AC\u09BE\u0995\u09CD\u09AF\u0995\u09C7 \u0995\u09C0 \u09AC\u09B2\u09C7?",
            options: [
              "Closing Sentence",
              "Topic Sentence",
              "Conclusion",
              "Subject",
            ],
            correctAnswer: 1,
            explanation:
              "Paragraph \u098F\u09B0 \u09AA\u09CD\u09B0\u09A5\u09AE \u09AC\u09BE\u0995\u09CD\u09AF " +
              "Topic Sentence \u09A8\u09BE\u09AE\u09C7 \u09AA\u09B0\u09BF\u099A\u09BF\u09A4\u0964 " +
              "\u098F\u099F\u09BF \u09AA\u09C1\u09B0\u09CB Paragraph-\u098F\u09B0 \u09AE\u09C2\u09B2 \u09AC\u09BF\u09B7\u09AF\u09BC \u09AA\u09B0\u09BF\u099A\u09AF\u09BC \u0995\u09B0\u09BE\u09AF\u09BC\u0964",
          },
          {
            id: "pw-q2",
            question: "Formal email \u098F \u0995\u09CB\u09A8 salutation \u09AC\u09CD\u09AF\u09AC\u09B9\u09BE\u09B0 \u0995\u09B0\u09BE \u0989\u099A\u09BF\u09A4?",
            options: [
              "Hi buddy",
              "Hey there",
              "Dear Sir/Madam",
              "Yo",
            ],
            correctAnswer: 2,
            explanation:
              "Formal email \u098F \u09B8\u09AC\u09B8\u09AE\u09AF\u09BC " +
              "\"Dear Sir/Madam\" \u09AC\u09CD\u09AF\u09AC\u09B9\u09BE\u09B0 \u0995\u09B0\u09A4\u09C7 \u09B9\u09AF\u09BC\u0964 " +
              "\u0985\u09A8\u09CD\u09AF\u09AC\u09BF\u09A7 option \u0997\u09C1\u09B2\u09CB informal -- " +
              "\u09AC\u09A8\u09CD\u09A7\u09C1\u09A6\u09C7\u09B0 \u09B8\u09BE\u09A5\u09C7 \u09AC\u09CD\u09AF\u09AC\u09B9\u09BE\u09B0 \u09B9\u09AF\u09BC\u0964",
          },
          {
            id: "pw-q3",
            question: "Application \u09A4\u09C8\u09B0\u09BF \u0995\u09B0\u09A4\u09C7 \u09AA\u09CD\u09B0\u09A5\u09AE \u0995\u09BF \u09B2\u09BF\u0996\u09A4\u09C7 \u09B9\u09AF\u09BC?",
            options: [
              "Subject",
              "Yours sincerely",
              "To (address of authority)",
              "Body",
            ],
            correctAnswer: 2,
            explanation:
              "Application \u09B2\u09C7\u0996\u09BE\u09B0 \u09B6\u09C1\u09B0\u09C1\u09A4\u09C7 " +
              "\u0995\u09BE\u09B0 \u0995\u09BE\u099B\u09C7 \u09B2\u09BF\u0996\u099B\u09CB \u09B8\u09C7\u099F\u09BF " +
              "\u09A6\u09BF\u09AF\u09BC\u09C7 \u09B6\u09C1\u09B0\u09C1 \u0995\u09B0\u09A4\u09C7 \u09B9\u09AF\u09BC (To: The Principal)\u0964 " +
              "\u09A4\u09BE\u09B0\u09AA\u09B0 Subject, \u09A4\u09BE\u09B0\u09AA\u09B0 Body, \u09B6\u09C7\u09B7\u09C7 Closing\u0964",
          },
        ],
      },
    ],
  },
};

function EnglishDetail({ topic, onBack }) {
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

      {topic.keyTerms && (
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
      )}

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

function EnglishTopicList({ paper, onBack, onSelectTopic }) {
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

function English1Page({ jumpToPaper, jumpToTopicId, clearJump }) {
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

function English2Page() {
  return (
    <div style={{ padding: "30px 0", textAlign: "center" }}>
      <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 6 }}>
        English 2nd Paper
      </h2>
      <p
        style={{
          fontSize: 14,
          color: "#6366f1",
          fontWeight: 600,
          marginBottom: 20,
        }}
      >
        Grammar & Composition
      </p>

      <div
        style={{
          background: "#f8fafc",
          border: "1px solid #e2e8f0",
          borderRadius: 14,
          padding: "24px 18px",
        }}
      >
        <p
          style={{
            fontSize: 14,
            color: "#64748b",
            lineHeight: 1.7,
          }}
        >
          Board-pattern practice will be added next.
        </p>
      </div>
    </div>
  );
}

function findICTTopicByMCQId(mcqId) {
  for (var i = 0; i < ictTopics.length; i++) {
    var topic = ictTopics[i];
    if (topic.mcqs) {
      for (var j = 0; j < topic.mcqs.length; j++) {
        if (topic.mcqs[j].id === mcqId) {
          return { topic: topic };
        }
      }
    }
  }
  return null;
}

function findEnglishTopicByMCQId(mcqId) {
  var paperKeys = Object.keys(englishPapers);
  for (var i = 0; i < paperKeys.length; i++) {
    var paperKey = paperKeys[i];
    var paper = englishPapers[paperKey];
    for (var j = 0; j < paper.topics.length; j++) {
      var topic = paper.topics[j];
      if (topic.mcqs) {
        for (var k = 0; k < topic.mcqs.length; k++) {
          if (topic.mcqs[k].id === mcqId) {
            return { paperKey: paperKey, topic: topic };
          }
        }
      }
    }
  }
  return null;
}

function collectAllMCQs() {
  var all = [];
  ictTopics.forEach(function (topic) {
    if (topic.mcqs && topic.mcqs.length > 0) {
      topic.mcqs.forEach(function (mcq) {
        all.push({
          id: mcq.id,
          question: mcq.question,
          options: mcq.options,
          correctAnswer: mcq.correctAnswer,
          explanation: mcq.explanation,
          source: topic.title,
          subject: "ICT",
          subjectKey: "ict",
          topicId: topic.id,
        });
      });
    }
  });
  Object.keys(englishPapers).forEach(function (paperKey) {
    var paper = englishPapers[paperKey];
    paper.topics.forEach(function (topic) {
      if (topic.mcqs && topic.mcqs.length > 0) {
        topic.mcqs.forEach(function (mcq) {
          all.push({
            id: mcq.id,
            question: mcq.question,
            options: mcq.options,
            correctAnswer: mcq.correctAnswer,
            explanation: mcq.explanation,
            source: topic.title,
            subject: "English (" + paper.title + ")",
            subjectKey: "english",
            paperKey: paperKey,
            topicId: topic.id,
          });
        });
      }
    });
  });
  return all;
}

function shuffleAndPick(arr, n) {
  var copy = arr.slice();
  for (var i = copy.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = copy[i];
    copy[i] = copy[j];
    copy[j] = tmp;
  }
  return copy.slice(0, n);
}

function TestPage({ goToTopic }) {
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

function BoardPracticePage() {
  const [section, setSection] = useState(null);
  const [task, setTask] = useState(null);
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);

  const ictCreativeItems = [
    {
      id: "ict-creative-html",
      title: "HTML / Web Design",
      scenario:
        "Rahim wants to create a webpage for his college. He wants to add a heading, a paragraph, an image and a hyperlink to the college website.",
      parts: [
        {
          id: "ict-creative-html-ka",
          label: "ক",
          marks: 1,
          question: "HTML কী?",
          modelAnswer:
            "HTML এর পূর্ণরূপ HyperText Markup Language. এটি ওয়েব পেজ তৈরি করার প্রধান markup language.",
        },
        {
          id: "ict-creative-html-kha",
          label: "খ",
          marks: 2,
          question: "HTML কে markup language বলা হয় কেন?",
          modelAnswer:
            "HTML বিভিন্ন tag ব্যবহার করে webpage-এর heading, paragraph, image, link ইত্যাদি structure নির্ধারণ করে. তাই HTML কে markup language বলা হয়.",
        },
        {
          id: "ict-creative-html-ga",
          label: "গ",
          marks: 3,
          question:
            "Rahim কীভাবে একটি image এবং hyperlink যুক্ত করবে? উদাহরণসহ লেখ।",
          modelAnswer:
            "Rahim image যুক্ত করতে <img> tag এবং hyperlink যুক্ত করতে <a> tag ব্যবহার করবে. যেমন: <img src=\"college.jpg\" alt=\"College\"> এবং <a href=\"https://college.edu.bd\">College Website</a>.",
        },
        {
          id: "ict-creative-html-gha",
          label: "ঘ",
          marks: 8,
          question:
            "একটি educational website তৈরিতে HTML-এর গুরুত্ব বিশ্লেষণ কর।",
          modelAnswer:
            "Educational website তৈরিতে HTML খুব গুরুত্বপূর্ণ, কারণ এটি webpage-এর মূল কাঠামো তৈরি করে. HTML দিয়ে heading, paragraph, list, image, table, form এবং link সাজানো যায়. শিক্ষার্থীরা class routine, notice, result, admission information এবং study materials সহজে দেখতে পারে. CSS ও JavaScript ব্যবহার করার আগে HTML ভিত্তি হিসেবে কাজ করে. তাই একটি কার্যকর educational website তৈরির প্রথম ও অপরিহার্য ধাপ হলো সঠিক HTML structure তৈরি করা.",
        },
      ],
    },
    {
      id: "ict-creative-number-system",
      title: "Number System",
      scenario:
        "A student is learning how computers store numbers. His teacher asks him to convert decimal numbers into binary and explain why computers use binary.",
      parts: [
        {
          id: "ict-creative-number-ka",
          label: "ক",
          marks: 1,
          question: "Binary number system কী?",
          modelAnswer:
            "Binary number system হলো base-2 number system, যেখানে শুধু 0 এবং 1 digit ব্যবহার করা হয়.",
        },
        {
          id: "ict-creative-number-kha",
          label: "খ",
          marks: 2,
          question: "Computer কেন binary number system ব্যবহার করে?",
          modelAnswer:
            "Computer electronic circuit দিয়ে কাজ করে, যেখানে signal-এর দুটি অবস্থা থাকে: on এবং off. এই দুটি অবস্থাকে 1 এবং 0 দিয়ে প্রকাশ করা সহজ, তাই computer binary number system ব্যবহার করে.",
        },
        {
          id: "ict-creative-number-ga",
          label: "গ",
          marks: 3,
          question: "(25)₁₀ কে binary-তে রূপান্তর কর।",
          modelAnswer:
            "25 কে 2 দিয়ে ভাগ করলে remainder গুলো নিচ থেকে ওপরে পড়তে হয়: 25 ÷ 2 = 12 remainder 1, 12 ÷ 2 = 6 remainder 0, 6 ÷ 2 = 3 remainder 0, 3 ÷ 2 = 1 remainder 1, 1 ÷ 2 = 0 remainder 1. তাই (25)₁₀ = (11001)₂.",
        },
        {
          id: "ict-creative-number-gha",
          label: "ঘ",
          marks: 8,
          question:
            "Number system conversion ICT শিক্ষায় কেন গুরুত্বপূর্ণ — বিশ্লেষণ কর।",
          modelAnswer:
            "Number system conversion ICT শিক্ষায় গুরুত্বপূর্ণ, কারণ computer data internally binary আকারে সংরক্ষণ ও প্রক্রিয়াকরণ করে. Decimal, binary, octal এবং hexadecimal system বুঝলে memory, coding, digital logic, address, color code এবং machine-level data সম্পর্কে পরিষ্কার ধারণা পাওয়া যায়. Programming, networking এবং hardware-related বিষয়েও number conversion দরকার হয়. তাই ICT-তে computer কীভাবে data বোঝে ও ব্যবহার করে তা শেখার জন্য number system conversion একটি মৌলিক দক্ষতা.",
        },
      ],
    },
  ];

  const fullMockItems = [
    {
      id: "mock-ict",
      title: "ICT Full Mock",
      sections: ["MCQ: 25 marks", "Creative/Written: 50 marks"],
      status: "Coming soon",
    },
    {
      id: "mock-english1",
      title: "English 1st Paper Full Mock",
      sections: ["Reading Test: 60 marks", "Guided Writing: 40 marks"],
      status: "Coming soon",
    },
    {
      id: "mock-english2",
      title: "English 2nd Paper Full Mock",
      sections: ["Grammar: 60 marks", "Composition: 40 marks"],
      status: "Coming soon",
    },
  ];

  const prepositionItems = [
    {
      id: "prep-1",
      sentence: "He is interested ___ learning English.",
      answer: "in",
      explanation: "Interested এর পরে সাধারণত in বসে: interested in something.",
    },
    {
      id: "prep-2",
      sentence: "She is good ___ Mathematics.",
      answer: "at",
      explanation: "Good at মানে কোনো কাজে ভালো। তাই good at Mathematics.",
    },
    {
      id: "prep-3",
      sentence: "We should be kind ___ the poor.",
      answer: "to",
      explanation: "Kind to someone = কারো প্রতি দয়ালু হওয়া।",
    },
    {
      id: "prep-4",
      sentence: "He died ___ cancer.",
      answer: "of",
      explanation: "রোগে মারা গেলে সাধারণত died of ব্যবহৃত হয়।",
    },
    {
      id: "prep-5",
      sentence: "The book is ___ the table.",
      answer: "on",
      explanation: "কোনো কিছুর ওপর থাকলে on ব্যবহৃত হয়।",
    },
  ];

  const rightFormItems = [
    {
      id: "rf-1",
      sentence: "She usually ___ (go) to college by bus.",
      answer: "goes",
      explanation: "Usually = Present Indefinite. She/he/it হলে verb-এর সাথে s/es হয়.",
    },
    {
      id: "rf-2",
      sentence: "They ___ (play) football yesterday.",
      answer: "played",
      explanation: "Yesterday = Past Indefinite. তাই verb-এর past form হবে.",
    },
    {
      id: "rf-3",
      sentence: "I ___ (read) a book now.",
      answer: "am reading",
      explanation: "Now = Present Continuous. Structure: am/is/are + verb-ing.",
    },
    {
      id: "rf-4",
      sentence: "He has already ___ (finish) his work.",
      answer: "finished",
      explanation: "Has/have + past participle. finish-এর past participle হলো finished.",
    },
    {
      id: "rf-5",
      sentence: "If I ___ (be) a bird, I would fly.",
      answer: "were",
      explanation: "Second conditional / imaginary sentence-এ If I were ব্যবহৃত হয়.",
    },
  ];

  const connectorItems = [
  {
    id: "conn-1",
    sentence: "He was ill. ___, he attended the class.",
    answer: "nevertheless",
    explanation: "দুইটি বিপরীত ভাব যুক্ত হলে nevertheless/however ব্যবহার করা যায়।",
  },
  {
    id: "conn-2",
    sentence: "Study regularly. ___, you will fail.",
    answer: "otherwise",
    explanation: "না হলে / অন্যথায় বোঝাতে otherwise ব্যবহার হয়।",
  },
  {
    id: "conn-3",
    sentence: "He worked hard. ___, he succeeded.",
    answer: "therefore",
    explanation: "কারণ-ফল বোঝাতে therefore ব্যবহার হয়।",
  },
  {
    id: "conn-4",
    sentence: "I like English. ___, I practice it every day.",
    answer: "so",
    explanation: "ফলাফল বোঝাতে so ব্যবহার করা যায়।",
  },
  {
    id: "conn-5",
    sentence: "The man is poor. ___, he is honest.",
    answer: "but",
    explanation: "বিপরীত ভাব বোঝাতে but ব্যবহার হয়।",
  },
];

const synonymAntonymItems = [
  {
    id: "sa-1",
    word: "brave",
    type: "synonym",
    question: "Synonym of 'brave' is:",
    options: ["cowardly", "courageous", "weak", "lazy"],
    answer: "courageous",
    explanation: "Brave মানে সাহসী। এর synonym হলো courageous.",
  },
  {
    id: "sa-2",
    word: "ancient",
    type: "antonym",
    question: "Antonym of 'ancient' is:",
    options: ["old", "modern", "past", "historic"],
    answer: "modern",
    explanation: "Ancient মানে প্রাচীন। এর antonym হলো modern.",
  },
  {
    id: "sa-3",
    word: "increase",
    type: "antonym",
    question: "Antonym of 'increase' is:",
    options: ["grow", "rise", "decrease", "improve"],
    answer: "decrease",
    explanation: "Increase মানে বৃদ্ধি পাওয়া। এর বিপরীত decrease.",
  },
  {
    id: "sa-4",
    word: "honest",
    type: "synonym",
    question: "Synonym of 'honest' is:",
    options: ["truthful", "false", "weak", "careless"],
    answer: "truthful",
    explanation: "Honest মানে সৎ। এর synonym হলো truthful.",
  },
  {
    id: "sa-5",
    word: "difficult",
    type: "antonym",
    question: "Antonym of 'difficult' is:",
    options: ["hard", "easy", "complex", "serious"],
    answer: "easy",
    explanation: "Difficult মানে কঠিন। এর antonym হলো easy.",
  },
];

const punctuationItems = [
  {
    id: "punct-1",
    wrong: "rahim said i am busy now",
    answer: "Rahim said, \"I am busy now.\"",
    explanation: "Name capital হবে, said-এর পরে comma, direct speech quotation mark-এর ভিতরে, I capital হবে।",
  },
  {
    id: "punct-2",
    wrong: "where do you live",
    answer: "Where do you live?",
    explanation: "প্রশ্নবোধক বাক্যের শেষে question mark বসে এবং প্রথম অক্ষর capital হয়।",
  },
  {
    id: "punct-3",
    wrong: "dhaka is the capital of bangladesh",
    answer: "Dhaka is the capital of Bangladesh.",
    explanation: "Proper noun Dhaka এবং Bangladesh capital হবে। বাক্যের শেষে full stop বসবে।",
  },
  {
    id: "punct-4",
    wrong: "he bought rice fish and vegetables",
    answer: "He bought rice, fish and vegetables.",
    explanation: "List-এর item আলাদা করতে comma ব্যবহার হয়। বাক্যের শুরু capital এবং শেষে full stop।",
  },
  {
    id: "punct-5",
    wrong: "alas he is dead",
    answer: "Alas! He is dead.",
    explanation: "Alas-এর পরে exclamation mark বসে। এরপর নতুন বাক্য capital দিয়ে শুরু হয়।",
  },
];

const completingSentenceItems = [
  {
    id: "cs-1",
    sentence: "If I had enough money, ___.",
    answer: "I would buy a laptop",
    explanation: "Second conditional: If + past form, subject + would + base verb.",
  },
  {
    id: "cs-2",
    sentence: "Though he is poor, ___.",
    answer: "he is honest",
    explanation: "Though দিয়ে contrast বোঝায়। বাক্যের দ্বিতীয় অংশে বিপরীত ভাব আসবে।",
  },
  {
    id: "cs-3",
    sentence: "No sooner had the teacher entered the class than ___.",
    answer: "the students stood up",
    explanation: "No sooner ... than structure-এ than-এর পরে দ্বিতীয় ঘটনা বসে।",
  },
  {
    id: "cs-4",
    sentence: "It is high time ___.",
    answer: "we changed our bad habits",
    explanation: "It is high time-এর পরে past form ব্যবহার করা হয়।",
  },
  {
    id: "cs-5",
    sentence: "He studies hard so that ___.",
    answer: "he can pass the exam",
    explanation: "So that দিয়ে purpose বোঝায়। সাধারণত can/may/could/might ব্যবহার হয়।",
  },
];

const wordsPhrasesItems = [
  {
    id: "wp-1",
    sentence: "___ of his poverty, he is honest.",
    answer: "in spite",
    explanation: "In spite of = সত্ত্বেও। Structure: In spite of + noun/pronoun.",
  },
  {
    id: "wp-2",
    sentence: "He is ___ to help the poor.",
    answer: "used",
    explanation: "Used to + verb = আগে অভ্যাস ছিল। Be used to + noun/verb-ing = অভ্যস্ত। এখানে সহজ practice হিসেবে used বসবে।",
  },
  {
    id: "wp-3",
    sentence: "___ he is weak, he works hard.",
    answer: "though",
    explanation: "Though = যদিও। দুইটি বিপরীত ভাব যুক্ত করতে ব্যবহৃত হয়।",
  },
  {
    id: "wp-4",
    sentence: "He ran fast ___ he could catch the train.",
    answer: "so that",
    explanation: "So that = যাতে। উদ্দেশ্য বোঝাতে ব্যবহৃত হয়।",
  },
  {
    id: "wp-5",
    sentence: "You had better ___ the truth.",
    answer: "tell",
    explanation: "Had better-এর পরে verb-এর base form বসে। তাই tell হবে।",
  },
];

const wordsPhrasesBox = [
  "in spite",
  "used",
  "though",
  "so that",
  "tell",
  "because",
  "as if",
];

const modifierItems = [
  {
    id: "mod-1",
    sentence: "___ students should be attentive in class.",
    answer: "all",
    explanation: "All students = সব শিক্ষার্থী। এখানে noun students-কে modify করছে।",
  },
  {
    id: "mod-2",
    sentence: "He is a ___ respected teacher.",
    answer: "highly",
    explanation: "Highly respected = অত্যন্ত সম্মানিত। Highly এখানে respected শব্দটিকে modify করছে।",
  },
  {
    id: "mod-3",
    sentence: "The man ___ in the field is a farmer.",
    answer: "working",
    explanation: "Working in the field = মাঠে কাজ করছে এমন ব্যক্তি। এটি man-কে describe করছে।",
  },
  {
    id: "mod-4",
    sentence: "___ by honesty, he became successful.",
    answer: "guided",
    explanation: "Guided by honesty = সততার দ্বারা পরিচালিত হয়ে। Past participle phrase modifier হিসেবে ব্যবহৃত হয়েছে।",
  },
  {
    id: "mod-5",
    sentence: "The girl ___ a red dress is my sister.",
    answer: "wearing",
    explanation: "Wearing a red dress = লাল পোশাক পরা। এটি girl-কে describe করছে।",
  },
];

const narrationItems = [
  {
    id: "nar-1",
    direct: 'He said, "I am busy."',
    answer: "He said that he was busy.",
    explanation: "Present am → past was. Direct speech থেকে indirect speech করলে reporting verb past হলে tense backshift হয়.",
  },
  {
    id: "nar-2",
    direct: 'She said, "I have finished my work."',
    answer: "She said that she had finished her work.",
    explanation: "Present Perfect have finished → Past Perfect had finished.",
  },
  {
    id: "nar-3",
    direct: 'Rahim said to me, "Are you ready?"',
    answer: "Rahim asked me if I was ready.",
    explanation: "Yes/no question হলে said to → asked, এবং if/whether ব্যবহার হয়.",
  },
  {
    id: "nar-4",
    direct: 'The teacher said, "Do not make noise."',
    answer: "The teacher told us not to make noise.",
    explanation: "Imperative negative sentence হলে told + object + not to + verb ব্যবহার হয়.",
  },
  {
    id: "nar-5",
    direct: 'He said to me, "Where do you live?"',
    answer: "He asked me where I lived.",
    explanation: "WH question indirect speech-এ question order বদলে statement order হয়: where I lived.",
  },
];

const applicationTasks = [
  {
    id: "app-1",
    title: "Application for setting up a computer club",
    question:
      "Write an application to the Principal of your college for setting up a computer club.",
    marks: 10,
    modelAnswer:
      "To\nThe Principal\nABC College, Dhaka\n\nSubject: Prayer for setting up a computer club.\n\nSir,\nWith due respect, we, the students of your college, beg to state that our college does not have a computer club. In this age of information and communication technology, a computer club is very important for students. It will help us learn computer skills, programming, internet use and digital communication.\n\nWe, therefore, pray and hope that you would be kind enough to take necessary steps to set up a computer club in our college.\n\nYours obediently,\nThe students of ABC College",
    keyPoints: [
      "Correct format",
      "Clear subject line",
      "Reason for application",
      "Polite request",
      "Proper closing",
    ],
  },
  {
    id: "app-2",
    title: "Application for increasing library facilities",
    question:
      "Write an application to the Principal of your college for increasing library facilities.",
    marks: 10,
    modelAnswer:
      "To\nThe Principal\nABC College, Dhaka\n\nSubject: Prayer for increasing library facilities.\n\nSir,\nWith due respect, we, the students of your college, beg to state that our college library does not have enough books and reading space. Many students cannot get necessary textbooks, reference books and newspapers. A better library will help us improve our knowledge and academic results.\n\nWe, therefore, pray and hope that you would be kind enough to take necessary steps to increase the library facilities of our college.\n\nYours obediently,\nThe students of ABC College",
    keyPoints: [
      "Mention the problem",
      "Explain why library facilities are needed",
      "Use formal tone",
      "Request politely",
      "Keep paragraphs clear",
    ],
  },
];

const ictMcqItems = [
  {
    id: "ict-mcq-1",
    topic: "Global Village",
    question: "Who introduced the term 'Global Village'?",
    options: ["Bill Gates", "Marshall McLuhan", "Tim Berners-Lee", "Charles Babbage"],
    correctAnswer: 1,
    explanation:
      "Marshall McLuhan introduced the term Global Village to explain how electronic communication connects the world like one village.",
  },
  {
    id: "ict-mcq-2",
    topic: "Data Communication",
    question: "Which device is used to connect multiple networks together?",
    options: ["Router", "Keyboard", "Monitor", "Scanner"],
    correctAnswer: 0,
    explanation:
      "A router forwards data between different networks and helps devices communicate across network boundaries.",
  },
  {
    id: "ict-mcq-3",
    topic: "Data Communication",
    question: "Which transmission mode allows data to travel in both directions, but not at the same time?",
    options: ["Simplex", "Half-duplex", "Full-duplex", "Broadcast"],
    correctAnswer: 1,
    explanation:
      "In half-duplex mode, both sides can send and receive data, but only one side transmits at a time.",
  },
  {
    id: "ict-mcq-4",
    topic: "Number System",
    question: "What is the binary equivalent of decimal 10?",
    options: ["1000", "1010", "1100", "1110"],
    correctAnswer: 1,
    explanation:
      "Decimal 10 is 8 + 2, so its binary form is 1010.",
  },
  {
    id: "ict-mcq-5",
    topic: "Number System",
    question: "Which number system uses the digits 0 to 9 and A to F?",
    options: ["Binary", "Octal", "Decimal", "Hexadecimal"],
    correctAnswer: 3,
    explanation:
      "Hexadecimal is base 16, so it uses 0-9 and A-F to represent values.",
  },
  {
    id: "ict-mcq-6",
    topic: "HTML",
    question: "Which HTML tag is used to create a hyperlink?",
    options: ["<p>", "<a>", "<img>", "<table>"],
    correctAnswer: 1,
    explanation:
      "The <a> tag creates a hyperlink, usually with an href attribute.",
  },
  {
    id: "ict-mcq-7",
    topic: "Logic Gate",
    question: "Which logic gate gives output 1 only when all inputs are 1?",
    options: ["OR", "NOT", "AND", "XOR"],
    correctAnswer: 2,
    explanation:
      "An AND gate outputs 1 only if every input is 1.",
  },
  {
    id: "ict-mcq-8",
    topic: "Logic Gate",
    question: "Which gate reverses the input signal?",
    options: ["AND", "OR", "NOT", "NAND"],
    correctAnswer: 2,
    explanation:
      "A NOT gate is an inverter. It changes 1 to 0 and 0 to 1.",
  },
  {
    id: "ict-mcq-9",
    topic: "C Programming",
    question: "Which symbol is used to end a statement in C programming?",
    options: [",", ".", ";", ":"],
    correctAnswer: 2,
    explanation:
      "Most C statements end with a semicolon.",
  },
  {
    id: "ict-mcq-10",
    topic: "Database",
    question: "In a database table, what is a row usually called?",
    options: ["Field", "Record", "Column", "Query"],
    correctAnswer: 1,
    explanation:
      "A row in a database table is called a record. A column is called a field.",
  },
];

const passageMCQTask = {
  title: "Passage MCQ",
  marks: 5,
  passage:
    "Trees are essential for our environment. They provide oxygen, food, and shelter. Without trees, life on earth would be impossible. However, people are cutting trees rapidly, which is causing environmental imbalance. We should plant more trees and protect our forests.",
  mcqs: [
    {
      id: "passage-mcq-1",
      question: "What do trees provide?",
      options: [
        "Oxygen, food, and shelter",
        "Only wood",
        "Only shade",
        "Cars and roads",
      ],
      correctAnswer: 0,
      explanation:
        "The passage says trees provide oxygen, food, and shelter.",
    },
    {
      id: "passage-mcq-2",
      question: "What happens without trees?",
      options: [
        "Life becomes easier",
        "Life on earth would be impossible",
        "There will be more forests",
        "People will need less oxygen",
      ],
      correctAnswer: 1,
      explanation:
        "The passage says that without trees, life on earth would be impossible.",
    },
    {
      id: "passage-mcq-3",
      question: "What is causing environmental imbalance?",
      options: [
        "Planting more trees",
        "Protecting forests",
        "Cutting trees rapidly",
        "Providing shelter",
      ],
      correctAnswer: 2,
      explanation:
        "Rapid cutting of trees is causing environmental imbalance.",
    },
    {
      id: "passage-mcq-4",
      question: "What should we do?",
      options: [
        "Cut more trees",
        "Ignore forests",
        "Use more paper",
        "Plant more trees and protect forests",
      ],
      correctAnswer: 3,
      explanation:
        "The passage tells us to plant more trees and protect our forests.",
    },
    {
      id: "passage-mcq-5",
      question: "What is the main idea of the passage?",
      options: [
        "Trees are important and should be protected",
        "People should cut forests",
        "Food is more important than oxygen",
        "Shelter is not necessary",
      ],
      correctAnswer: 0,
      explanation:
        "The main idea is that trees are essential for life and we should protect them.",
    },
  ],
};

const passageBroadQuestionTask = {
  title: "Passage Broad Questions",
  marks: 15,
  passage:
    "Trees are essential for our environment. They provide oxygen, food, and shelter. Without trees, life on earth would be impossible. However, people are cutting trees rapidly, which is causing environmental imbalance. We should plant more trees and protect our forests.",
  questions: [
    {
      id: "broad-1",
      question: "Why are trees essential for our environment?",
      marks: 3,
      modelAnswer:
        "Trees are essential because they help keep the environment healthy and support life on earth.",
      keyPoints: ["healthy environment", "support life", "natural balance"],
    },
    {
      id: "broad-2",
      question: "What do trees provide us?",
      marks: 3,
      modelAnswer: "Trees provide us with oxygen, food, and shelter.",
      keyPoints: ["oxygen", "food", "shelter"],
    },
    {
      id: "broad-3",
      question: "What would happen without trees?",
      marks: 3,
      modelAnswer: "Without trees, life on earth would be impossible.",
      keyPoints: ["life impossible", "no proper oxygen", "environment harmed"],
    },
    {
      id: "broad-4",
      question: "What is causing environmental imbalance?",
      marks: 3,
      modelAnswer:
        "People are cutting trees rapidly, and this is causing environmental imbalance.",
      keyPoints: ["rapid tree cutting", "human activity", "imbalance"],
    },
    {
      id: "broad-5",
      question: "What should we do to protect nature?",
      marks: 3,
      modelAnswer:
        "We should plant more trees and protect our forests to protect nature.",
      keyPoints: ["plant trees", "protect forests", "stop cutting trees"],
    },
  ],
};

const flowChartTask = {
  title: "Flow Chart / Information Transfer",
  marks: 5,
  pattern: "Board pattern: 5 blanks x 1 = 5 marks.",
  passage:
    "Trees are essential for our environment. They provide oxygen, food, and shelter. Without trees, life on earth would be impossible. However, people are cutting trees rapidly, which is causing environmental imbalance. We should plant more trees and protect our forests.",
  instruction:
    "Complete the flow chart with information from the passage.",
  start: "Importance of trees",
  items: [
    {
      id: "flow-1",
      number: 1,
      before: "provide",
      answer: "oxygen",
      explanation: "The passage says trees provide oxygen.",
    },
    {
      id: "flow-2",
      number: 2,
      before: "provide",
      answer: "food",
      explanation: "The passage says trees provide food.",
    },
    {
      id: "flow-3",
      number: 3,
      before: "provide",
      answer: "shelter",
      explanation: "The passage says trees provide shelter.",
    },
    {
      id: "flow-4",
      number: 4,
      before: "prevent environmental",
      answer: "imbalance",
      explanation:
        "Protecting trees helps prevent environmental imbalance.",
    },
    {
      id: "flow-5",
      number: 5,
      before: "we should protect",
      answer: "forests",
      explanation: "The passage says we should protect our forests.",
    },
  ],
};

const clozeWithCluesTask = {
  title: "Cloze Test with Clues",
  marks: 5,
  wordBox: [
    "environment",
    "oxygen",
    "cutting",
    "forests",
    "protect",
    "balance",
    "rapidly",
  ],
  text:
    "Trees are very important for our (1) ___. They give us (2) ___ and help keep nature in (3) ___. But people are (4) ___ trees quickly. We should plant more trees and (5) ___ our forests.",
  blanks: [
    {
      id: "cloze-clues-1",
      number: 1,
      answer: "environment",
      explanation: "Trees are important for our environment.",
    },
    {
      id: "cloze-clues-2",
      number: 2,
      answer: "oxygen",
      explanation: "Trees give us oxygen.",
    },
    {
      id: "cloze-clues-3",
      number: 3,
      answer: "balance",
      explanation: "Trees help keep nature in balance.",
    },
    {
      id: "cloze-clues-4",
      number: 4,
      answer: "cutting",
      explanation: "People are cutting trees quickly.",
    },
    {
      id: "cloze-clues-5",
      number: 5,
      answer: "protect",
      explanation: "We should protect our forests.",
    },
  ],
};

const clozeWithoutCluesTask = {
  title: "Cloze Test without Clues",
  marks: 10,
  pattern: "Board pattern: 10 gaps x 1 = 10 marks.",
  text:
    "Education is the backbone of a nation. It helps people become (1) ___ and responsible. A good student should be regular, attentive and (2) ___. Without education, no nation can (3) ___. So, every child should get the opportunity to go to (4) ___ and learn properly. Education removes darkness and brings (5) ___.",
  blanks: [
    {
      id: "cloze-no-clues-1",
      number: 1,
      answer: "skilled",
      explanation: "Education helps people become skilled and responsible.",
    },
    {
      id: "cloze-no-clues-2",
      number: 2,
      answer: "disciplined",
      explanation: "A good student should be disciplined.",
    },
    {
      id: "cloze-no-clues-3",
      number: 3,
      answer: "prosper",
      explanation: "No nation can prosper without education.",
    },
    {
      id: "cloze-no-clues-4",
      number: 4,
      answer: "school",
      explanation: "Every child should get the opportunity to go to school.",
    },
    {
      id: "cloze-no-clues-5",
      number: 5,
      answer: "light",
      explanation: "Education removes darkness and brings light.",
    },
  ],
};

const rearrangingTask = {
  title: "Rearranging Sentences",
  marks: 10,
  instruction:
    "Rearrange the following sentences to make a meaningful story.",
  sentences: [
    { label: "a", text: "He saw a thirsty crow." },
    { label: "b", text: "The crow found a pitcher." },
    { label: "c", text: "Once there was a farmer." },
    { label: "d", text: "There was a little water at the bottom." },
    { label: "e", text: "The crow dropped stones into the pitcher." },
    { label: "f", text: "The water rose up." },
    { label: "g", text: "The crow drank the water." },
    { label: "h", text: "The farmer watched the clever crow." },
    { label: "i", text: "He became very surprised." },
    { label: "j", text: "The crow flew away happily." },
  ],
  answerId: "rearrange-1",
  correctOrder: ["c", "a", "b", "d", "e", "f", "g", "h", "i", "j"],
  explanation:
    "The story starts with the farmer, then the crow finds water, drops stones, drinks the water, and finally flies away.",
};

const paragraphTasks = [
  {
    id: "para-1",
    title: "The Importance of Moral Values",
    question: "Write a paragraph on the importance of moral values.",
    marks: 15,
    modelAnswer:
      "Moral values are the good qualities that help us become honest, kind and responsible. They teach us to respect others, speak the truth and do our duties properly. A person with moral values can choose right from wrong. These values are first learned from family and later developed in school and society. Without moral values, people become selfish and society becomes unsafe. So, every student should practise moral values in daily life.",
    keyPoints: [
      "Meaning of moral values",
      "Honesty, kindness and responsibility",
      "Role of family and school",
      "Importance for society",
      "Simple concluding sentence",
    ],
  },
  {
    id: "para-2",
    title: "Frequent Road Accidents in Bangladesh",
    question: "Write a paragraph on frequent road accidents in Bangladesh.",
    marks: 15,
    modelAnswer:
      "Road accidents are a serious problem in Bangladesh. Every day many people are injured or killed on roads. The main causes are careless driving, over-speeding, unfit vehicles, weak traffic rules and lack of awareness among drivers and pedestrians. Road accidents bring great suffering to families and damage the country. To reduce accidents, traffic laws must be followed strictly. Drivers should be trained, roads should be improved and everyone should be careful while using roads.",
    keyPoints: [
      "Road accidents as a serious problem",
      "Main causes",
      "Effects on people and families",
      "Traffic law and driver training",
      "Awareness and careful road use",
    ],
  },
];

const compositionTasks = [
  {
    id: "comp-1",
    title: "The Uses and Abuses of Internet",
    question: "Write a composition on the uses and abuses of internet.",
    marks: 15,
    modelAnswer:
      "Internet is one of the greatest inventions of modern science. It helps us collect information, communicate with others, attend online classes and do many official works. Students can use it to learn new things and prepare their lessons. But internet also has some abuses. Some people waste time on social media, play games too much or visit harmful websites. It can also spread false information. So, we should use internet carefully and only for good purposes.",
    keyPoints: [
      "Meaning and importance of internet",
      "Educational uses",
      "Communication and daily work",
      "Abuses and harmful sides",
      "Careful and positive use",
    ],
  },
  {
    id: "comp-2",
    title: "Student Life",
    question: "Write a composition on student life.",
    marks: 15,
    modelAnswer:
      "Student life is the most important period of human life. It is the time for learning, building character and preparing for the future. A student should study regularly, respect teachers and parents, and follow discipline. Student life is not only for reading books; it is also for learning honesty, punctuality and good manners. Students should take part in games and social activities too. If students use this time properly, they can become good citizens and serve the country.",
    keyPoints: [
      "Importance of student life",
      "Regular study and discipline",
      "Respect for teachers and parents",
      "Good character and manners",
      "Preparation for future life",
    ],
  },
];

const graphAnalysisTasks = [
  {
    id: "graph-1",
    title: "Graph / Chart Analysis",
    question: "Describe the graph/chart in 150 words.",
    marks: 15,
    table: {
      headers: ["Year", "Internet Users (%)"],
      rows: [
        ["2018", "45"],
        ["2019", "50"],
        ["2020", "58"],
        ["2021", "65"],
        ["2022", "72"],
      ],
    },
    modelAnswer:
      "The chart shows the percentage of internet users from 2018 to 2022. In 2018, internet users were 45%. The number increased to 50% in 2019 and 58% in 2020. The rising trend continued in 2021, when it reached 65%. Finally, in 2022, the percentage became 72%. The chart clearly shows a steady increase every year. The highest percentage was in 2022 and the lowest was in 2018. So, it can be said that internet use increased rapidly during these five years.",
    keyPoints: [
      "introduction",
      "trend description",
      "comparison",
      "conclusion",
    ],
  },
];

const summaryTasks = [
  {
    id: "summary-1",
    title: "Summary Writing",
    question: "Write a summary of the given text in your own words.",
    passage:
      "Money is useful, but it should be spent wisely. Many students spend money on things they do not really need. They may buy extra snacks, costly clothes or unnecessary mobile data. This habit can create problems later. A wise person makes a plan before spending money. We should first spend on necessary things such as food, books, education and health. We should also save a little money for future needs. Spending wisely teaches us discipline and helps us live a better life.",
    marks: 10,
    modelAnswer:
      "Money should be used carefully. We should avoid spending on unnecessary things and make a plan before buying anything. Necessary needs like food, education, books and health should come first. Saving some money is also important. Wise spending makes us disciplined and helps us in future.",
    keyPoints: [
      "Use your own words",
      "Keep only the main ideas",
      "Avoid examples and extra details",
      "Make it shorter than the passage",
      "Write in clear sentences",
    ],
  },
];

const storyCompletionTasks = [
  {
    id: "story-1",
    title: "Story Completion",
    question: "Complete the story in about 150 words.",
    storyBeginning:
      "Once there lived a poor farmer in a village. He had a small piece of land. He worked hard every day, but he could not earn enough money for his family. One day, while working in the field, he found a small bag under a tree...",
    marks: 15,
    modelAnswer:
      "He opened the bag and found some gold coins inside it. At first, he became very happy. He thought that the money would solve all his problems. But soon he remembered that the bag might belong to someone else. So, he went to the village headman and gave him the bag. After some time, a rich man came there and said that he had lost his bag. The headman returned it to him. The rich man was pleased with the farmer's honesty and gave him a reward. The farmer returned home happily. From that day, everyone in the village respected him. Honesty is always rewarded.",
    keyPoints: [
      "continue from the given beginning",
      "keep story logical",
      "use simple past tense",
      "give a clear ending",
      "include a moral if possible",
    ],
  },
];

const informalLetterTasks = [
  {
    id: "informal-1",
    title: "Email about HSC Exam Preparation",
    question:
      "Write an email to your friend about your preparation for the HSC exam.",
    marks: 10,
    modelAnswer:
      "To: friend@example.com\nSubject: My HSC exam preparation\n\nDear Rafi,\nI hope you are well. My HSC exam preparation is going on well. I have made a daily routine and I am following it carefully. I revise English, ICT and other subjects every day. I also solve board questions to understand the exam pattern. Please pray for me so that I can do well in the exam.\n\nYour friend,\nSadia",
    keyPoints: [
      "Email address and subject",
      "Friendly greeting",
      "Preparation routine",
      "Board question practice",
      "Proper closing",
    ],
  },
  {
    id: "informal-2",
    title: "Informal Letter about Learning ICT",
    question:
      "Write an informal letter to your friend describing the importance of learning ICT.",
    marks: 10,
    modelAnswer:
      "Dear Rafi,\nI hope you are fine. Today I want to tell you about the importance of learning ICT. ICT helps us use computers, internet and digital tools properly. It is useful for study, communication and future jobs. A student who knows ICT can collect information quickly and learn many new things online. So, we should learn ICT with care.\n\nNo more today. Write to me soon.\n\nYour loving friend,\nSadia",
    keyPoints: [
      "Friendly opening",
      "Importance of ICT",
      "Uses in study and communication",
      "Future job benefits",
      "Informal closing",
    ],
  },
];

  const cardStyle = {
    padding: 16,
    border: "1px solid #e2e8f0",
    borderRadius: 12,
    background: "#f8fafc",
    cursor: "pointer",
    textAlign: "left",
    fontFamily: "inherit",
  };

  const backButtonStyle = {
    marginBottom: 16,
    padding: "8px 12px",
    border: "1px solid #e2e8f0",
    borderRadius: 10,
    background: "#fff",
    cursor: "pointer",
    fontFamily: "inherit",
  };

  function normalizeAnswer(value) {
    return value.trim().toLowerCase();
  }

  function updateAnswer(id, value) {
    setAnswers({
      ...answers,
      [id]: value,
    });
  }

  function resetPractice() {
    setAnswers({});
    setChecked(false);
  }

  function openTask(taskId) {
    setTask(taskId);
    resetPractice();
  }

  function getScore(items) {
    var score = 0;

    items.forEach(function (item) {
      if (normalizeAnswer(answers[item.id] || "") === item.answer.toLowerCase()) {
        score++;
      }
    });

    return score;
  }

  function saveScoredPractice(progressInfo, score, total) {
    if (!progressInfo) return;
    saveBoardSectionProgress({
      id: progressInfo.id,
      title: progressInfo.title,
      score: score,
      total: total,
      date: formatDateISO(new Date()),
    });
  }

  function saveReviewedPractice(progressInfo) {
    if (!progressInfo) return;
    saveBoardSectionProgress({
      id: progressInfo.id,
      title: progressInfo.title,
      score: null,
      total: null,
      status: "reviewed",
      date: formatDateISO(new Date()),
    });
  }

  function checkPractice(progressInfo, score, total) {
    saveScoredPractice(progressInfo, score, total);
    setChecked(true);
  }

  function reviewPractice(progressInfo) {
    saveReviewedPractice(progressInfo);
    setChecked(true);
  }

  function FillPractice({ title, subtitle, items, progressInfo }) {
    var score = getScore(items);

    return (
      <div style={{ padding: "10px 0" }}>
        <button
          style={backButtonStyle}
          onClick={() => {
            setTask(null);
            resetPractice();
          }}
        >
          ← Back
        </button>

        <h2>{title}</h2>
        <p style={{ color: "#64748b", lineHeight: 1.6 }}>{subtitle}</p>

        <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 12 }}>
          {items.map(function (item, index) {
            const userAnswer = answers[item.id] || "";
            const isCorrect =
              normalizeAnswer(userAnswer) === item.answer.toLowerCase();

            return (
              <div
                key={item.id}
                style={{
                  padding: 16,
                  border: "1px solid #e2e8f0",
                  borderRadius: 12,
                  background: "#fff",
                }}
              >
                <p style={{ fontWeight: 700, marginBottom: 10 }}>
                  {index + 1}. {item.sentence}
                </p>

                <input
                  value={userAnswer}
                  onChange={(e) => updateAnswer(item.id, e.target.value)}
                  placeholder="Write answer here"
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: 10,
                    border: "1px solid #cbd5e1",
                    fontSize: 15,
                    fontFamily: "inherit",
                  }}
                />

                {checked && (
                  <div
                    style={{
                      marginTop: 10,
                      padding: 12,
                      borderRadius: 10,
                      background: isCorrect ? "#dcfce7" : "#fee2e2",
                      color: isCorrect ? "#166534" : "#991b1b",
                      lineHeight: 1.6,
                    }}
                  >
                    <p style={{ fontWeight: 700 }}>
                      {isCorrect ? "Correct" : "Wrong"}
                    </p>
                    <p>
                      Correct answer: <strong>{item.answer}</strong>
                    </p>
                    <p>{item.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {!checked ? (
          <button
            onClick={() => checkPractice(progressInfo, score, items.length)}
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
            Check Answers
          </button>
        ) : (
          <div
            style={{
              marginTop: 16,
              padding: 16,
              borderRadius: 12,
              background: "#eef2ff",
              border: "1px solid #c7d2fe",
              textAlign: "center",
            }}
          >
            <h3>
              Score: {score}/{items.length}
            </h3>
            <p style={{ color: "#475569" }}>
              {score >= 4
                ? "Good! এখন আরো board-style sentence practice করো."
                : "আরো practice দরকার. নিয়ম দেখে আবার চেষ্টা করো."}
            </p>

            <button
              onClick={resetPractice}
              style={{
                marginTop: 10,
                padding: "10px 16px",
                border: "none",
                borderRadius: 10,
                background: "#6366f1",
                color: "#fff",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    );
  }

  function OptionPractice({ title, subtitle, items, progressInfo }) {
    var score = 0;

    items.forEach(function (item) {
      if ((answers[item.id] || "") === item.answer) {
        score++;
      }
    });

    return (
      <div style={{ padding: "10px 0" }}>
        <button
          style={backButtonStyle}
          onClick={() => {
            setTask(null);
            resetPractice();
          }}
        >
          ← Back
        </button>

        <h2>{title}</h2>
        <p style={{ color: "#64748b", lineHeight: 1.6 }}>{subtitle}</p>

        <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 12 }}>
          {items.map(function (item, index) {
            var selected = answers[item.id] || "";
            var isCorrect = selected === item.answer;

            return (
              <div
                key={item.id}
                style={{
                  padding: 16,
                  border: "1px solid #e2e8f0",
                  borderRadius: 12,
                  background: "#fff",
                }}
              >
                <p style={{ fontWeight: 700, marginBottom: 10 }}>
                  {index + 1}. {item.question}
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {item.options.map(function (option) {
                    var bg = "#f8fafc";

                    if (checked) {
                      if (option === item.answer) {
                        bg = "#dcfce7";
                      } else if (option === selected) {
                        bg = "#fee2e2";
                      }
                    } else if (option === selected) {
                      bg = "#e0e7ff";
                    }

                    return (
                      <button
                        key={option}
                        onClick={() => updateAnswer(item.id, option)}
                        style={{
                          textAlign: "left",
                          padding: "12px",
                          borderRadius: 10,
                          border: "1px solid #cbd5e1",
                          background: bg,
                          cursor: "pointer",
                          fontFamily: "inherit",
                        }}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>

                {checked && (
                  <div
                    style={{
                      marginTop: 10,
                      padding: 12,
                      borderRadius: 10,
                      background: isCorrect ? "#dcfce7" : "#fee2e2",
                      color: isCorrect ? "#166534" : "#991b1b",
                      lineHeight: 1.6,
                    }}
                  >
                    <p style={{ fontWeight: 700 }}>
                      {isCorrect ? "Correct" : "Wrong"}
                    </p>
                    <p>
                      Correct answer: <strong>{item.answer}</strong>
                    </p>
                    <p>{item.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {!checked ? (
          <button
            onClick={() => checkPractice(progressInfo, score, items.length)}
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
            Check Answers
          </button>
        ) : (
          <div
            style={{
              marginTop: 16,
              padding: 16,
              borderRadius: 12,
              background: "#eef2ff",
              border: "1px solid #c7d2fe",
              textAlign: "center",
            }}
          >
            <h3>
              Score: {score}/{items.length}
            </h3>
            <p style={{ color: "#475569" }}>
              {score >= 4
                ? "Good! Vocabulary strong হচ্ছে."
                : "আরো vocabulary practice দরকার."}
            </p>

            <button
              onClick={resetPractice}
              style={{
                marginTop: 10,
                padding: "10px 16px",
                border: "none",
                borderRadius: 10,
                background: "#6366f1",
                color: "#fff",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    );
  }

function TextCorrectionPractice({ title, subtitle, items, progressInfo }) {
  var score = 0;

  items.forEach(function (item) {
    if (normalizeAnswer(answers[item.id] || "") === normalizeAnswer(item.answer)) {
      score++;
    }
  });

  return (
    <div style={{ padding: "10px 0" }}>
      <button
        style={backButtonStyle}
        onClick={() => {
          setTask(null);
          resetPractice();
        }}
      >
        ← Back
      </button>

      <h2>{title}</h2>
      <p style={{ color: "#64748b", lineHeight: 1.6 }}>{subtitle}</p>

      <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 12 }}>
        {items.map(function (item, index) {
          var userAnswer = answers[item.id] || "";
          var isCorrect =
            normalizeAnswer(userAnswer) === normalizeAnswer(item.answer);

          return (
            <div
              key={item.id}
              style={{
                padding: 16,
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                background: "#fff",
              }}
            >
              <p style={{ fontWeight: 700, marginBottom: 8 }}>
                {index + 1}. Correct the punctuation and capitalization:
              </p>

              <p
                style={{
                  padding: 12,
                  background: "#f8fafc",
                  borderRadius: 10,
                  marginBottom: 10,
                  color: "#334155",
                }}
              >
                {item.wrong}
              </p>

              <input
                value={userAnswer}
                onChange={(e) => updateAnswer(item.id, e.target.value)}
                placeholder="Write corrected sentence"
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: 10,
                  border: "1px solid #cbd5e1",
                  fontSize: 15,
                  fontFamily: "inherit",
                }}
              />

              {checked && (
                <div
                  style={{
                    marginTop: 10,
                    padding: 12,
                    borderRadius: 10,
                    background: isCorrect ? "#dcfce7" : "#fee2e2",
                    color: isCorrect ? "#166534" : "#991b1b",
                    lineHeight: 1.6,
                  }}
                >
                  <p style={{ fontWeight: 700 }}>
                    {isCorrect ? "Correct" : "Check carefully"}
                  </p>
                  <p>
                    Correct answer: <strong>{item.answer}</strong>
                  </p>
                  <p>{item.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {!checked ? (
        <button
          onClick={() => checkPractice(progressInfo, score, items.length)}
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
          Check Answers
        </button>
      ) : (
        <div
          style={{
            marginTop: 16,
            padding: 16,
            borderRadius: 12,
            background: "#eef2ff",
            border: "1px solid #c7d2fe",
            textAlign: "center",
          }}
        >
          <h3>
            Score: {score}/{items.length}
          </h3>
          <p style={{ color: "#475569" }}>
            {score >= 4
              ? "Good! Punctuation ভালো হচ্ছে."
              : "আরো practice দরকার. Capital letter, comma, question mark, full stop ভালোভাবে দেখো."}
          </p>

          <button
            onClick={resetPractice}
            style={{
              marginTop: 10,
              padding: "10px 16px",
              border: "none",
              borderRadius: 10,
              background: "#6366f1",
              color: "#fff",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}

function FlexibleCompletionPractice({ title, subtitle, items }) {
  return (
    <div style={{ padding: "10px 0" }}>
      <button
        style={backButtonStyle}
        onClick={() => {
          setTask(null);
          resetPractice();
        }}
      >
        ← Back
      </button>

      <h2>{title}</h2>
      <p style={{ color: "#64748b", lineHeight: 1.6 }}>{subtitle}</p>

      <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 12 }}>
        {items.map(function (item, index) {
          var userAnswer = answers[item.id] || "";

          return (
            <div
              key={item.id}
              style={{
                padding: 16,
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                background: "#fff",
              }}
            >
              <p style={{ fontWeight: 700, marginBottom: 10 }}>
                {index + 1}. Complete the sentence:
              </p>

              <p
                style={{
                  padding: 12,
                  background: "#f8fafc",
                  borderRadius: 10,
                  marginBottom: 10,
                  color: "#334155",
                  lineHeight: 1.6,
                }}
              >
                {item.sentence}
              </p>

              <input
                value={userAnswer}
                onChange={(e) => updateAnswer(item.id, e.target.value)}
                placeholder="Write your completion"
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: 10,
                  border: "1px solid #cbd5e1",
                  fontSize: 15,
                  fontFamily: "inherit",
                }}
              />

              {checked && (
                <div
                  style={{
                    marginTop: 10,
                    padding: 12,
                    borderRadius: 10,
                    background: "#eef2ff",
                    border: "1px solid #c7d2fe",
                    color: "#334155",
                    lineHeight: 1.6,
                  }}
                >
                  <p style={{ fontWeight: 700 }}>Model answer:</p>
                  <p>
                    <strong>{item.answer}</strong>
                  </p>
                  <p>{item.explanation}</p>
                  <p style={{ marginTop: 6, color: "#64748b", fontSize: 13 }}>
                    Note: Completing sentence answers can vary. Match the grammar structure and meaning.
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {!checked ? (
        <button
          onClick={() => setChecked(true)}
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
          Show Model Answers
        </button>
      ) : (
        <div
          style={{
            marginTop: 16,
            padding: 16,
            borderRadius: 12,
            background: "#eef2ff",
            border: "1px solid #c7d2fe",
            textAlign: "center",
          }}
        >
          <p style={{ color: "#475569", lineHeight: 1.6 }}>
            নিজের উত্তর model answer-এর সাথে মিলাও। Structure ঠিক থাকলে উত্তর গ্রহণযোগ্য হতে পারে।
          </p>

          <button
            onClick={resetPractice}
            style={{
              marginTop: 10,
              padding: "10px 16px",
              border: "none",
              borderRadius: 10,
              background: "#6366f1",
              color: "#fff",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}

function NarrationPractice({ title, subtitle, items }) {
  return (
    <div style={{ padding: "10px 0" }}>
      <button
        style={backButtonStyle}
        onClick={() => {
          setTask(null);
          resetPractice();
        }}
      >
        ← Back
      </button>

      <h2>{title}</h2>
      <p style={{ color: "#64748b", lineHeight: 1.6 }}>{subtitle}</p>

      <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 12 }}>
        {items.map(function (item, index) {
          var userAnswer = answers[item.id] || "";

          return (
            <div
              key={item.id}
              style={{
                padding: 16,
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                background: "#fff",
              }}
            >
              <p style={{ fontWeight: 700, marginBottom: 8 }}>
                {index + 1}. Change the narration:
              </p>

              <p
                style={{
                  padding: 12,
                  background: "#f8fafc",
                  borderRadius: 10,
                  marginBottom: 10,
                  color: "#334155",
                  lineHeight: 1.6,
                }}
              >
                {item.direct}
              </p>

              <input
                value={userAnswer}
                onChange={(e) => updateAnswer(item.id, e.target.value)}
                placeholder="Write indirect speech"
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: 10,
                  border: "1px solid #cbd5e1",
                  fontSize: 15,
                  fontFamily: "inherit",
                }}
              />

              {checked && (
                <div
                  style={{
                    marginTop: 10,
                    padding: 12,
                    borderRadius: 10,
                    background: "#eef2ff",
                    border: "1px solid #c7d2fe",
                    color: "#334155",
                    lineHeight: 1.6,
                  }}
                >
                  <p style={{ fontWeight: 700 }}>Model answer:</p>
                  <p>
                    <strong>{item.answer}</strong>
                  </p>
                  <p>{item.explanation}</p>
                  <p style={{ marginTop: 6, color: "#64748b", fontSize: 13 }}>
                    Note: Narration answers can vary slightly, but tense, pronoun, reporting verb, and sentence order must be correct.
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {!checked ? (
        <button
          onClick={() => setChecked(true)}
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
          Show Model Answers
        </button>
      ) : (
        <div
          style={{
            marginTop: 16,
            padding: 16,
            borderRadius: 12,
            background: "#eef2ff",
            border: "1px solid #c7d2fe",
            textAlign: "center",
          }}
        >
          <p style={{ color: "#475569", lineHeight: 1.6 }}>
            নিজের উত্তর model answer-এর সাথে মিলাও। Pronoun, tense, reporting verb, এবং question order ঠিক আছে কিনা দেখো।
          </p>

          <button
            onClick={resetPractice}
            style={{
              marginTop: 10,
              padding: "10px 16px",
              border: "none",
              borderRadius: 10,
              background: "#6366f1",
              color: "#fff",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}

function WritingPractice({ title, subtitle, tasks, progressInfo }) {
  return (
    <div style={{ padding: "10px 0" }}>
      <button
        style={backButtonStyle}
        onClick={() => {
          setTask(null);
          resetPractice();
        }}
      >
        ← Back
      </button>

      <h2>{title}</h2>
      <p style={{ color: "#64748b", lineHeight: 1.6 }}>{subtitle}</p>

      <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 12 }}>
        {tasks.map(function (item, index) {
          var userAnswer = answers[item.id] || "";

          return (
            <div
              key={item.id}
              style={{
                padding: 16,
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                background: "#fff",
              }}
            >
              <p style={{ fontWeight: 700, marginBottom: 6 }}>
                {index + 1}. {item.title}
              </p>

              <p style={{ color: "#475569", lineHeight: 1.6, marginBottom: 8 }}>
                {item.question}
              </p>

              {item.table && (
                <table
                  style={{
                    width: "100%",
                    marginBottom: 10,
                    borderCollapse: "collapse",
                    color: "#334155",
                  }}
                >
                  <thead>
                    <tr>
                      {item.table.headers.map(function (header) {
                        return (
                          <th
                            key={header}
                            style={{
                              padding: 10,
                              border: "1px solid #cbd5e1",
                              background: "#f8fafc",
                              textAlign: "left",
                            }}
                          >
                            {header}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {item.table.rows.map(function (row) {
                      return (
                        <tr key={row.join("-")}>
                          {row.map(function (cell, cellIndex) {
                            return (
                              <td
                                key={cellIndex}
                                style={{
                                  padding: 10,
                                  border: "1px solid #cbd5e1",
                                }}
                              >
                                {cell}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}

              {item.passage && (
                <div
                  style={{
                    marginBottom: 10,
                    padding: 12,
                    borderRadius: 10,
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    color: "#334155",
                    lineHeight: 1.6,
                  }}
                >
                  <p style={{ fontWeight: 700, marginBottom: 6 }}>Passage:</p>
                  <p>{item.passage}</p>
                </div>
              )}

              {item.storyBeginning && (
                <div
                  style={{
                    marginBottom: 10,
                    padding: 12,
                    borderRadius: 10,
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    color: "#334155",
                    lineHeight: 1.6,
                  }}
                >
                  <p style={{ fontWeight: 700, marginBottom: 6 }}>
                    Story beginning:
                  </p>
                  <p>{item.storyBeginning}</p>
                </div>
              )}

              <p
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#6366f1",
                  marginBottom: 8,
                }}
              >
                Marks: {item.marks}
              </p>

              <textarea
                value={userAnswer}
                onChange={(e) => updateAnswer(item.id, e.target.value)}
                placeholder="Write your answer here"
                rows={8}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: 10,
                  border: "1px solid #cbd5e1",
                  fontSize: 15,
                  fontFamily: "inherit",
                  lineHeight: 1.6,
                  resize: "vertical",
                }}
              />

              {checked && (
                <div
                  style={{
                    marginTop: 10,
                    padding: 12,
                    borderRadius: 10,
                    background: "#eef2ff",
                    border: "1px solid #c7d2fe",
                    color: "#334155",
                    lineHeight: 1.6,
                    whiteSpace: "pre-line",
                  }}
                >
                  <p style={{ fontWeight: 700, marginBottom: 8 }}>
                    Model answer:
                  </p>
                  <p>{item.modelAnswer}</p>

                  {item.keyPoints && (
                    <div style={{ marginTop: 10 }}>
                      <p style={{ fontWeight: 700 }}>Key points:</p>
                      <ul style={{ paddingLeft: 18, marginTop: 6 }}>
                        {item.keyPoints.map(function (point) {
                          return <li key={point}>{point}</li>;
                        })}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {!checked ? (
        <button
          onClick={() => reviewPractice(progressInfo)}
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
          Show Model Answer
        </button>
      ) : (
        <div
          style={{
            marginTop: 16,
            padding: 16,
            borderRadius: 12,
            background: "#eef2ff",
            border: "1px solid #c7d2fe",
            textAlign: "center",
          }}
        >
          <p style={{ color: "#475569", lineHeight: 1.6 }}>
            নিজের answer-এর format, subject line, body, request, closing model answer-এর সাথে মিলাও।
          </p>

          <button
            onClick={resetPractice}
            style={{
              marginTop: 10,
              padding: "10px 16px",
              border: "none",
              borderRadius: 10,
              background: "#6366f1",
              color: "#fff",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Try Again
          </button>
        </div>
      )}
      </div>
    );
  }

  function PassageMCQPractice({ taskData }) {
    return (
      <div style={{ padding: "10px 0" }}>
        <button
          style={backButtonStyle}
          onClick={() => {
            setTask(null);
            resetPractice();
          }}
        >
          â† Back
        </button>

        <h2>Q1A {taskData.title}</h2>
        <p
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: "#6366f1",
            marginBottom: 10,
          }}
        >
          Marks: {taskData.marks}
        </p>

        <div
          style={{
            padding: 16,
            border: "1px solid #e2e8f0",
            borderRadius: 12,
            background: "#f8fafc",
            color: "#334155",
            lineHeight: 1.7,
            marginBottom: 16,
          }}
        >
          <p style={{ fontWeight: 700, marginBottom: 6 }}>Passage:</p>
          <p>{taskData.passage}</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {taskData.mcqs.map(function (mcq, index) {
            var selected = answers[mcq.id];
            var answered = selected !== undefined;
            var isCorrect = selected === mcq.correctAnswer;

            return (
              <div
                key={mcq.id}
                style={{
                  padding: 16,
                  border: "1px solid #e2e8f0",
                  borderRadius: 12,
                  background: "#fff",
                }}
              >
                <p style={{ fontWeight: 700, marginBottom: 10 }}>
                  {index + 1}. {mcq.question}
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {mcq.options.map(function (option, optionIndex) {
                    var bg = "#f8fafc";
                    var border = "1px solid #e2e8f0";
                    var color = "#334155";

                    if (answered) {
                      if (optionIndex === mcq.correctAnswer) {
                        bg = "#dcfce7";
                        border = "2px solid #22c55e";
                        color = "#166534";
                      } else if (optionIndex === selected) {
                        bg = "#fee2e2";
                        border = "2px solid #ef4444";
                        color = "#991b1b";
                      }
                    }

                    return (
                      <button
                        key={option}
                        onClick={() => {
                          if (!answered) updateAnswer(mcq.id, optionIndex);
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
                        {String.fromCharCode(65 + optionIndex)}. {option}
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
                      background: isCorrect ? "#f0fdf4" : "#fef2f2",
                      border: isCorrect
                        ? "1px solid #bbf7d0"
                        : "1px solid #fecaca",
                      color: "#334155",
                      fontSize: 13,
                      lineHeight: 1.7,
                    }}
                  >
                    <p style={{ fontWeight: 700, marginBottom: 4 }}>
                      {isCorrect ? "Correct" : "Incorrect"}
                    </p>
                    <p>{mcq.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  function ICTMCQPractice() {
    var score = 0;

    ictMcqItems.forEach(function (mcq) {
      if (answers[mcq.id] === mcq.correctAnswer) {
        score++;
      }
    });

    return (
      <div style={{ padding: "10px 0" }}>
        <button
          style={backButtonStyle}
          onClick={() => {
            setTask(null);
            resetPractice();
          }}
        >
          â† Back
        </button>

        <h2>ICT MCQ Practice</h2>
        <p
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: "#6366f1",
            marginBottom: 10,
          }}
        >
          Board pattern: 25 MCQs × 1 = 25 marks
        </p>
        <p style={{ color: "#64748b", lineHeight: 1.6 }}>
          Sample set: 10 MCQs now. Full board set will be expanded to 25 later.
        </p>

        {checked && (
          <div
            style={{
              marginTop: 16,
              padding: 16,
              borderRadius: 12,
              background: "#eef2ff",
              border: "1px solid #c7d2fe",
              color: "#334155",
              fontWeight: 700,
            }}
          >
            Score: {score} / {ictMcqItems.length}
          </div>
        )}

        <div
          style={{
            marginTop: 16,
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {ictMcqItems.map(function (mcq, index) {
            var selected = answers[mcq.id];
            var hasSelected = selected !== undefined;
            var isCorrect = selected === mcq.correctAnswer;

            return (
              <div
                key={mcq.id}
                style={{
                  padding: 16,
                  border: "1px solid #e2e8f0",
                  borderRadius: 12,
                  background: "#fff",
                }}
              >
                <p
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#6366f1",
                    marginBottom: 6,
                  }}
                >
                  {mcq.topic}
                </p>
                <p style={{ fontWeight: 700, marginBottom: 10, lineHeight: 1.6 }}>
                  {index + 1}. {mcq.question}
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {mcq.options.map(function (option, optionIndex) {
                    var bg = "#f8fafc";
                    var border = "1px solid #e2e8f0";
                    var color = "#334155";

                    if (!checked && selected === optionIndex) {
                      bg = "#eef2ff";
                      border = "2px solid #6366f1";
                      color = "#3730a3";
                    }

                    if (checked) {
                      if (optionIndex === mcq.correctAnswer) {
                        bg = "#dcfce7";
                        border = "2px solid #22c55e";
                        color = "#166534";
                      } else if (optionIndex === selected) {
                        bg = "#fee2e2";
                        border = "2px solid #ef4444";
                        color = "#991b1b";
                      }
                    }

                    return (
                      <button
                        key={option}
                        onClick={() => {
                          if (!checked) updateAnswer(mcq.id, optionIndex);
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
                          cursor: checked ? "default" : "pointer",
                          lineHeight: 1.5,
                        }}
                      >
                        {String.fromCharCode(65 + optionIndex)}. {option}
                      </button>
                    );
                  })}
                </div>

                {checked && (
                  <div
                    style={{
                      marginTop: 12,
                      padding: "12px 14px",
                      borderRadius: 10,
                      background: isCorrect ? "#f0fdf4" : "#fef2f2",
                      border: isCorrect
                        ? "1px solid #bbf7d0"
                        : "1px solid #fecaca",
                      color: "#334155",
                      fontSize: 13,
                      lineHeight: 1.7,
                    }}
                  >
                    <p style={{ fontWeight: 700, marginBottom: 4 }}>
                      {isCorrect ? "Correct" : "Wrong"}
                    </p>
                    {!hasSelected && (
                      <p style={{ marginBottom: 4 }}>You did not select an answer.</p>
                    )}
                    <p style={{ marginBottom: 4 }}>
                      Correct answer: {String.fromCharCode(65 + mcq.correctAnswer)}.{" "}
                      {mcq.options[mcq.correctAnswer]}
                    </p>
                    <p>{mcq.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {!checked ? (
          <button
            onClick={() =>
              checkPractice(
                {
                  id: "ict-mcq",
                  title: "ICT Board Practice - MCQ Section",
                },
                score,
                ictMcqItems.length
              )
            }
            style={{
              marginTop: 16,
              width: "100%",
              padding: "12px 20px",
              border: "none",
              borderRadius: 12,
              background: "#6366f1",
              color: "#fff",
              fontSize: 15,
              fontWeight: 700,
              fontFamily: "inherit",
              cursor: "pointer",
            }}
          >
            Submit
          </button>
        ) : (
          <button
            onClick={resetPractice}
            style={{
              marginTop: 16,
              width: "100%",
              padding: "12px 20px",
              border: "none",
              borderRadius: 12,
              background: "#6366f1",
              color: "#fff",
              fontSize: 15,
              fontWeight: 700,
              fontFamily: "inherit",
              cursor: "pointer",
            }}
          >
            Try Again
          </button>
        )}
      </div>
    );
  }

  function ICTCreativePractice() {
    return (
      <div style={{ padding: "10px 0" }}>
        <button
          style={backButtonStyle}
          onClick={() => {
            setTask(null);
            resetPractice();
          }}
        >
          Ã¢â€ Â Back
        </button>

        <h2>ICT Creative Practice</h2>
        <p
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: "#6366f1",
            marginBottom: 10,
          }}
        >
          Board pattern: Scenario-based question. à¦• = 1, à¦– = 2, à¦— = 3, à¦˜ = 8 marks
        </p>
        <p style={{ color: "#64748b", lineHeight: 1.6 }}>
          Write your answer for each part, then compare it with the model answer.
        </p>

        <div
          style={{
            marginTop: 16,
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          {ictCreativeItems.map(function (item, index) {
            var showModel = answers[item.id + "-showModel"] === true;

            return (
              <div
                key={item.id}
                style={{
                  padding: 16,
                  border: "1px solid #e2e8f0",
                  borderRadius: 12,
                  background: "#fff",
                }}
              >
                <p
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#6366f1",
                    marginBottom: 6,
                  }}
                >
                  Creative Question {index + 1}
                </p>
                <h3 style={{ marginBottom: 10 }}>{item.title}</h3>

                <div
                  style={{
                    padding: 14,
                    border: "1px solid #e2e8f0",
                    borderRadius: 10,
                    background: "#f8fafc",
                    color: "#334155",
                    lineHeight: 1.7,
                    marginBottom: 14,
                  }}
                >
                  <p style={{ fontWeight: 700, marginBottom: 4 }}>Scenario:</p>
                  <p>{item.scenario}</p>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {item.parts.map(function (part) {
                    return (
                      <div
                        key={part.id}
                        style={{
                          padding: 14,
                          border: "1px solid #e2e8f0",
                          borderRadius: 10,
                          background: "#f8fafc",
                        }}
                      >
                        <p
                          style={{
                            fontWeight: 700,
                            color: "#1e293b",
                            lineHeight: 1.6,
                            marginBottom: 8,
                          }}
                        >
                          {part.label}) ({part.marks} mark{part.marks > 1 ? "s" : ""}){" "}
                          {part.question}
                        </p>
                        <textarea
                          value={answers[part.id] || ""}
                          onChange={(e) => updateAnswer(part.id, e.target.value)}
                          rows={part.marks > 3 ? 7 : 4}
                          placeholder="Write your answer here"
                          style={{
                            width: "100%",
                            resize: "vertical",
                            padding: "12px",
                            borderRadius: 10,
                            border: "1px solid #cbd5e1",
                            fontSize: 14,
                            fontFamily: "inherit",
                            lineHeight: 1.6,
                            background: "#fff",
                          }}
                        />
                      </div>
                    );
                  })}
                </div>

                <button
                  onClick={() => {
                    saveReviewedPractice({
                      id: item.id,
                      title: "ICT Creative - " + item.title,
                    });
                    updateAnswer(item.id + "-showModel", true);
                  }}
                  style={{
                    marginTop: 14,
                    width: "100%",
                    padding: "12px 20px",
                    border: "none",
                    borderRadius: 12,
                    background: "#6366f1",
                    color: "#fff",
                    fontSize: 15,
                    fontWeight: 700,
                    fontFamily: "inherit",
                    cursor: "pointer",
                  }}
                >
                  Show Model Answer
                </button>

                {showModel && (
                  <div
                    style={{
                      marginTop: 14,
                      padding: 14,
                      borderRadius: 12,
                      background: "#eef2ff",
                      border: "1px solid #c7d2fe",
                    }}
                  >
                    <p
                      style={{
                        fontWeight: 700,
                        color: "#3730a3",
                        marginBottom: 10,
                      }}
                    >
                      Model Answers
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      {item.parts.map(function (part) {
                        return (
                          <div
                            key={part.id + "-model"}
                            style={{
                              padding: 12,
                              borderRadius: 10,
                              background: "#fff",
                              border: "1px solid #c7d2fe",
                              color: "#334155",
                              lineHeight: 1.7,
                            }}
                          >
                            <p style={{ fontWeight: 700, marginBottom: 4 }}>
                              {part.label}) {part.marks} mark{part.marks > 1 ? "s" : ""}
                            </p>
                            <p>{part.modelAnswer}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  function FullMockTestPage() {
    return (
      <div style={{ padding: "10px 0" }}>
        <button
          style={backButtonStyle}
          onClick={() => {
            setTask(null);
            resetPractice();
          }}
        >
          Ã¢â€ Â Back
        </button>

        <h2>Full Mock Test</h2>
        <p style={{ color: "#64748b", lineHeight: 1.6, marginBottom: 16 }}>
          Full mock tests will be added after all practice sections are stable.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {fullMockItems.map(function (mock) {
            return (
              <div
                key={mock.id}
                style={{
                  padding: 16,
                  border: "1px solid #e2e8f0",
                  borderRadius: 12,
                  background: "#fff",
                }}
              >
                <h3 style={{ marginBottom: 10 }}>{mock.title}</h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                    color: "#334155",
                    lineHeight: 1.6,
                    marginBottom: 12,
                  }}
                >
                  {mock.sections.map(function (sectionText) {
                    return <p key={sectionText}>{sectionText}</p>;
                  })}
                </div>
                <p
                  style={{
                    display: "inline-block",
                    padding: "6px 10px",
                    borderRadius: 999,
                    background: "#eef2ff",
                    border: "1px solid #c7d2fe",
                    color: "#3730a3",
                    fontSize: 13,
                    fontWeight: 700,
                  }}
                >
                  Status: {mock.status}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  function BroadQuestionPractice({ taskData }) {
    return (
      <div style={{ padding: "10px 0" }}>
        <button
          style={backButtonStyle}
          onClick={() => {
            setTask(null);
            resetPractice();
          }}
        >
          â† Back
        </button>

        <h2>Q1B {taskData.title}</h2>
        <p
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: "#6366f1",
            marginBottom: 10,
          }}
        >
          Marks: {taskData.marks}
        </p>

        <div
          style={{
            padding: 16,
            border: "1px solid #e2e8f0",
            borderRadius: 12,
            background: "#f8fafc",
            color: "#334155",
            lineHeight: 1.7,
            marginBottom: 16,
          }}
        >
          <p style={{ fontWeight: 700, marginBottom: 6 }}>Passage:</p>
          <p>{taskData.passage}</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {taskData.questions.map(function (item, index) {
            var userAnswer = answers[item.id] || "";

            return (
              <div
                key={item.id}
                style={{
                  padding: 16,
                  border: "1px solid #e2e8f0",
                  borderRadius: 12,
                  background: "#fff",
                }}
              >
                <p style={{ fontWeight: 700, marginBottom: 6 }}>
                  {index + 1}. {item.question}
                </p>
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#6366f1",
                    marginBottom: 8,
                  }}
                >
                  Marks: {item.marks}
                </p>

                <textarea
                  value={userAnswer}
                  onChange={(e) => updateAnswer(item.id, e.target.value)}
                  placeholder="Write your answer here"
                  rows={4}
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: 10,
                    border: "1px solid #cbd5e1",
                    fontSize: 15,
                    fontFamily: "inherit",
                    lineHeight: 1.6,
                    resize: "vertical",
                  }}
                />

                {checked && (
                  <div
                    style={{
                      marginTop: 10,
                      padding: 12,
                      borderRadius: 10,
                      background: "#eef2ff",
                      border: "1px solid #c7d2fe",
                      color: "#334155",
                      lineHeight: 1.6,
                    }}
                  >
                    <p style={{ fontWeight: 700, marginBottom: 6 }}>
                      Model answer:
                    </p>
                    <p>{item.modelAnswer}</p>

                    {item.keyPoints && (
                      <div style={{ marginTop: 10 }}>
                        <p style={{ fontWeight: 700 }}>Key points:</p>
                        <ul style={{ paddingLeft: 18, marginTop: 6 }}>
                          {item.keyPoints.map(function (point) {
                            return <li key={point}>{point}</li>;
                          })}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {!checked ? (
          <button
            onClick={() => setChecked(true)}
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
            Show Model Answers
          </button>
        ) : (
          <div
            style={{
              marginTop: 16,
              padding: 16,
              borderRadius: 12,
              background: "#eef2ff",
              border: "1px solid #c7d2fe",
              textAlign: "center",
            }}
          >
            <button
              onClick={resetPractice}
              style={{
                padding: "10px 16px",
                border: "none",
                borderRadius: 10,
                background: "#6366f1",
                color: "#fff",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    );
  }

  function FlowChartPractice({ taskData }) {
    var score = 0;

    taskData.items.forEach(function (item) {
      if (normalizeAnswer(answers[item.id] || "") === item.answer) {
        score++;
      }
    });

    return (
      <div style={{ padding: "10px 0" }}>
        <button
          style={backButtonStyle}
          onClick={() => {
            setTask(null);
            resetPractice();
          }}
        >
          â† Back
        </button>

        <h2>Q2 {taskData.title}</h2>
        <p style={{ color: "#64748b", lineHeight: 1.6, marginBottom: 8 }}>
          {taskData.pattern}
        </p>
        <p
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: "#6366f1",
            marginBottom: 10,
          }}
        >
          Marks: {taskData.marks}
        </p>

        <div
          style={{
            padding: 16,
            border: "1px solid #e2e8f0",
            borderRadius: 12,
            background: "#f8fafc",
            color: "#334155",
            lineHeight: 1.7,
            marginBottom: 16,
          }}
        >
          <p style={{ fontWeight: 700, marginBottom: 6 }}>Passage:</p>
          <p>{taskData.passage}</p>
        </div>

        <p style={{ color: "#475569", lineHeight: 1.6, marginBottom: 12 }}>
          {taskData.instruction}
        </p>

        <div
          style={{
            padding: 16,
            border: "1px solid #e2e8f0",
            borderRadius: 12,
            background: "#fff",
          }}
        >
          <p style={{ fontWeight: 700, marginBottom: 12 }}>
            {taskData.start} →
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {taskData.items.map(function (item) {
              var userAnswer = answers[item.id] || "";
              var isCorrect =
                normalizeAnswer(userAnswer) === item.answer;

              return (
                <div key={item.id}>
                  <label
                    style={{
                      display: "block",
                      fontWeight: 700,
                      marginBottom: 6,
                    }}
                  >
                    {item.number}. {item.before} ___
                  </label>

                  <input
                    value={userAnswer}
                    onChange={(e) => updateAnswer(item.id, e.target.value)}
                    placeholder="Write answer here"
                    style={{
                      width: "100%",
                      padding: "12px",
                      borderRadius: 10,
                      border: "1px solid #cbd5e1",
                      fontSize: 15,
                      fontFamily: "inherit",
                    }}
                  />

                  {checked && (
                    <div
                      style={{
                        marginTop: 8,
                        padding: 10,
                        borderRadius: 10,
                        background: isCorrect ? "#dcfce7" : "#fee2e2",
                        color: isCorrect ? "#166534" : "#991b1b",
                        lineHeight: 1.6,
                      }}
                    >
                      <p style={{ fontWeight: 700 }}>
                        {isCorrect ? "Correct" : "Wrong"}
                      </p>
                      <p>
                        Correct answer: <strong>{item.answer}</strong>
                      </p>
                      <p>{item.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {!checked ? (
          <button
            onClick={() => setChecked(true)}
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
            Check Answers
          </button>
        ) : (
          <div
            style={{
              marginTop: 16,
              padding: 16,
              borderRadius: 12,
              background: "#eef2ff",
              border: "1px solid #c7d2fe",
              textAlign: "center",
            }}
          >
            <h3>
              Score: {score}/{taskData.items.length}
            </h3>

            <button
              onClick={resetPractice}
              style={{
                marginTop: 10,
                padding: "10px 16px",
                border: "none",
                borderRadius: 10,
                background: "#6366f1",
                color: "#fff",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    );
  }

  function ClozeWithCluesPractice({ taskData }) {
    var score = 0;

    taskData.blanks.forEach(function (blank) {
      if (normalizeAnswer(answers[blank.id] || "") === blank.answer) {
        score++;
      }
    });

    return (
      <div style={{ padding: "10px 0" }}>
        <button
          style={backButtonStyle}
          onClick={() => {
            setTask(null);
            resetPractice();
          }}
        >
          â† Back
        </button>

        <h2>Q4 {taskData.title}</h2>
        <p
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: "#6366f1",
            marginBottom: 10,
          }}
        >
          Marks: {taskData.marks}
        </p>

        <div
          style={{
            marginBottom: 14,
            padding: 12,
            background: "#eef2ff",
            border: "1px solid #c7d2fe",
            borderRadius: 12,
          }}
        >
          <p style={{ fontWeight: 700, marginBottom: 8 }}>Word Box:</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {taskData.wordBox.map(function (word) {
              return (
                <span
                  key={word}
                  style={{
                    padding: "6px 10px",
                    background: "#fff",
                    border: "1px solid #c7d2fe",
                    borderRadius: 999,
                    fontSize: 13,
                    color: "#4338ca",
                    fontWeight: 600,
                  }}
                >
                  {word}
                </span>
              );
            })}
          </div>
        </div>

        <div
          style={{
            padding: 16,
            border: "1px solid #e2e8f0",
            borderRadius: 12,
            background: "#fff",
          }}
        >
          <p style={{ color: "#334155", lineHeight: 1.7, marginBottom: 14 }}>
            {taskData.text}
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {taskData.blanks.map(function (blank) {
              var userAnswer = answers[blank.id] || "";
              var isCorrect =
                normalizeAnswer(userAnswer) === blank.answer;

              return (
                <div key={blank.id}>
                  <label
                    style={{
                      display: "block",
                      fontWeight: 700,
                      marginBottom: 6,
                    }}
                  >
                    Blank {blank.number}
                  </label>

                  <input
                    value={userAnswer}
                    onChange={(e) => updateAnswer(blank.id, e.target.value)}
                    placeholder="Choose from word box"
                    style={{
                      width: "100%",
                      padding: "12px",
                      borderRadius: 10,
                      border: "1px solid #cbd5e1",
                      fontSize: 15,
                      fontFamily: "inherit",
                    }}
                  />

                  {checked && (
                    <div
                      style={{
                        marginTop: 8,
                        padding: 10,
                        borderRadius: 10,
                        background: isCorrect ? "#dcfce7" : "#fee2e2",
                        color: isCorrect ? "#166534" : "#991b1b",
                        lineHeight: 1.6,
                      }}
                    >
                      <p style={{ fontWeight: 700 }}>
                        {isCorrect ? "Correct" : "Wrong"}
                      </p>
                      <p>
                        Correct answer: <strong>{blank.answer}</strong>
                      </p>
                      <p>{blank.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {!checked ? (
          <button
            onClick={() => setChecked(true)}
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
            Check Answers
          </button>
        ) : (
          <div
            style={{
              marginTop: 16,
              padding: 16,
              borderRadius: 12,
              background: "#eef2ff",
              border: "1px solid #c7d2fe",
              textAlign: "center",
            }}
          >
            <h3>
              Score: {score}/{taskData.blanks.length}
            </h3>

            <button
              onClick={resetPractice}
              style={{
                marginTop: 10,
                padding: "10px 16px",
                border: "none",
                borderRadius: 10,
                background: "#6366f1",
                color: "#fff",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    );
  }

  function ClozeWithoutCluesPractice({ taskData }) {
    var score = 0;

    taskData.blanks.forEach(function (blank) {
      if (normalizeAnswer(answers[blank.id] || "") === blank.answer) {
        score++;
      }
    });

    return (
      <div style={{ padding: "10px 0" }}>
        <button
          style={backButtonStyle}
          onClick={() => {
            setTask(null);
            resetPractice();
          }}
        >
          â† Back
        </button>

        <h2>Q5 {taskData.title}</h2>
        <p style={{ color: "#64748b", lineHeight: 1.6, marginBottom: 8 }}>
          {taskData.pattern}
        </p>
        <p
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: "#6366f1",
            marginBottom: 10,
          }}
        >
          Marks: {taskData.marks}
        </p>

        <div
          style={{
            padding: 16,
            border: "1px solid #e2e8f0",
            borderRadius: 12,
            background: "#fff",
          }}
        >
          <p style={{ color: "#334155", lineHeight: 1.7, marginBottom: 14 }}>
            {taskData.text}
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {taskData.blanks.map(function (blank) {
              var userAnswer = answers[blank.id] || "";
              var isCorrect =
                normalizeAnswer(userAnswer) === blank.answer;

              return (
                <div key={blank.id}>
                  <label
                    style={{
                      display: "block",
                      fontWeight: 700,
                      marginBottom: 6,
                    }}
                  >
                    Blank {blank.number}
                  </label>

                  <input
                    value={userAnswer}
                    onChange={(e) => updateAnswer(blank.id, e.target.value)}
                    placeholder="Write answer here"
                    style={{
                      width: "100%",
                      padding: "12px",
                      borderRadius: 10,
                      border: "1px solid #cbd5e1",
                      fontSize: 15,
                      fontFamily: "inherit",
                    }}
                  />

                  {checked && (
                    <div
                      style={{
                        marginTop: 8,
                        padding: 10,
                        borderRadius: 10,
                        background: isCorrect ? "#dcfce7" : "#fee2e2",
                        color: isCorrect ? "#166534" : "#991b1b",
                        lineHeight: 1.6,
                      }}
                    >
                      <p style={{ fontWeight: 700 }}>
                        {isCorrect ? "Correct" : "Wrong"}
                      </p>
                      <p>
                        Correct answer: <strong>{blank.answer}</strong>
                      </p>
                      <p>{blank.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {!checked ? (
          <button
            onClick={() => setChecked(true)}
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
            Check Answers
          </button>
        ) : (
          <div
            style={{
              marginTop: 16,
              padding: 16,
              borderRadius: 12,
              background: "#eef2ff",
              border: "1px solid #c7d2fe",
              textAlign: "center",
            }}
          >
            <h3>
              Score: {score}/{taskData.blanks.length}
            </h3>

            <button
              onClick={resetPractice}
              style={{
                marginTop: 10,
                padding: "10px 16px",
                border: "none",
                borderRadius: 10,
                background: "#6366f1",
                color: "#fff",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    );
  }

  function RearrangingPractice({ taskData }) {
    var userOrder = answers[taskData.answerId] || "";
    var normalizedOrder = userOrder
      .split(",")
      .map(function (item) {
        return item.trim().toLowerCase();
      })
      .filter(Boolean);
    var isCorrect =
      normalizedOrder.join(",") === taskData.correctOrder.join(",");

    return (
      <div style={{ padding: "10px 0" }}>
        <button
          style={backButtonStyle}
          onClick={() => {
            setTask(null);
            resetPractice();
          }}
        >
          â† Back
        </button>

        <h2>Q6 {taskData.title}</h2>
        <p style={{ color: "#64748b", lineHeight: 1.6, marginBottom: 8 }}>
          {taskData.instruction}
        </p>
        <p
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: "#6366f1",
            marginBottom: 10,
          }}
        >
          Marks: {taskData.marks}
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {taskData.sentences.map(function (sentence) {
            return (
              <div
                key={sentence.label}
                style={{
                  padding: 12,
                  border: "1px solid #e2e8f0",
                  borderRadius: 10,
                  background: "#fff",
                  color: "#334155",
                  lineHeight: 1.5,
                }}
              >
                <strong>{sentence.label}.</strong> {sentence.text}
              </div>
            );
          })}
        </div>

        <div
          style={{
            marginTop: 16,
            padding: 16,
            border: "1px solid #e2e8f0",
            borderRadius: 12,
            background: "#fff",
          }}
        >
          <label
            style={{
              display: "block",
              fontWeight: 700,
              marginBottom: 6,
            }}
          >
            Write the correct order
          </label>

          <input
            value={userOrder}
            onChange={(e) => updateAnswer(taskData.answerId, e.target.value)}
            placeholder="c, a, b, d, e, f, g, h, i, j"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: 10,
              border: "1px solid #cbd5e1",
              fontSize: 15,
              fontFamily: "inherit",
            }}
          />

          {checked && (
            <div
              style={{
                marginTop: 10,
                padding: 12,
                borderRadius: 10,
                background: isCorrect ? "#dcfce7" : "#fee2e2",
                color: isCorrect ? "#166534" : "#991b1b",
                lineHeight: 1.6,
              }}
            >
              <p style={{ fontWeight: 700 }}>
                {isCorrect ? "Correct" : "Wrong"}
              </p>
              <p>
                Correct order:{" "}
                <strong>{taskData.correctOrder.join(", ")}</strong>
              </p>
              <p>{taskData.explanation}</p>
            </div>
          )}
        </div>

        {!checked ? (
          <button
            onClick={() => setChecked(true)}
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
            Check Answer
          </button>
        ) : (
          <div
            style={{
              marginTop: 16,
              padding: 16,
              borderRadius: 12,
              background: "#eef2ff",
              border: "1px solid #c7d2fe",
              textAlign: "center",
            }}
          >
            <button
              onClick={resetPractice}
              style={{
                padding: "10px 16px",
                border: "none",
                borderRadius: 10,
                background: "#6366f1",
                color: "#fff",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    );
  }

function WordBoxPractice({ title, subtitle, items, wordBox, progressInfo }) {
  var score = 0;

  items.forEach(function (item) {
    if (normalizeAnswer(answers[item.id] || "") === normalizeAnswer(item.answer)) {
      score++;
    }
  });

  return (
    <div style={{ padding: "10px 0" }}>
      <button
        style={backButtonStyle}
        onClick={() => {
          setTask(null);
          resetPractice();
        }}
      >
        ← Back
      </button>

      <h2>{title}</h2>
      <p style={{ color: "#64748b", lineHeight: 1.6 }}>{subtitle}</p>

      <div
        style={{
          marginTop: 14,
          padding: 12,
          background: "#eef2ff",
          border: "1px solid #c7d2fe",
          borderRadius: 12,
        }}
      >
        <p style={{ fontWeight: 700, marginBottom: 8 }}>Word/Phrase Box:</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {wordBox.map(function (word) {
            return (
              <span
                key={word}
                style={{
                  padding: "6px 10px",
                  background: "#fff",
                  border: "1px solid #c7d2fe",
                  borderRadius: 999,
                  fontSize: 13,
                  color: "#4338ca",
                  fontWeight: 600,
                }}
              >
                {word}
              </span>
            );
          })}
        </div>
      </div>

      <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 12 }}>
        {items.map(function (item, index) {
          var userAnswer = answers[item.id] || "";
          var isCorrect =
            normalizeAnswer(userAnswer) === normalizeAnswer(item.answer);

          return (
            <div
              key={item.id}
              style={{
                padding: 16,
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                background: "#fff",
              }}
            >
              <p style={{ fontWeight: 700, marginBottom: 10 }}>
                {index + 1}. {item.sentence}
              </p>

              <input
                value={userAnswer}
                onChange={(e) => updateAnswer(item.id, e.target.value)}
                placeholder="Choose from box"
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: 10,
                  border: "1px solid #cbd5e1",
                  fontSize: 15,
                  fontFamily: "inherit",
                }}
              />

              {checked && (
                <div
                  style={{
                    marginTop: 10,
                    padding: 12,
                    borderRadius: 10,
                    background: isCorrect ? "#dcfce7" : "#fee2e2",
                    color: isCorrect ? "#166534" : "#991b1b",
                    lineHeight: 1.6,
                  }}
                >
                  <p style={{ fontWeight: 700 }}>
                    {isCorrect ? "Correct" : "Wrong"}
                  </p>
                  <p>
                    Correct answer: <strong>{item.answer}</strong>
                  </p>
                  <p>{item.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {!checked ? (
        <button
          onClick={() => checkPractice(progressInfo, score, items.length)}
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
          Check Answers
        </button>
      ) : (
        <div
          style={{
            marginTop: 16,
            padding: 16,
            borderRadius: 12,
            background: "#eef2ff",
            border: "1px solid #c7d2fe",
            textAlign: "center",
          }}
        >
          <h3>
            Score: {score}/{items.length}
          </h3>
          <p style={{ color: "#475569" }}>
            {score >= 4
              ? "Good! Words/Phrases ভালো হচ্ছে."
              : "আরো practice দরকার. Fixed expression মুখস্থ + বুঝে শিখতে হবে."}
          </p>

          <button
            onClick={resetPractice}
            style={{
              marginTop: 10,
              padding: "10px 16px",
              border: "none",
              borderRadius: 10,
              background: "#6366f1",
              color: "#fff",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}

  if (task === "prepositions") {
    return (
      <FillPractice
        title="Q1 Prepositions"
        subtitle="Board pattern: 10 gaps × 0.5 = 5 marks. এখানে বাক্যের অর্থ ও fixed expression দেখে preposition বসাতে হবে।"
        items={prepositionItems}
        progressInfo={{
          id: "english2-prepositions",
          title: "English 2nd Paper - Q1 Prepositions",
        }}
      />
    );
  }

  if (task === "rightForm") {
    return (
      <FillPractice
        title="Q4 Right Form of Verbs"
        subtitle="Board pattern: 14 gaps × 0.5 = 7 marks. এখানে আগে signal word চিনবে, তারপর verb-এর সঠিক form বসাবে।"
        items={rightFormItems}
        progressInfo={{
          id: "english2-right-form",
          title: "English 2nd Paper - Q4 Right Form",
        }}
      />
    );
  }

  if (task === "modifiers") {
  return (
    <FillPractice
      title="Q6 Modifiers"
      subtitle="Board pattern: 10 gaps × 0.5 = 5 marks. এখানে noun, verb বা adjective-কে describe/modify করার সঠিক word বা phrase বসাতে হবে।"
      items={modifierItems}
      progressInfo={{
        id: "english2-modifiers",
        title: "English 2nd Paper - Q6 Modifiers",
      }}
    />
  );
}

if (task === "narration") {
  return (
    <NarrationPractice
      title="Q5 Narration / Indirect Speech"
      subtitle="Board pattern: 7 marks. এখানে direct speech থেকে indirect speech করতে হবে। Tense, pronoun, reporting verb এবং sentence order ঠিক রাখতে হবে।"
      items={narrationItems}
    />
  );
}

if (task === "application") {
  return (
    <WritingPractice
      title="Q10 Application / Formal Letter"
      subtitle="Board pattern: 10 marks. এখানে formal format, subject line, polite request এবং proper closing ঠিক রাখতে হবে।"
      tasks={applicationTasks}
      progressInfo={{
        id: "english2-application",
        title: "English 2nd Paper - Q10 Application",
      }}
    />
  );
}

if (task === "paragraph") {
  return (
    <WritingPractice
      title="Q11 Paragraph Writing"
      subtitle="Board pattern: 15 marks. Topic sentence, supporting details এবং clear conclusion ঠিক রাখতে হবে।"
      tasks={paragraphTasks}
      progressInfo={{
        id: "english2-paragraph",
        title: "English 2nd Paper - Q11 Paragraph",
      }}
    />
  );
}

if (task === "composition") {
  return (
    <WritingPractice
      title="Q12 Paragraph / Composition"
      subtitle="Board pattern: 15 marks. Clear introduction, simple points এবং short conclusion ঠিক রাখতে হবে।"
      tasks={compositionTasks}
    />
  );
}

if (task === "summary") {
  return (
    <WritingPractice
      title="Q3 Summary Writing"
      subtitle="Board pattern: 10 marks. Main ideas নিজের ভাষায় ছোট করে লিখতে হবে।"
      tasks={summaryTasks}
      progressInfo={{
        id: "english1-summary",
        title: "English 1st Paper - Q3 Summary Writing",
      }}
    />
  );
}

if (task === "passageMCQ") {
  return <PassageMCQPractice taskData={passageMCQTask} />;
}

if (task === "ictMCQ") {
  return <ICTMCQPractice />;
}

if (task === "ictCreative") {
  return <ICTCreativePractice />;
}

if (task === "fullMock") {
  return <FullMockTestPage />;
}

if (task === "passageBroadQuestions") {
  return <BroadQuestionPractice taskData={passageBroadQuestionTask} />;
}

if (task === "flowChart") {
  return <FlowChartPractice taskData={flowChartTask} />;
}

if (task === "clozeWithClues") {
  return <ClozeWithCluesPractice taskData={clozeWithCluesTask} />;
}

if (task === "clozeWithoutClues") {
  return <ClozeWithoutCluesPractice taskData={clozeWithoutCluesTask} />;
}

if (task === "rearranging") {
  return <RearrangingPractice taskData={rearrangingTask} />;
}

if (task === "graphAnalysis") {
  return (
    <WritingPractice
      title="Q7 Graph / Chart Analysis"
      subtitle="Board pattern: 15 marks. Data দেখে introduction, trend, comparison এবং conclusion লিখতে হবে।"
      tasks={graphAnalysisTasks}
    />
  );
}

if (task === "storyCompletion") {
  return (
    <WritingPractice
      title="Q8 Story Completion"
      subtitle="Board pattern: 15 marks. Given beginning থেকে logical story complete করতে হবে।"
      tasks={storyCompletionTasks}
      progressInfo={{
        id: "english1-story-completion",
        title: "English 1st Paper - Q8 Story Completion",
      }}
    />
  );
}

if (task === "informalLetter") {
  return (
    <WritingPractice
      title="Q9 Informal Letter / Email"
      subtitle="Board pattern: 10 marks. Friendly tone, clear message এবং proper closing ঠিক রাখতে হবে।"
      tasks={informalLetterTasks}
    />
  );
}

  if (task === "connectors") {
  return (
    <FillPractice
      title="Q7 Sentence Connectors"
      subtitle="Board pattern: 14 gaps × 0.5 = 7 marks. এখানে বাক্যের সম্পর্ক বুঝে connector বসাতে হবে।"
      items={connectorItems}
      progressInfo={{
        id: "english2-connectors",
        title: "English 2nd Paper - Q7 Connectors",
      }}
    />
  );
}

if (task === "synonymAntonym") {
  return (
    <OptionPractice
      title="Q8 Synonym / Antonym"
      subtitle="Board pattern: 14 items × 0.5 = 7 marks. এখানে word meaning বুঝে synonym বা antonym বেছে নিতে হবে।"
      items={synonymAntonymItems}
      progressInfo={{
        id: "english2-synonym-antonym",
        title: "English 2nd Paper - Q8 Synonym/Antonym",
      }}
    />
  );
}

if (task === "punctuation") {
  return (
    <TextCorrectionPractice
      title="Q9 Punctuation and Capitalization"
      subtitle="Board pattern: 14 corrections × 0.5 = 7 marks. এখানে comma, full stop, question mark, quotation mark এবং capital letter ঠিক করতে হবে।"
      items={punctuationItems}
      progressInfo={{
        id: "english2-punctuation",
        title: "English 2nd Paper - Q9 Punctuation",
      }}
    />
  );
}

if (task === "completingSentences") {
  return (
    <FlexibleCompletionPractice
      title="Q3 Completing Sentences"
      subtitle="Board pattern: 10 sentences × 1 = 10 marks. এখানে grammar structure বুঝে বাক্য সম্পূর্ণ করতে হবে।"
      items={completingSentenceItems}
    />
  );
}

if (task === "wordsPhrases") {
  return (
    <WordBoxPractice
      title="Q2 Words/Phrases from Box"
      subtitle="Board pattern: 10 gaps × 0.5 = 5 marks. এখানে box থেকে সঠিক word/phrase বেছে gap পূরণ করতে হবে।"
      items={wordsPhrasesItems}
      wordBox={wordsPhrasesBox}
      progressInfo={{
        id: "english2-words-phrases",
        title: "English 2nd Paper - Q2 Words/Phrases",
      }}
    />
  );
}

  if (section === "ict") {
    return (
      <div style={{ padding: "10px 0" }}>
        <button style={backButtonStyle} onClick={() => setSection(null)}>
          ← Back
        </button>
        <h2>ICT Board Practice</h2>
        <p>Subject Code: 275</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 16 }}>
          <button
            style={{ ...cardStyle, marginBottom: 0, width: "100%" }}
            onClick={() => openTask("ictMCQ")}
          >
            <h3>MCQ Section</h3>
            <p>25 questions × 1 = 25 marks</p>
          </button>

          <button
            style={{ ...cardStyle, marginBottom: 0, width: "100%" }}
            onClick={() => openTask("ictCreative")}
          >
            <h3>Creative / Written Section</h3>
            <p>Total: 50 marks</p>
            <p>Pattern: ক = 1, খ = 2, গ = 3, ঘ = 8</p>
            <p>Scenario-based questions from ICT chapters.</p>
          </button>
        </div>
      </div>
    );
  }

  if (section === "english1") {
    return (
      <div style={{ padding: "10px 0" }}>
        <button style={backButtonStyle} onClick={() => setSection(null)}>
          ← Back
        </button>
        <h2>English 1st Paper Practice</h2>
        <p>Subject Code: 107 | Full Marks: 100 | Time: 3 hours</p>

        <h3 style={{ marginTop: 18 }}>Part I — Reading Test: 60 marks</h3>
        <button
          style={{ ...cardStyle, marginBottom: 10, width: "100%" }}
          onClick={() => openTask("passageMCQ")}
        >
          Q1A Passage MCQ — 5 marks
        </button>

        <button
          style={{ ...cardStyle, marginBottom: 10, width: "100%" }}
          onClick={() => openTask("passageBroadQuestions")}
        >
          Q1B Broad Questions — 15 marks
        </button>

        <button
          style={{ ...cardStyle, marginBottom: 10, width: "100%" }}
          onClick={() => openTask("flowChart")}
        >
          Q2 Flow Chart / Information Transfer — 5 marks
        </button>

        <button
          style={{ ...cardStyle, marginBottom: 10, width: "100%" }}
          onClick={() => openTask("summary")}
        >
          Q3 Summary Writing — 10 marks
        </button>

        <button
          style={{ ...cardStyle, marginBottom: 10, width: "100%" }}
          onClick={() => openTask("clozeWithClues")}
        >
          Q4 Cloze Test with Clues — 5 marks
        </button>

        <button
          style={{ ...cardStyle, marginBottom: 10, width: "100%" }}
          onClick={() => openTask("clozeWithoutClues")}
        >
          Q5 Cloze Test without Clues — 10 marks
        </button>

        <button
          style={{ ...cardStyle, marginBottom: 10, width: "100%" }}
          onClick={() => openTask("rearranging")}
        >
          Q6 Rearranging Sentences — 10 marks
        </button>

        <h3 style={{ marginTop: 18 }}>Part II — Guided Writing: 40 marks</h3>
        <button
          style={{ ...cardStyle, marginBottom: 10, width: "100%" }}
          onClick={() => openTask("graphAnalysis")}
        >
          Q7 Graph / Chart Analysis — 15 marks
        </button>

        <button
          style={{ ...cardStyle, marginBottom: 10, width: "100%" }}
          onClick={() => openTask("storyCompletion")}
        >
          Q8 Story Completion — 15 marks
        </button>

        <button
          style={{ ...cardStyle, marginBottom: 10, width: "100%" }}
          onClick={() => openTask("informalLetter")}
        >
          Q9 Informal Letter / Email — 10 marks
        </button>
      </div>
    );
  }

  if (section === "english2") {
    return (
      <div style={{ padding: "10px 0" }}>
        <button style={backButtonStyle} onClick={() => setSection(null)}>
          ← Back
        </button>
        <h2>English 2nd Paper Practice</h2>
        <p>Subject Code: 108 | Full Marks: 100 | Time: 3 hours</p>

        <h3 style={{ marginTop: 18 }}>Part A — Grammar: 60 marks</h3>

        <button
          style={{ ...cardStyle, marginBottom: 10, width: "100%" }}
          onClick={() => openTask("prepositions")}
        >
          Q1 Prepositions — 5 marks
        </button>

        <button
  style={{ ...cardStyle, marginBottom: 10, width: "100%" }}
  onClick={() => openTask("wordsPhrases")}
>
  Q2 Words/Phrases from Box — 5 marks
</button>

<button
  style={{ ...cardStyle, marginBottom: 10, width: "100%" }}
  onClick={() => openTask("completingSentences")}
>
  Q3 Completing Sentences — 10 marks
</button>

        <button
          style={{ ...cardStyle, marginBottom: 10, width: "100%" }}
          onClick={() => openTask("rightForm")}
        >
          Q4 Right Form of Verbs — 7 marks
        </button>

        <button
  style={{ ...cardStyle, marginBottom: 10, width: "100%" }}
  onClick={() => openTask("narration")}
>
  Q5 Narration / Indirect Speech — 7 marks
</button>

<button
  style={{ ...cardStyle, marginBottom: 10, width: "100%" }}
  onClick={() => openTask("modifiers")}
>
  Q6 Modifiers — 5 marks
</button>

<button
  style={{ ...cardStyle, marginBottom: 10, width: "100%" }}
  onClick={() => openTask("connectors")}
>
  Q7 Sentence Connectors — 7 marks
</button>

<button
  style={{ ...cardStyle, marginBottom: 10, width: "100%" }}
  onClick={() => openTask("synonymAntonym")}
>
  Q8 Synonym / Antonym — 7 marks
</button>

<button
  style={{ ...cardStyle, marginBottom: 10, width: "100%" }}
  onClick={() => openTask("punctuation")}
>
  Q9 Punctuation and Capitalization — 7 marks
</button>

        <h3 style={{ marginTop: 18 }}>Part B — Composition: 40 marks</h3>
        <button
          style={{ ...cardStyle, marginBottom: 10, width: "100%" }}
          onClick={() => openTask("application")}
        >
          Q10 Application / Formal Letter — 10 marks
        </button>

        <button
          style={{ ...cardStyle, marginBottom: 10, width: "100%" }}
          onClick={() => openTask("paragraph")}
        >
          Q11 Paragraph Writing — 15 marks
        </button>

        <button
          style={{ ...cardStyle, marginBottom: 10, width: "100%" }}
          onClick={() => openTask("composition")}
        >
          Q12 Paragraph / Composition — 15 marks
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "10px 0" }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>
        Board Practice
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <button style={cardStyle} onClick={() => setSection("ict")}>
          <h3>ICT Board Practice</h3>
          <p>MCQ + Creative written practice</p>
        </button>

        <button style={cardStyle} onClick={() => setSection("english1")}>
          <h3>English 1st Paper</h3>
          <p>Reading Test + Guided Writing</p>
        </button>

        <button style={cardStyle} onClick={() => setSection("english2")}>
          <h3>English 2nd Paper</h3>
          <p>Grammar + Composition</p>
        </button>

        <button style={cardStyle} onClick={() => openTask("fullMock")}>
          <h3>Full Mock Test</h3>
          <p>ICT + English full mock skeleton</p>
        </button>
      </div>
    </div>
  );
}

export default function App() {
  var _s = useState("dashboard");
  var page = _s[0];
  var setPage = _s[1];

  var _j = useState(null);
  var ictJumpId = _j[0];
  var setIctJumpId = _j[1];

  var _ep = useState(null);
  var engJumpPaper = _ep[0];
  var setEngJumpPaper = _ep[1];

  var _et = useState(null);
  var engJumpTopicId = _et[0];
  var setEngJumpTopicId = _et[1];

  function goToTopic(info) {
    if (info.subject === "ict") {
      setEngJumpPaper(null);
      setEngJumpTopicId(null);
      setIctJumpId(info.topicId);
      setPage("ict");
    } else if (info.subject === "english") {
      setIctJumpId(null);
      setEngJumpPaper(info.paperKey);
      setEngJumpTopicId(info.topicId);
      setPage("english1");
    }
  }

  function clearIctJump() {
    setIctJumpId(null);
  }

  function clearEnglishJump() {
    setEngJumpPaper(null);
    setEngJumpTopicId(null);
  }

  var buttons = [
    { id: "dashboard", label: "Home" },
    { id: "ict", label: "ICT" },
    { id: "english1", label: "Eng 1st" },
    { id: "english2", label: "Eng 2nd" },
    { id: "test", label: "Test" },
    { id: "practice", label: "Board" },
  ];

  var content = null;
  if (page === "dashboard") {
    content = <Dashboard setPage={setPage} />;
} else if (page === "practice") {
    content = <BoardPracticePage />;
} else if (page === "ict") {
    content = (
      <ICTPage jumpToTopicId={ictJumpId} clearJump={clearIctJump} />
    );
  } else if (page === "english1") {
    content = (
      <English1Page
        jumpToPaper={engJumpPaper}
        jumpToTopicId={engJumpTopicId}
        clearJump={clearEnglishJump}
      />
    );
  } else if (page === "english2") {
    content = <English2Page />;
  } else if (page === "test") {
    content = <TestPage goToTopic={goToTopic} />;
  }

  return (
    <div
      style={{
        maxWidth: 480,
        margin: "0 auto",
        padding: "24px 16px 100px",
        fontFamily: "system-ui, -apple-system, sans-serif",
        color: "#1e293b",
        minHeight: "100vh",
        background: "#f8fafc",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 14,
            background: "#6366f1",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 24,
            fontWeight: 800,
            color: "#fff",
            marginBottom: 10,
          }}
        >
          S
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, margin: "0 0 4px" }}>
          Sadie_Say-dee
        </h1>
        <p style={{ color: "#94a3b8", fontSize: 14 }}>
          Personal study companion
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: 6,
          marginBottom: 24,
        }}
      >
        {buttons.map(function (btn) {
          var isActive = page === btn.id;
          return (
            <button
              key={btn.id}
              onClick={function () {
                setPage(btn.id);
              }}
              style={{
                padding: "12px 4px",
                fontSize: 13,
                fontWeight: 600,
                fontFamily: "inherit",
                border: isActive ? "2px solid #6366f1" : "1px solid #e2e8f0",
                borderRadius: 10,
                background: isActive ? "#eef2ff" : "#fff",
                color: isActive ? "#6366f1" : "#475569",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              {btn.label}
            </button>
          );
        })}
      </div>

      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          padding: 20,
          border: "1px solid #e2e8f0",
        }}
      >
        {content}
      </div>
    </div>
  );
}
