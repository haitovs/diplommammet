/**
 * GeoQuest - LocalStorage Manager
 */

const Storage = {
  PREFIX: 'geoquest_',

  /**
   * Get item from storage
   */
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(this.PREFIX + key);
      if (item === null) return defaultValue;
      return JSON.parse(item);
    } catch (e) {
      console.warn('Storage.get error:', e);
      return defaultValue;
    }
  },

  /**
   * Set item in storage
   */
  set(key, value) {
    try {
      localStorage.setItem(this.PREFIX + key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.warn('Storage.set error:', e);
      return false;
    }
  },

  /**
   * Remove item from storage
   */
  remove(key) {
    try {
      localStorage.removeItem(this.PREFIX + key);
      return true;
    } catch (e) {
      return false;
    }
  },

  /**
   * Clear all GeoQuest data
   */
  clear() {
    try {
      Object.keys(localStorage)
        .filter(key => key.startsWith(this.PREFIX))
        .forEach(key => localStorage.removeItem(key));
      return true;
    } catch (e) {
      return false;
    }
  },

  /**
   * Get all stats
   */
  getStats() {
    return this.get('stats', {
      gamesPlayed: 0,
      totalCorrect: 0,
      totalQuestions: 0,
      bestStreak: 0,
      countriesLearned: [],
      gameStats: {
        flags: { played: 0, bestScore: 0 },
        capitals: { played: 0, bestScore: 0 },
        shapes: { played: 0, bestScore: 0 },
        facts: { played: 0, bestScore: 0 },
        speed: { played: 0, bestScore: 0 }
      },
      achievements: [],
      lastPlayed: null
    });
  },

  /**
   * Update stats
   */
  updateStats(updates) {
    const current = this.getStats();
    const updated = { ...current, ...updates };
    this.set('stats', updated);
    return updated;
  },

  /**
   * Add countries to learned list
   */
  addLearnedCountries(countryIds) {
    const stats = this.getStats();
    const learned = new Set(stats.countriesLearned);
    countryIds.forEach(id => learned.add(id));
    stats.countriesLearned = Array.from(learned);
    this.set('stats', stats);
    return stats.countriesLearned.length;
  },

  /**
   * Update game mode stats
   */
  updateGameStats(gameMode, score) {
    const stats = this.getStats();
    if (!stats.gameStats[gameMode]) {
      stats.gameStats[gameMode] = { played: 0, bestScore: 0 };
    }
    stats.gameStats[gameMode].played++;
    if (score > stats.gameStats[gameMode].bestScore) {
      stats.gameStats[gameMode].bestScore = score;
    }
    this.set('stats', stats);
    return stats.gameStats[gameMode];
  },

  /**
   * Unlock achievement
   */
  unlockAchievement(achievementId) {
    const stats = this.getStats();
    if (!stats.achievements.includes(achievementId)) {
      stats.achievements.push(achievementId);
      this.set('stats', stats);
      return true; // New achievement
    }
    return false; // Already unlocked
  },

  /**
   * Get settings
   */
  getSettings() {
    return this.get('settings', {
      soundEnabled: true,
      difficulty: 'medium',
      questionCount: 10,
      showHints: true
    });
  },

  /**
   * Update settings
   */
  updateSettings(updates) {
    const current = this.getSettings();
    const updated = { ...current, ...updates };
    this.set('settings', updated);
    return updated;
  }
};

// Make available globally
window.Storage = Storage;
