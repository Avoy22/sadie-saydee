import { ictTopics } from '../data/ictTopics.js';
import { englishData } from '../data/englishData.js';

export function findICTTopicByMCQId(mcqId) {
  for (let i = 0; i < ictTopics.length; i++) {
    const topic = ictTopics[i];
    if (topic.mcqs) {
      for (let j = 0; j < topic.mcqs.length; j++) {
        if (topic.mcqs[j].id === mcqId) {
          return { topic: topic };
        }
      }
    }
  }
  return null;
}

export function findEnglishTopicByMCQId(mcqId) {
  const paperKeys = Object.keys(englishData);
  for (let i = 0; i < paperKeys.length; i++) {
    const paperKey = paperKeys[i];
    const paper = englishData[paperKey];
    for (let j = 0; j < paper.topics.length; j++) {
      const topic = paper.topics[j];
      if (topic.mcqs) {
        for (let k = 0; k < topic.mcqs.length; k++) {
          if (topic.mcqs[k].id === mcqId) {
            return { paperKey: paperKey, topic: topic };
          }
        }
      }
    }
  }
  return null;
}

export function collectAllMCQs() {
  const all = [];
  ictTopics.forEach((topic) => {
    if (topic.mcqs && topic.mcqs.length > 0) {
      topic.mcqs.forEach((mcq) => {
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
  Object.keys(englishData).forEach((paperKey) => {
    const paper = englishData[paperKey];
    paper.topics.forEach((topic) => {
      if (topic.mcqs && topic.mcqs.length > 0) {
        topic.mcqs.forEach((mcq) => {
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

export function shuffleAndPick(arr, n) {
  const copy = arr.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = copy[i];
    copy[i] = copy[j];
    copy[j] = tmp;
  }
  return copy.slice(0, n);
}
