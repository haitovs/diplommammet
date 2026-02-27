/**
 * GeoQuest - Modal Component
 */

const Modal = {
  overlay: null,
  modal: null,
  titleEl: null,
  contentEl: null,
  currentView: null,
  currentViewPayload: null,

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
    this.currentView = null;
    this.currentViewPayload = null;
  },

  /**
   * Re-render currently open modal in the active language
   */
  refreshCurrentView() {
    if (!State.ui.modalOpen) return;

    if (this.currentView === 'stats') {
      this.showStats();
    } else if (this.currentView === 'settings') {
      this.showSettings();
    } else if (this.currentView === 'gameOptions') {
      this.showGameOptions(this.currentViewPayload?.mode || 'flags');
    }
  },

  /**
   * Show stats modal
   */
  showStats() {
    this.currentView = 'stats';
    this.currentViewPayload = null;

    const stats = Storage.getStats();
    const resetToast = t('stats.resetSuccess').replace(/'/g, "\\'");

    const content = `
      <div class="stats-modal-grid">
        <div class="stats-modal-item">
          <span class="stats-modal-value">${stats.gamesPlayed}</span>
          <span class="stats-modal-label">${t('stats.gamesPlayed')}</span>
        </div>
        <div class="stats-modal-item">
          <span class="stats-modal-value">${stats.totalCorrect}</span>
          <span class="stats-modal-label">${t('stats.correctAnswers')}</span>
        </div>
        <div class="stats-modal-item">
          <span class="stats-modal-value">${stats.bestStreak}</span>
          <span class="stats-modal-label">${t('results.bestStreak')}</span>
        </div>
        <div class="stats-modal-item">
          <span class="stats-modal-value">${stats.countriesLearned.length}</span>
          <span class="stats-modal-label">${t('results.countriesLearned')}</span>
        </div>
      </div>

      <div class="game-mode-stats">
        <h4>${t('stats.bestScoresByMode')}</h4>
        <div class="game-mode-stat-row">
          <span class="game-mode-name">🏳️ ${t('games.flagMaster')}</span>
          <span class="game-mode-score">${stats.gameStats.flags?.bestScore || 0}</span>
        </div>
        <div class="game-mode-stat-row">
          <span class="game-mode-name">🏛️ ${t('games.capitalCities')}</span>
          <span class="game-mode-score">${stats.gameStats.capitals?.bestScore || 0}</span>
        </div>
        <div class="game-mode-stat-row">
          <span class="game-mode-name">🗺️ ${t('games.shapeShifter')}</span>
          <span class="game-mode-score">${stats.gameStats.shapes?.bestScore || 0}</span>
        </div>
        <div class="game-mode-stat-row">
          <span class="game-mode-name">🔍 ${t('games.factDetective')}</span>
          <span class="game-mode-score">${stats.gameStats.facts?.bestScore || 0}</span>
        </div>
        <div class="game-mode-stat-row">
          <span class="game-mode-name">⚡ ${t('games.speedGeography')}</span>
          <span class="game-mode-score">${stats.gameStats.speed?.bestScore || 0}</span>
        </div>
      </div>

      <div style="margin-top: var(--space-lg); text-align: center;">
        <button class="btn btn-secondary" onclick="Storage.clear(); Modal.close(); Toast.success('${resetToast}'); app.updateStatsDisplay(); app.updateAchievementsDisplay();">
          ${t('stats.resetStats')}
        </button>
      </div>
    `;

    this.open(`📊 ${t('stats.yourStatistics')}`, content);
  },

  /**
   * Show settings modal
   */
  showSettings() {
    this.currentView = 'settings';
    this.currentViewPayload = null;

    const settings = Storage.getSettings();
    const settingsSaved = t('settings.saved').replace(/'/g, "\\'");

    const questionOptions = [5, 10, 15, 20].map(count => `
      <option value="${count}" ${settings.questionCount === count ? 'selected' : ''}>${t('settings.questionsTemplate', { count })}</option>
    `).join('');

    const content = `
      <div class="settings-group">
        <div class="settings-toggle">
          <span>🔊 ${t('settings.soundEffects')}</span>
          <div class="toggle-switch ${settings.soundEnabled ? 'active' : ''}"
               onclick="this.classList.toggle('active'); Storage.updateSettings({soundEnabled: this.classList.contains('active')})">
          </div>
        </div>

        <div class="settings-toggle">
          <span>💡 ${t('settings.showHints')}</span>
          <div class="toggle-switch ${settings.showHints ? 'active' : ''}"
               onclick="this.classList.toggle('active'); Storage.updateSettings({showHints: this.classList.contains('active')})">
          </div>
        </div>
      </div>

      <div class="settings-group">
        <label class="settings-label">${t('settings.defaultDifficulty')}</label>
        <select class="settings-select" onchange="Storage.updateSettings({difficulty: this.value})">
          <option value="easy" ${settings.difficulty === 'easy' ? 'selected' : ''}>${t('nav.easy')}</option>
          <option value="medium" ${settings.difficulty === 'medium' ? 'selected' : ''}>${t('nav.medium')}</option>
          <option value="hard" ${settings.difficulty === 'hard' ? 'selected' : ''}>${t('nav.hard')}</option>
          <option value="all" ${settings.difficulty === 'all' ? 'selected' : ''}>${t('nav.allLevels')}</option>
        </select>
      </div>

      <div class="settings-group">
        <label class="settings-label">${t('settings.questionsPerRound')}</label>
        <select class="settings-select" onchange="Storage.updateSettings({questionCount: parseInt(this.value, 10)})">
          ${questionOptions}
        </select>
      </div>

      <div style="margin-top: var(--space-lg); text-align: center;">
        <button class="btn btn-primary" onclick="Modal.close(); Toast.success('${settingsSaved}');">
          ${t('common.save')}
        </button>
      </div>
    `;

    this.open(`⚙️ ${t('common.settings')}`, content);
  },

  /**
   * Show game mode selection with difficulty
   */
  showGameOptions(mode) {
    this.currentView = 'gameOptions';
    this.currentViewPayload = { mode };

    const modeNames = {
      flags: `🏳️ ${t('games.flagMaster')}`,
      capitals: `🏛️ ${t('games.capitalCities')}`,
      shapes: `🗺️ ${t('games.shapeShifter')}`,
      facts: `🔍 ${t('games.factDetective')}`,
      speed: `⚡ ${t('games.speedGeography')}`
    };

    const settings = Storage.getSettings();

    let content = `
      <p style="color: var(--text-secondary); margin-bottom: var(--space-lg);">
        ${mode === 'speed' ? t('modal.speedDesc') : t('modal.chooseDifficulty')}
      </p>
    `;

    if (mode !== 'speed') {
      content += `
        <div class="difficulty-selector">
          <button class="difficulty-btn easy ${settings.difficulty === 'easy' ? 'active' : ''}"
                  onclick="document.querySelectorAll('.difficulty-btn').forEach(b=>b.classList.remove('active')); this.classList.add('active');"
                  data-difficulty="easy">
            ${t('nav.easy')}
          </button>
          <button class="difficulty-btn medium ${settings.difficulty === 'medium' ? 'active' : ''}"
                  onclick="document.querySelectorAll('.difficulty-btn').forEach(b=>b.classList.remove('active')); this.classList.add('active');"
                  data-difficulty="medium">
            ${t('nav.medium')}
          </button>
          <button class="difficulty-btn hard ${settings.difficulty === 'hard' ? 'active' : ''}"
                  onclick="document.querySelectorAll('.difficulty-btn').forEach(b=>b.classList.remove('active')); this.classList.add('active');"
                  data-difficulty="hard">
            ${t('nav.hard')}
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
          ${t('modal.startGame')}
        </button>
      </div>
    `;

    this.open(modeNames[mode] || t('modal.startGame'), content);
  }
};

// Make available globally
window.Modal = Modal;
