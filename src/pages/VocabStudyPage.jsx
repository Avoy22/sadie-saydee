import { useMemo, useState } from "react";

const vocabWords = [
  {
    word: "achieve",
    meaningBn: "অর্জন করা",
    synonym: "attain",
    antonym: "fail",
    sentence: "Hard work helps us achieve success.",
  },
  {
    word: "admire",
    meaningBn: "প্রশংসা করা",
    synonym: "respect",
    antonym: "dislike",
    sentence: "We admire people who speak the truth.",
  },
  {
    word: "affect",
    meaningBn: "প্রভাবিত করা",
    synonym: "influence",
    antonym: "ignore",
    sentence: "Good habits affect our daily life.",
  },
  {
    word: "ancient",
    meaningBn: "প্রাচীন",
    synonym: "old",
    antonym: "modern",
    sentence: "The museum has many ancient coins.",
  },
  {
    word: "benefit",
    meaningBn: "উপকার",
    synonym: "advantage",
    antonym: "harm",
    sentence: "Regular reading brings great benefit to students.",
  },
  {
    word: "brave",
    meaningBn: "সাহসী",
    synonym: "courageous",
    antonym: "cowardly",
    sentence: "A brave person faces danger with courage.",
  },
  {
    word: "careful",
    meaningBn: "সতর্ক",
    synonym: "cautious",
    antonym: "careless",
    sentence: "Be careful while crossing the road.",
  },
  {
    word: "challenge",
    meaningBn: "চ্যালেঞ্জ",
    synonym: "difficulty",
    antonym: "ease",
    sentence: "Every challenge can teach us something new.",
  },
  {
    word: "communicate",
    meaningBn: "যোগাযোগ করা",
    synonym: "convey",
    antonym: "conceal",
    sentence: "Students should communicate clearly with teachers.",
  },
  {
    word: "confident",
    meaningBn: "আত্মবিশ্বাসী",
    synonym: "assured",
    antonym: "doubtful",
    sentence: "She felt confident before the final exam.",
  },
  {
    word: "contribute",
    meaningBn: "অবদান রাখা",
    synonym: "donate",
    antonym: "withhold",
    sentence: "Everyone can contribute to society.",
  },
  {
    word: "courage",
    meaningBn: "সাহস",
    synonym: "bravery",
    antonym: "fear",
    sentence: "Courage helps us overcome difficult times.",
  },
  {
    word: "creative",
    meaningBn: "সৃজনশীল",
    synonym: "imaginative",
    antonym: "unoriginal",
    sentence: "A creative mind can solve problems in new ways.",
  },
  {
    word: "decision",
    meaningBn: "সিদ্ধান্ত",
    synonym: "choice",
    antonym: "indecision",
    sentence: "A wise decision can change a person's future.",
  },
  {
    word: "develop",
    meaningBn: "উন্নয়ন করা",
    synonym: "improve",
    antonym: "decline",
    sentence: "We should develop good study habits.",
  },
  {
    word: "discipline",
    meaningBn: "শৃঙ্খলা",
    synonym: "order",
    antonym: "disorder",
    sentence: "Discipline is essential for success.",
  },
  {
    word: "education",
    meaningBn: "শিক্ষা",
    synonym: "learning",
    antonym: "ignorance",
    sentence: "Education opens the door to a better life.",
  },
  {
    word: "environment",
    meaningBn: "পরিবেশ",
    synonym: "surroundings",
    antonym: "pollution",
    sentence: "We must keep our environment clean.",
  },
  {
    word: "essential",
    meaningBn: "অপরিহার্য",
    synonym: "necessary",
    antonym: "unnecessary",
    sentence: "Water is essential for all living beings.",
  },
  {
    word: "failure",
    meaningBn: "ব্যর্থতা",
    synonym: "defeat",
    antonym: "success",
    sentence: "Failure can be the first step to learning.",
  },
  {
    word: "freedom",
    meaningBn: "স্বাধীনতা",
    synonym: "liberty",
    antonym: "captivity",
    sentence: "Freedom is a basic human right.",
  },
  {
    word: "honest",
    meaningBn: "সৎ",
    synonym: "truthful",
    antonym: "dishonest",
    sentence: "An honest student never cheats in exams.",
  },
  {
    word: "improve",
    meaningBn: "উন্নতি করা",
    synonym: "enhance",
    antonym: "worsen",
    sentence: "Practice can improve your English vocabulary.",
  },
  {
    word: "knowledge",
    meaningBn: "জ্ঞান",
    synonym: "wisdom",
    antonym: "ignorance",
    sentence: "Knowledge gives us confidence.",
  },
  {
    word: "protect",
    meaningBn: "রক্ষা করা",
    synonym: "defend",
    antonym: "harm",
    sentence: "Trees protect us from natural disasters.",
  },
  {
    word: "responsible",
    meaningBn: "দায়িত্বশীল",
    synonym: "accountable",
    antonym: "irresponsible",
    sentence: "A responsible citizen follows the law.",
  },
  {
    word: "success",
    meaningBn: "সাফল্য",
    synonym: "achievement",
    antonym: "failure",
    sentence: "Success comes from patience and hard work.",
  },
  {
    word: "technology",
    meaningBn: "প্রযুক্তি",
    synonym: "innovation",
    antonym: "tradition",
    sentence: "Technology has changed modern education.",
  },
  {
    word: "valuable",
    meaningBn: "মূল্যবান",
    synonym: "precious",
    antonym: "worthless",
    sentence: "Time is a valuable resource for students.",
  },
  {
    word: "wisdom",
    meaningBn: "প্রজ্ঞা",
    synonym: "insight",
    antonym: "foolishness",
    sentence: "Wisdom helps people make good decisions.",
  },
];

const pageStyle = {
  padding: "8px 0 2px",
};

const headerCardStyle = {
  marginBottom: 14,
  borderRadius: 22,
  padding: "18px 16px",
  background: "linear-gradient(145deg, #ffffff, #fff7fb)",
  border: "1px solid #eadcff",
  boxShadow: "0 14px 34px rgba(124, 58, 237, 0.08)",
};

const searchBoxStyle = {
  width: "100%",
  minHeight: 48,
  border: "1px solid #eadcff",
  borderRadius: 18,
  padding: "0 15px",
  color: "#27103f",
  background: "rgba(255,255,255,0.92)",
};

const cardStyle = {
  borderRadius: 20,
  padding: "16px",
  background: "linear-gradient(145deg, #ffffff, #fbf7ff)",
  border: "1px solid #eadcff",
  boxShadow: "0 14px 34px rgba(124, 58, 237, 0.08)",
};

const tagStyle = {
  display: "inline-flex",
  alignItems: "center",
  minHeight: 28,
  borderRadius: 999,
  padding: "5px 10px",
  fontSize: 12,
  fontWeight: 800,
};

export default function VocabStudyPage() {
  const [searchText, setSearchText] = useState("");
  const query = searchText.trim().toLowerCase();

  const filteredWords = useMemo(
    function () {
      if (!query) return vocabWords;

      return vocabWords.filter(function (item) {
        return (
          item.word.toLowerCase().includes(query) ||
          item.meaningBn.includes(query) ||
          item.synonym.toLowerCase().includes(query) ||
          item.antonym.toLowerCase().includes(query) ||
          item.sentence.toLowerCase().includes(query)
        );
      });
    },
    [query]
  );

  return (
    <div style={pageStyle}>
      <div style={headerCardStyle}>
        <p
          style={{
            fontSize: 12,
            fontWeight: 800,
            color: "#7c3aed",
            margin: "0 0 6px",
            letterSpacing: 0.3,
          }}
        >
          HSC VOCAB STUDY
        </p>
        <h2
          style={{
            fontSize: 24,
            fontWeight: 900,
            margin: "0 0 6px",
            color: "#27103f",
            letterSpacing: 0,
          }}
        >
          Vocabulary
        </h2>
        <p
          style={{
            fontSize: 13,
            lineHeight: 1.6,
            color: "#64748b",
            margin: "0 0 14px",
            fontWeight: 600,
          }}
        >
          Important English words with Bangla meaning, synonym, antonym, and
          sentence.
        </p>
        <input
          type="search"
          value={searchText}
          onChange={function (event) {
            setSearchText(event.target.value);
          }}
          placeholder="Search word, meaning, synonym..."
          aria-label="Search vocabulary"
          style={searchBoxStyle}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
          margin: "0 2px 12px",
        }}
      >
        <span style={{ fontSize: 13, fontWeight: 800, color: "#6b4b7d" }}>
          {filteredWords.length} of {vocabWords.length} words
        </span>
        <span style={{ fontSize: 12, fontWeight: 700, color: "#9f6cb8" }}>
          Study list
        </span>
      </div>

      {filteredWords.length > 0 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {filteredWords.map(function (item, index) {
            return (
              <article key={item.word} style={cardStyle}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: 12,
                    marginBottom: 12,
                  }}
                >
                  <div style={{ minWidth: 0 }}>
                    <p
                      style={{
                        fontSize: 12,
                        fontWeight: 900,
                        color: "#ec4899",
                        margin: "0 0 4px",
                      }}
                    >
                      #{index + 1}
                    </p>
                    <h3
                      style={{
                        fontSize: 22,
                        fontWeight: 900,
                        color: "#27103f",
                        margin: 0,
                        letterSpacing: 0,
                        textTransform: "capitalize",
                      }}
                    >
                      {item.word}
                    </h3>
                  </div>
                  <div
                    style={{
                      flexShrink: 0,
                      borderRadius: 16,
                      padding: "8px 10px",
                      background: "#f5edff",
                      color: "#7c3aed",
                      fontSize: 13,
                      fontWeight: 900,
                      border: "1px solid #eadcff",
                    }}
                  >
                    {item.meaningBn}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 8,
                    marginBottom: 12,
                  }}
                >
                  <span
                    style={{
                      ...tagStyle,
                      background: "#ecfdf5",
                      color: "#166534",
                      border: "1px solid #bbf7d0",
                    }}
                  >
                    Syn: {item.synonym}
                  </span>
                  <span
                    style={{
                      ...tagStyle,
                      background: "#fff1f2",
                      color: "#be123c",
                      border: "1px solid #fecdd3",
                    }}
                  >
                    Ant: {item.antonym}
                  </span>
                </div>

                <p
                  style={{
                    margin: 0,
                    padding: "12px 13px",
                    borderRadius: 16,
                    background: "rgba(248, 250, 252, 0.9)",
                    border: "1px solid #eef2ff",
                    color: "#475569",
                    fontSize: 14,
                    fontWeight: 600,
                    lineHeight: 1.6,
                  }}
                >
                  {item.sentence}
                </p>
              </article>
            );
          })}
        </div>
      ) : (
        <div
          style={{
            ...cardStyle,
            textAlign: "center",
            color: "#64748b",
            fontSize: 14,
            fontWeight: 700,
          }}
        >
          No words found.
        </div>
      )}
    </div>
  );
}
