import { useState } from "react";
import logo from "./assets/logo.png";
import Dashboard from "./components/Dashboard.jsx";
import ICTPage from "./components/ICTPage.jsx";
import English1Page from "./components/English1Page.jsx";
import English2Page from "./components/English2Page.jsx";
import TestPage from "./components/TestPage.jsx";
import BoardPracticePage from "./pages/BoardPracticePage.jsx";

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
        <img src={logo} alt="logo" style={{ width: 60, height: 60 }} />
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
