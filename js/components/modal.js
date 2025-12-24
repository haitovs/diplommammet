/**
 * GeoQuest - Modal Component
 */

const Modal = {
  overlay: null,
  modal: null,
  titleEl: null,
  contentEl: null,

  init() {
    this.overlay = document.getElementById('modal-overlay');
    this.modal = document.getElementById('modal');
    this.titleEl = document.getElementById('modal-title');
    this.contentEl = document.getElementById('modal-content');

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && State.ui.modalOpen) {
        this.close();
      }
    });
  },

  /**
   * Open modal with content
   */
  open(title, content) {
    if (!this.modal) this.init();

    this.titleEl.textContent = title;
    
    if (typeof content === 'string') {
      this.contentEl.innerHTML = content;
    } else if (content instanceof HTMLElement) {
      this.contentEl.innerHTML = '';
      this.contentEl.appendChild(content);
    }

    this.overlay.classList.add('active');
    this.modal.classList.add('active');
    State.ui.modalOpen = true;

    // Focus first focusable element
    const focusable = this.contentEl.querySelector('button, input, select, textarea');
    if (focusable) focusable.focus();
  },

  /**
   * Close modal
   */
  close() {
    if (!this.modal) return;

    this.overlay.classList.remove('active');
    this.modal.classList.remove('active');
    State.ui.modalOpen = false;
  },

  /**
   * Show stats modal
   */
  showStats() {
    const stats = Storage.getStats();
    const content = `
      <div class="stats-modal-grid">
        <div class="stats-modal-item">
          <span class="stats-modal-value">${stats.gamesPlayed}</span>
          <span class="stats-modal-label">Games Played</span>
        </div>
        <div class="stats-modal-item">
          <span class="stats-modal-value">${stats.totalCorrect}</span>
          <span class="stats-modal-label">Correct Answers</span>
        </div>
        <div class="stats-modal-item">
          <span class="stats-modal-value">${stats.bestStreak}</span>
          <span class="stats-modal-label">Best Streak</span>
        </div>
        <div class="stats-modal-item">
          <span class="stats-modal-value">${stats.countriesLearned.length}</span>
          <span class="stats-modal-label">Countries Learned</span>
        </div>
      </div>
      
      <div class="game-mode-stats">
        <h4>Best Scores by Mode</h4>
        <div class="game-mode-stat-row">
          <span class="game-mode-name">🏳️ Flag Master</span>
          <span class="game-mode-score">${stats.gameStats.flags?.bestScore || 0}</span>
        </div>
        <div class="game-mode-stat-row">
          <span class="game-mode-name">🏛️ Capital Cities</span>
          <span class="game-mode-score">${stats.gameStats.capitals?.bestScore || 0}</span>
        </div>
        <div class="game-mode-stat-row">
          <span class="game-mode-name">🔍 Fact Detective</span>
          <span class="game-mode-score">${stats.gameStats.facts?.bestScore || 0}</span>
        </div>
        <div class="game-mode-stat-row">
          <span class="game-mode-name">⚡ Speed Geography</span>
          <span class="game-mode-score">${stats.gameStats.speed?.bestScore || 0}</span>
        </div>
      </div>
      
      <div style="margin-top: var(--space-lg); text-align: center;">
        <button class="btn btn-secondary" onclick="Storage.clear(); Modal.close(); Toast.success('Stats reset!'); app.updateStatsDisplay();">
          Reset All Stats
        </button>
      </div>
    `;
    this.open('📊 Your Statistics', content);
  },

  /**
   * Show settings modal
   */
  showSettings() {
    const settings = Storage.getSettings();
    const content = `
      <div class="settings-group">
        <div class="settings-toggle">
          <span>🔊 Sound Effects</span>
          <div class="toggle-switch ${settings.soundEnabled ? 'active' : ''}" 
               onclick="this.classList.toggle('active'); Storage.updateSettings({soundEnabled: this.classList.contains('active')})">
          </div>
        </div>
        
        <div class="settings-toggle">
          <span>💡 Show Hints</span>
          <div class="toggle-switch ${settings.showHints ? 'active' : ''}" 
               onclick="this.classList.toggle('active'); Storage.updateSettings({showHints: this.classList.contains('active')})">
          </div>
        </div>
      </div>
      
      <div class="settings-group">
        <label class="settings-label">Default Difficulty</label>
        <select class="settings-select" onchange="Storage.updateSettings({difficulty: this.value})">
          <option value="easy" ${settings.difficulty === 'easy' ? 'selected' : ''}>Easy</option>
          <option value="medium" ${settings.difficulty === 'medium' ? 'selected' : ''}>Medium</option>
          <option value="hard" ${settings.difficulty === 'hard' ? 'selected' : ''}>Hard</option>
          <option value="all" ${settings.difficulty === 'all' ? 'selected' : ''}>All Levels</option>
        </select>
      </div>
      
      <div class="settings-group">
        <label class="settings-label">Questions Per Round</label>
        <select class="settings-select" onchange="Storage.updateSettings({questionCount: parseInt(this.value)})">
          <option value="5" ${settings.questionCount === 5 ? 'selected' : ''}>5 Questions</option>
          <option value="10" ${settings.questionCount === 10 ? 'selected' : ''}>10 Questions</option>
          <option value="15" ${settings.questionCount === 15 ? 'selected' : ''}>15 Questions</option>
          <option value="20" ${settings.questionCount === 20 ? 'selected' : ''}>20 Questions</option>
        </select>
      </div>
      
      <div style="margin-top: var(--space-lg); text-align: center;">
        <button class="btn btn-primary" onclick="Modal.close(); Toast.success('Settings saved!');">
          Save Settings
        </button>
      </div>
    `;
    this.open('⚙️ Settings', content);
  },

  /**
   * Show game mode selection with difficulty
   */
  showGameOptions(mode) {
    const modeNames = {
      flags: '🏳️ Flag Master',
      capitals: '🏛️ Capital Cities',
      shapes: '🗺️ Shape Shifter',
      facts: '🔍 Fact Detective',
      speed: '⚡ Speed Geography'
    };

    const settings = Storage.getSettings();
    
    let content = `
      <p style="color: var(--text-secondary); margin-bottom: var(--space-lg);">
        ${mode === 'speed' 
          ? 'Test all your skills in a 30-second rapid-fire challenge!' 
          : 'Choose your difficulty level to begin.'}
      </p>
    `;

    if (mode !== 'speed') {
      content += `
        <div class="difficulty-selector">
          <button class="difficulty-btn easy ${settings.difficulty === 'easy' ? 'active' : ''}" 
                  onclick="document.querySelectorAll('.difficulty-btn').forEach(b=>b.classList.remove('active')); this.classList.add('active');"
                  data-difficulty="easy">
            Easy
          </button>
          <button class="difficulty-btn medium ${settings.difficulty === 'medium' ? 'active' : ''}" 
                  onclick="document.querySelectorAll('.difficulty-btn').forEach(b=>b.classList.remove('active')); this.classList.add('active');"
                  data-difficulty="medium">
            Medium
          </button>
          <button class="difficulty-btn hard ${settings.difficulty === 'hard' ? 'active' : ''}" 
                  onclick="document.querySelectorAll('.difficulty-btn').forEach(b=>b.classList.remove('active')); this.classList.add('active');"
                  data-difficulty="hard">
            Hard
          </button>
        </div>
      `;
    }

    content += `
      <div style="text-align: center; margin-top: var(--space-lg);">
        <button class="btn btn-primary btn-lg" onclick="
          const difficulty = document.querySelector('.difficulty-btn.active')?.dataset.difficulty || 'all';
          Modal.close();
          app.launchGame('${mode}', difficulty);
        ">
          Start Game
        </button>
      </div>
    `;

    this.open(modeNames[mode] || 'Start Game', content);
  }
};

// Make available globally
window.Modal = Modal;
