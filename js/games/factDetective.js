/**
 * GeoQuest - Fact Detective Game
 * Guess countries from progressive clues
 */

class FactDetectiveGame extends BaseGame {
  constructor() {
    super('facts');
    this.revealedFacts = 0;
    this.maxFacts = 5;
    this.autocompleteHandler = null;
    this.suggestionsClickHandler = null;
  }

  /**
   * Use only countries with available fact clues
   */
  generateQuestions(difficulty, count) {
    const countryData = (typeof GAME_COUNTRIES !== 'undefined' && GAME_COUNTRIES.length > 0)
      ? GAME_COUNTRIES
      : COUNTRIES;

    let pool = countryData.filter(country => Utils.getCountryFacts(country).length > 0);

    if (difficulty && difficulty !== 'all') {
      pool = pool.filter(c => c.difficulty === difficulty);
    }

    this.questions = Utils.shuffle(pool).slice(0, count);
    State.game.questions = this.questions;
  }

  /**
   * Render fact question
   */
  renderQuestion(question) {
    const questionArea = document.getElementById('question-area');
    const answerArea = document.getElementById('answer-area');

    this.revealedFacts = 1; // Start with one fact revealed
    State.game.hintsUsed = 0;

    const questionText = t('games.whichCountryClues');
    const inputPlaceholder = t('games.typeYourGuess');
    const guessText = t('games.guess');
    const revealHintText = t('games.revealHint');
    const hintsLeftText = t('games.hintsLeft', { count: this.maxFacts - this.revealedFacts });
    const skipText = t('common.skip');

    // Render question with facts
    questionArea.innerHTML = `
      <div class="question-prompt">
        <p class="question-text">${questionText}</p>
      </div>
      <div class="facts-display">
        ${this.renderFacts(question)}
      </div>
    `;

    // Render answer input
    answerArea.innerHTML = `
      <div class="answer-input-container">
        <input type="text" 
               class="answer-input" 
               id="fact-answer-input"
               placeholder="${inputPlaceholder}"
               autocomplete="off"
               onkeydown="if(event.key === 'Enter') currentGame.submitAnswer()">
        <button class="submit-btn" onclick="currentGame.submitAnswer()">
          ${guessText}
        </button>
      </div>
      <div style="display: flex; justify-content: center; gap: var(--space-md); margin-top: var(--space-md);">
        <button class="hint-btn" id="reveal-hint-btn" onclick="currentGame.revealNextFact()">
          💡 ${revealHintText}
          <span class="hint-count">${hintsLeftText}</span>
        </button>
        <button class="skip-btn" onclick="currentGame.skipQuestion()">
          ${skipText} →
        </button>
      </div>
      <div id="suggestions" class="suggestions" style="margin-top: var(--space-md);"></div>
    `;

    // Focus input
    setTimeout(() => {
      const input = document.getElementById('fact-answer-input');
      if (input) input.focus();
    }, 100);

    // Setup autocomplete
    this.setupAutocomplete();
  }

  /**
   * Render facts with reveal state
   */
  renderFacts(question) {
    const facts = Utils.getCountryFacts(question);
    
    return facts.map((fact, i) => {
      const isRevealed = i < this.revealedFacts;
      return `
        <div class="fact-item ${isRevealed ? 'animate-slide-left stagger-' + (i + 1) : 'fact-hidden'}">
          <span class="fact-number">${i + 1}</span>
          <span class="fact-text">${isRevealed ? fact : '????????'}</span>
        </div>
      `;
    }).join('');
  }

  /**
   * Reveal next fact as hint
   */
  revealNextFact() {
    const question = this.getCurrentQuestion();
    const facts = Utils.getCountryFacts(question);
    if (this.revealedFacts >= this.maxFacts || this.revealedFacts >= facts.length) {
      Toast.info(t('games.noMoreHints'));
      return;
    }

    this.revealedFacts++;
    State.game.hintsUsed++;
    Utils.playSound('click');

    // Re-render facts
    const factsDisplay = document.querySelector('.facts-display');
    if (factsDisplay) {
      factsDisplay.innerHTML = this.renderFacts(question);
    }

    // Update hint button
    const hintBtn = document.getElementById('reveal-hint-btn');
    if (hintBtn) {
      const remaining = Math.max(0, this.maxFacts - this.revealedFacts);
      if (remaining === 0) {
        hintBtn.disabled = true;
        hintBtn.innerHTML = `💡 ${t('games.noHintsLeft')}`;
      } else {
        hintBtn.querySelector('.hint-count').textContent = t('games.hintsLeft', { count: remaining });
      }
    }
  }

  /**
   * Setup autocomplete for input
   */
  setupAutocomplete() {
    const input = document.getElementById('fact-answer-input');
    const suggestions = document.getElementById('suggestions');
    if (!input || !suggestions) return;

    this.autocompleteHandler = Utils.debounce((e) => {
      const value = e.target.value.trim();
      const normalizedValue = Utils.normalizeAnswer(value);
      if (normalizedValue.length < 2) {
        suggestions.innerHTML = '';
        return;
      }

      const countryData = (typeof GAME_COUNTRIES !== 'undefined' && GAME_COUNTRIES.length > 0) 
        ? GAME_COUNTRIES 
        : COUNTRIES;
      
      const matches = countryData
        .filter(c => {
          return Utils.getCountryAnswerAliases(c).some(alias => {
            return Utils.normalizeAnswer(alias).includes(normalizedValue);
          });
        })
        .slice(0, 5);

      if (matches.length > 0) {
        suggestions.innerHTML = matches.map(c => `
          <button class="suggestion-btn" type="button" data-country-id="${c.id}">
            <span class="suggestion-flag">${(typeof c.flag === 'string' && !c.flag.startsWith('http')) ? c.flag : (c.flagEmoji || Utils.getEmojiFlag(c.id))}</span>
            <span class="suggestion-name">${Utils.getCountryDisplayName(c)}</span>
          </button>
        `).join('');
      } else {
        suggestions.innerHTML = '';
      }
    }, 150);
    input.addEventListener('input', this.autocompleteHandler);

    this.suggestionsClickHandler = (event) => {
      const button = event.target.closest('.suggestion-btn');
      if (!button) return;
      const { countryId } = button.dataset;
      if (countryId) {
        this.selectSuggestion(countryId);
      }
    };
    suggestions.addEventListener('click', this.suggestionsClickHandler);
  }

  /**
   * Select a suggestion
   */
  selectSuggestion(countryId) {
    const countryData = (typeof GAME_COUNTRIES !== 'undefined' && GAME_COUNTRIES.length > 0) 
      ? GAME_COUNTRIES 
      : COUNTRIES;
    const selectedCountry = countryData.find(c => c.id === countryId);
    if (!selectedCountry) return;

    const input = document.getElementById('fact-answer-input');
    if (input) {
      input.value = Utils.getCountryDisplayName(selectedCountry);
      document.getElementById('suggestions').innerHTML = '';
      this.submitAnswer();
    }
  }

  /**
   * Submit text answer
   */
  submitAnswer() {
    if (this.answered) return;

    const input = document.getElementById('fact-answer-input');
    const guess = input?.value.trim();

    if (!guess) {
      Toast.warning(t('games.pleaseTypeCountry'));
      return;
    }

    const question = this.getCurrentQuestion();
    
    // Check if answer matches
    const isCorrect = Utils.matchesCountryAnswer(guess, question);
    
    this.answered = true;
    Utils.playSound(isCorrect ? 'correct' : 'wrong');

    State.recordAnswer(isCorrect, question.id);

    if (isCorrect) {
      // More points for fewer hints used
      const basePoints = 150;
      const hintPenalty = State.game.hintsUsed * 25;
      const points = State.addScore(Math.max(50, basePoints - hintPenalty));
      this.showFactFeedback(true, question, points);
      Confetti.burst();
    } else {
      this.showFactFeedback(false, question);
    }

    this.updateScoreDisplay();
    
    // Disable input
    if (input) input.disabled = true;
    document.getElementById('suggestions').innerHTML = '';

    setTimeout(() => this.nextQuestion(), isCorrect ? 1500 : 2500);
  }

  /**
   * Show feedback for fact answers
   */
  showFactFeedback(isCorrect, question, points = 0) {
    const feedbackArea = document.getElementById('feedback-area');
    
    if (isCorrect) {
      const answer = `${question.flag} ${Utils.getCountryDisplayName(question)}`;
      feedbackArea.innerHTML = `
        <div class="feedback-message correct">
          <span class="feedback-icon">✅</span>
          <div>
            <span class="feedback-text">${t('feedback.correctPoints', { points })}</span>
            <p class="correct-answer">${answer}</p>
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
   * Skip current question
   */
  skipQuestion() {
    if (this.answered) return;
    this.answered = true;
    
    const question = this.getCurrentQuestion();
    State.recordAnswer(false, question.id);
    
    this.showFactFeedback(false, question);
    
    setTimeout(() => this.nextQuestion(), 1500);
  }

  /**
   * Clean up listeners
   */
  destroy() {
    super.destroy();
    const input = document.getElementById('fact-answer-input');
    const suggestions = document.getElementById('suggestions');

    if (input && this.autocompleteHandler) {
      input.removeEventListener('input', this.autocompleteHandler);
    }
    if (suggestions && this.suggestionsClickHandler) {
      suggestions.removeEventListener('click', this.suggestionsClickHandler);
    }

    this.autocompleteHandler = null;
    this.suggestionsClickHandler = null;
  }
}

// Add suggestion button styles
const suggestionStyles = document.createElement('style');
suggestionStyles.textContent = `
  .suggestions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-xs);
    justify-content: center;
  }
  
  .suggestion-btn {
    display: inline-flex;
    align-items: center;
    gap: var(--space-xs);
    padding: var(--space-xs) var(--space-sm);
    background: rgba(99, 102, 241, 0.15);
    border: 1px solid var(--border-accent);
    border-radius: var(--radius-md);
    color: var(--text-primary);
    cursor: pointer;
    font-size: 0.9rem;
    transition: all var(--transition-fast);
  }
  
  .suggestion-btn:hover {
    background: rgba(99, 102, 241, 0.3);
    transform: translateY(-2px);
  }

  .suggestion-flag {
    font-size: 1rem;
  }
`;
document.head.appendChild(suggestionStyles);

// Make available globally
window.FactDetectiveGame = FactDetectiveGame;
