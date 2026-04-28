const grammarTopics = [
  {
    name: "Prepositions",
    helper: "কোন শব্দের পরে কোন preposition বসে, সেটা নিয়মসহ মনে রাখার অংশ।",
  },
  {
    name: "Words/Phrases",
    helper: "গুরুত্বপূর্ণ phrase ও expression ব্যবহার করে বাক্যের অর্থ ঠিক করা।",
  },
  {
    name: "Completing Sentences",
    helper: "কারণ, শর্ত, ফলাফল বা contrast বুঝে অসম্পূর্ণ বাক্য শেষ করা।",
  },
  {
    name: "Right Form of Verbs",
    helper: "Tense, subject ও sentence structure দেখে verb-এর সঠিক রূপ বসানো।",
  },
  {
    name: "Narration",
    helper: "Direct speech থেকে indirect speech-এ tense, pronoun ও reporting verb বদলানো।",
  },
  {
    name: "Modifiers",
    helper: "Phrase বা clause দিয়ে noun, verb বা পুরো বাক্যকে সুন্দরভাবে modify করা।",
  },
  {
    name: "Sentence Connectors",
    helper: "দুইটি idea যুক্ত করতে therefore, however, otherwise ধরনের connector ব্যবহার করা।",
  },
  {
    name: "Synonym / Antonym",
    helper: "শব্দের কাছাকাছি অর্থ ও বিপরীত অর্থ চেনার vocabulary practice।",
  },
  {
    name: "Punctuation",
    helper: "Capital letter, comma, full stop, question mark ও quotation ঠিক করা।",
  },
];

const compositionTopics = [
  {
    name: "Application / Formal Letter",
    helper: "সঠিক format, formal tone ও clear request দিয়ে application লেখা।",
  },
  {
    name: "Paragraph Writing",
    helper: "একটি topic নিয়ে সহজ, ধারাবাহিক ও পরীক্ষার উপযোগী paragraph তৈরি করা।",
  },
  {
    name: "Composition",
    helper: "Introduction, body ও conclusion সাজিয়ে বড় writing answer লেখা।",
  },
];

function TopicCard({ topic }) {
  return (
    <div
      style={{
        background: "linear-gradient(145deg, #ffffff, #fff7fb)",
        border: "1px solid #eadcff",
        borderRadius: 20,
        padding: "18px 16px",
        boxShadow: "0 12px 28px rgba(124, 58, 237, 0.08)",
      }}
    >
      <p
        style={{
          fontSize: 17,
          fontWeight: 800,
          color: "#27103f",
          marginBottom: 8,
        }}
      >
        {topic.name}
      </p>
      <p
        style={{
          fontSize: 14,
          lineHeight: 1.7,
          color: "#5b5067",
          marginBottom: 10,
        }}
      >
        {topic.helper}
      </p>
      <p
        style={{
          fontSize: 12,
          color: "#7c3aed",
          fontWeight: 800,
        }}
      >
        Practice in Board section
      </p>
    </div>
  );
}

function TopicSection({ title, topics }) {
  return (
    <section style={{ marginTop: 22 }}>
      <h3
        style={{
          fontSize: 18,
          fontWeight: 900,
          color: "#27103f",
          marginBottom: 12,
        }}
      >
        {title}
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {topics.map(function (topic) {
          return <TopicCard key={topic.name} topic={topic} />;
        })}
      </div>
    </section>
  );
}

export default function English2Page() {
  return (
    <div style={{ padding: "10px 0" }}>
      <h2 style={{ fontSize: 22, fontWeight: 900, marginBottom: 6 }}>
        English 2nd Paper Study
      </h2>
      <p
        style={{
          fontSize: 14,
          color: "#7c3aed",
          fontWeight: 800,
          marginBottom: 18,
        }}
      >
        Grammar & Composition preparation
      </p>

      <TopicSection title="Grammar Topics" topics={grammarTopics} />
      <TopicSection title="Composition Topics" topics={compositionTopics} />
    </div>
  );
}
