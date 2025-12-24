/**
 * GeoQuest - Fact Detective Game
 * Guess countries from progressive clues
 */

class FactDetectiveGame extends BaseGame {
  constructor() {
    super('facts');
    this.revealedFacts = 0;
    this.maxFacts = 5;
  }

  /**
   * Render fact question
   */
  renderQuestion(question) {
    const questionArea = document.getElementById('question-area');
    const answerArea = document.getElementById('answer-area');

    this.revealedFacts = 1; // Start with one fact revealed
    State.game.hintsUsed = 0;

    // Render question with facts
    questionArea.innerHTML = `
      <div class="question-prompt">
        <p class="question-text">Which country matches these clues?</p>
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
               placeholder="Type your guess..."
               autocomplete="off"
               onkeydown="if(event.key === 'Enter') currentGame.submitAnswer()">
        <button class="submit-btn" onclick="currentGame.submitAnswer()">
          Guess
        </button>
      </div>
      <div style="display: flex; justify-content: center; gap: var(--space-md); margin-top: var(--space-md);">
        <button class="hint-btn" id="reveal-hint-btn" onclick="currentGame.revealNextFact()">
          💡 Reveal Hint
          <span class="hint-count">${this.maxFacts - this.revealedFacts} left</span>
        </button>
        <button class="skip-btn" onclick="currentGame.skipQuestion()">
          Skip →
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
    const facts = question.facts || [];
    
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
    if (this.revealedFacts >= this.maxFacts || this.revealedFacts >= question.facts.length) {
      Toast.info('No more hints available!');
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
        hintBtn.innerHTML = '💡 No more hints';
      } else {
        hintBtn.querySelector('.hint-count').textContent = `${remaining} left`;
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

    input.addEventListener('input', Utils.debounce((e) => {
      const value = e.target.value.trim();
      if (value.length < 2) {
        suggestions.innerHTML = '';
        return;
      }

      const matches = COUNTRIES
        .filter(c => c.name.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 5);

      if (matches.length > 0) {
        suggestions.innerHTML = matches.map(c => `
          <button class="suggestion-btn" onclick="currentGame.selectSuggestion('${c.name}')">
            ${c.flag} ${c.name}
          </button>
        `).join('');
      } else {
        suggestions.innerHTML = '';
      }
    }, 150));
  }

  /**
   * Select a suggestion
   */
  selectSuggestion(name) {
    const input = document.getElementById('fact-answer-input');
    if (input) {
      input.value = name;
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
      Toast.warning('Please type a country name');
      return;
    }

    const question = this.getCurrentQuestion();
    
    // Check if answer matches
    const isCorrect = Utils.matchesAnswer(guess, question.name);
    
    this.answered = true;
    Utils.playSound(isCorrect ? 'correct' : 'wrong');

    // Find the country they guessed (for display)
    const guessedCountry = COUNTRIES.find(c => 
      Utils.matchesAnswer(guess, c.name)
    );

    State.recordAnswer(isCorrect, question.id);

    if (isCorrect) {
      // More points for fewer hints used
      const basePoints = 150;
      const hintPenalty = State.game.hintsUsed * 25;
      const points = State.addScore(Math.max(50, basePoints - hintPenalty));
      this.showFactFeedback(true, question, points);
      Confetti.burst();
    } else {
      this.showFactFeedback(false, question, guessedCountry);
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
  showFactFeedback(isCorrect, question, pointsOrGuess) {
    const feedbackArea = document.getElementById('feedback-area');
    
    if (isCorrect) {
      feedbackArea.innerHTML = `
        <div class="feedback-message correct">
          <span class="feedback-icon">✅</span>
          <div>
            <span class="feedback-text">Correct! +${pointsOrGuess} points</span>
            <p class="correct-answer">${question.flag} ${question.name}</p>
          </div>
        </div>
      `;
    } else {
      feedbackArea.innerHTML = `
        <div class="feedback-message wrong">
          <span class="feedback-icon">❌</span>
          <div>
            <span class="feedback-text">Not quite!</span>
            <p class="correct-answer">The answer was: ${question.flag} ${question.name}</p>
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
    
    this.showFactFeedback(false, question, null);
    
    setTimeout(() => this.nextQuestion(), 1500);
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
`;
document.head.appendChild(suggestionStyles);

// Make available globally
window.FactDetectiveGame = FactDetectiveGame;
