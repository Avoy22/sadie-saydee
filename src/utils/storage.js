const PROGRESS_KEY = "study_progress";
const BOARD_PROGRESS_KEY = "board_practice_progress";
const WRONG_ANSWER_KEY = "board_wrong_answers";

export function saveProgress(data) {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(data));
  } catch (e) {
    // ignore
  }
}

export function loadProgress() {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

export function loadBoardProgress() {
  try {
    const raw = localStorage.getItem(BOARD_PROGRESS_KEY);
    if (!raw) return { completedSections: [] };
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.completedSections)) {
      return { completedSections: [] };
    }
    return parsed;
  } catch (e) {
    return { completedSections: [] };
  }
}

export function saveBoardSectionProgress(entry) {
  try {
    const progress = loadBoardProgress();
    const completedSections = progress.completedSections.filter((item) =>
      item.id !== entry.id
    );
    completedSections.push(entry);
    localStorage.setItem(
      BOARD_PROGRESS_KEY,
      JSON.stringify({ completedSections: completedSections })
    );
  } catch (e) {
    // ignore
  }
}

export function loadWrongAnswers() {
  try {
    const raw = localStorage.getItem(WRONG_ANSWER_KEY);
    if (!raw) return { wrongAnswers: [] };
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.wrongAnswers)) {
      return { wrongAnswers: [] };
    }
    return parsed;
  } catch (e) {
    return { wrongAnswers: [] };
  }
}

export function saveWrongAnswers(entries) {
  try {
    const progress = loadWrongAnswers();
    let next = progress.wrongAnswers.slice();
    entries.forEach((entry) => {
      next = next.filter((item) =>
        !(
          item.sectionId === entry.sectionId &&
          item.question === entry.question
        )
      );
      next.push(entry);
    });
    localStorage.setItem(
      WRONG_ANSWER_KEY,
      JSON.stringify({ wrongAnswers: next })
    );
  } catch (e) {
    // ignore
  }
}

export function clearWrongAnswers() {
  try {
    localStorage.setItem(WRONG_ANSWER_KEY, JSON.stringify({ wrongAnswers: [] }));
  } catch (e) {
    // ignore
  }
}
