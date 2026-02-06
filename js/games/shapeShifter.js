/**
 * GeoQuest - Shape Shifter Game
 * Identify countries by their silhouette outline
 */

class ShapeShifterGame extends BaseGame {
  constructor() {
    super('shapes');
    this.hintsUsed = 0;
    this.maxHints = 3;
  }

  /**
   * Initialize with shapes mode settings
   */
  init(options = {}) {
    this.hintsUsed = 0;
    super.init(options);
  }

  /**
   * Render shape question with actual country silhouette
   */
  renderQuestion(question) {
    const questionArea = document.getElementById('question-area');
    const answerArea = document.getElementById('answer-area');
    
    this.hintsUsed = 0;

    // Generate 4 options including correct answer
    const options = this.generateOptions(question, 4);

    // Use country outline SVG - multiple fallback sources
    // Primary: svg-country-maps, Fallback: custom silhouette CSS shape
    const countryCode = question.id.toLowerCase();
    const outlineSvgUrl = `https://raw.githubusercontent.com/djaiss/mapsicon/master/all/${countryCode}/vector.svg`;
    const fallbackOutlineUrl = `https://flagcdn.com/w320/${countryCode}.png`;

    const questionText = typeof t === 'function' ? t('games.whichCountryShape') : 'Which country has this shape?';
    const hintText = typeof t === 'function' ? t('games.revealHint') : 'Get Hint';
    const hintsLeftText = typeof t === 'function' ? t('games.hintsLeft', {count: this.maxHints - this.hintsUsed}) : `${this.maxHints - this.hintsUsed} left`;

    // Render question with actual country silhouette
    questionArea.innerHTML = `
      <div class="question-prompt">
        <p class="question-text">${questionText}</p>
      </div>
      <div class="shape-container animate-scale-in">
        <div class="country-silhouette" id="country-shape">
          <img 
            src="${outlineSvgUrl}" 
            alt="Country silhouette" 
            class="silhouette-image outline-svg"
            style="filter: brightness(0) saturate(100%); max-width: 200px; max-height: 200px;"
            onerror="this.src='${fallbackOutlineUrl}'; this.classList.add('fallback-flag');"
          >
        </div>
        <div class="hint-indicators">
          <span class="hint-dot ${this.hintsUsed >= 1 ? 'used' : ''}"></span>
          <span class="hint-dot ${this.hintsUsed >= 2 ? 'used' : ''}"></span>
          <span class="hint-dot ${this.hintsUsed >= 3 ? 'used' : ''}"></span>
        </div>
      </div>
      <div class="hints-area" id="hints-area">
        <button class="hint-btn" onclick="currentGame.revealHint()" ${this.hintsUsed >= this.maxHints ? 'disabled' : ''}>
          💡 ${hintText} (${hintsLeftText})
        </button>
        <div class="revealed-hints" id="revealed-hints"></div>
      </div>
    `;


    // Render answer options
    answerArea.innerHTML = `
      <div class="answer-grid">
        ${options.map((opt, i) => `
          <button class="answer-option" 
                  data-id="${opt.id}" 
                  onclick="currentGame.handleAnswer('${opt.id}', this)">
            <span class="option-key">${i + 1}</span>
            <span class="option-text">${opt.name}</span>
          </button>
        `).join('')}
      </div>
    `;

    // Keyboard support
    this.setupKeyboardShortcuts(options);
  }

  /**
   * Reveal a hint
   */
  revealHint() {
    if (this.hintsUsed >= this.maxHints || this.answered) return;

    const question = this.getCurrentQuestion();
    const hintsArea = document.getElementById('revealed-hints');
    const silhouette = document.querySelector('.silhouette-image');
    
    this.hintsUsed++;
    Utils.playSound('hint');

    const hints = [
      { icon: '🌍', text: `Continent: ${question.continent}` },
      { icon: '📍', text: `Region: ${question.region}` },
      { icon: '🏙️', text: `Capital: ${question.capital}` }
    ];

    const hint = hints[this.hintsUsed - 1];
    hintsArea.innerHTML += `
      <div class="hint-item animate-fade-in">
        <span class="hint-icon">${hint.icon}</span>
        <span class="hint-text">${hint.text}</span>
      </div>
    `;

    // Progressively reveal the shape
    if (this.hintsUsed === 2) {
      silhouette.style.filter = 'brightness(0) saturate(100%) sepia(1) hue-rotate(90deg)';
    } else if (this.hintsUsed === 3) {
      silhouette.style.filter = 'brightness(0.3) saturate(50%)';
    }

    // Update hint button
    const hintBtn = document.querySelector('.hint-btn');
    if (this.hintsUsed >= this.maxHints) {
      hintBtn.disabled = true;
      hintBtn.textContent = '💡 No hints left';
    } else {
      hintBtn.textContent = `💡 Get Hint (${this.maxHints - this.hintsUsed} left)`;
    }

    // Update hint dots
    document.querySelectorAll('.hint-dot').forEach((dot, i) => {
      if (i < this.hintsUsed) dot.classList.add('used');
    });
  }

  /**
   * Override handle answer to account for hints
   */
  handleAnswer(selectedId, buttonEl = null) {
    if (this.answered) return;
    this.answered = true;

    const question = this.getCurrentQuestion();
    const isCorrect = selectedId === question.id;

    // Reveal the actual flag
    const silhouette = document.querySelector('.silhouette-image');
    if (silhouette) {
      silhouette.style.filter = 'none';
      silhouette.style.transition = 'filter 0.5s ease';
    }

    Utils.playSound(isCorrect ? 'correct' : 'wrong');
    State.recordAnswer(isCorrect, question.id);

    // Calculate points with hint penalty
    if (isCorrect) {
      const basePoints = 150;
      const hintPenalty = this.hintsUsed * 40;
      const points = Math.max(basePoints - hintPenalty, 30);
      State.addScore(points);
      this.showFeedback(true, question, points);
      Confetti.burst();
    } else {
      this.showFeedback(false, question);
    }

    this.highlightAnswer(selectedId, question.id);
    this.updateScoreDisplay();

    setTimeout(() => this.nextQuestion(), isCorrect ? 1500 : 2500);
  }

  /**
   * Override feedback for shape mode
   */
  showFeedback(isCorrect, question, points = 0) {
    const feedbackArea = document.getElementById('feedback-area');
    
    if (isCorrect) {
      const hintMessage = this.hintsUsed > 0 
        ? ` (${this.hintsUsed} hint${this.hintsUsed > 1 ? 's' : ''} used)`
        : ' (No hints needed!)';
      
      feedbackArea.innerHTML = `
        <div class="feedback-message correct">
          <span class="feedback-icon">✅</span>
          <div>
            <span class="feedback-text">Correct! +${points} points${hintMessage}</span>
          </div>
        </div>
      `;
    } else {
      feedbackArea.innerHTML = `
        <div class="feedback-message wrong">
          <span class="feedback-icon">❌</span>
          <div>
            <span class="feedback-text">Not quite!</span>
            <p class="correct-answer">This is: ${question.flagEmoji || ''} ${question.name}</p>
          </div>
        </div>
      `;
    }
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
      
      // H key for hint
      if (e.key.toLowerCase() === 'h') {
        this.revealHint();
      }
    };

    document.addEventListener('keydown', this.keyHandler);
  }

  destroy() {
    super.destroy();
    if (this.keyHandler) {
      document.removeEventListener('keydown', this.keyHandler);
    }
  }
}

// Make available globally
window.ShapeShifterGame = ShapeShifterGame;
