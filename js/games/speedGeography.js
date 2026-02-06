/**
 * GeoQuest - Speed Geography Game
 * 30-second rapid-fire challenge
 */

class SpeedGeographyGame extends BaseGame {
  constructor() {
    super('speed');
    this.timer = null;
    this.questionTypes = ['flag', 'capital', 'shape']; // Added shape for variety
  }

  /**
   * Initialize speed game
   */
  init(options = {}) {
    // Speed mode always uses all difficulties and 30 second timer
    State.startGame('speed', { difficulty: 'all', rounds: 999 });
    
    // Generate a large pool of questions
    this.generateQuestions('all', 50);
    this.currentIndex = 0;
    this.answered = false;

    this.showQuestion();
    this.updateUI();
    this.startTimer();
  }

  /**
   * Start the countdown timer
   */
  startTimer() {
    State.game.timeRemaining = 30;
    this.updateTimerDisplay();

    this.timer = setInterval(() => {
      State.game.timeRemaining--;
      this.updateTimerDisplay();

      // Warning at 10 seconds
      if (State.game.timeRemaining === 10) {
        Utils.playSound('tick');
        document.getElementById('game-timer').style.animation = 'timerWarning 0.5s ease infinite';
      }

      // Time's up
      if (State.game.timeRemaining <= 0) {
        this.endGame();
      }
    }, 1000);
  }

  /**
   * Update timer display
   */
  updateTimerDisplay() {
    const timerEl = document.querySelector('.timer-value');
    if (timerEl) {
      const time = Math.max(0, Math.min(State.game.timeRemaining, 999));
      const mins = Math.floor(time / 60);
      const secs = time % 60;
      timerEl.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
    }
  }

  /**
   * Generate questions with mixed types
   */
  generateQuestions(difficulty, count) {
    super.generateQuestions(difficulty, count);
    
    // Add random question type to each
    this.questions = this.questions.map(q => ({
      ...q,
      questionType: Utils.getRandomItem(this.questionTypes)
    }));
  }

  /**
   * Render speed question based on type
   */
  renderQuestion(question) {
    const questionArea = document.getElementById('question-area');
    const answerArea = document.getElementById('answer-area');

    const options = this.generateOptions(question, 4);

    if (question.questionType === 'flag') {
      questionArea.innerHTML = `
        <div class="question-prompt">
          <p class="question-text">🏳️ Name this country!</p>
        </div>
        <div class="flag-display animate-scale-in" style="font-size: 6rem;">
          ${question.flag}
        </div>
      `;
    } else if (question.questionType === 'shape') {
      const countryCode = question.id.toLowerCase();
      const outlineSvgUrl = `https://raw.githubusercontent.com/djaiss/mapsicon/master/all/${countryCode}/vector.svg`;
      questionArea.innerHTML = `
        <div class="question-prompt">
          <p class="question-text">🗺️ Name this country!</p>
        </div>
        <div class="shape-display animate-scale-in">
          <img src="${outlineSvgUrl}" alt="Country shape" 
               style="filter: brightness(0); max-width: 120px; max-height: 120px;"
               onerror="this.parentElement.innerHTML='${question.flag}';">
        </div>
      `;
    } else {
      questionArea.innerHTML = `
        <div class="question-prompt">
          <p class="question-text">🏛️ Capital: ${question.capital}</p>
        </div>
        <div class="capital-display animate-scale-in" style="font-size: 2rem;">
          Which country?
        </div>
      `;
    }

    // Render quick answer buttons
    answerArea.innerHTML = `
      <div class="answer-grid">
        ${options.map((opt, i) => `
          <button class="answer-option" 
                  data-id="${opt.id}" 
                  onclick="currentGame.handleAnswer('${opt.id}', this)">
            <span class="option-flag">${opt.flag}</span>
            <span class="option-text">${opt.name}</span>
            <span class="option-key">${i + 1}</span>
          </button>
        `).join('')}
      </div>
      <button class="skip-btn" onclick="currentGame.skipQuestion()" style="margin: var(--space-md) auto 0; display: block;">
        Skip (Space)
      </button>
    `;

    this.setupKeyboardShortcuts(options);
  }

  /**
   * Setup keyboard shortcuts
   */
  setupKeyboardShortcuts(options) {
    if (this.keyHandler) {
      document.removeEventListener('keydown', this.keyHandler);
    }

    this.keyHandler = (e) => {
      if (this.answered) return;
      
      // Number keys for answers
      const key = parseInt(e.key);
      if (key >= 1 && key <= options.length) {
        const option = options[key - 1];
        const button = document.querySelector(`[data-id="${option.id}"]`);
        if (button) button.click();
      }
      
      // Space to skip
      if (e.code === 'Space') {
        e.preventDefault();
        this.skipQuestion();
      }
    };

    document.addEventListener('keydown', this.keyHandler);
  }

  /**
   * Handle answer - faster for speed mode
   */
  handleAnswer(selectedId, buttonEl = null) {
    if (this.answered) return;
    this.answered = true;

    const question = this.getCurrentQuestion();
    const isCorrect = selectedId === question.id;

    Utils.playSound(isCorrect ? 'correct' : 'wrong');
    State.recordAnswer(isCorrect, question.id);

    // Speed mode scoring - streak multiplier is key
    if (isCorrect) {
      const basePoints = 50;
      const streakBonus = Math.min(State.game.streak, 5) * 10;
      const points = State.addScore(basePoints + streakBonus);
      
      // Quick visual feedback
      if (buttonEl) {
        buttonEl.classList.add('correct');
      }
      Confetti.burst();
    } else {
      if (buttonEl) {
        buttonEl.classList.add('wrong');
      }
      // Show correct answer briefly
      const correctBtn = document.querySelector(`[data-id="${question.id}"]`);
      if (correctBtn) correctBtn.classList.add('correct');
    }

    this.highlightAnswer(selectedId, question.id);
    this.updateScoreDisplay();

    // Fast transition in speed mode
    setTimeout(() => this.nextQuestion(), isCorrect ? 400 : 800);
  }

  /**
   * Skip question quickly
   */
  skipQuestion() {
    if (this.answered) return;
    this.answered = true;
    
    const question = this.getCurrentQuestion();
    State.recordAnswer(false, question.id);
    State.game.streak = 0;
    
    setTimeout(() => this.nextQuestion(), 200);
  }

  /**
   * Override to clear feedback quickly
   */
  nextQuestion() {
    this.currentIndex++;
    this.answered = false;
    
    // No feedback area clearing needed - speed mode is fast
    
    if (this.currentIndex >= this.questions.length) {
      // Ran out of questions, generate more
      this.generateQuestions('all', 50);
      this.currentIndex = 0;
    }
    
    this.showQuestion();
    this.updateProgress();
  }

  /**
   * Update progress for speed mode (show score instead)
   */
  updateProgress() {
    const progress = Math.min(100, (State.game.score / 500) * 100);
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }

    const roundEl = document.getElementById('game-round');
    if (roundEl) {
      roundEl.textContent = `Q: ${State.game.answers.length}`;
    }
  }

  /**
   * End game - stop timer
   */
  endGame() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }

    // Update total rounds for results
    State.game.totalRounds = State.game.answers.length;
    
    super.endGame();
  }

  /**
   * Cleanup
   */
  destroy() {
    super.destroy();
    if (this.timer) {
      clearInterval(this.timer);
    }
    if (this.keyHandler) {
      document.removeEventListener('keydown', this.keyHandler);
    }
  }
}

// Make available globally
window.SpeedGeographyGame = SpeedGeographyGame;
