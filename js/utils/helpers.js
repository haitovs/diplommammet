/**
 * GeoQuest - Helper Utilities
 */

const Utils = {
  /**
   * Shuffle an array using Fisher-Yates algorithm
   */
  shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  },

  /**
   * Get random items from an array
   */
  getRandomItems(array, count) {
    return this.shuffle(array).slice(0, count);
  },

  /**
   * Get a random item from an array
   */
  getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
  },

  /**
   * Debounce function
   */
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  /**
   * Format number with commas
   */
  formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },

  /**
   * Format time as MM:SS
   */
  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  },

  /**
   * Calculate percentage
   */
  percentage(value, total) {
    if (total === 0) return 0;
    return Math.round((value / total) * 100);
  },

  /**
   * Clamp a number between min and max
   */
  clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
  },

  /**
   * Generate unique ID
   */
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  },

  /**
   * Check if string matches (case-insensitive, trimmed)
   */
  matchesAnswer(input, answer) {
    const normalize = str => str.toLowerCase().trim().replace(/[^a-z0-9]/g, '');
    return normalize(input) === normalize(answer);
  },

  /**
   * Get similar matches for a guess
   */
  getSimilarCountries(guess, countries) {
    const normalizedGuess = guess.toLowerCase().trim();
    return countries.filter(c => {
      const name = c.name.toLowerCase();
      return name.includes(normalizedGuess) || normalizedGuess.includes(name.substring(0, 3));
    });
  },

  /**
   * Calculate stars based on score percentage
   */
  calculateStars(correct, total) {
    if (total === 0) return 0;
    const percentage = (correct / total) * 100;
    if (percentage >= 90) return 3;
    if (percentage >= 70) return 2;
    if (percentage >= 50) return 1;
    return 0;
  },

  /**
   * Get emoji for result
   */
  getResultEmoji(stars) {
    const emojis = {
      0: '😢',
      1: '😊',
      2: '🎉',
      3: '🏆'
    };
    return emojis[stars] || '🎮';
  },

  /**
   * Get title based on score
   */
  getResultTitle(stars) {
    const titles = {
      0: 'Keep Practicing!',
      1: 'Good Effort!',
      2: 'Great Job!',
      3: 'Perfect Score!'
    };
    return titles[stars] || 'Game Over!';
  },

  /**
   * Sleep/delay function
   */
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },

  /**
   * Check if device is mobile
   */
  isMobile() {
    return window.innerWidth <= 768;
  },

  /**
   * Escape HTML to prevent XSS
   */
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  },

  /**
   * Parse query parameters
   */
  getQueryParams() {
    const params = {};
    const searchParams = new URLSearchParams(window.location.search);
    for (const [key, value] of searchParams) {
      params[key] = value;
    }
    return params;
  },

  /**
   * Play sound effect
   */
  playSound(soundName) {
    if (!Storage.get('soundEnabled', true)) return;
    
    // Simple beep sounds using Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    const sounds = {
      correct: { freq: 800, duration: 0.15 },
      wrong: { freq: 200, duration: 0.3 },
      click: { freq: 600, duration: 0.05 },
      success: { freq: 1000, duration: 0.2 },
      tick: { freq: 400, duration: 0.05 },
      hint: { freq: 500, duration: 0.1 }
    };
    
    const sound = sounds[soundName] || sounds.click;
    oscillator.frequency.value = sound.freq;
    gainNode.gain.value = 0.1;
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + sound.duration);
  },

  /**
   * Offline mode flag
   */
  offlineMode: true,

  /**
   * Render flag as image or emoji
   */
  renderFlag(country, size = 'medium') {
    if (!country) return '🏳️';
    
    // Check if offline mode and local image likely exists (basic check by ID)
    if (this.offlineMode) {
      // Local path: assets/flags/{id}.png
      // Fallback to CDN if load fails (handled by onerror)
      return `<img 
        src="assets/flags/${country.id}.png" 
        alt="${country.name}" 
        class="flag-img" 
        onerror="this.src='https://flagcdn.com/w320/${country.id}.png'; this.onerror=null;" 
      />`;
    }

    const flag = country.flag || '';
    const flagEmoji = country.flagEmoji || this.getEmojiFlag(country.id) || '🏳️';
    
    // Online mode: Check if flag is a URL
    if (flag.startsWith('http')) {
      return `<img src="${flag}" alt="${country.name || 'Flag'}" class="flag-img" onerror="this.style.display='none';this.nextElementSibling.style.display='inline-block';" /><span class="flag-emoji" style="display:none;">${flagEmoji}</span>`;
    }
    
    // If flag is emoji or short string
    if (flag.length <= 4 || !flag.includes('/')) {
      return `<span class="flag-emoji">${flag || flagEmoji}</span>`;
    }
    
    return `<span class="flag-emoji">${flagEmoji}</span>`;
  },

  /**
   * Get emoji flag from country code
   */
  getEmojiFlag(countryCode) {
    if (!countryCode) return '🏳️';
    const code = countryCode.toUpperCase();
    const offset = 127397;
    try {
      return String.fromCodePoint(...[...code].map(c => c.charCodeAt(0) + offset));
    } catch (e) {
      return '🏳️';
    }
  }
};

// Make available globally
window.Utils = Utils;
