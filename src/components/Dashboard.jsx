import { loadProgress, loadBoardProgress } from "../utils/storage.js";

export default function Dashboard({ setPage }) {
  var today = new Date();
  var examCountdowns = [
    {
      paper: "English 1st Paper",
      date: "2026-07-06",
      daysLeft: Math.max(
        0,
        Math.ceil((new Date("2026-07-06T00:00:00") - today) / 86400000)
      ),
    },
    {
      paper: "English 2nd Paper",
      date: "2026-07-08",
      daysLeft: Math.max(
        0,
        Math.ceil((new Date("2026-07-08T00:00:00") - today) / 86400000)
      ),
    },
    {
      paper: "ICT",
      date: "2026-07-11",
      daysLeft: Math.max(
        0,
        Math.ceil((new Date("2026-07-11T00:00:00") - today) / 86400000)
      ),
    },
  ];
  var priorityItems = ["English 1st Paper", "English 2nd Paper", "ICT"];

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
          display: "flex",
          flexDirection: "column",
          gap: 10,
          marginBottom: 14,
        }}
      >
        {examCountdowns.map(function (item) {
          return (
            <div
              key={item.paper}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 12,
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                borderRadius: 14,
                padding: "16px",
                color: "#fff",
              }}
            >
              <div>
                <p style={{ fontSize: 13, opacity: 0.85, marginBottom: 4 }}>
                  HSC Exam Countdown
                </p>
                <h3 style={{ fontSize: 18, marginBottom: 4 }}>{item.paper}</h3>
                <p style={{ fontSize: 13, opacity: 0.9 }}>{item.date}</p>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <p style={{ fontSize: 34, fontWeight: 800, margin: 0 }}>
                  {item.daysLeft}
                </p>
                <p style={{ fontSize: 13, opacity: 0.9 }}>days left</p>
              </div>
            </div>
          );
        })}
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
          Recommended Priority
        </p>
        {priorityItems.map(function (paper, index) {
          return (
            <div
              key={paper}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: index === 0 ? "0 0 8px" : "8px 0",
                borderBottom:
                  index === priorityItems.length - 1
                    ? "none"
                    : "1px solid #e2e8f0",
              }}
            >
              <span style={{ fontSize: 14, color: "#334155", fontWeight: 700 }}>
                {index + 1}. {paper}
              </span>
              <span style={{ fontSize: 12, color: "#64748b" }}>
                Priority {index + 1}
              </span>
            </div>
          );
        })}
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
