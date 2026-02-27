/**
 * GeoQuest - Theme Manager
 * Handles light/dark theme switching with persistence
 */

const Theme = {
  STORAGE_KEY: 'geoquest_theme',
  
  // Available themes
  THEMES: {
    dark: 'dark',
    light: 'light'
  },
  
  // Current theme
  current: 'dark',

  tr(key, fallback) {
    if (typeof t !== 'function') return fallback;
    const translated = t(key);
    return translated === key ? fallback : translated;
  },
  
  /**
   * Initialize theme system
   */
  init() {
    // Load saved preference or detect system preference
    const saved = localStorage.getItem(this.STORAGE_KEY);
    
    if (saved && this.THEMES[saved]) {
      this.current = saved;
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      this.current = 'light';
    } else {
      this.current = 'dark';
    }
    
    this.apply();
    
    // Listen for system theme changes
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem(this.STORAGE_KEY)) {
          this.current = e.matches ? 'dark' : 'light';
          this.apply();
        }
      });
    }
    
    console.log(`🎨 Theme initialized: ${this.current}`);
  },
  
  /**
   * Apply current theme to document
   */
  apply() {
    document.documentElement.setAttribute('data-theme', this.current);
    this.updateToggleButton();
  },
  
  /**
   * Toggle between light and dark themes
   */
  toggle() {
    this.current = this.current === 'dark' ? 'light' : 'dark';
    localStorage.setItem(this.STORAGE_KEY, this.current);
    this.apply();
    
    // Announce to user
    if (typeof Toast !== 'undefined') {
      Toast.show(
        this.current === 'light'
          ? `☀️ ${this.tr('ui.lightModeEnabled', 'Light mode')}`
          : `🌙 ${this.tr('ui.darkModeEnabled', 'Dark mode')}`,
        'info'
      );
    }
  },
  
  /**
   * Set specific theme
   */
  set(themeName) {
    if (this.THEMES[themeName]) {
      this.current = themeName;
      localStorage.setItem(this.STORAGE_KEY, this.current);
      this.apply();
    }
  },
  
  /**
   * Update toggle button appearance
   */
  updateToggleButton() {
    const btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.innerHTML = this.current === 'dark' 
        ? `<span class="nav-icon">☀️</span><span class="nav-label">${this.tr('common.light', 'Light')}</span>`
        : `<span class="nav-icon">🌙</span><span class="nav-label">${this.tr('common.dark', 'Dark')}</span>`;
      btn.title = this.current === 'dark'
        ? this.tr('ui.switchToLightMode', 'Switch to Light Mode')
        : this.tr('ui.switchToDarkMode', 'Switch to Dark Mode');
    }
  }
};

// Make available globally
window.Theme = Theme;
