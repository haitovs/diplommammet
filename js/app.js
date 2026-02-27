/**
 * GeoQuest - Main Application Controller
 */

// Global game instance
let currentGame = null;
if (typeof window !== 'undefined') {
  window.currentGame = null;
}

// Countries data (loaded from API or fallback)
let GAME_COUNTRIES = [];

const app = {
  isLoading: false,
  isOnline: false, // Default to offline
  mode: 'offline', // 'offline' or 'online'
  lastResults: null,

  /**
   * Initialize the application
   */
  async init() {
    console.log('🌍 GeoQuest initializing...');
    
    // Initialize components
    Toast.init();
    Modal.init();
    Confetti.init();
    Theme.init();
    await i18n.init();

    // Default to offline mode for stability
    Utils.offlineMode = true;

    // Load country data (from local source initially)
    await this.loadCountryData();

    // Load and display stats
    this.updateStatsDisplay();
    this.updateAchievementsDisplay();

    // Add keyboard shortcuts
    this.setupGlobalKeyboard();

    // Create particles
    this.createParticles();

    // Update UI for current mode
    this.updateModeUI();

    console.log('✅ GeoQuest ready!');
  },

  /**
   * Toggle between Offline and Online modes
   */
  async toggleMode() {
    this.mode = this.mode === 'offline' ? 'online' : 'offline';
    Utils.offlineMode = (this.mode === 'offline');
    this.isOnline = (this.mode === 'online');
    
    this.showLoading(true);
    await this.loadCountryData();
    this.updateModeUI();
    this.showLoading(false);
    
    Toast.show(
      this.mode === 'online' ? t('ui.switchedOnlineMode') : t('ui.switchedOfflineMode'),
      this.mode === 'online' ? 'success' : 'info'
    );
  },

  /**
   * Update UI based on current mode
   */
  updateModeUI() {
    // Update indicator
    const indicator = document.getElementById('online-indicator');
    if (indicator) {
      indicator.className = `online-indicator ${this.mode === 'online' ? 'online' : 'offline'}`;
      indicator.title = this.mode === 'online' ? t('ui.onlineModeTitle') : t('ui.offlineModeTitle');
      
      // Update text/icon inside indicator area
      const text = indicator.querySelector('.indicator-text');
      if (text) text.textContent = this.mode === 'online' ? t('common.online') : t('common.offline');
    }

    // Update Game Titles/Descriptions if needed
    document.body.classList.toggle('mode-online', this.mode === 'online');
  },

  /**
   * Load country data based on mode
   */
  async loadCountryData() {
    this.showLoading(true);
    
    try {
      if (this.mode === 'online' && typeof CountryAPI !== 'undefined') {
        const apiCountries = await CountryAPI.init();
        
        // Merge with local facts data
        if (typeof COUNTRIES !== 'undefined' && apiCountries.length > 0) {
          GAME_COUNTRIES = CountryAPI.mergeWithLocalFacts(apiCountries, COUNTRIES);
        } else if (apiCountries.length > 0) {
          GAME_COUNTRIES = apiCountries;
        } else {
          // API failed, fallback
          console.warn('API returned no data, falling back to local');
          GAME_COUNTRIES = COUNTRIES || [];
          this.mode = 'offline';
          Utils.offlineMode = true;
          this.isOnline = false;
        }
        console.log(`📊 [Online] Loaded ${GAME_COUNTRIES.length} countries`);
      } else {
        // Offline Mode
        GAME_COUNTRIES = COUNTRIES || [];
        console.log(`📊 [Offline] Loaded ${GAME_COUNTRIES.length} countries`);
      }
    } catch (error) {
      console.error('Failed to load countries:', error);
      GAME_COUNTRIES = COUNTRIES || [];
      this.mode = 'offline';
      Utils.offlineMode = true;
      this.isOnline = false;
    }
    
    this.showLoading(false);
  },

  /**
   * Show/hide loading state
   */
  showLoading(show) {
    this.isLoading = show;
    const hero = document.querySelector('.hero');
    if (hero) {
      hero.classList.toggle('loading', show);
    }
  },

  /**
   * Navigate to a screen
   */
  navigate(screenId) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    
    // Show target screen
    const screen = document.getElementById(`${screenId}-screen`);
    if (screen) {
      screen.classList.add('active');
      State.setScreen(screenId);
    }

    // Clean up current game if leaving game screen
    if (screenId !== 'game' && currentGame) {
      currentGame.destroy();
      currentGame = null;
      window.currentGame = null;
    }

    // Update stats when returning home
    if (screenId === 'home') {
      this.updateStatsDisplay();
      this.updateAchievementsDisplay();
    }
  },

  /**
   * Start a game - show options modal
   */
  startGame(mode) {
    Utils.playSound('click');
    Modal.showGameOptions(mode);
  },

  /**
   * Actually launch the game
   */
  launchGame(mode, difficulty) {
    this.navigate('game');

    // Set mode on game screen for theming
    const gameScreen = document.getElementById('game-screen');
    if (gameScreen) {
      gameScreen.dataset.mode = mode;
    }

    // Create appropriate game instance
    switch (mode) {
      case 'flags':
        currentGame = new FlagMasterGame();
        break;
      case 'capitals':
        currentGame = new CapitalCitiesGame();
        break;
      case 'shapes':
        currentGame = new ShapeShifterGame();
        break;
      case 'facts':
        currentGame = new FactDetectiveGame();
        break;
      case 'speed':
        currentGame = new SpeedGeographyGame();
        break;
      default:
        currentGame = new FlagMasterGame();
    }

    // Initialize the game
    currentGame.init({ difficulty });
    window.currentGame = currentGame;
  },

  /**
   * Exit current game
   */
  exitGame() {
    if (State.game.isPlaying) {
      // Confirm exit if game in progress
      if (confirm(t('modal.confirmQuit'))) {
        if (currentGame) {
          currentGame.destroy();
          currentGame = null;
          window.currentGame = null;
        }
        this.navigate('home');
      }
    } else {
      this.navigate('home');
    }
  },

  /**
   * Show results screen
   */
  showResults(results) {
    this.navigate('results');
    this.lastResults = results;

    // Update results UI
    const localizedTitle = Utils.getResultTitle(results.stars);
    document.getElementById('results-header').innerHTML = `
      <div class="results-emoji">${results.emoji}</div>
      <h2 class="results-title">${localizedTitle}</h2>
    `;

    // Stars
    const starsHtml = '⭐'.repeat(results.stars) + '☆'.repeat(3 - results.stars);
    document.getElementById('results-stars').textContent = starsHtml;

    // Score
    document.getElementById('results-score').textContent = results.score;

    // Stats
    document.getElementById('result-correct').textContent = `${results.correct}/${results.total}`;
    document.getElementById('result-accuracy').textContent = `${results.accuracy}%`;
    document.getElementById('result-streak').textContent = results.bestStreak;

    // Countries learned
    this.renderResultsCountries(results);

    // Celebration for good results
    if (results.stars >= 2) {
      Confetti.celebrate();
    }
  },

  /**
   * Render localized country chips in results
   */
  renderResultsCountries(results) {
    const countriesDiv = document.querySelector('.country-flags');
    if (!countriesDiv) return;

    const allCountries = (typeof GAME_COUNTRIES !== 'undefined' && GAME_COUNTRIES.length > 0)
      ? GAME_COUNTRIES
      : (COUNTRIES || []);

    if (results.countriesLearned.length > 0) {
      const countries = results.countriesLearned
        .map(id => (COUNTRIES || []).find(c => c.id === id) || allCountries.find(c => c.id === id))
        .filter(Boolean);

      countriesDiv.innerHTML = countries.map(c => `
        <span class="country-flag-item">${(typeof c.flag === 'string' && c.flag.startsWith('http'))
          ? (c.flagEmoji || Utils.getEmojiFlag(c.id))
          : (c.flag || c.flagEmoji || Utils.getEmojiFlag(c.id))} ${Utils.getCountryDisplayName(c)}</span>
      `).join('');

      document.getElementById('countries-learned').style.display = 'block';
    } else {
      document.getElementById('countries-learned').style.display = 'none';
    }
  },

  /**
   * Play the same game mode again
   */
  playAgain() {
    if (currentGame) {
      const mode = State.game.mode;
      const difficulty = State.game.difficulty;
      this.launchGame(mode, difficulty);
    } else {
      this.navigate('home');
    }
  },

  /**
   * Show stats modal
   */
  showStats() {
    Utils.playSound('click');
    Modal.showStats();
  },

  /**
   * Show settings modal
   */
  showSettings() {
    Utils.playSound('click');
    Modal.showSettings();
  },

  /**
   * Close modal
   */
  closeModal() {
    Modal.close();
  },

  /**
   * Update stats display on home screen
   */
  updateStatsDisplay() {
    const stats = Storage.getStats();
    
    const gamesEl = document.getElementById('stat-games');
    const correctEl = document.getElementById('stat-correct');
    const streakEl = document.getElementById('stat-streak');
    const countriesEl = document.getElementById('stat-countries');

    if (gamesEl) gamesEl.textContent = stats.gamesPlayed;
    if (correctEl) correctEl.textContent = stats.totalCorrect;
    if (streakEl) streakEl.textContent = stats.bestStreak;
    if (countriesEl) countriesEl.textContent = stats.countriesLearned.length;
  },

  /**
   * Update achievements display
   */
  updateAchievementsDisplay() {
    const stats = Storage.getStats();
    const achievementsRow = document.getElementById('achievements-row');
    
    if (!achievementsRow) return;

    const achievements = [
      { id: 'first_game', emoji: '🎮', title: t('achievements.firstGameDesc') },
      { id: 'correct_10', emoji: '🎯', title: t('achievements.correct10Desc') },
      { id: 'streak_5', emoji: '🔥', title: t('achievements.streak5Desc') },
      { id: 'countries_25', emoji: '🌍', title: t('achievements.countries25Desc') },
      { id: 'perfect_round', emoji: '⭐', title: t('achievements.perfectRoundDesc') },
      { id: 'speed_demon', emoji: '⚡', title: t('achievements.speedDemonDesc') }
    ];

    achievementsRow.innerHTML = achievements.map(a => {
      const unlocked = stats.achievements.includes(a.id);
      return `
        <div class="achievement ${unlocked ? 'unlocked' : 'locked'}" title="${a.title}">
          ${a.emoji}
        </div>
      `;
    }).join('') + `<div class="achievement-more">${t('achievements.more', { count: 19 })}</div>`;
  },

  /**
   * Refresh dynamic localized UI after language change
   */
  refreshLocalization() {
    this.updateModeUI();
    this.updateStatsDisplay();
    this.updateAchievementsDisplay();

    if (typeof Modal !== 'undefined' && State.ui.modalOpen && typeof Modal.refreshCurrentView === 'function') {
      Modal.refreshCurrentView();
    }

    if (State.ui.currentScreen === 'game' && currentGame) {
      currentGame.updateUI();
      currentGame.updateProgress();
    }

    if (State.ui.currentScreen === 'results' && this.lastResults) {
      const localizedTitle = Utils.getResultTitle(this.lastResults.stars);
      const header = document.getElementById('results-header');
      if (header) {
        header.innerHTML = `
          <div class="results-emoji">${this.lastResults.emoji}</div>
          <h2 class="results-title">${localizedTitle}</h2>
        `;
      }
      this.renderResultsCountries(this.lastResults);
    }
  },

  /**
   * Setup global keyboard shortcuts
   */
  setupGlobalKeyboard() {
    document.addEventListener('keydown', (e) => {
      // Escape to go back/close
      if (e.key === 'Escape') {
        if (State.ui.modalOpen) {
          this.closeModal();
        } else if (State.ui.currentScreen === 'game') {
          this.exitGame();
        }
      }
    });
  },

  /**
   * Create floating particles
   */
  createParticles() {
    const container = document.querySelector('.particles');
    if (!container) return;

    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 4 + 2}px;
        height: ${Math.random() * 4 + 2}px;
        background: rgba(99, 102, 241, ${Math.random() * 0.3 + 0.1});
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: float ${Math.random() * 10 + 10}s ease-in-out infinite;
        animation-delay: ${Math.random() * 5}s;
      `;
      container.appendChild(particle);
    }
  }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  app.init();
});

// Make app available globally
window.app = app;
