/**
 * GeoQuest - Base Game Class
 * Common functionality for all game modes
 */

class BaseGame {
  constructor(mode) {
    this.mode = mode;
    this.questions = [];
    this.currentIndex = 0;
    this.answered = false;
  }

  /**
   * Initialize the game
   */
  init(options = {}) {
    const settings = Storage.getSettings();
    const difficulty = options.difficulty || settings.difficulty;
    const rounds = options.rounds || settings.questionCount;

    State.startGame(this.mode, { difficulty, rounds });
    this.generateQuestions(difficulty, rounds);
    this.currentIndex = 0;
    this.answered = false;

    this.showQuestion();
    this.updateUI();
  }

  /**
   * Generate questions - Override in subclass
   */
  generateQuestions(difficulty, count) {
    // Use API-loaded countries with fallback to local data
    const countryData = (typeof GAME_COUNTRIES !== 'undefined' && GAME_COUNTRIES.length > 0) 
      ? GAME_COUNTRIES 
      : COUNTRIES;
    
    let pool = [...countryData];
    
    if (difficulty && difficulty !== 'all') {
      pool = pool.filter(c => c.difficulty === difficulty);
    }

    // Shuffle and take required number
    this.questions = Utils.shuffle(pool).slice(0, count);
    State.game.questions = this.questions;
  }

  /**
   * Get current question
   */
  getCurrentQuestion() {
    return this.questions[this.currentIndex];
  }

  /**
   * Show question - Override in subclass
   */
  showQuestion() {
    const question = this.getCurrentQuestion();
    if (!question) {
      this.endGame();
      return;
    }

    State.game.currentQuestion = question;
    State.game.currentRound = this.currentIndex + 1;
    this.answered = false;
    
    this.renderQuestion(question);
    this.updateProgress();
  }

  /**
   * Render question UI - Override in subclass
   */
  renderQuestion(question) {
    // Override in subclass
  }

  /**
   * Generate wrong options for multiple choice
   */
  generateOptions(correctCountry, count = 4) {
    const countryData = (typeof GAME_COUNTRIES !== 'undefined' && GAME_COUNTRIES.length > 0) 
      ? GAME_COUNTRIES 
      : COUNTRIES;
    
    const options = [correctCountry];
    const others = countryData.filter(c => c.id !== correctCountry.id);
    const shuffled = Utils.shuffle(others);
    
    for (let i = 0; i < count - 1 && i < shuffled.length; i++) {
      options.push(shuffled[i]);
    }

    return Utils.shuffle(options);
  }

  /**
   * Handle answer selection
   */
  handleAnswer(selectedId, buttonEl = null) {
    if (this.answered) return;
    this.answered = true;

    const question = this.getCurrentQuestion();
    const isCorrect = selectedId === question.id;

    Utils.playSound(isCorrect ? 'correct' : 'wrong');
    State.recordAnswer(isCorrect, question.id);

    // Calculate points
    if (isCorrect) {
      const basePoints = { easy: 80, medium: 100, hard: 150 }[question.difficulty] || 100;
      const points = State.addScore(basePoints);
      this.showFeedback(true, question, points);
      Confetti.burst();
    } else {
      this.showFeedback(false, question);
    }

    // Update UI
    this.highlightAnswer(selectedId, question.id);
    this.updateScoreDisplay();

    // Next question after delay
    setTimeout(() => this.nextQuestion(), isCorrect ? 1500 : 2500);
  }

  /**
   * Show feedback message
   */
  showFeedback(isCorrect, question, points = 0) {
    const feedbackArea = document.getElementById('feedback-area');
    
    if (isCorrect) {
      feedbackArea.innerHTML = `
        <div class="feedback-message correct">
          <span class="feedback-icon">✅</span>
          <div>
            <span class="feedback-text">${t('feedback.correctPoints', { points })}</span>
          </div>
        </div>
      `;
    } else {
      const answer = `${question.flag} ${Utils.getCountryDisplayName(question)}`;
      feedbackArea.innerHTML = `
        <div class="feedback-message wrong">
          <span class="feedback-icon">❌</span>
          <div>
            <span class="feedback-text">${t('feedback.notQuite')}</span>
            <p class="correct-answer">${t('feedback.notQuiteAnswerWas', { answer })}</p>
          </div>
        </div>
      `;
    }
  }

  /**
   * Highlight correct/wrong answers
   */
  highlightAnswer(selectedId, correctId) {
    const buttons = document.querySelectorAll('.answer-option');
    buttons.forEach(btn => {
      btn.disabled = true;
      const btnId = btn.dataset.id;
      if (btnId === correctId) {
        btn.classList.add('correct');
      } else if (btnId === selectedId) {
        btn.classList.add('wrong');
      }
    });
  }

  /**
   * Move to next question
   */
  nextQuestion() {
    this.currentIndex++;
    document.getElementById('feedback-area').innerHTML = '';
    
    if (this.currentIndex >= this.questions.length) {
      this.endGame();
    } else {
      this.showQuestion();
    }
  }

  /**
   * Update progress bar
   */
  updateProgress() {
    const progress = (this.currentIndex / this.questions.length) * 100;
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }

    // Update round display
    const roundEl = document.getElementById('game-round');
    if (roundEl) {
      roundEl.textContent = t('game.round', {
        current: this.currentIndex + 1,
        total: this.questions.length
      });
    }
  }

  /**
   * Update general UI
   */
  updateUI() {
    const modeLabel = document.getElementById('game-mode-label');
    const modeNames = {
      flags: `🏳️ ${t('games.flagMaster')}`,
      capitals: `🏛️ ${t('games.capitalCities')}`,
      shapes: `🗺️ ${t('games.shapeShifter')}`,
      facts: `🔍 ${t('games.factDetective')}`,
      speed: `⚡ ${t('games.speedGeography')}`
    };
    if (modeLabel) {
      modeLabel.textContent = modeNames[this.mode] || this.mode;
    }
  }

  /**
   * Update score display
   */
  updateScoreDisplay() {
    const scoreEl = document.getElementById('current-score');
    const streakEl = document.getElementById('current-streak');
    
    if (scoreEl) {
      scoreEl.textContent = State.game.score;
      scoreEl.style.animation = 'scorePop 0.3s ease';
      setTimeout(() => scoreEl.style.animation = '', 300);
    }
    
    if (streakEl) {
      streakEl.textContent = State.game.streak;
      if (State.game.streak >= 3) {
        streakEl.style.animation = 'streakFire 0.5s ease';
      }
    }
  }

  /**
   * End the game
   */
  endGame() {
    State.game.isPlaying = false;
    
    // Update persistent stats
    const results = State.getGameResults();
    const stats = Storage.getStats();
    
    Storage.updateStats({
      gamesPlayed: stats.gamesPlayed + 1,
      totalCorrect: stats.totalCorrect + results.correct,
      totalQuestions: stats.totalQuestions + results.total,
      bestStreak: Math.max(stats.bestStreak, results.bestStreak),
      lastPlayed: Date.now()
    });

    Storage.addLearnedCountries(results.countriesLearned);
    Storage.updateGameStats(this.mode, results.score);

    // Check achievements
    this.checkAchievements(results);

    // Show results
    app.showResults(results);
  }

  /**
   * Check and unlock achievements
   */
  checkAchievements(results) {
    const stats = Storage.getStats();

    // First game
    if (stats.gamesPlayed === 1) {
      if (Storage.unlockAchievement('first_game')) {
        Toast.success(`🎮 ${t('achievements.achievementUnlocked', { name: t('achievements.firstGame') })}`);
      }
    }

    // Perfect round
    if (results.correct === results.total) {
      if (Storage.unlockAchievement('perfect_round')) {
        Toast.success(`⭐ ${t('achievements.achievementUnlocked', { name: t('achievements.perfectRound') })}`);
      }
    }

    // Streak achievements
    if (results.bestStreak >= 5) {
      if (Storage.unlockAchievement('streak_5')) {
        Toast.success(`🔥 ${t('achievements.achievementUnlocked', { name: t('achievements.streak5') })}`);
      }
    }

    // Countries learned
    if (stats.countriesLearned.length >= 25) {
      if (Storage.unlockAchievement('countries_25')) {
        Toast.success(`🌍 ${t('achievements.achievementUnlocked', { name: t('achievements.countries25') })}`);
      }
    }
  }

  /**
   * Clean up
   */
  destroy() {
    this.questions = [];
    this.currentIndex = 0;
  }
}

// Make available globally
window.BaseGame = BaseGame;
