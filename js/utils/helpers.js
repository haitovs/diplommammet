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
   * Get active language with fallback
   */
  getCurrentLanguage(lang = null) {
    const requested = typeof lang === 'string' && lang ? lang : null;
    const active = requested || (typeof i18n !== 'undefined' ? i18n.current : 'en') || 'en';
    return ['en', 'ru', 'tk'].includes(active) ? active : 'en';
  },

  /**
   * Unicode-safe normalization for typed answers.
   * Keeps letters and numbers only, strips spaces/punctuation/diacritics.
   */
  normalizeAnswer(text) {
    if (text === null || text === undefined) return '';
    return String(text)
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^\p{L}\p{N}]+/gu, '');
  },

  /**
   * Get canonical local country record by id (if available)
   */
  getCanonicalCountry(country) {
    if (!country || typeof country !== 'object') return null;
    const id = String(country.id || '').toLowerCase();
    if (!id || typeof COUNTRIES === 'undefined') return country;
    return COUNTRIES.find(c => c.id === id) || country;
  },

  /**
   * Get localized country content for the requested/active language.
   */
  getCountryLocalization(country, lang = null) {
    if (!country || typeof country !== 'object') return null;

    const langCode = this.getCurrentLanguage(lang);
    if (langCode === 'en') return null;

    const id = String(country.id || '').toLowerCase();
    if (!id || typeof COUNTRY_LOCALIZATION === 'undefined') return null;

    const localized = COUNTRY_LOCALIZATION[id]?.[langCode];
    if (!localized) return null;

    const required = ['name', 'capital', 'continent', 'region'];
    const hasRequired = required.every(key => typeof localized[key] === 'string' && localized[key].trim().length > 0);
    if (!hasRequired) return null;

    return localized;
  },

  /**
   * Localized display name with English fallback.
   */
  getCountryDisplayName(country, lang = null) {
    if (!country) return '';
    const localized = this.getCountryLocalization(country, lang);
    if (localized?.name) return localized.name;
    const canonical = this.getCanonicalCountry(country);
    return canonical?.name || country.name || '';
  },

  /**
   * Localized capital with English fallback.
   */
  getCountryCapital(country, lang = null) {
    if (!country) return '';
    const localized = this.getCountryLocalization(country, lang);
    if (localized?.capital) return localized.capital;
    const canonical = this.getCanonicalCountry(country);
    return canonical?.capital || country.capital || '';
  },

  /**
   * Localized continent with English fallback.
   */
  getCountryContinent(country, lang = null) {
    if (!country) return '';
    const localized = this.getCountryLocalization(country, lang);
    if (localized?.continent) return localized.continent;
    const canonical = this.getCanonicalCountry(country);
    return canonical?.continent || country.continent || '';
  },

  /**
   * Localized region with English fallback.
   */
  getCountryRegion(country, lang = null) {
    if (!country) return '';
    const localized = this.getCountryLocalization(country, lang);
    if (localized?.region) return localized.region;
    const canonical = this.getCanonicalCountry(country);
    return canonical?.region || country.region || '';
  },

  /**
   * Localized fact clues with English fallback.
   */
  getCountryFacts(country, lang = null) {
    if (!country) return [];
    const localized = this.getCountryLocalization(country, lang);
    if (localized?.facts && Array.isArray(localized.facts) && localized.facts.length === 5) {
      return localized.facts;
    }

    const canonical = this.getCanonicalCountry(country);
    if (Array.isArray(canonical?.facts) && canonical.facts.length > 0) {
      return canonical.facts;
    }
    if (Array.isArray(country.facts) && country.facts.length > 0) {
      return country.facts;
    }
    return [];
  },

  /**
   * Gather country answer aliases across EN + localized variants.
   */
  getCountryAnswerAliases(country) {
    if (!country) return [];

    const aliasSet = new Set();
    const canonical = this.getCanonicalCountry(country);
    const id = String(country.id || canonical?.id || '').toLowerCase();

    const add = value => {
      if (typeof value === 'string' && value.trim()) {
        aliasSet.add(value.trim());
      }
    };

    add(country.name);
    add(canonical?.name);

    if (Array.isArray(country.aliases)) {
      country.aliases.forEach(add);
    }

    if (typeof COUNTRY_LOCALIZATION !== 'undefined' && id && COUNTRY_LOCALIZATION[id]) {
      ['ru', 'tk'].forEach(langCode => {
        const loc = COUNTRY_LOCALIZATION[id][langCode];
        if (!loc) return;
        add(loc.name);
        if (Array.isArray(loc.aliases)) {
          loc.aliases.forEach(add);
        }
      });
    }

    const extraAliasesById = {
      us: ['USA', 'U.S.A.', 'US', 'U.S.', 'United States of America', 'America'],
      gb: ['UK', 'U.K.', 'United Kingdom', 'Great Britain', 'Britain'],
      ae: ['UAE', 'U.A.E.', 'Emirates', 'United Arab Emirates'],
      kr: ['South Korea', 'Korea', 'Republic of Korea'],
      nl: ['Holland', 'The Netherlands']
    };
    (extraAliasesById[id] || []).forEach(add);

    return [...aliasSet];
  },

  /**
   * Check typed answer against multilingual aliases.
   */
  matchesCountryAnswer(input, country) {
    const normalizedInput = this.normalizeAnswer(input);
    if (!normalizedInput || !country) return false;

    return this.getCountryAnswerAliases(country).some(alias => {
      return this.normalizeAnswer(alias) === normalizedInput;
    });
  },

  /**
   * Check if string matches (case-insensitive, trimmed)
   */
  matchesAnswer(input, answer) {
    return this.normalizeAnswer(input) === this.normalizeAnswer(answer);
  },

  /**
   * Get similar matches for a guess
   */
  getSimilarCountries(guess, countries) {
    const normalizedGuess = this.normalizeAnswer(guess);
    if (!normalizedGuess) return [];

    return countries.filter(c => {
      return this.getCountryAnswerAliases(c).some(alias => this.normalizeAnswer(alias).includes(normalizedGuess));
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
    if (typeof t === 'function') {
      const titleKeys = {
        0: 'results.keepPracticing',
        1: 'results.goodEffort',
        2: 'results.greatJob',
        3: 'results.perfectScore'
      };
      return t(titleKeys[stars] || 'results.gameOver');
    }

    const fallbackTitles = {
      0: 'Keep Practicing!',
      1: 'Good Effort!',
      2: 'Great Job!',
      3: 'Perfect Score!'
    };
    return fallbackTitles[stars] || 'Game Over!';
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
    const localizedName = this.getCountryDisplayName(country);
    
    // Check if offline mode and local image likely exists (basic check by ID)
    if (this.offlineMode) {
      // Local path: assets/flags/{id}.png
      // Fallback to CDN if load fails (handled by onerror)
      return `<img 
        src="assets/flags/${country.id}.png" 
        alt="${localizedName}" 
        class="flag-img" 
        onerror="this.src='https://flagcdn.com/w320/${country.id}.png'; this.onerror=null;" 
      />`;
    }

    const flag = country.flag || '';
    const flagEmoji = country.flagEmoji || this.getEmojiFlag(country.id) || '🏳️';
    
    // Online mode: Check if flag is a URL
    if (flag.startsWith('http')) {
      return `<img src="${flag}" alt="${localizedName || 'Flag'}" class="flag-img" onerror="this.style.display='none';this.nextElementSibling.style.display='inline-block';" /><span class="flag-emoji" style="display:none;">${flagEmoji}</span>`;
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
