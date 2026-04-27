import { useState, useEffect } from "react";

var PROGRESS_KEY = "study_progress";

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
            setPage("english");
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
          Start English
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

function EnglishPage({ jumpToPaper, jumpToTopicId, clearJump }) {
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
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 6 }}>English</h2>
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
      setPage("english");
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
    { id: "dashboard", label: "Dashboard" },
    { id: "ict", label: "ICT" },
    { id: "english", label: "English" },
    { id: "test", label: "Test" },
  ];

  var content = null;
  if (page === "dashboard") {
    content = <Dashboard setPage={setPage} />;
  } else if (page === "ict") {
    content = (
      <ICTPage jumpToTopicId={ictJumpId} clearJump={clearIctJump} />
    );
  } else if (page === "english") {
    content = (
      <EnglishPage
        jumpToPaper={engJumpPaper}
        jumpToTopicId={engJumpTopicId}
        clearJump={clearEnglishJump}
      />
    );
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
          gridTemplateColumns: "1fr 1fr",
          gap: 10,
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
                padding: "14px 8px",
                fontSize: 15,
                fontWeight: 600,
                fontFamily: "inherit",
                border: isActive ? "2px solid #6366f1" : "1px solid #e2e8f0",
                borderRadius: 12,
                background: isActive ? "#eef2ff" : "#fff",
                color: isActive ? "#6366f1" : "#475569",
                cursor: "pointer",
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