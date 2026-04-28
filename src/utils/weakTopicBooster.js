import { collectAllMCQs } from "./mcq.js";
import { loadProgress, loadWrongAnswers } from "./storage.js";

const BOARD_SECTION_TOPIC_MAP = {
  "ict-mcq": { subjectKey: "ict", topicId: "board-mcq-2023" },
  "ict-full-mcq": { subjectKey: "ict", topicId: "board-mcq-2023" },
  "english1-summary": {
    subjectKey: "english",
    paperKey: "1st",
    topicId: "e1-1",
  },
  "english1-story-completion": {
    subjectKey: "english",
    paperKey: "2nd",
    topicId: "e2-3",
  },
  "english2-application": {
    subjectKey: "english",
    paperKey: "2nd",
    topicId: "e2-3",
  },
  "english2-paragraph": {
    subjectKey: "english",
    paperKey: "2nd",
    topicId: "e2-3",
  },
  "english2-right-form": {
    subjectKey: "english",
    paperKey: "2nd",
    topicId: "e2-2",
  },
  "english2-synonym-antonym": {
    subjectKey: "english",
    paperKey: "1st",
    topicId: "e1-2",
  },
  "english2-words-phrases": {
    subjectKey: "english",
    paperKey: "1st",
    topicId: "e1-2",
  },
  "english2-prepositions": {
    subjectKey: "english",
    paperKey: "2nd",
    topicId: "e2-1",
  },
  "english2-connectors": {
    subjectKey: "english",
    paperKey: "2nd",
    topicId: "e2-1",
  },
  "english2-modifiers": {
    subjectKey: "english",
    paperKey: "2nd",
    topicId: "e2-1",
  },
  "english2-punctuation": {
    subjectKey: "english",
    paperKey: "2nd",
    topicId: "e2-1",
  },
};

export function getWeakTopicKey(topic) {
  return [
    topic.subjectKey || "",
    topic.paperKey || "",
    String(topic.topicId),
  ].join(":");
}

function buildTopicIndex(allMCQs) {
  var topicByKey = {};

  allMCQs.forEach(function (mcq) {
    var key = getWeakTopicKey(mcq);
    if (!topicByKey[key]) {
      topicByKey[key] = {
        subjectKey: mcq.subjectKey,
        paperKey: mcq.paperKey,
        topicId: mcq.topicId,
        source: mcq.source,
        subject: mcq.subject,
      };
    }
  });

  return topicByKey;
}

function findTopic(topicByKey, topicRef) {
  if (!topicRef || !topicRef.subjectKey || topicRef.topicId === undefined) {
    return null;
  }

  var direct = topicByKey[getWeakTopicKey(topicRef)];
  if (direct) return direct;

  var keys = Object.keys(topicByKey);
  for (var i = 0; i < keys.length; i++) {
    var topic = topicByKey[keys[i]];
    var sameSubject = topic.subjectKey === topicRef.subjectKey;
    var sameTopic = String(topic.topicId) === String(topicRef.topicId);
    var samePaper = !topicRef.paperKey || topic.paperKey === topicRef.paperKey;
    if (sameSubject && sameTopic && samePaper) return topic;
  }

  return null;
}

function resolveTextTopic(text) {
  if (text.indexOf("ict") !== -1) {
    return { subjectKey: "ict", topicId: "board-mcq-2023" };
  }

  if (
    text.indexOf("right form") !== -1 ||
    text.indexOf("verb") !== -1
  ) {
    return { subjectKey: "english", paperKey: "2nd", topicId: "e2-2" };
  }

  if (
    text.indexOf("synonym") !== -1 ||
    text.indexOf("antonym") !== -1 ||
    text.indexOf("word") !== -1 ||
    text.indexOf("vocab") !== -1 ||
    text.indexOf("cloze") !== -1
  ) {
    return { subjectKey: "english", paperKey: "1st", topicId: "e1-2" };
  }

  if (
    text.indexOf("paragraph") !== -1 ||
    text.indexOf("application") !== -1 ||
    text.indexOf("email") !== -1 ||
    text.indexOf("letter") !== -1 ||
    text.indexOf("composition") !== -1 ||
    text.indexOf("story") !== -1 ||
    text.indexOf("graph") !== -1
  ) {
    return { subjectKey: "english", paperKey: "2nd", topicId: "e2-3" };
  }

  if (
    text.indexOf("reading") !== -1 ||
    text.indexOf("summary") !== -1 ||
    text.indexOf("passage") !== -1 ||
    text.indexOf("flow") !== -1 ||
    text.indexOf("rearranging") !== -1
  ) {
    return { subjectKey: "english", paperKey: "1st", topicId: "e1-1" };
  }

  if (
    text.indexOf("preposition") !== -1 ||
    text.indexOf("modifier") !== -1 ||
    text.indexOf("narration") !== -1 ||
    text.indexOf("connector") !== -1 ||
    text.indexOf("punctuation") !== -1 ||
    text.indexOf("sentence") !== -1
  ) {
    return { subjectKey: "english", paperKey: "2nd", topicId: "e2-1" };
  }

  return null;
}

function resolveBoardMistakeTopic(entry, topicByKey) {
  var savedTopic = findTopic(topicByKey, entry);
  if (savedTopic) return savedTopic;

  var mappedTopic = findTopic(
    topicByKey,
    BOARD_SECTION_TOPIC_MAP[entry.sectionId]
  );
  if (mappedTopic) return mappedTopic;

  var text = ((entry.sectionId || "") + " " + (entry.sectionTitle || ""))
    .toLowerCase();
  return findTopic(topicByKey, resolveTextTopic(text));
}

function addWeakTopic(weakMap, topic, count) {
  if (!topic) return;

  var key = getWeakTopicKey(topic);
  if (!weakMap[key]) {
    weakMap[key] = {
      subjectKey: topic.subjectKey,
      paperKey: topic.paperKey,
      topicId: topic.topicId,
      source: topic.source || "Unknown topic",
      subject: topic.subject || "Study",
      count: 0,
    };
  }

  weakMap[key].count += count;
}

export function getWeakTopicBoosterData() {
  var allMCQs = collectAllMCQs();
  var topicByKey = buildTopicIndex(allMCQs);
  var weakMap = {};
  var progress = loadProgress();
  var wrongAnswers = loadWrongAnswers().wrongAnswers;

  if (progress && Array.isArray(progress.weakTopics)) {
    progress.weakTopics.forEach(function (topic) {
      var matchedTopic = findTopic(topicByKey, topic);
      addWeakTopic(weakMap, matchedTopic || topic, topic.count || 1);
    });
  }

  wrongAnswers.forEach(function (entry) {
    addWeakTopic(weakMap, resolveBoardMistakeTopic(entry, topicByKey), 1);
  });

  var weakTopics = Object.keys(weakMap)
    .map(function (key) {
      return weakMap[key];
    })
    .sort(function (a, b) {
      if (b.count !== a.count) return b.count - a.count;
      return (a.source || "").localeCompare(b.source || "");
    });
  var topTopics = weakTopics.slice(0, 2);
  var topTopicKeys = {};

  topTopics.forEach(function (topic) {
    topTopicKeys[getWeakTopicKey(topic)] = true;
  });

  var questionPool = allMCQs.filter(function (mcq) {
    return topTopicKeys[getWeakTopicKey(mcq)];
  });

  return {
    weakTopics: weakTopics,
    topTopics: topTopics,
    questionPool: questionPool,
  };
}
