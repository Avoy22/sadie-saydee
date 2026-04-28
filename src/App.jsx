import { useState, useEffect } from "react";
import {
  saveBoardSectionProgress,
  loadWrongAnswers,
  saveWrongAnswers,
  clearWrongAnswers,
} from "./utils/storage.js";
import { formatDateISO } from "./utils/date.js";
import { collectAllMCQs, shuffleAndPick } from "./utils/mcq.js";
import {
  synonymAntonymItems,
  punctuationItems,
  completingSentenceItems,
  wordsPhrasesItems,
  wordsPhrasesBox,
  modifierItems,
  narrationItems,
  applicationTasks,
  ictMcqItems,
  passageMCQTask,
  passageBroadQuestionTask,
  flowChartTask,
  clozeWithCluesTask,
  clozeWithoutCluesTask,
  rearrangingTask,
  paragraphTasks,
  compositionTasks,
  graphAnalysisTasks,
  summaryTasks,
  storyCompletionTasks,
  informalLetterTasks,
  eng2FullExamData,
} from "./data/boardPracticeData.js";

import Dashboard from "./components/Dashboard.jsx";
import ICTPage from "./components/ICTPage.jsx";
import English1Page from "./components/English1Page.jsx";
import English2Page from "./components/English2Page.jsx";
import TestPage from "./components/TestPage.jsx";
import BackButton from "./components/BackButton.jsx";
import CheckAnswersButton from "./components/CheckAnswersButton.jsx";
import AnswerFeedback from "./components/AnswerFeedback.jsx";

function BoardPracticePage() {
  const [section, setSection] = useState(null);
  const [task, setTask] = useState(null);
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [reviewVersion, setReviewVersion] = useState(0);
  const [miniMockStage, setMiniMockStage] = useState("start");
  const [miniMockQuestions, setMiniMockQuestions] = useState([]);
  const [miniMockTimeLeft, setMiniMockTimeLeft] = useState(300);
  const [ictFullExamStage, setIctFullExamStage] = useState("start");
  const [ictFullExamQuestionsPicked, setIctFullExamQuestionsPicked] = useState([]);
  const [ictFullExamTimeLeft, setIctFullExamTimeLeft] = useState(1500);
  const [ictFullExamCurrentIndex, setIctFullExamCurrentIndex] = useState(0);
  const [readingTestStage, setReadingTestStage] = useState("start");
  const [readingTestTimeLeft, setReadingTestTimeLeft] = useState(3600);
  const [eng2FullExamStage, setEng2FullExamStage] = useState("start");
  const [eng2FullExamTimeLeft, setEng2FullExamTimeLeft] = useState(5400);

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
      status: "Ready",
      taskId: "eng2FullExam",
    },
  ];

  const ictFullExamQuestions = [
    {
      id: "ict-full-1",
      question: "বিশ্বগ্রাম ধারণার মূল ভিত্তি কোনটি?",
      options: [
        "কৃষি প্রযুক্তি",
        "তথ্য ও যোগাযোগ প্রযুক্তি",
        "শিল্প উৎপাদন",
        "প্রচলিত ডাকব্যবস্থা",
      ],
      correctAnswer: 1,
      explanation:
        "বিশ্বগ্রাম ধারণার মূল ভিত্তি হলো তথ্য ও যোগাযোগ প্রযুক্তি। ইন্টারনেট, মোবাইল যোগাযোগ ও ডিজিটাল সেবার মাধ্যমে দূরের মানুষও দ্রুত যুক্ত হতে পারে।",
      language: "bn",
    },
    {
      id: "ict-full-2",
      question: "E-commerce বলতে কী বোঝায়?",
      options: [
        "ইন্টারনেটের মাধ্যমে পণ্য বা সেবা ক্রয়-বিক্রয়",
        "শুধু ই-মেইল পাঠানো",
        "কম্পিউটার মেরামত",
        "অফলাইনে হিসাব সংরক্ষণ",
      ],
      correctAnswer: 0,
      explanation:
        "E-commerce হলো ইন্টারনেট বা ডিজিটাল নেটওয়ার্ক ব্যবহার করে পণ্য ও সেবা ক্রয়-বিক্রয়ের প্রক্রিয়া।",
      language: "bn",
    },
    {
      id: "ict-full-3",
      question: "Which transmission mode allows communication in both directions at the same time?",
      options: ["Simplex", "Half-duplex", "Full-duplex", "Broadcast"],
      correctAnswer: 2,
      explanation:
        "Full-duplex communication allows both sender and receiver to transmit data at the same time, such as in a telephone call.",
      language: "en",
    },
    {
      id: "ict-full-4",
      question: "ডেটা যোগাযোগে bandwidth কী নির্দেশ করে?",
      options: [
        "ডেটা সংরক্ষণের স্থান",
        "ডেটা পরিবহনের ক্ষমতা",
        "কম্পিউটারের রং",
        "প্রিন্টারের গতি",
      ],
      correctAnswer: 1,
      explanation:
        "Bandwidth হলো একটি যোগাযোগ মাধ্যম নির্দিষ্ট সময়ে কত পরিমাণ ডেটা বহন করতে পারে তার পরিমাপ।",
      language: "bn",
    },
    {
      id: "ict-full-5",
      question: "What is the binary equivalent of decimal 13?",
      options: ["1011", "1101", "1110", "1001"],
      correctAnswer: 1,
      explanation:
        "Decimal 13 = 8 + 4 + 1. Therefore its binary form is 1101.",
      language: "en",
    },
    {
      id: "ict-full-6",
      question: "Which hexadecimal number is equal to binary 1111?",
      options: ["A", "E", "F", "10"],
      correctAnswer: 2,
      explanation:
        "Binary 1111 equals decimal 15, and decimal 15 is represented as F in hexadecimal.",
      language: "en",
    },
    {
      id: "ict-full-7",
      question: "HTML-এ paragraph তৈরির জন্য কোন tag ব্যবহৃত হয়?",
      options: ["<h1>", "<p>", "<br>", "<img>"],
      correctAnswer: 1,
      explanation:
        "HTML-এ paragraph বা অনুচ্ছেদ লেখার জন্য <p> tag ব্যবহার করা হয়।",
      language: "bn",
    },
    {
      id: "ict-full-8",
      question: "Which HTML attribute is used to specify the destination of a hyperlink?",
      options: ["src", "alt", "href", "title"],
      correctAnswer: 2,
      explanation:
        "The href attribute of the <a> tag specifies the URL or destination of a hyperlink.",
      language: "en",
    },
    {
      id: "ict-full-9",
      question: "AND gate-এর output কখন 1 হয়?",
      options: [
        "যে কোনো একটি input 1 হলে",
        "সব input 1 হলে",
        "সব input 0 হলে",
        "input উল্টো হলে",
      ],
      correctAnswer: 1,
      explanation:
        "AND gate-এর output 1 হয় কেবল তখনই, যখন সবগুলো input 1 থাকে।",
      language: "bn",
    },
    {
      id: "ict-full-10",
      question: "Which logic gate works as an inverter?",
      options: ["AND", "OR", "NOT", "XOR"],
      correctAnswer: 2,
      explanation:
        "The NOT gate is called an inverter because it changes 1 to 0 and 0 to 1.",
      language: "en",
    },
    {
      id: "ict-full-11",
      question: "C programming language-এ variable declaration-এর সঠিক উদাহরণ কোনটি?",
      options: ["int age;", "age int;", "number = int;", "var age int;"],
      correctAnswer: 0,
      explanation:
        "C ভাষায় variable declare করতে প্রথমে data type এবং পরে variable name লেখা হয়। তাই int age; সঠিক।",
      language: "bn",
    },
    {
      id: "ict-full-12",
      question: "Which header file is commonly used for printf() in C?",
      options: ["stdio.h", "math.h", "string.h", "conio.h"],
      correctAnswer: 0,
      explanation:
        "printf() is declared in the standard input-output header file stdio.h.",
      language: "en",
    },
    {
      id: "ict-full-13",
      question: "DBMS-এর প্রধান কাজ কোনটি?",
      options: [
        "ডেটা সংরক্ষণ, ব্যবস্থাপনা ও অনুসন্ধান সহজ করা",
        "শুধু ছবি সম্পাদনা করা",
        "ইন্টারনেটের গতি বাড়ানো",
        "কীবোর্ড নিয়ন্ত্রণ করা",
      ],
      correctAnswer: 0,
      explanation:
        "DBMS বা Database Management System ডেটা সংরক্ষণ, ব্যবস্থাপনা, অনুসন্ধান, হালনাগাদ ও নিরাপত্তা নিয়ন্ত্রণে সাহায্য করে।",
      language: "bn",
    },
    {
      id: "ict-full-14",
      question: "In a relational database, a column is usually called a ____.",
      options: ["record", "field", "table", "form"],
      correctAnswer: 1,
      explanation:
        "In a database table, each column is called a field, and each row is called a record.",
      language: "en",
    },
    {
      id: "ict-full-15",
      question: "Primary key-এর বৈশিষ্ট্য কোনটি?",
      options: [
        "একই মান বারবার থাকতে পারে",
        "এটি record-কে এককভাবে শনাক্ত করে",
        "এটি শুধু text data রাখে",
        "এটি table মুছে দেয়",
      ],
      correctAnswer: 1,
      explanation:
        "Primary key কোনো table-এর প্রতিটি record-কে এককভাবে শনাক্ত করে। তাই এর মান সাধারণত unique হয়।",
      language: "bn",
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
    setMiniMockStage("start");
    setMiniMockQuestions([]);
    setMiniMockTimeLeft(300);
    setIctFullExamStage("start");
    setIctFullExamQuestionsPicked([]);
    setIctFullExamTimeLeft(1500);
    setIctFullExamCurrentIndex(0);
    setReadingTestStage("start");
    setReadingTestTimeLeft(3600);
    setEng2FullExamStage("start");
    setEng2FullExamTimeLeft(5400);
  }

  function openTask(taskId) {
    setTask(taskId);
    resetPractice();
  }

  useEffect(
    function () {
      if (task !== "timedMiniMock" || miniMockStage !== "running") return;
      if (miniMockTimeLeft <= 0) {
        submitMiniMock();
        return;
      }

      var timerId = setTimeout(function () {
        setMiniMockTimeLeft(miniMockTimeLeft - 1);
      }, 1000);

      return function () {
        clearTimeout(timerId);
      };
    },
    [task, miniMockStage, miniMockTimeLeft]
  );

  useEffect(
    function () {
      if (task !== "ictFullMCQExam" || ictFullExamStage !== "running") return;
      if (ictFullExamTimeLeft <= 0) {
        submitICTFullExam();
        return;
      }

      var timerId = setTimeout(function () {
        setIctFullExamTimeLeft(ictFullExamTimeLeft - 1);
      }, 1000);

      return function () {
        clearTimeout(timerId);
      };
    },
    [task, ictFullExamStage, ictFullExamTimeLeft]
  );

  useEffect(
    function () {
      if (task !== "eng1ReadingFull" || readingTestStage !== "running") return;
      if (readingTestTimeLeft <= 0) {
        submitReadingTest();
        return;
      }

      var timerId = setTimeout(function () {
        setReadingTestTimeLeft(readingTestTimeLeft - 1);
      }, 1000);

      return function () {
        clearTimeout(timerId);
      };
    },
    [task, readingTestStage, readingTestTimeLeft]
  );

  useEffect(
    function () {
      if (task !== "eng2FullExam" || eng2FullExamStage !== "running") return;
      if (eng2FullExamTimeLeft <= 0) {
        submitEng2FullExam();
        return;
      }

      var timerId = setTimeout(function () {
        setEng2FullExamTimeLeft(eng2FullExamTimeLeft - 1);
      }, 1000);

      return function () {
        clearTimeout(timerId);
      };
    },
    [task, eng2FullExamStage, eng2FullExamTimeLeft]
  );

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

  function addWrongAnswerInfo(progressInfo, entries) {
    if (!progressInfo || !entries || entries.length === 0) return [];
    var date = formatDateISO(new Date());
    return entries.map(function (entry) {
      return {
        sectionId: progressInfo.id,
        sectionTitle: progressInfo.title,
        question: entry.question,
        studentAnswer: entry.studentAnswer,
        correctAnswer: entry.correctAnswer,
        explanation: entry.explanation,
        date: date,
      };
    });
  }

  function getTextWrongEntries(progressInfo, items, getQuestion) {
    if (!progressInfo) return [];
    var entries = [];
    items.forEach(function (item) {
      var studentAnswer = answers[item.id] || "";
      var isCorrect =
        normalizeAnswer(studentAnswer) === normalizeAnswer(item.answer);
      if (!isCorrect) {
        entries.push({
          question: getQuestion(item),
          studentAnswer: studentAnswer || "No answer",
          correctAnswer: item.answer,
          explanation: item.explanation || "",
        });
      }
    });
    return addWrongAnswerInfo(progressInfo, entries);
  }

  function getOptionWrongEntries(progressInfo, items) {
    if (!progressInfo) return [];
    var entries = [];
    items.forEach(function (item) {
      var studentAnswer = answers[item.id] || "";
      if (studentAnswer !== item.answer) {
        entries.push({
          question: item.question,
          studentAnswer: studentAnswer || "No answer",
          correctAnswer: item.answer,
          explanation: item.explanation || "",
        });
      }
    });
    return addWrongAnswerInfo(progressInfo, entries);
  }

  function getICTMCQWrongEntries(progressInfo) {
    var entries = [];
    ictMcqItems.forEach(function (mcq) {
      var selected = answers[mcq.id];
      if (selected !== mcq.correctAnswer) {
        entries.push({
          question: mcq.question,
          studentAnswer:
            selected === undefined ? "No answer" : mcq.options[selected],
          correctAnswer: mcq.options[mcq.correctAnswer],
          explanation: mcq.explanation,
        });
      }
    });
    return addWrongAnswerInfo(progressInfo, entries);
  }

  function getMiniMockScore() {
    var score = 0;
    miniMockQuestions.forEach(function (mcq) {
      if (answers[mcq.id] === mcq.correctAnswer) {
        score++;
      }
    });
    return score;
  }

  function formatMiniMockTime(seconds) {
    var minutes = Math.floor(seconds / 60);
    var rest = seconds % 60;
    return minutes + ":" + String(rest).padStart(2, "0");
  }

  function startMiniMock() {
    var pool = collectAllMCQs().filter(function (mcq) {
      return (
        mcq.subjectKey === "ict" ||
        (mcq.subjectKey === "english" && mcq.paperKey === "2nd")
      );
    });
    var picked = shuffleAndPick(pool, Math.min(10, pool.length));
    setAnswers({});
    setChecked(false);
    setMiniMockQuestions(picked);
    setMiniMockTimeLeft(300);
    setMiniMockStage("running");
  }

  function submitMiniMock() {
    if (miniMockStage !== "running") return;
    var score = getMiniMockScore();
    saveScoredPractice(
      {
        id: "timed-mini-mock",
        title: "Timed Mini Mock Test",
      },
      score,
      miniMockQuestions.length
    );
    setChecked(true);
    setMiniMockStage("done");
  }

  function getICTFullExamProgressInfo() {
    return {
      id: "ict-full-mcq",
      title: "ICT Full MCQ Exam",
    };
  }

  function getICTFullExamScore() {
    var score = 0;
    ictFullExamQuestionsPicked.forEach(function (mcq) {
      if (answers[mcq.id] === mcq.correctAnswer) {
        score++;
      }
    });
    return score;
  }

  function getICTFullExamWrongEntries() {
    var entries = [];
    ictFullExamQuestionsPicked.forEach(function (mcq) {
      var selected = answers[mcq.id];
      if (selected !== mcq.correctAnswer) {
        entries.push({
          question: mcq.question,
          studentAnswer:
            selected === undefined ? "No answer" : mcq.options[selected],
          correctAnswer: mcq.options[mcq.correctAnswer],
          explanation: mcq.explanation,
        });
      }
    });
    return addWrongAnswerInfo(getICTFullExamProgressInfo(), entries);
  }

  function startICTFullExam() {
    var picked = shuffleAndPick(
      ictFullExamQuestions,
      Math.min(25, ictFullExamQuestions.length)
    );
    setAnswers({});
    setChecked(false);
    setIctFullExamQuestionsPicked(picked);
    setIctFullExamTimeLeft(1500);
    setIctFullExamCurrentIndex(0);
    setIctFullExamStage("running");
  }

  function submitICTFullExam() {
    if (ictFullExamStage !== "running") return;
    var score = getICTFullExamScore();
    var total = ictFullExamQuestionsPicked.length;
    saveScoredPractice(getICTFullExamProgressInfo(), score, total);
    saveWrongAnswers(getICTFullExamWrongEntries());
    setChecked(true);
    setIctFullExamStage("done");
  }

  function getReadingTestProgressInfo() {
    return {
      id: "eng1-reading-full",
      title: "English 1st Reading Test",
    };
  }

  function getBlankScore(blanks, marksPerBlank) {
    var score = 0;
    blanks.forEach(function (blank) {
      if (normalizeAnswer(answers[blank.id] || "") === blank.answer) {
        score += marksPerBlank;
      }
    });
    return score;
  }

  function getReadingRearrangeOrder() {
    return (answers[rearrangingTask.answerId] || "")
      .split(",")
      .map(function (item) {
        return item.trim().toLowerCase();
      })
      .filter(Boolean);
  }

  function isReadingRearrangeCorrect() {
    return (
      getReadingRearrangeOrder().join(",") ===
      rearrangingTask.correctOrder.join(",")
    );
  }

  function getReadingScores() {
    var mcqScore = 0;
    passageMCQTask.mcqs.forEach(function (mcq) {
      if (answers[mcq.id] === mcq.correctAnswer) {
        mcqScore++;
      }
    });

    var flowScore = getBlankScore(flowChartTask.items, 1);
    var clozeWithScore = getBlankScore(clozeWithCluesTask.blanks, 1);
    var clozeWithoutScore = getBlankScore(clozeWithoutCluesTask.blanks, 2);
    var rearrangeScore = isReadingRearrangeCorrect() ? rearrangingTask.marks : 0;
    var autoScore =
      mcqScore + flowScore + clozeWithScore + clozeWithoutScore + rearrangeScore;

    return {
      mcq: mcqScore,
      flow: flowScore,
      clozeWith: clozeWithScore,
      clozeWithout: clozeWithoutScore,
      rearrange: rearrangeScore,
      auto: autoScore,
      autoTotal: 35,
      paperTotal: 60,
    };
  }

  function getReadingWrongEntries() {
    var entries = [];

    passageMCQTask.mcqs.forEach(function (mcq) {
      var selected = answers[mcq.id];
      if (selected !== mcq.correctAnswer) {
        entries.push({
          question: "Q1A: " + mcq.question,
          studentAnswer:
            selected === undefined ? "No answer" : mcq.options[selected],
          correctAnswer: mcq.options[mcq.correctAnswer],
          explanation: mcq.explanation,
        });
      }
    });

    flowChartTask.items.forEach(function (item) {
      var studentAnswer = answers[item.id] || "";
      if (normalizeAnswer(studentAnswer) !== item.answer) {
        entries.push({
          question: "Q2: " + item.before + " ___",
          studentAnswer: studentAnswer || "No answer",
          correctAnswer: item.answer,
          explanation: item.explanation,
        });
      }
    });

    clozeWithCluesTask.blanks.forEach(function (blank) {
      var studentAnswer = answers[blank.id] || "";
      if (normalizeAnswer(studentAnswer) !== blank.answer) {
        entries.push({
          question: "Q4 blank " + blank.number,
          studentAnswer: studentAnswer || "No answer",
          correctAnswer: blank.answer,
          explanation: blank.explanation,
        });
      }
    });

    clozeWithoutCluesTask.blanks.forEach(function (blank) {
      var studentAnswer = answers[blank.id] || "";
      if (normalizeAnswer(studentAnswer) !== blank.answer) {
        entries.push({
          question: "Q5 blank " + blank.number,
          studentAnswer: studentAnswer || "No answer",
          correctAnswer: blank.answer,
          explanation: blank.explanation,
        });
      }
    });

    if (!isReadingRearrangeCorrect()) {
      entries.push({
        question: "Q6: Rearranging Sentences",
        studentAnswer: answers[rearrangingTask.answerId] || "No answer",
        correctAnswer: rearrangingTask.correctOrder.join(", "),
        explanation: rearrangingTask.explanation,
      });
    }

    return addWrongAnswerInfo(getReadingTestProgressInfo(), entries);
  }

  function startReadingTest() {
    setAnswers({});
    setChecked(false);
    setReadingTestTimeLeft(3600);
    setReadingTestStage("running");
  }

  function submitReadingTest() {
    if (readingTestStage !== "running") return;
    var scores = getReadingScores();
    saveBoardSectionProgress({
      id: "eng1-reading-full",
      title: "English 1st Reading Test",
      score: scores.auto,
      total: scores.paperTotal,
      type: "eng1-reading-full",
      date: formatDateISO(new Date()),
    });
    saveWrongAnswers(getReadingWrongEntries());
    setChecked(true);
    setReadingTestStage("done");
  }

  function normalizeEng2FullAnswer(value) {
    return String(value || "")
      .trim()
      .replace(/[“”]/g, '"')
      .replace(/[‘’]/g, "'")
      .replace(/\s+/g, " ")
      .toLowerCase();
  }

  function getEng2FullAutoSections() {
    return [
      { key: "q1", data: eng2FullExamData.q1 },
      { key: "q2", data: eng2FullExamData.q2 },
      { key: "q3", data: eng2FullExamData.q3 },
      { key: "q4", data: eng2FullExamData.q4 },
      { key: "q6", data: eng2FullExamData.q6 },
      { key: "q7", data: eng2FullExamData.q7 },
      { key: "q8", data: eng2FullExamData.q8 },
      { key: "q9", data: eng2FullExamData.q9 },
    ];
  }

  function getEng2FullSectionScore(sectionData) {
    var score = 0;
    sectionData.items.forEach(function (item) {
      if (
        normalizeEng2FullAnswer(answers[item.id]) ===
        normalizeEng2FullAnswer(item.answer)
      ) {
        score++;
      }
    });
    return score;
  }

  function getEng2FullScores() {
    var sections = {};
    var autoScore = 0;

    getEng2FullAutoSections().forEach(function (sectionInfo) {
      var sectionScore = getEng2FullSectionScore(sectionInfo.data);
      sections[sectionInfo.key] = {
        score: sectionScore,
        total: sectionInfo.data.marks,
        title: sectionInfo.data.title,
      };
      autoScore += sectionScore;
    });

    sections.q5 = {
      score: null,
      total: eng2FullExamData.q5.marks,
      title: eng2FullExamData.q5.title,
      review: true,
    };
    sections.q10 = {
      score: null,
      total: eng2FullExamData.q10.marks,
      title: eng2FullExamData.q10.title,
      review: true,
    };
    sections.q11 = {
      score: null,
      total: eng2FullExamData.q11.marks,
      title: eng2FullExamData.q11.title,
      review: true,
    };
    sections.q12 = {
      score: null,
      total: eng2FullExamData.q12.marks,
      title: eng2FullExamData.q12.title,
      review: true,
    };

    return {
      sections: sections,
      autoScore: autoScore,
      autoTotal: eng2FullExamData.autoTotal,
      total: eng2FullExamData.totalMarks,
      manualTotal: eng2FullExamData.manualTotal,
    };
  }

  function getEng2FullWrongEntries() {
    var entries = [];

    getEng2FullAutoSections().forEach(function (sectionInfo) {
      sectionInfo.data.items.forEach(function (item, index) {
        var studentAnswer = answers[item.id] || "";
        var isCorrect =
          normalizeEng2FullAnswer(studentAnswer) ===
          normalizeEng2FullAnswer(item.answer);

        if (!isCorrect) {
          entries.push({
            question:
              sectionInfo.data.title +
              " - " +
              (index + 1) +
              ". " +
              (item.sentence || item.question),
            studentAnswer: studentAnswer || "No answer",
            correctAnswer: item.answer,
            explanation: item.explanation || "",
          });
        }
      });
    });

    return addWrongAnswerInfo(
      {
        id: "eng2-full",
        title: "English 2nd Paper Full Test",
      },
      entries
    );
  }

  function startEng2FullExam() {
    setAnswers({});
    setChecked(false);
    setEng2FullExamTimeLeft(5400);
    setEng2FullExamStage("running");
  }

  function submitEng2FullExam() {
    if (eng2FullExamStage !== "running") return;
    var scores = getEng2FullScores();
    saveBoardSectionProgress({
      id: "eng2-full",
      title: "English 2nd Paper Full Test",
      score: scores.autoScore,
      total: scores.total,
      type: "eng2-full",
      autoTotal: scores.autoTotal,
      manualTotal: scores.manualTotal,
      date: formatDateISO(new Date()),
    });
    saveWrongAnswers(getEng2FullWrongEntries());
    setChecked(true);
    setEng2FullExamStage("done");
  }

  function checkPractice(progressInfo, score, total, wrongEntries) {
    saveScoredPractice(progressInfo, score, total);
    saveWrongAnswers(wrongEntries || []);
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
        <BackButton
          onClick={() => {
            setTask(null);
            resetPractice();
          }}
        />

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
                  <AnswerFeedback
                    isCorrect={isCorrect}
                    answer={item.answer}
                    explanation={item.explanation}
                  />
                )}
              </div>
            );
          })}
        </div>

        {!checked ? (
          <CheckAnswersButton
            onClick={() =>
              checkPractice(
                progressInfo,
                score,
                items.length,
                getTextWrongEntries(progressInfo, items, function (item) {
                  return item.sentence;
                })
              )
            }
          />
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
        <BackButton
          onClick={() => {
            setTask(null);
            resetPractice();
          }}
        />

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
                  <AnswerFeedback
                    isCorrect={isCorrect}
                    answer={item.answer}
                    explanation={item.explanation}
                  />
                )}
              </div>
            );
          })}
        </div>

        {!checked ? (
          <button
            onClick={() =>
              checkPractice(
                progressInfo,
                score,
                items.length,
                getOptionWrongEntries(progressInfo, items)
              )
            }
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
          onClick={() =>
            checkPractice(
              progressInfo,
              score,
              items.length,
              getTextWrongEntries(progressInfo, items, function (item) {
                return item.wrong;
              })
            )
          }
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
                ictMcqItems.length,
                getICTMCQWrongEntries({
                  id: "ict-mcq",
                  title: "ICT Board Practice - MCQ Section",
                })
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
          Choose an available full test simulation.
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
                {mock.taskId && (
                  <button
                    onClick={() => openTask(mock.taskId)}
                    style={{
                      display: "block",
                      marginTop: 12,
                      width: "100%",
                      padding: "10px 14px",
                      border: "none",
                      borderRadius: 10,
                      background: "#6366f1",
                      color: "#fff",
                      fontWeight: 700,
                      fontFamily: "inherit",
                      cursor: "pointer",
                    }}
                  >
                    Start Test
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  function ReviewMistakesPage() {
    var wrongAnswers = loadWrongAnswers().wrongAnswers;
    var mistakeCount = wrongAnswers.length + reviewVersion * 0;

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

        <h2>Review Mistakes</h2>
        <p style={{ color: "#64748b", lineHeight: 1.6, marginBottom: 16 }}>
          Saved wrong answers from auto-graded Board Practice sections.
        </p>

        {mistakeCount === 0 ? (
          <div
            style={{
              padding: 16,
              border: "1px solid #e2e8f0",
              borderRadius: 12,
              background: "#f8fafc",
              color: "#64748b",
              lineHeight: 1.6,
            }}
          >
            No saved mistakes yet.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {wrongAnswers.map(function (item, index) {
              return (
                <div
                  key={item.sectionId + "-" + index}
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
                    {item.sectionTitle}
                  </p>
                  <p style={{ fontWeight: 700, lineHeight: 1.6, marginBottom: 8 }}>
                    {index + 1}. {item.question}
                  </p>
                  <p style={{ color: "#991b1b", lineHeight: 1.6, marginBottom: 4 }}>
                    Student answer: <strong>{item.studentAnswer}</strong>
                  </p>
                  <p style={{ color: "#166534", lineHeight: 1.6, marginBottom: 4 }}>
                    Correct answer: <strong>{item.correctAnswer}</strong>
                  </p>
                  <p style={{ color: "#334155", lineHeight: 1.7 }}>
                    {item.explanation}
                  </p>
                  <p style={{ color: "#94a3b8", fontSize: 12, marginTop: 8 }}>
                    {item.date}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {mistakeCount > 0 && (
          <button
            onClick={() => {
              clearWrongAnswers();
              setReviewVersion(reviewVersion + 1);
            }}
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
            Clear Mistakes
          </button>
        )}
      </div>
    );
  }

  function TimedMiniMockPage() {
    var score = getMiniMockScore();

    if (miniMockStage === "start") {
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

          <div
            style={{
              padding: 18,
              border: "1px solid #e2e8f0",
              borderRadius: 12,
              background: "#f8fafc",
              textAlign: "center",
            }}
          >
            <h2 style={{ marginBottom: 8 }}>Mini Mock Test</h2>
            <p style={{ color: "#64748b", lineHeight: 1.6, marginBottom: 16 }}>
              10 questions • 5 minutes
            </p>
            <button
              onClick={startMiniMock}
              style={{
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
              Start
            </button>
          </div>
        </div>
      );
    }

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

        <h2>Mini Mock Test</h2>
        <div
          style={{
            marginTop: 10,
            marginBottom: 16,
            padding: 14,
            borderRadius: 12,
            background: miniMockStage === "running" ? "#eef2ff" : "#f0fdf4",
            border:
              miniMockStage === "running"
                ? "1px solid #c7d2fe"
                : "1px solid #bbf7d0",
            color: miniMockStage === "running" ? "#3730a3" : "#166534",
            fontWeight: 800,
            textAlign: "center",
          }}
        >
          {miniMockStage === "running"
            ? "Time left: " + formatMiniMockTime(miniMockTimeLeft)
            : "Score: " + score + " / " + miniMockQuestions.length}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {miniMockQuestions.map(function (mcq, index) {
            var selected = answers[mcq.id];
            var isDone = miniMockStage === "done";
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
                  {mcq.subject} • {mcq.source}
                </p>
                <p style={{ fontWeight: 700, marginBottom: 10, lineHeight: 1.6 }}>
                  {index + 1}. {mcq.question}
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {mcq.options.map(function (option, optionIndex) {
                    var bg = "#f8fafc";
                    var border = "1px solid #e2e8f0";
                    var color = "#334155";

                    if (!isDone && selected === optionIndex) {
                      bg = "#eef2ff";
                      border = "2px solid #6366f1";
                      color = "#3730a3";
                    }

                    if (isDone) {
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
                          if (!isDone) updateAnswer(mcq.id, optionIndex);
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
                          cursor: isDone ? "default" : "pointer",
                          lineHeight: 1.5,
                        }}
                      >
                        {String.fromCharCode(65 + optionIndex)}. {option}
                      </button>
                    );
                  })}
                </div>

                {isDone && (
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
                    {selected === undefined && (
                      <p style={{ marginBottom: 4 }}>Student answer: No answer</p>
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

        {miniMockStage === "running" ? (
          <button
            onClick={submitMiniMock}
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
            onClick={() => {
              setAnswers({});
              setChecked(false);
              setMiniMockQuestions([]);
              setMiniMockTimeLeft(300);
              setMiniMockStage("start");
            }}
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

  function English1ReadingTestPage() {
    var scores = getReadingScores();
    var isDone = readingTestStage === "done";

    if (readingTestStage === "start") {
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

          <div
            style={{
              padding: 18,
              border: "1px solid #e2e8f0",
              borderRadius: 12,
              background: "#f8fafc",
              textAlign: "center",
            }}
          >
            <h2 style={{ marginBottom: 10 }}>English 1st Reading Test</h2>
            <p style={{ color: "#334155", fontWeight: 700, marginBottom: 4 }}>
              60 Marks
            </p>
            <p style={{ color: "#334155", fontWeight: 700, marginBottom: 16 }}>
              60 Minutes
            </p>
            <button
              onClick={startReadingTest}
              style={{
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
              Start Test
            </button>
          </div>
        </div>
      );
    }

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

        <h2>English 1st Reading Test</h2>
        <div
          style={{
            marginTop: 10,
            marginBottom: 16,
            padding: 14,
            borderRadius: 12,
            background: isDone ? "#f0fdf4" : "#eef2ff",
            border: isDone ? "1px solid #bbf7d0" : "1px solid #c7d2fe",
            color: isDone ? "#166534" : "#3730a3",
            fontWeight: 800,
            textAlign: "center",
          }}
        >
          {isDone
            ? "Auto-marked score: " + scores.auto + " / " + scores.paperTotal
            : "Time left: " + formatMiniMockTime(readingTestTimeLeft)}
        </div>

        {isDone && (
          <div
            style={{
              marginBottom: 16,
              padding: 16,
              border: "1px solid #c7d2fe",
              borderRadius: 12,
              background: "#eef2ff",
              color: "#334155",
              lineHeight: 1.7,
            }}
          >
            <h3 style={{ marginBottom: 8 }}>Section-wise score</h3>
            <p>Q1A MCQ: {scores.mcq}/5</p>
            <p>Q1B Broad Questions: Review Needed / 15</p>
            <p>Q2 Flow Chart: {scores.flow}/5</p>
            <p>Q3 Summary: Review Needed / 10</p>
            <p>Q4 Cloze with Clues: {scores.clozeWith}/5</p>
            <p>Q5 Cloze without Clues: {scores.clozeWithout}/10</p>
            <p>Q6 Rearrangement: {scores.rearrange}/10</p>
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ padding: 16, border: "1px solid #e2e8f0", borderRadius: 12, background: "#fff" }}>
            <h3 style={{ marginBottom: 8 }}>Q1 Passage</h3>
            <p style={{ color: "#334155", lineHeight: 1.7 }}>
              {passageMCQTask.passage}
            </p>
          </div>

          <div style={{ padding: 16, border: "1px solid #e2e8f0", borderRadius: 12, background: "#fff" }}>
            <h3 style={{ marginBottom: 10 }}>Q1A Passage MCQ - 5 marks</h3>
            {passageMCQTask.mcqs.map(function (mcq, index) {
              var selected = answers[mcq.id];
              var isCorrect = selected === mcq.correctAnswer;

              return (
                <div key={mcq.id} style={{ marginBottom: 14 }}>
                  <p style={{ fontWeight: 700, marginBottom: 8 }}>
                    {index + 1}. {mcq.question}
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {mcq.options.map(function (option, optionIndex) {
                      var bg = "#f8fafc";
                      var border = "1px solid #e2e8f0";
                      var color = "#334155";

                      if (!isDone && selected === optionIndex) {
                        bg = "#eef2ff";
                        border = "2px solid #6366f1";
                        color = "#3730a3";
                      }

                      if (isDone) {
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
                            if (!isDone) updateAnswer(mcq.id, optionIndex);
                          }}
                          style={{
                            textAlign: "left",
                            padding: "10px 12px",
                            borderRadius: 10,
                            background: bg,
                            border: border,
                            color: color,
                            fontFamily: "inherit",
                            cursor: isDone ? "default" : "pointer",
                          }}
                        >
                          {String.fromCharCode(65 + optionIndex)}. {option}
                        </button>
                      );
                    })}
                  </div>
                  {isDone && (
                    <div
                      style={{
                        marginTop: 8,
                        padding: 10,
                        borderRadius: 10,
                        background: isCorrect ? "#f0fdf4" : "#fef2f2",
                        border: isCorrect ? "1px solid #bbf7d0" : "1px solid #fecaca",
                        color: "#334155",
                        lineHeight: 1.6,
                      }}
                    >
                      <p style={{ fontWeight: 700 }}>{isCorrect ? "Correct" : "Incorrect"}</p>
                      <p>Correct answer: <strong>{mcq.options[mcq.correctAnswer]}</strong></p>
                      <p>{mcq.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div style={{ padding: 16, border: "1px solid #e2e8f0", borderRadius: 12, background: "#fff" }}>
            <h3 style={{ marginBottom: 10 }}>Q1B Broad Questions - 15 marks</h3>
            {passageBroadQuestionTask.questions.map(function (item, index) {
              return (
                <div key={item.id} style={{ marginBottom: 12 }}>
                  <p style={{ fontWeight: 700, marginBottom: 6 }}>
                    {index + 1}. {item.question} ({item.marks} marks)
                  </p>
                  <textarea
                    value={answers[item.id] || ""}
                    onChange={(e) => updateAnswer(item.id, e.target.value)}
                    disabled={isDone}
                    rows={3}
                    placeholder="Write your answer"
                    style={{
                      width: "100%",
                      padding: 12,
                      borderRadius: 10,
                      border: "1px solid #cbd5e1",
                      fontFamily: "inherit",
                      resize: "vertical",
                    }}
                  />
                  {isDone && (
                    <p style={{ marginTop: 6, color: "#92400e", fontWeight: 700 }}>
                      Review Needed
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <div style={{ padding: 16, border: "1px solid #e2e8f0", borderRadius: 12, background: "#fff" }}>
            <h3 style={{ marginBottom: 8 }}>Q2 Flow Chart - 5 marks</h3>
            <p style={{ color: "#475569", lineHeight: 1.6, marginBottom: 10 }}>
              {flowChartTask.instruction}
            </p>
            <p style={{ fontWeight: 700, marginBottom: 10 }}>{flowChartTask.start}</p>
            {flowChartTask.items.map(function (item) {
              var userAnswer = answers[item.id] || "";
              var isCorrect = normalizeAnswer(userAnswer) === item.answer;
              return (
                <div key={item.id} style={{ marginBottom: 12 }}>
                  <label style={{ display: "block", fontWeight: 700, marginBottom: 6 }}>
                    {item.number}. {item.before} ___
                  </label>
                  <input
                    value={userAnswer}
                    onChange={(e) => updateAnswer(item.id, e.target.value)}
                    disabled={isDone}
                    placeholder="Write answer"
                    style={{
                      width: "100%",
                      padding: 12,
                      borderRadius: 10,
                      border: "1px solid #cbd5e1",
                      fontFamily: "inherit",
                    }}
                  />
                  {isDone && (
                    <div
                      style={{
                        marginTop: 8,
                        padding: 10,
                        borderRadius: 10,
                        background: isCorrect ? "#f0fdf4" : "#fef2f2",
                        border: isCorrect ? "1px solid #bbf7d0" : "1px solid #fecaca",
                        color: "#334155",
                        lineHeight: 1.6,
                      }}
                    >
                      <p style={{ fontWeight: 700 }}>{isCorrect ? "Correct" : "Wrong"}</p>
                      <p>Correct answer: <strong>{item.answer}</strong></p>
                      <p>{item.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div style={{ padding: 16, border: "1px solid #e2e8f0", borderRadius: 12, background: "#fff" }}>
            <h3 style={{ marginBottom: 8 }}>Q3 Summary - 10 marks</h3>
            <p style={{ color: "#475569", lineHeight: 1.6, marginBottom: 10 }}>
              {summaryTasks[0].passage}
            </p>
            <textarea
              value={answers[summaryTasks[0].id] || ""}
              onChange={(e) => updateAnswer(summaryTasks[0].id, e.target.value)}
              disabled={isDone}
              rows={6}
              placeholder="Write your summary"
              style={{
                width: "100%",
                padding: 12,
                borderRadius: 10,
                border: "1px solid #cbd5e1",
                fontFamily: "inherit",
                resize: "vertical",
              }}
            />
            {isDone && (
              <p style={{ marginTop: 6, color: "#92400e", fontWeight: 700 }}>
                Review Needed
              </p>
            )}
          </div>

          <div style={{ padding: 16, border: "1px solid #e2e8f0", borderRadius: 12, background: "#fff" }}>
            <h3 style={{ marginBottom: 8 }}>Q4 Cloze with Clues - 5 marks</h3>
            <p style={{ color: "#475569", lineHeight: 1.6, marginBottom: 10 }}>
              {clozeWithCluesTask.text}
            </p>
            <p style={{ fontWeight: 700, marginBottom: 8 }}>Word box</p>
            <p style={{ color: "#475569", lineHeight: 1.6, marginBottom: 12 }}>
              {clozeWithCluesTask.wordBox.join(", ")}
            </p>
            {clozeWithCluesTask.blanks.map(function (blank) {
              var userAnswer = answers[blank.id] || "";
              var isCorrect = normalizeAnswer(userAnswer) === blank.answer;
              return (
                <div key={blank.id} style={{ marginBottom: 12 }}>
                  <label style={{ display: "block", fontWeight: 700, marginBottom: 6 }}>
                    Blank {blank.number}
                  </label>
                  <input
                    value={userAnswer}
                    onChange={(e) => updateAnswer(blank.id, e.target.value)}
                    disabled={isDone}
                    placeholder="Choose from word box"
                    style={{
                      width: "100%",
                      padding: 12,
                      borderRadius: 10,
                      border: "1px solid #cbd5e1",
                      fontFamily: "inherit",
                    }}
                  />
                  {isDone && (
                    <div
                      style={{
                        marginTop: 8,
                        padding: 10,
                        borderRadius: 10,
                        background: isCorrect ? "#f0fdf4" : "#fef2f2",
                        border: isCorrect ? "1px solid #bbf7d0" : "1px solid #fecaca",
                        color: "#334155",
                        lineHeight: 1.6,
                      }}
                    >
                      <p style={{ fontWeight: 700 }}>{isCorrect ? "Correct" : "Wrong"}</p>
                      <p>Correct answer: <strong>{blank.answer}</strong></p>
                      <p>{blank.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div style={{ padding: 16, border: "1px solid #e2e8f0", borderRadius: 12, background: "#fff" }}>
            <h3 style={{ marginBottom: 8 }}>Q5 Cloze without Clues - 10 marks</h3>
            <p style={{ color: "#475569", lineHeight: 1.6, marginBottom: 12 }}>
              {clozeWithoutCluesTask.text}
            </p>
            {clozeWithoutCluesTask.blanks.map(function (blank) {
              var userAnswer = answers[blank.id] || "";
              var isCorrect = normalizeAnswer(userAnswer) === blank.answer;
              return (
                <div key={blank.id} style={{ marginBottom: 12 }}>
                  <label style={{ display: "block", fontWeight: 700, marginBottom: 6 }}>
                    Blank {blank.number}
                  </label>
                  <input
                    value={userAnswer}
                    onChange={(e) => updateAnswer(blank.id, e.target.value)}
                    disabled={isDone}
                    placeholder="Write answer"
                    style={{
                      width: "100%",
                      padding: 12,
                      borderRadius: 10,
                      border: "1px solid #cbd5e1",
                      fontFamily: "inherit",
                    }}
                  />
                  {isDone && (
                    <div
                      style={{
                        marginTop: 8,
                        padding: 10,
                        borderRadius: 10,
                        background: isCorrect ? "#f0fdf4" : "#fef2f2",
                        border: isCorrect ? "1px solid #bbf7d0" : "1px solid #fecaca",
                        color: "#334155",
                        lineHeight: 1.6,
                      }}
                    >
                      <p style={{ fontWeight: 700 }}>{isCorrect ? "Correct" : "Wrong"}</p>
                      <p>Correct answer: <strong>{blank.answer}</strong></p>
                      <p>{blank.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div style={{ padding: 16, border: "1px solid #e2e8f0", borderRadius: 12, background: "#fff" }}>
            <h3 style={{ marginBottom: 8 }}>Q6 Rearrangement - 10 marks</h3>
            <p style={{ color: "#475569", lineHeight: 1.6, marginBottom: 10 }}>
              {rearrangingTask.instruction}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
              {rearrangingTask.sentences.map(function (sentence) {
                return (
                  <p key={sentence.label} style={{ color: "#334155", lineHeight: 1.5 }}>
                    <strong>{sentence.label}.</strong> {sentence.text}
                  </p>
                );
              })}
            </div>
            <input
              value={answers[rearrangingTask.answerId] || ""}
              onChange={(e) => updateAnswer(rearrangingTask.answerId, e.target.value)}
              disabled={isDone}
              placeholder="Example: c, a, b, d..."
              style={{
                width: "100%",
                padding: 12,
                borderRadius: 10,
                border: "1px solid #cbd5e1",
                fontFamily: "inherit",
              }}
            />
            {isDone && (
              <div
                style={{
                  marginTop: 8,
                  padding: 10,
                  borderRadius: 10,
                  background: isReadingRearrangeCorrect() ? "#f0fdf4" : "#fef2f2",
                  border: isReadingRearrangeCorrect()
                    ? "1px solid #bbf7d0"
                    : "1px solid #fecaca",
                  color: "#334155",
                  lineHeight: 1.6,
                }}
              >
                <p style={{ fontWeight: 700 }}>
                  {isReadingRearrangeCorrect() ? "Correct" : "Wrong"}
                </p>
                <p>Correct order: <strong>{rearrangingTask.correctOrder.join(", ")}</strong></p>
                <p>{rearrangingTask.explanation}</p>
              </div>
            )}
          </div>
        </div>

        {!isDone ? (
          <button
            onClick={submitReadingTest}
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
            onClick={() => {
              setAnswers({});
              setChecked(false);
              setReadingTestTimeLeft(3600);
              setReadingTestStage("start");
            }}
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

  function renderEng2FullResultBox(item, userAnswer, isCorrect) {
    return (
      <div
        style={{
          marginTop: 8,
          padding: 10,
          borderRadius: 10,
          background: isCorrect ? "#f0fdf4" : "#fef2f2",
          border: isCorrect ? "1px solid #bbf7d0" : "1px solid #fecaca",
          color: "#334155",
          lineHeight: 1.6,
        }}
      >
        <p style={{ fontWeight: 700 }}>{isCorrect ? "Correct" : "Wrong"}</p>
        <p>
          Your answer: <strong>{userAnswer || "No answer"}</strong>
        </p>
        <p>
          Correct answer: <strong>{item.answer}</strong>
        </p>
        <p>{item.explanation}</p>
      </div>
    );
  }

  function renderEng2FullTextSection(sectionData, isDone) {
    return (
      <div style={{ padding: 16, border: "1px solid #e2e8f0", borderRadius: 12, background: "#fff" }}>
        <h3 style={{ marginBottom: 8 }}>
          {sectionData.title} - {sectionData.marks} marks
        </h3>
        <p style={{ color: "#475569", lineHeight: 1.6, marginBottom: 12 }}>
          {sectionData.instruction}
        </p>
        {sectionData.items.map(function (item, index) {
          var userAnswer = answers[item.id] || "";
          var isCorrect =
            normalizeEng2FullAnswer(userAnswer) ===
            normalizeEng2FullAnswer(item.answer);

          return (
            <div key={item.id} style={{ marginBottom: 12 }}>
              <label style={{ display: "block", fontWeight: 700, marginBottom: 6 }}>
                {index + 1}. {item.sentence}
              </label>
              <input
                value={userAnswer}
                onChange={(e) => updateAnswer(item.id, e.target.value)}
                disabled={isDone}
                placeholder="Write answer"
                style={{
                  width: "100%",
                  padding: 12,
                  borderRadius: 10,
                  border: "1px solid #cbd5e1",
                  fontFamily: "inherit",
                }}
              />
              {isDone && renderEng2FullResultBox(item, userAnswer, isCorrect)}
            </div>
          );
        })}
      </div>
    );
  }

  function renderEng2FullSelectSection(sectionData, isDone) {
    return (
      <div style={{ padding: 16, border: "1px solid #e2e8f0", borderRadius: 12, background: "#fff" }}>
        <h3 style={{ marginBottom: 8 }}>
          {sectionData.title} - {sectionData.marks} marks
        </h3>
        <p style={{ color: "#475569", lineHeight: 1.6, marginBottom: 8 }}>
          {sectionData.instruction}
        </p>
        <p style={{ color: "#334155", fontWeight: 700, marginBottom: 12 }}>
          Word box: {sectionData.wordBox.join(", ")}
        </p>
        {sectionData.items.map(function (item, index) {
          var userAnswer = answers[item.id] || "";
          var isCorrect =
            normalizeEng2FullAnswer(userAnswer) ===
            normalizeEng2FullAnswer(item.answer);

          return (
            <div key={item.id} style={{ marginBottom: 12 }}>
              <label style={{ display: "block", fontWeight: 700, marginBottom: 6 }}>
                {index + 1}. {item.sentence}
              </label>
              <select
                value={userAnswer}
                onChange={(e) => updateAnswer(item.id, e.target.value)}
                disabled={isDone}
                style={{
                  width: "100%",
                  padding: 12,
                  borderRadius: 10,
                  border: "1px solid #cbd5e1",
                  background: "#fff",
                  fontFamily: "inherit",
                }}
              >
                <option value="">Choose answer</option>
                {sectionData.wordBox.map(function (option) {
                  return (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  );
                })}
              </select>
              {isDone && renderEng2FullResultBox(item, userAnswer, isCorrect)}
            </div>
          );
        })}
      </div>
    );
  }

  function renderEng2FullOptionSection(sectionData, isDone) {
    return (
      <div style={{ padding: 16, border: "1px solid #e2e8f0", borderRadius: 12, background: "#fff" }}>
        <h3 style={{ marginBottom: 8 }}>
          {sectionData.title} - {sectionData.marks} marks
        </h3>
        <p style={{ color: "#475569", lineHeight: 1.6, marginBottom: 12 }}>
          {sectionData.instruction}
        </p>
        {sectionData.items.map(function (item, index) {
          var userAnswer = answers[item.id] || "";
          var isCorrect =
            normalizeEng2FullAnswer(userAnswer) ===
            normalizeEng2FullAnswer(item.answer);

          return (
            <div key={item.id} style={{ marginBottom: 14 }}>
              <p style={{ fontWeight: 700, marginBottom: 8 }}>
                {index + 1}. {item.question}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {item.options.map(function (option, optionIndex) {
                  var bg = "#f8fafc";
                  var border = "1px solid #e2e8f0";
                  var color = "#334155";

                  if (!isDone && userAnswer === option) {
                    bg = "#eef2ff";
                    border = "2px solid #6366f1";
                    color = "#3730a3";
                  }

                  if (isDone) {
                    if (option === item.answer) {
                      bg = "#dcfce7";
                      border = "2px solid #22c55e";
                      color = "#166534";
                    } else if (option === userAnswer) {
                      bg = "#fee2e2";
                      border = "2px solid #ef4444";
                      color = "#991b1b";
                    }
                  }

                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        if (!isDone) updateAnswer(item.id, option);
                      }}
                      style={{
                        textAlign: "left",
                        padding: "10px 12px",
                        borderRadius: 10,
                        background: bg,
                        border: border,
                        color: color,
                        fontFamily: "inherit",
                        cursor: isDone ? "default" : "pointer",
                      }}
                    >
                      {String.fromCharCode(65 + optionIndex)}. {option}
                    </button>
                  );
                })}
              </div>
              {isDone && renderEng2FullResultBox(item, userAnswer, isCorrect)}
            </div>
          );
        })}
      </div>
    );
  }

  function English2FullExamPage() {
    var isDone = eng2FullExamStage === "done";
    var scores = getEng2FullScores();
    var sectionOrder = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9", "q10", "q11", "q12"];

    if (eng2FullExamStage === "start") {
      return (
        <div style={{ padding: "10px 0" }}>
          <button
            style={backButtonStyle}
            onClick={() => {
              setTask(null);
              resetPractice();
            }}
          >
            {"<- Back"}
          </button>

          <div
            style={{
              padding: 18,
              border: "1px solid #e2e8f0",
              borderRadius: 12,
              background: "#f8fafc",
              textAlign: "center",
            }}
          >
            <h2 style={{ marginBottom: 10 }}>English 2nd Paper Full Test</h2>
            <p style={{ color: "#334155", fontWeight: 700, marginBottom: 4 }}>
              100 Marks
            </p>
            <p style={{ color: "#334155", fontWeight: 700, marginBottom: 16 }}>
              90 Minutes
            </p>
            <button
              onClick={startEng2FullExam}
              style={{
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
              Start Test
            </button>
          </div>
        </div>
      );
    }

    return (
      <div style={{ padding: "10px 0" }}>
        <button
          style={backButtonStyle}
          onClick={() => {
            setTask(null);
            resetPractice();
          }}
        >
          {"<- Back"}
        </button>

        <h2>English 2nd Paper Full Test</h2>
        <div
          style={{
            marginTop: 10,
            marginBottom: 16,
            padding: 14,
            borderRadius: 12,
            background: isDone ? "#f0fdf4" : "#eef2ff",
            border: isDone ? "1px solid #bbf7d0" : "1px solid #c7d2fe",
            color: isDone ? "#166534" : "#3730a3",
            fontWeight: 800,
            textAlign: "center",
          }}
        >
          {isDone
            ? "Total score: " +
              scores.autoScore +
              " / " +
              scores.total +
              " (" +
              scores.manualTotal +
              " marks review pending)"
            : "Time left: " + formatMiniMockTime(eng2FullExamTimeLeft)}
        </div>

        {isDone && (
          <div
            style={{
              marginBottom: 16,
              padding: 16,
              border: "1px solid #c7d2fe",
              borderRadius: 12,
              background: "#eef2ff",
              color: "#334155",
              lineHeight: 1.7,
            }}
          >
            <h3 style={{ marginBottom: 8 }}>Result</h3>
            <p>
              Auto-graded grammar score: {scores.autoScore}/{scores.autoTotal}
            </p>
            <p>Manual review marks: {scores.manualTotal}</p>
            <p style={{ color: "#475569" }}>
              Q5 and Part B need teacher or self review before final marks are complete.
            </p>
            <h3 style={{ marginTop: 12, marginBottom: 8 }}>Section-wise score</h3>
            {sectionOrder.map(function (key) {
              var item = scores.sections[key];
              return (
                <p key={key}>
                  {item.title}:{" "}
                  {item.review ? "Review Needed" : item.score + "/" + item.total}
                  {item.review ? " / " + item.total : ""}
                </p>
              );
            })}
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <h3>Part A - Grammar: 60 marks</h3>
          {renderEng2FullTextSection(eng2FullExamData.q1, isDone)}
          {renderEng2FullSelectSection(eng2FullExamData.q2, isDone)}
          {renderEng2FullTextSection(eng2FullExamData.q3, isDone)}
          {renderEng2FullTextSection(eng2FullExamData.q4, isDone)}

          <div style={{ padding: 16, border: "1px solid #e2e8f0", borderRadius: 12, background: "#fff" }}>
            <h3 style={{ marginBottom: 8 }}>
              {eng2FullExamData.q5.title} - {eng2FullExamData.q5.marks} marks
            </h3>
            <p style={{ color: "#475569", lineHeight: 1.6, marginBottom: 10 }}>
              {eng2FullExamData.q5.instruction}
            </p>
            <p style={{ padding: 12, background: "#f8fafc", borderRadius: 10, color: "#334155", lineHeight: 1.6, marginBottom: 10 }}>
              {eng2FullExamData.q5.direct}
            </p>
            <textarea
              value={answers["eng2full-q5"] || ""}
              onChange={(e) => updateAnswer("eng2full-q5", e.target.value)}
              disabled={isDone}
              rows={5}
              placeholder="Write indirect speech"
              style={{
                width: "100%",
                padding: 12,
                borderRadius: 10,
                border: "1px solid #cbd5e1",
                fontFamily: "inherit",
                resize: "vertical",
              }}
            />
            {isDone && (
              <div style={{ marginTop: 10, padding: 12, borderRadius: 10, background: "#fffbeb", border: "1px solid #fde68a", color: "#334155", lineHeight: 1.6 }}>
                <p style={{ fontWeight: 700 }}>Review Needed</p>
                <p>Model answer: <strong>{eng2FullExamData.q5.answer}</strong></p>
                <p>{eng2FullExamData.q5.explanation}</p>
              </div>
            )}
          </div>

          {renderEng2FullTextSection(eng2FullExamData.q6, isDone)}
          {renderEng2FullSelectSection(eng2FullExamData.q7, isDone)}
          {renderEng2FullOptionSection(eng2FullExamData.q8, isDone)}
          {renderEng2FullTextSection(eng2FullExamData.q9, isDone)}

          <h3>Part B - Composition: 40 marks</h3>
          {[eng2FullExamData.q10, eng2FullExamData.q11, eng2FullExamData.q12].map(function (item) {
            return (
              <div key={item.id} style={{ padding: 16, border: "1px solid #e2e8f0", borderRadius: 12, background: "#fff" }}>
                <h3 style={{ marginBottom: 8 }}>
                  {item.title} - {item.marks} marks
                </h3>
                <p style={{ color: "#334155", fontWeight: 700, lineHeight: 1.6, marginBottom: 10 }}>
                  {item.question}
                </p>
                <textarea
                  value={answers[item.id] || ""}
                  onChange={(e) => updateAnswer(item.id, e.target.value)}
                  disabled={isDone}
                  rows={7}
                  placeholder="Write your answer"
                  style={{
                    width: "100%",
                    padding: 12,
                    borderRadius: 10,
                    border: "1px solid #cbd5e1",
                    fontFamily: "inherit",
                    resize: "vertical",
                  }}
                />
                {isDone && (
                  <div style={{ marginTop: 10, padding: 12, borderRadius: 10, background: "#fffbeb", border: "1px solid #fde68a", color: "#334155", lineHeight: 1.6 }}>
                    <p style={{ fontWeight: 700 }}>Review Needed</p>
                    <p style={{ fontWeight: 700, marginTop: 6 }}>Key points</p>
                    <p>{item.keyPoints.join(", ")}</p>
                    <p style={{ fontWeight: 700, marginTop: 6 }}>Model answer</p>
                    <p style={{ whiteSpace: "pre-wrap" }}>{item.modelAnswer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {!isDone ? (
          <button
            onClick={submitEng2FullExam}
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
            onClick={() => {
              setAnswers({});
              setChecked(false);
              setEng2FullExamTimeLeft(5400);
              setEng2FullExamStage("start");
            }}
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

  function ICTFullMCQExamPage() {
    var score = getICTFullExamScore();
    var total = ictFullExamQuestionsPicked.length;
    var percentage = total > 0 ? Math.round((score / total) * 100) : 0;
    var currentQuestion = ictFullExamQuestionsPicked[ictFullExamCurrentIndex];

    if (ictFullExamStage === "start") {
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

          <div
            style={{
              padding: 18,
              border: "1px solid #e2e8f0",
              borderRadius: 12,
              background: "#f8fafc",
              textAlign: "center",
            }}
          >
            <h2 style={{ marginBottom: 10 }}>ICT Full MCQ Exam</h2>
            <p style={{ color: "#334155", fontWeight: 700, marginBottom: 4 }}>
              25 Questions
            </p>
            <p style={{ color: "#334155", fontWeight: 700, marginBottom: 10 }}>
              25 Minutes
            </p>
            <p style={{ color: "#64748b", lineHeight: 1.6, marginBottom: 16 }}>
              Phase 1 sample set: {ictFullExamQuestions.length} questions. The exam engine is ready for 25.
            </p>
            <button
              onClick={startICTFullExam}
              style={{
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
              Start Exam
            </button>
          </div>
        </div>
      );
    }

    if (ictFullExamStage === "done") {
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

          <h2>ICT Full MCQ Exam</h2>
          <div
            style={{
              marginTop: 12,
              marginBottom: 16,
              padding: 16,
              borderRadius: 12,
              background: "#eef2ff",
              border: "1px solid #c7d2fe",
              textAlign: "center",
              color: "#334155",
            }}
          >
            <p style={{ fontSize: 13, fontWeight: 700, color: "#6366f1" }}>
              Score
            </p>
            <p style={{ fontSize: 30, fontWeight: 800, margin: "4px 0" }}>
              {score}/{total}
            </p>
            <p style={{ fontWeight: 700 }}>{percentage}%</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {ictFullExamQuestionsPicked.map(function (mcq, index) {
              var selected = answers[mcq.id];
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
                      fontWeight: 700,
                      lineHeight: 1.6,
                      marginBottom: 10,
                    }}
                  >
                    Q{index + 1}. {mcq.question}
                  </p>
                  <p
                    style={{
                      color: isCorrect ? "#166534" : "#991b1b",
                      fontWeight: 700,
                      marginBottom: 6,
                    }}
                  >
                    {isCorrect ? "Correct" : "Incorrect"}
                  </p>
                  <p style={{ color: "#475569", lineHeight: 1.6, marginBottom: 4 }}>
                    Your answer:{" "}
                    <strong>
                      {selected === undefined
                        ? "No answer"
                        : mcq.options[selected]}
                    </strong>
                  </p>
                  <p style={{ color: "#166534", lineHeight: 1.6, marginBottom: 4 }}>
                    Correct answer:{" "}
                    <strong>{mcq.options[mcq.correctAnswer]}</strong>
                  </p>
                  <p style={{ color: "#334155", lineHeight: 1.7 }}>
                    {mcq.explanation}
                  </p>
                </div>
              );
            })}
          </div>

          <button
            onClick={() => {
              setAnswers({});
              setChecked(false);
              setIctFullExamQuestionsPicked([]);
              setIctFullExamTimeLeft(1500);
              setIctFullExamCurrentIndex(0);
              setIctFullExamStage("start");
            }}
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
        </div>
      );
    }

    if (!currentQuestion) {
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
          <p style={{ color: "#64748b" }}>No questions loaded.</p>
        </div>
      );
    }

    var selected = answers[currentQuestion.id];

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

        <h2>ICT Full MCQ Exam</h2>
        <div
          style={{
            marginTop: 10,
            marginBottom: 14,
            padding: 14,
            borderRadius: 12,
            background: "#eef2ff",
            border: "1px solid #c7d2fe",
            color: "#3730a3",
            fontWeight: 800,
            textAlign: "center",
          }}
        >
          Time left: {formatMiniMockTime(ictFullExamTimeLeft)}
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
            marginBottom: 14,
          }}
        >
          {ictFullExamQuestionsPicked.map(function (mcq, index) {
            var isCurrent = index === ictFullExamCurrentIndex;
            var isAnswered = answers[mcq.id] !== undefined;
            return (
              <button
                key={mcq.id}
                onClick={() => setIctFullExamCurrentIndex(index)}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 999,
                  border: isCurrent
                    ? "2px solid #6366f1"
                    : "1px solid #cbd5e1",
                  background: isAnswered ? "#dcfce7" : "#fff",
                  color: isCurrent ? "#3730a3" : "#334155",
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                {index + 1}
              </button>
            );
          })}
        </div>

        <div
          style={{
            padding: 16,
            border: "1px solid #e2e8f0",
            borderRadius: 12,
            background: "#fff",
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
            Q{ictFullExamCurrentIndex + 1} of {total}
          </p>
          <p style={{ fontWeight: 700, marginBottom: 12, lineHeight: 1.7 }}>
            {currentQuestion.question}
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {currentQuestion.options.map(function (option, optionIndex) {
              var isSelected = selected === optionIndex;
              return (
                <button
                  key={option}
                  onClick={() => updateAnswer(currentQuestion.id, optionIndex)}
                  style={{
                    textAlign: "left",
                    padding: "12px 14px",
                    borderRadius: 10,
                    background: isSelected ? "#eef2ff" : "#f8fafc",
                    border: isSelected
                      ? "2px solid #6366f1"
                      : "1px solid #e2e8f0",
                    color: isSelected ? "#3730a3" : "#334155",
                    fontSize: 14,
                    fontFamily: "inherit",
                    fontWeight: 500,
                    cursor: "pointer",
                    lineHeight: 1.5,
                  }}
                >
                  {String.fromCharCode(65 + optionIndex)}. {option}
                </button>
              );
            })}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 8,
            marginTop: 14,
          }}
        >
          <button
            onClick={() =>
              setIctFullExamCurrentIndex(
                Math.max(0, ictFullExamCurrentIndex - 1)
              )
            }
            disabled={ictFullExamCurrentIndex === 0}
            style={{
              flex: 1,
              padding: "12px",
              border: "1px solid #e2e8f0",
              borderRadius: 12,
              background: "#fff",
              color: "#6366f1",
              fontWeight: 700,
              fontFamily: "inherit",
              cursor: ictFullExamCurrentIndex === 0 ? "default" : "pointer",
              opacity: ictFullExamCurrentIndex === 0 ? 0.5 : 1,
            }}
          >
            Previous
          </button>
          <button
            onClick={() =>
              setIctFullExamCurrentIndex(
                Math.min(total - 1, ictFullExamCurrentIndex + 1)
              )
            }
            disabled={ictFullExamCurrentIndex === total - 1}
            style={{
              flex: 1,
              padding: "12px",
              border: "1px solid #e2e8f0",
              borderRadius: 12,
              background: "#fff",
              color: "#6366f1",
              fontWeight: 700,
              fontFamily: "inherit",
              cursor:
                ictFullExamCurrentIndex === total - 1 ? "default" : "pointer",
              opacity: ictFullExamCurrentIndex === total - 1 ? 0.5 : 1,
            }}
          >
            Next
          </button>
        </div>

        <button
          onClick={submitICTFullExam}
          style={{
            marginTop: 12,
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
          Submit Exam
        </button>
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
          onClick={() =>
            checkPractice(
              progressInfo,
              score,
              items.length,
              getTextWrongEntries(progressInfo, items, function (item) {
                return item.sentence;
              })
            )
          }
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

if (task === "ictFullMCQExam") {
  return <ICTFullMCQExamPage />;
}

if (task === "ictCreative") {
  return <ICTCreativePractice />;
}

if (task === "eng2FullExam") {
  return <English2FullExamPage />;
}

if (task === "fullMock") {
  return <FullMockTestPage />;
}

if (task === "reviewMistakes") {
  return <ReviewMistakesPage />;
}

if (task === "timedMiniMock") {
  return <TimedMiniMockPage />;
}

if (task === "eng1ReadingFull") {
  return <English1ReadingTestPage />;
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
            onClick={() => openTask("ictFullMCQExam")}
          >
            <h3>ICT Full MCQ Exam</h3>
            <p>25 questions × 1 = 25 marks | 25 minutes</p>
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

        <button
          style={{ ...cardStyle, marginTop: 16, marginBottom: 10, width: "100%" }}
          onClick={() => openTask("eng1ReadingFull")}
        >
          English 1st Reading Test Simulation - 60 marks
        </button>

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

        <button
          style={{ ...cardStyle, marginTop: 16, marginBottom: 10, width: "100%" }}
          onClick={() => openTask("eng2FullExam")}
        >
          <h3>English 2nd Paper Full Test</h3>
          <p>100 marks | 90 minutes</p>
        </button>

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
          <p>Available full test simulations</p>
        </button>

        <button style={cardStyle} onClick={() => openTask("timedMiniMock")}>
          <h3>Mini Mock Test</h3>
          <p>10 questions • 5 minutes</p>
        </button>

        <button style={cardStyle} onClick={() => openTask("reviewMistakes")}>
          <h3>Review Mistakes</h3>
          <p>{loadWrongAnswers().wrongAnswers.length} saved wrong answers</p>
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
