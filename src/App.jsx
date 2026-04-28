import { useState } from "react";
import logo from "./assets/logo.png";
import Dashboard from "./components/Dashboard.jsx";
import ICTPage from "./components/ICTPage.jsx";
import English1Page from "./components/English1Page.jsx";
import English2Page from "./components/English2Page.jsx";
import TestPage from "./components/TestPage.jsx";
import BoardPracticePage from "./pages/BoardPracticePage.jsx";
import VocabStudyPage from "./pages/VocabStudyPage.jsx";

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
    { id: "vocab", label: "Vocab" },
    { id: "test", label: "Test" },
    { id: "practice", label: "Board" },
  ];

  var content = null;
  if (page === "dashboard") {
    content = <Dashboard setPage={setPage} />;
} else if (page === "practice") {
    content = <BoardPracticePage />;
} else if (page === "vocab") {
    content = <VocabStudyPage />;
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
        padding: "22px 14px 96px",
        fontFamily: "system-ui, -apple-system, sans-serif",
        color: "#1e293b",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          textAlign: "center",
          marginBottom: 22,
          padding: "22px 16px 20px",
          borderRadius: 28,
          background:
            "linear-gradient(145deg, rgba(255,255,255,0.92), rgba(255,241,248,0.86))",
          border: "1px solid rgba(234, 220, 255, 0.95)",
          boxShadow: "0 22px 60px rgba(124, 58, 237, 0.13)",
        }}
      >
        <img
          src={logo}
          alt="logo"
          style={{
            width: 68,
            height: 68,
            borderRadius: 22,
            objectFit: "cover",
            boxShadow: "0 16px 34px rgba(124, 58, 237, 0.2)",
            marginBottom: 12,
          }}
        />
        <h1
          style={{
            fontSize: 30,
            fontWeight: 900,
            margin: "0 0 5px",
            letterSpacing: 0,
            color: "#27103f",
          }}
        >
          Sadie_Say-dee
        </h1>
        <p style={{ color: "#9f6cb8", fontSize: 14, fontWeight: 700 }}>
          Personal study companion
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 10,
          marginBottom: 18,
          padding: 6,
          borderRadius: 22,
          background: "rgba(255,255,255,0.72)",
          border: "1px solid rgba(234, 220, 255, 0.9)",
          boxShadow: "0 14px 34px rgba(124, 58, 237, 0.08)",
        }}
      >
        {buttons.map(function (btn) {
          var isActive = page === btn.id;
          var isBoardButton = btn.id === "practice";
          return (
            <button
              key={btn.id}
              onClick={function () {
                setPage(btn.id);
              }}
              style={{
                padding: "12px 4px",
                fontSize: 13,
                fontWeight: 800,
                fontFamily: "inherit",
                border: isActive ? "1px solid #d8b4fe" : "1px solid transparent",
                borderRadius: 16,
                background: isActive
                  ? "linear-gradient(135deg, #7c3aed, #ec4899)"
                  : "rgba(255,255,255,0.76)",
                color: isActive ? "#fff" : "#6b4b7d",
                cursor: "pointer",
                whiteSpace: "nowrap",
                gridColumn: isBoardButton ? "span 3" : undefined,
                justifySelf: isBoardButton ? "center" : undefined,
                width: isBoardButton ? "65%" : undefined,
                boxShadow: isActive
                  ? "0 12px 24px rgba(124, 58, 237, 0.22)"
                  : "none",
              }}
            >
              {btn.label}
            </button>
          );
        })}
      </div>

      <div
        style={{
          background: "rgba(255,255,255,0.9)",
          borderRadius: 26,
          padding: 18,
          border: "1px solid #eadcff",
          boxShadow: "0 24px 70px rgba(124, 58, 237, 0.12)",
          backdropFilter: "blur(14px)",
        }}
      >
        {content}
      </div>
    </div>
  );
}
