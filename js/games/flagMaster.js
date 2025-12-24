/**
 * GeoQuest - Flag Master Game
 * Identify countries by their flags
 */

class FlagMasterGame extends BaseGame {
  constructor() {
    super('flags');
  }

  /**
   * Render flag question
   */
  renderQuestion(question) {
    const questionArea = document.getElementById('question-area');
    const answerArea = document.getElementById('answer-area');

    // Generate 4 options including correct answer
    const options = this.generateOptions(question, 4);

    // Render question
    questionArea.innerHTML = `
      <div class="question-prompt">
        <p class="question-text">Which country does this flag belong to?</p>
      </div>
      <div class="flag-display animate-scale-in">
        ${question.flag}
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
   * Setup keyboard shortcuts for answers
   */
  setupKeyboardShortcuts(options) {
    // Remove previous listener
    if (this.keyHandler) {
      document.removeEventListener('keydown', this.keyHandler);
    }

    this.keyHandler = (e) => {
      if (this.answered) return;
      
      const key = parseInt(e.key);
      if (key >= 1 && key <= options.length) {
        const option = options[key - 1];
        const button = document.querySelector(`[data-id="${option.id}"]`);
        if (button) {
          button.click();
        }
      }
    };

    document.addEventListener('keydown', this.keyHandler);
  }

  /**
   * Clean up
   */
  destroy() {
    super.destroy();
    if (this.keyHandler) {
      document.removeEventListener('keydown', this.keyHandler);
    }
  }
}

// Make available globally
window.FlagMasterGame = FlagMasterGame;
