/**
 * GeoQuest - Capital Cities Game
 * Match countries with their capitals
 */

class CapitalCitiesGame extends BaseGame {
  constructor() {
    super('capitals');
    this.reverseMode = false; // true = show capital, guess country
  }

  /**
   * Generate questions with mixed modes
   */
  generateQuestions(difficulty, count) {
    super.generateQuestions(difficulty, count);
    
    // Add reverse mode flag to some questions
    this.questions = this.questions.map((q, i) => ({
      ...q,
      reverseMode: i % 2 === 1 // Every other question is reverse
    }));
  }

  /**
   * Render capital question
   */
  renderQuestion(question) {
    const questionArea = document.getElementById('question-area');
    const answerArea = document.getElementById('answer-area');
    
    this.reverseMode = question.reverseMode;

    if (this.reverseMode) {
      // Show capital, guess country
      const questionText = typeof t === 'function' ? t('games.whichCountryCapital') : 'Which country has this capital city?';
      questionArea.innerHTML = `
        <div class="question-prompt">
          <p class="question-text">${questionText}</p>
        </div>
        <div class="capital-display animate-scale-in">
          🏛️ ${question.capital}
        </div>
      `;

      const options = this.generateOptions(question, 4);
      answerArea.innerHTML = `
        <div class="answer-grid">
          ${options.map((opt, i) => `
            <button class="answer-option" 
                    data-id="${opt.id}" 
                    onclick="currentGame.handleAnswer('${opt.id}', this)">
              ${Utils.renderFlag(opt, 'small')}
              <span class="option-text">${opt.name}</span>
              <span class="option-key">${i + 1}</span>
            </button>
          `).join('')}
        </div>
      `;
      
      this.setupKeyboardShortcuts(options);
    } else {
      // Show country, guess capital
      const questionText = typeof t === 'function' ? t('games.whatCapital') : 'What is the capital of this country?';
      questionArea.innerHTML = `
        <div class="question-prompt">
          <p class="question-text">${questionText}</p>
        </div>
        <div class="capital-display animate-scale-in">
          ${Utils.renderFlag(question, 'medium')}
          <span class="country-name">${question.name}</span>
        </div>
      `;

      const options = this.generateCapitalOptions(question, 4);
      answerArea.innerHTML = `
        <div class="answer-grid">
          ${options.map((opt, i) => `
            <button class="answer-option" 
                    data-id="${opt.id}" 
                    onclick="currentGame.handleAnswer('${opt.id}', this)">
              <span class="option-text">🏛️ ${opt.capital}</span>
              <span class="option-key">${i + 1}</span>
            </button>
          `).join('')}
        </div>
      `;
      
      this.setupKeyboardShortcuts(options);
    }
  }

  /**
   * Generate capital options (for normal mode)
   */
  generateCapitalOptions(correctCountry, count = 4) {
    const countryData = (typeof GAME_COUNTRIES !== 'undefined' && GAME_COUNTRIES.length > 0) 
      ? GAME_COUNTRIES 
      : COUNTRIES;
    
    const options = [correctCountry];
    const others = countryData.filter(c => c.id !== correctCountry.id && c.capital !== correctCountry.capital);
    const shuffled = Utils.shuffle(others);
    
    for (let i = 0; i < count - 1 && i < shuffled.length; i++) {
      options.push(shuffled[i]);
    }

    return Utils.shuffle(options);
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
      
      const key = parseInt(e.key);
      if (key >= 1 && key <= options.length) {
        const option = options[key - 1];
        const button = document.querySelector(`[data-id="${option.id}"]`);
        if (button) button.click();
      }
    };

    document.addEventListener('keydown', this.keyHandler);
  }

  /**
   * Override feedback for capital answers
   */
  showFeedback(isCorrect, question, points = 0) {
    const feedbackArea = document.getElementById('feedback-area');
    
    if (isCorrect) {
      feedbackArea.innerHTML = `
        <div class="feedback-message correct">
          <span class="feedback-icon">✅</span>
          <div>
            <span class="feedback-text">Correct! +${points} points</span>
          </div>
        </div>
      `;
    } else {
      const answer = this.reverseMode 
        ? `${question.flag} ${question.name}` 
        : `🏛️ ${question.capital}`;
      
      feedbackArea.innerHTML = `
        <div class="feedback-message wrong">
          <span class="feedback-icon">❌</span>
          <div>
            <span class="feedback-text">Not quite!</span>
            <p class="correct-answer">The answer was: ${answer}</p>
          </div>
        </div>
      `;
    }
  }

  destroy() {
    super.destroy();
    if (this.keyHandler) {
      document.removeEventListener('keydown', this.keyHandler);
    }
  }
}

// Make available globally
window.CapitalCitiesGame = CapitalCitiesGame;
