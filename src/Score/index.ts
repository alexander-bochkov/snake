import {
  BEST_SCORE_CLASS,
  BEST_SCORE_KEY,
  BEST_SCORE_TEXT,
  INCREASE_NUMBER,
  SCORE_CLASS,
  SCORE_TEXT,
} from './constants';

export default class Score {
  private bestScore = 0;

  private score = 0;

  constructor() {
    this.init();
  }

  private init() {
    const bestScore = this.getBestScoreFromLocalStorage();

    if (bestScore !== null) {
      this.bestScore = bestScore;
    }

    this.draw();
  }

  private getBestScoreFromLocalStorage() {
    const bestScore = localStorage.getItem(BEST_SCORE_KEY);
    return bestScore ? parseInt(bestScore, 10) : null;
  }

  private setBestScoreToLocalStorage() {
    localStorage.setItem(BEST_SCORE_KEY, this.bestScore.toString());
  }

  private draw() {
    const bestScoreEl = document.getElementsByClassName(BEST_SCORE_CLASS)[0];
    const scoreEl = document.getElementsByClassName(SCORE_CLASS)[0];

    if (!bestScoreEl || !scoreEl) return;

    bestScoreEl.innerHTML = `${BEST_SCORE_TEXT} ${this.bestScore}`;
    scoreEl.innerHTML = `${SCORE_TEXT} ${this.score}`;
  }

  increase() {
    const nextScore = this.score + INCREASE_NUMBER;

    this.score += INCREASE_NUMBER;

    if (nextScore > this.bestScore) {
      this.bestScore = nextScore;
      this.setBestScoreToLocalStorage();
    }

    this.draw();
  }

  reset() {
    this.score = 0;
    this.draw();
  }
}
