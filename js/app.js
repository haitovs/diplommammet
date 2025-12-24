/**
 * GeoQuest - Main Application Controller
 */

// Global game instance
let currentGame = null;

const app = {
  /**
   * Initialize the application
   */
  init() {
    console.log('🌍 GeoQuest initializing...');
    
    // Initialize components
    Toast.init();
    Modal.init();
    Confetti.init();

    // Load and display stats
    this.updateStatsDisplay();
    this.updateAchievementsDisplay();

    // Add keyboard shortcuts
    this.setupGlobalKeyboard();

    // Create particles
    this.createParticles();

    console.log('✅ GeoQuest ready!');
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

    // Create appropriate game instance
    switch (mode) {
      case 'flags':
        currentGame = new FlagMasterGame();
        break;
      case 'capitals':
        currentGame = new CapitalCitiesGame();
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
  },

  /**
   * Exit current game
   */
  exitGame() {
    if (State.game.isPlaying) {
      // Confirm exit if game in progress
      if (confirm('Are you sure you want to quit? Your progress will be lost.')) {
        if (currentGame) {
          currentGame.destroy();
          currentGame = null;
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

    // Update results UI
    document.getElementById('results-header').innerHTML = `
      <div class="results-emoji">${results.emoji}</div>
      <h2 class="results-title">${results.title}</h2>
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
    const countriesDiv = document.querySelector('.country-flags');
    if (countriesDiv && results.countriesLearned.length > 0) {
      const countries = results.countriesLearned
        .map(id => COUNTRIES.find(c => c.id === id))
        .filter(Boolean);
      
      countriesDiv.innerHTML = countries.map(c => `
        <span class="country-flag-item">${c.flag} ${c.name}</span>
      `).join('');
      
      document.getElementById('countries-learned').style.display = 'block';
    } else {
      document.getElementById('countries-learned').style.display = 'none';
    }

    // Celebration for good results
    if (results.stars >= 2) {
      Confetti.celebrate();
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
      { id: 'first_game', emoji: '🎮', title: 'First Game' },
      { id: 'correct_10', emoji: '🎯', title: '10 Correct' },
      { id: 'streak_5', emoji: '🔥', title: '5 Streak' },
      { id: 'countries_25', emoji: '🌍', title: '25 Countries' },
      { id: 'perfect_round', emoji: '⭐', title: 'Perfect Round' },
      { id: 'speed_demon', emoji: '⚡', title: 'Speed Demon' }
    ];

    achievementsRow.innerHTML = achievements.map(a => {
      const unlocked = stats.achievements.includes(a.id);
      return `
        <div class="achievement ${unlocked ? 'unlocked' : 'locked'}" title="${a.title}">
          ${a.emoji}
        </div>
      `;
    }).join('') + `<div class="achievement-more">+19 more</div>`;
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
