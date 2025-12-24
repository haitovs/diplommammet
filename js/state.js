/**
 * GeoQuest - State Management
 */

const State = {
  // Current game state
  game: {
    mode: null,           // 'flags', 'capitals', 'facts', 'shapes', 'speed'
    difficulty: 'medium',
    currentRound: 0,
    totalRounds: 10,
    score: 0,
    streak: 0,
    bestStreak: 0,
    questions: [],
    currentQuestion: null,
    answers: [],          // Track all answers for results
    startTime: null,
    timeRemaining: null,  // For speed mode
    hintsUsed: 0,
    isPlaying: false
  },

  // UI State
  ui: {
    currentScreen: 'home',
    modalOpen: false,
    loading: false
  },

  /**
   * Reset game state for new game
   */
  resetGame() {
    this.game = {
      mode: null,
      difficulty: Storage.getSettings().difficulty,
      currentRound: 0,
      totalRounds: Storage.getSettings().questionCount,
      score: 0,
      streak: 0,
      bestStreak: 0,
      questions: [],
      currentQuestion: null,
      answers: [],
      startTime: null,
      timeRemaining: null,
      hintsUsed: 0,
      isPlaying: false
    };
  },

  /**
   * Start a new game
   */
  startGame(mode, options = {}) {
    this.resetGame();
    this.game.mode = mode;
    this.game.difficulty = options.difficulty || this.game.difficulty;
    this.game.totalRounds = options.rounds || this.game.totalRounds;
    this.game.startTime = Date.now();
    this.game.isPlaying = true;

    // Speed mode has timer
    if (mode === 'speed') {
      this.game.timeRemaining = 30;
      this.game.totalRounds = 999; // Unlimited until time runs out
    }
  },

  /**
   * Record an answer
   */
  recordAnswer(isCorrect, countryId) {
    this.game.answers.push({
      round: this.game.currentRound,
      countryId,
      isCorrect,
      timestamp: Date.now()
    });

    if (isCorrect) {
      this.game.streak++;
      if (this.game.streak > this.game.bestStreak) {
        this.game.bestStreak = this.game.streak;
      }
    } else {
      this.game.streak = 0;
    }
  },

  /**
   * Add score
   */
  addScore(points) {
    // Apply streak multiplier
    let multiplier = 1;
    if (this.game.streak >= 5) multiplier = 2;
    else if (this.game.streak >= 3) multiplier = 1.5;
    
    // Apply hint penalty
    const hintPenalty = this.game.hintsUsed * 10;
    const finalPoints = Math.max(0, Math.round((points - hintPenalty) * multiplier));
    
    this.game.score += finalPoints;
    return finalPoints;
  },

  /**
   * Get correct countries from this game
   */
  getCorrectCountries() {
    return this.game.answers
      .filter(a => a.isCorrect)
      .map(a => a.countryId);
  },

  /**
   * Get game stats for results
   */
  getGameResults() {
    const correct = this.game.answers.filter(a => a.isCorrect).length;
    const total = this.game.answers.length;
    const stars = Utils.calculateStars(correct, total);
    
    return {
      mode: this.game.mode,
      score: this.game.score,
      correct,
      total,
      accuracy: Utils.percentage(correct, total),
      bestStreak: this.game.bestStreak,
      stars,
      emoji: Utils.getResultEmoji(stars),
      title: Utils.getResultTitle(stars),
      countriesLearned: this.getCorrectCountries(),
      duration: Date.now() - this.game.startTime
    };
  },

  /**
   * Navigate to screen
   */
  setScreen(screenId) {
    this.ui.currentScreen = screenId;
  }
};

// Make available globally
window.State = State;
