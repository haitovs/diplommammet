/**
 * GeoQuest - Internationalization (i18n) Manager
 * Handles multilingual support for EN, RU, and TK
 */

const i18n = {
  STORAGE_KEY: 'geoquest_language',
  
  // Available languages
  LANGUAGES: {
    en: { name: 'English', flag: '🇬🇧' },
    ru: { name: 'Русский', flag: '🇷🇺' },
    tk: { name: 'Türkmen', flag: '🇹🇲' }
  },
  
  // Current language
  current: 'en',
  
  // Loaded translations
  translations: {},
  
  // Translation cache
  cache: {},
  
  /**
   * Initialize i18n system
   */
  async init() {
    // Load saved preference or detect browser language
    const saved = localStorage.getItem(this.STORAGE_KEY);
    
    if (saved && this.LANGUAGES[saved]) {
      this.current = saved;
    } else {
      // Detect from browser
      const browserLang = navigator.language?.slice(0, 2).toLowerCase();
      if (this.LANGUAGES[browserLang]) {
        this.current = browserLang;
      }
    }
    
    // Load translations
    await this.loadLanguage(this.current);
    
    // Apply to DOM
    this.applyTranslations();
    this.updateLanguageSelector();
    document.documentElement.lang = this.current;
    this.refreshDynamicUI();
    
    console.log(`🌐 i18n initialized: ${this.current}`);
  },
  
  /**
   * Load language translations
   */
  async loadLanguage(langCode) {
    if (this.cache[langCode]) {
      this.translations = this.cache[langCode];
      return;
    }
    
    try {
      // Try to load from file
      const response = await fetch(`js/i18n/${langCode}.json`);
      if (response.ok) {
        this.translations = await response.json();
        this.cache[langCode] = this.translations;
      } else {
        // Fallback to embedded translations
        this.translations = this.getEmbeddedTranslations(langCode);
        this.cache[langCode] = this.translations;
      }
    } catch (error) {
      console.warn(`Failed to load ${langCode} translations:`, error);
      this.translations = this.getEmbeddedTranslations(langCode);
      this.cache[langCode] = this.translations;
    }
  },
  
  /**
   * Get translation by key
   */
  t(key, params = {}) {
    const keys = key.split('.');
    let value = this.translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key; // Return key if not found
      }
    }
    
    if (typeof value !== 'string') {
      return key;
    }
    
    // Replace placeholders {{param}}
    return value.replace(/\{\{(\w+)\}\}/g, (match, param) => {
      return params[param] !== undefined ? params[param] : match;
    });
  },
  
  /**
   * Set language
   */
  async setLanguage(langCode) {
    if (!this.LANGUAGES[langCode]) return;
    
    this.current = langCode;
    localStorage.setItem(this.STORAGE_KEY, langCode);
    
    await this.loadLanguage(langCode);
    this.applyTranslations();
    this.updateLanguageSelector();
    document.documentElement.lang = langCode;
    this.refreshDynamicUI();
    
    if (typeof Toast !== 'undefined') {
      Toast.show(`${this.LANGUAGES[langCode].flag} ${this.LANGUAGES[langCode].name}`, 'info');
    }
  },

  /**
   * Refresh dynamic parts of UI that are not driven by data-i18n attributes
   */
  refreshDynamicUI() {
    if (typeof Theme !== 'undefined' && typeof Theme.updateToggleButton === 'function') {
      Theme.updateToggleButton();
    }

    if (typeof app !== 'undefined' && typeof app.refreshLocalization === 'function') {
      app.refreshLocalization();
    }
  },
  
  /**
   * Apply translations to DOM elements with data-i18n attribute
   */
  applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translated = this.t(key);
      
      if (el.hasAttribute('data-i18n-attr')) {
        const attr = el.getAttribute('data-i18n-attr');
        el.setAttribute(attr, translated);
      } else {
        el.textContent = translated;
      }
    });
    
    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      el.placeholder = this.t(key);
    });
    
    // Update titles
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      el.title = this.t(key);
    });
  },
  
  /**
   * Update language selector UI
   */
  updateLanguageSelector() {
    const selector = document.getElementById('language-selector');
    if (selector) {
      selector.innerHTML = Object.entries(this.LANGUAGES).map(([code, lang]) => `
        <button class="lang-btn ${code === this.current ? 'active' : ''}" 
                onclick="i18n.setLanguage('${code}')"
                title="${lang.name}">
          ${lang.flag}
        </button>
      `).join('');
    }
  },

  /**
   * Deep merge helper for fallback dictionaries
   */
  deepMerge(base, updates) {
    const result = { ...base };

    Object.entries(updates || {}).forEach(([key, value]) => {
      if (
        value &&
        typeof value === 'object' &&
        !Array.isArray(value) &&
        result[key] &&
        typeof result[key] === 'object' &&
        !Array.isArray(result[key])
      ) {
        result[key] = this.deepMerge(result[key], value);
      } else {
        result[key] = value;
      }
    });

    return result;
  },
  
  /**
   * Embedded translations fallback
   */
  getEmbeddedTranslations(langCode) {
    const translations = {
      en: {
        common: {
          play: "Play",
          home: "Home",
          settings: "Settings",
          stats: "Stats",
          back: "Back",
          close: "Close",
          cancel: "Cancel",
          confirm: "Confirm",
          save: "Save",
          reset: "Reset",
          score: "Score",
          streak: "Streak",
          correct: "Correct",
          wrong: "Wrong",
          skip: "Skip",
          hint: "Hint",
          next: "Next",
          finish: "Finish",
          playAgain: "Play Again",
          loading: "Loading..."
        },
        games: {
          flagMaster: "Flag Master",
          flagMasterDesc: "Identify countries by their flags",
          capitalCities: "Capital Cities",
          capitalCitiesDesc: "Match countries with their capitals",
          shapeShifter: "Shape Shifter",
          shapeShifterDesc: "Recognize countries by their outline",
          factDetective: "Fact Detective",
          factDetectiveDesc: "Guess countries from clever clues",
          speedGeography: "Speed Geography",
          speedGeographyDesc: "30-second rapid-fire challenge",
          whichCountryFlag: "Which country does this flag belong to?",
          whichCountryCapital: "Which country has this capital city?",
          whatCapital: "What is the capital of this country?",
          whichCountryShape: "Which country has this shape?",
          whichCountryClues: "Which country matches these clues?",
          nameThisCountry: "Name this country!",
          typeYourGuess: "Type your guess...",
          guess: "Guess",
          revealHint: "Reveal Hint",
          hintsLeft: "{{count}} left",
          noHintsLeft: "No hints left",
          noMoreHints: "No more hints available!"
        },
        results: {
          greatJob: "Great Job!",
          perfectScore: "Perfect Score!",
          goodEffort: "Good Effort!",
          keepPracticing: "Keep Practicing!",
          gameOver: "Game Over!",
          pointsEarned: "Points Earned",
          accuracy: "Accuracy",
          bestStreak: "Best Streak",
          countriesLearned: "Countries Learned"
        },
        stats: {
          yourProgress: "Your Progress",
          gamesPlayed: "Games Played",
          correctAnswers: "Correct Answers",
          countriesKnown: "Countries Known",
          achievements: "Achievements",
          resetStats: "Reset All Stats"
        },
        hero: {
          eyebrow: "Geography Learning Game",
          title: "Test Your",
          titleHighlight: "World Knowledge",
          subtitle: "Explore countries, flags, capitals, and fascinating facts through engaging mini-games. No account needed — just pick a game and start playing!"
        },
        nav: {
          chooseChallenge: "Choose Your Challenge",
          uniqueWays: "5 unique ways to test your geography skills",
          allLevels: "All Levels",
          easy: "Easy",
          medium: "Medium",
          hard: "Hard",
          startChallenge: "Start Challenge"
        },
        feedback: {
          correctPoints: "Correct! +{{points}} points",
          notQuiteAnswerWas: "Not quite! The answer was:",
          hintsUsed: "({{count}} hint(s) used)",
          noHintsNeeded: "(No hints needed!)"
        },
        modal: {
          startGame: "Start Game",
          chooseDifficulty: "Choose your difficulty level to begin.",
          speedDesc: "Test all your skills in a 30-second rapid-fire challenge!",
          confirmQuit: "Are you sure you want to quit? Your progress will be lost."
        }
      },
      ru: {
        common: {
          play: "Играть",
          home: "Главная",
          settings: "Настройки",
          stats: "Статистика",
          back: "Назад",
          close: "Закрыть",
          cancel: "Отмена",
          confirm: "Подтвердить",
          save: "Сохранить",
          reset: "Сбросить",
          score: "Счёт",
          streak: "Серия",
          correct: "Правильно",
          wrong: "Неправильно",
          skip: "Пропустить",
          hint: "Подсказка",
          next: "Далее",
          finish: "Завершить",
          playAgain: "Играть снова",
          loading: "Загрузка..."
        },
        games: {
          flagMaster: "Мастер флагов",
          flagMasterDesc: "Определите страны по их флагам",
          capitalCities: "Столицы мира",
          capitalCitiesDesc: "Сопоставьте страны с их столицами",
          shapeShifter: "Контуры стран",
          shapeShifterDesc: "Узнайте страны по их контуру",
          factDetective: "Детектив фактов",
          factDetectiveDesc: "Угадайте страну по подсказкам",
          speedGeography: "Скоростная география",
          speedGeographyDesc: "30-секундный блиц-турнир",
          whichCountryFlag: "Какой стране принадлежит этот флаг?",
          whichCountryCapital: "Столицей какой страны является этот город?",
          whatCapital: "Какая столица у этой страны?",
          whichCountryShape: "Какой стране принадлежит этот контур?",
          whichCountryClues: "Какая страна соответствует этим подсказкам?",
          nameThisCountry: "Назовите эту страну!",
          typeYourGuess: "Введите ваш ответ...",
          guess: "Ответить",
          revealHint: "Показать подсказку",
          hintsLeft: "Осталось: {{count}}",
          noHintsLeft: "Подсказок нет",
          noMoreHints: "Больше подсказок нет!"
        },
        results: {
          greatJob: "Отлично!",
          perfectScore: "Идеальный результат!",
          goodEffort: "Хорошая попытка!",
          keepPracticing: "Продолжайте практиковаться!",
          gameOver: "Игра окончена!",
          pointsEarned: "Набрано очков",
          accuracy: "Точность",
          bestStreak: "Лучшая серия",
          countriesLearned: "Изучено стран"
        },
        stats: {
          yourProgress: "Ваш прогресс",
          gamesPlayed: "Игр сыграно",
          correctAnswers: "Правильных ответов",
          countriesKnown: "Стран изучено",
          achievements: "Достижения",
          resetStats: "Сбросить статистику"
        },
        hero: {
          eyebrow: "Игра для изучения географии",
          title: "Проверьте свои",
          titleHighlight: "знания о мире",
          subtitle: "Исследуйте страны, флаги, столицы и интересные факты в увлекательных мини-играх. Регистрация не нужна — просто выберите игру и начните!"
        },
        nav: {
          chooseChallenge: "Выберите испытание",
          uniqueWays: "5 уникальных способов проверить знания географии",
          allLevels: "Все уровни",
          easy: "Легко",
          medium: "Средне",
          hard: "Сложно",
          startChallenge: "Начать"
        },
        feedback: {
          correctPoints: "Правильно! +{{points}} очков",
          notQuiteAnswerWas: "Не совсем! Правильный ответ:",
          hintsUsed: "(использовано подсказок: {{count}})",
          noHintsNeeded: "(Без подсказок!)"
        },
        modal: {
          startGame: "Начать игру",
          chooseDifficulty: "Выберите уровень сложности.",
          speedDesc: "Проверьте все навыки в 30-секундном блиц-турнире!",
          confirmQuit: "Вы уверены, что хотите выйти? Прогресс будет потерян."
        }
      },
      tk: {
        common: {
          play: "Oýna",
          home: "Baş sahypa",
          settings: "Sazlamalar",
          stats: "Statistika",
          back: "Yza",
          close: "Ýap",
          cancel: "Goýbolsun",
          confirm: "Tassykla",
          save: "Sakla",
          reset: "Täzeden başla",
          score: "Bal",
          streak: "Yzygider",
          correct: "Dogry",
          wrong: "Nädogry",
          skip: "Geç",
          hint: "Maslahat",
          next: "Indiki",
          finish: "Gutardy",
          playAgain: "Täzeden oýna",
          loading: "Ýüklenýär..."
        },
        games: {
          flagMaster: "Baýdak ussady",
          flagMasterDesc: "Ýurtlary baýdaklary boýunça tana",
          capitalCities: "Paýtagt şäherleri",
          capitalCitiesDesc: "Ýurtlary paýtagtlary bilen gabat getir",
          shapeShifter: "Şekil çalşyjy",
          shapeShifterDesc: "Ýurtlary çyzgylary boýunça tana",
          factDetective: "Fakt detektiwi",
          factDetectiveDesc: "Maslahatlara görä ýurdy tap",
          speedGeography: "Tizlik geografiýasy",
          speedGeographyDesc: "30 sekuntlyk çalt sorag",
          whichCountryFlag: "Bu baýdak haýsy ýurda degişli?",
          whichCountryCapital: "Bu şäher haýsy ýurduň paýtagty?",
          whatCapital: "Bu ýurduň paýtagty näme?",
          whichCountryShape: "Bu şekil haýsy ýurda degişli?",
          whichCountryClues: "Haýsy ýurt bu maslahatlara gabat gelýär?",
          nameThisCountry: "Bu ýurdy adyňyz!",
          typeYourGuess: "Jogabyňyzy ýazyň...",
          guess: "Çakla",
          revealHint: "Maslahat görkez",
          hintsLeft: "{{count}} galdy",
          noHintsLeft: "Maslahat ýok",
          noMoreHints: "Başga maslahat ýok!"
        },
        results: {
          greatJob: "Berekella!",
          perfectScore: "Ajaýyp netije!",
          goodEffort: "Gowy synanyşyk!",
          keepPracticing: "Türgenleşmegi dowam et!",
          gameOver: "Oýun gutardy!",
          pointsEarned: "Gazanylan bal",
          accuracy: "Takyklyk",
          bestStreak: "Iň gowy yzygider",
          countriesLearned: "Öwrenilen ýurtlar"
        },
        stats: {
          yourProgress: "Siziň ösüşiňiz",
          gamesPlayed: "Oýnalan oýunlar",
          correctAnswers: "Dogry jogaplar",
          countriesKnown: "Bilinýän ýurtlar",
          achievements: "Üstünlikler",
          resetStats: "Statistikany arassala"
        },
        hero: {
          eyebrow: "Geografiýa öwreniş oýny",
          title: "Dünýä barada",
          titleHighlight: "bilimiňizi barlaň",
          subtitle: "Ýurtlary, baýdaklary, paýtagtlary we gyzykly faktlary gyzykly mini-oýunlarda öwreniň. Hasap döretmek gerek däl — oýny saýlaň we başlaň!"
        },
        nav: {
          chooseChallenge: "Synagyňyzy saýlaň",
          uniqueWays: "Geografiýa bilimiňizi barlamagyň 5 usuly",
          allLevels: "Ähli derejeler",
          easy: "Aňsat",
          medium: "Orta",
          hard: "Kyn",
          startChallenge: "Başla"
        },
        feedback: {
          correctPoints: "Dogry! +{{points}} bal",
          notQuiteAnswerWas: "Dogry däl! Dogry jogap:",
          hintsUsed: "({{count}} maslahat ulanyldy)",
          noHintsNeeded: "(Maslahatsyz!)"
        },
        modal: {
          startGame: "Oýny başla",
          chooseDifficulty: "Kynlyk derejesini saýlaň.",
          speedDesc: "30 sekuntlyk çalt synagda ähli ukyplaryňyzy barlaň!",
          confirmQuit: "Çykmak isleýärsiňizmi? Öňegidişlik ýitiriler."
        }
      }
    };

    const additions = {
      en: {
        common: {
          mode: "Mode",
          online: "Online",
          offline: "Offline",
          minutesShort: "min",
          space: "Space",
          light: "Light",
          dark: "Dark"
        },
        games: {
          revealHint: "Reveal Hint",
          pleaseTypeCountry: "Please type a country name",
          continentHint: "Continent: {{value}}",
          regionHint: "Region: {{value}}",
          capitalHint: "Capital: {{value}}",
          whichCountryPrompt: "Which country?",
          capitalPrompt: "Capital: {{capital}}"
        },
        stats: {
          yourStatistics: "Your Statistics",
          bestScoresByMode: "Best Scores by Mode",
          resetSuccess: "Stats reset!"
        },
        nav: {
          homeTitle: "Home",
          switchMode: "Switch Data Mode",
          switchTheme: "Switch Theme",
          statsTitle: "Your Stats",
          settingsTitle: "Settings"
        },
        feedback: {
          notQuite: "Not quite!",
          notQuiteAnswerWas: "The answer was: {{answer}}",
          thisIs: "This is: {{answer}}"
        },
        settings: {
          soundEffects: "Sound Effects",
          showHints: "Show Hints",
          defaultDifficulty: "Default Difficulty",
          questionsPerRound: "Questions Per Round",
          questionsTemplate: "{{count}} Questions",
          saved: "Settings saved!"
        },
        achievements: {
          firstGame: "First Game",
          correct10: "10 Correct",
          streak5: "5 Streak",
          countries25: "25 Countries",
          perfectRound: "Perfect Round",
          speedDemon: "Speed Demon",
          firstGameDesc: "Play your first game",
          correct10Desc: "Get 10 correct answers",
          streak5Desc: "Get a 5-answer streak",
          countries25Desc: "Master 25 countries",
          perfectRoundDesc: "Finish a perfect round",
          speedDemonDesc: "Dominate speed mode",
          achievementUnlocked: "Achievement: {{name}}!",
          more: "+{{count}} more"
        },
        ui: {
          onlineModeTitle: "Online Mode - Live API Data",
          offlineModeTitle: "Offline Mode - Local Data Pack",
          switchedOnlineMode: "Switched to Online Mode",
          switchedOfflineMode: "Switched to Offline Mode",
          lightModeEnabled: "Light mode",
          darkModeEnabled: "Dark mode",
          switchToLightMode: "Switch to Light Mode",
          switchToDarkMode: "Switch to Dark Mode"
        },
        game: {
          round: "Round {{current}}/{{total}}",
          questionCounter: "Q: {{count}}"
        }
      },
      ru: {
        common: {
          mode: "Режим",
          online: "Онлайн",
          offline: "Оффлайн",
          minutesShort: "мин",
          space: "Пробел",
          light: "Светлая",
          dark: "Тёмная"
        },
        games: {
          pleaseTypeCountry: "Введите название страны",
          continentHint: "Континент: {{value}}",
          regionHint: "Регион: {{value}}",
          capitalHint: "Столица: {{value}}",
          whichCountryPrompt: "Какая страна?",
          capitalPrompt: "Столица: {{capital}}"
        },
        stats: {
          yourStatistics: "Ваша статистика",
          bestScoresByMode: "Лучшие результаты по режимам",
          resetSuccess: "Статистика сброшена!"
        },
        nav: {
          homeTitle: "Главная",
          switchMode: "Переключить режим данных",
          switchTheme: "Сменить тему",
          statsTitle: "Ваша статистика",
          settingsTitle: "Настройки"
        },
        feedback: {
          notQuite: "Не совсем!",
          notQuiteAnswerWas: "Правильный ответ: {{answer}}",
          thisIs: "Это: {{answer}}"
        },
        settings: {
          soundEffects: "Звуковые эффекты",
          showHints: "Показывать подсказки",
          defaultDifficulty: "Сложность по умолчанию",
          questionsPerRound: "Вопросов за раунд",
          questionsTemplate: "{{count}} вопросов",
          saved: "Настройки сохранены!"
        },
        achievements: {
          firstGame: "Первая игра",
          correct10: "10 правильных",
          streak5: "Серия 5",
          countries25: "25 стран",
          perfectRound: "Идеальный раунд",
          speedDemon: "Скоростной демон",
          firstGameDesc: "Сыграйте в первую игру",
          correct10Desc: "Дайте 10 правильных ответов",
          streak5Desc: "Сделайте серию из 5",
          countries25Desc: "Изучите 25 стран",
          perfectRoundDesc: "Пройдите раунд без ошибок",
          speedDemonDesc: "Покорите скоростной режим",
          achievementUnlocked: "Достижение: {{name}}!",
          more: "+{{count}} ещё"
        },
        ui: {
          onlineModeTitle: "Онлайн-режим — данные из API",
          offlineModeTitle: "Оффлайн-режим — локальные данные",
          switchedOnlineMode: "Переключено на онлайн-режим",
          switchedOfflineMode: "Переключено на оффлайн-режим",
          lightModeEnabled: "Светлая тема",
          darkModeEnabled: "Тёмная тема",
          switchToLightMode: "Переключить на светлую тему",
          switchToDarkMode: "Переключить на тёмную тему"
        },
        game: {
          round: "Раунд {{current}}/{{total}}",
          questionCounter: "В: {{count}}"
        }
      },
      tk: {
        common: {
          mode: "Rejim",
          online: "Onlaýn",
          offline: "Awtonom",
          minutesShort: "min",
          space: "Boşluk",
          light: "Açyk",
          dark: "Garaňky"
        },
        games: {
          pleaseTypeCountry: "Ýurduň adyny ýazyň",
          continentHint: "Materik: {{value}}",
          regionHint: "Sebit: {{value}}",
          capitalHint: "Paýtagt: {{value}}",
          whichCountryPrompt: "Haýsy ýurt?",
          capitalPrompt: "Paýtagt: {{capital}}"
        },
        stats: {
          yourStatistics: "Siziň statistikanyňyz",
          bestScoresByMode: "Rejimler boýunça iň gowy ballar",
          resetSuccess: "Statistika arassalandy!"
        },
        nav: {
          homeTitle: "Baş sahypa",
          switchMode: "Maglumat rejimini çalyş",
          switchTheme: "Temany çalyş",
          statsTitle: "Siziň statistikanyňyz",
          settingsTitle: "Sazlamalar"
        },
        feedback: {
          notQuite: "Biraz säwlik!",
          notQuiteAnswerWas: "Dogry jogap: {{answer}}",
          thisIs: "Bu: {{answer}}"
        },
        settings: {
          soundEffects: "Ses effektleri",
          showHints: "Maslahatlary görkez",
          defaultDifficulty: "Bellenen kynlyk derejesi",
          questionsPerRound: "Aýlawdaky soraglar",
          questionsTemplate: "{{count}} sorag",
          saved: "Sazlamalar saklandy!"
        },
        achievements: {
          firstGame: "Ilkinji oýun",
          correct10: "10 dogry jogap",
          streak5: "5 yzygider",
          countries25: "25 ýurt",
          perfectRound: "Kemsiz aýlaw",
          speedDemon: "Tizlik ussady",
          firstGameDesc: "Ilkinji oýnuňyzy oýnaň",
          correct10Desc: "10 dogry jogap beriň",
          streak5Desc: "5-lik yzygiderlik ediniň",
          countries25Desc: "25 ýurdy özleşdiriň",
          perfectRoundDesc: "Aýlawy säwliksiz tamamlaň",
          speedDemonDesc: "Tizlik režiminde ussatlaşyň",
          achievementUnlocked: "Üstünlik: {{name}}!",
          more: "+{{count}} ýene"
        },
        ui: {
          onlineModeTitle: "Onlaýn režim — göni API maglumatlary",
          offlineModeTitle: "Awtonom režim — ýerli maglumat toplumy",
          switchedOnlineMode: "Onlaýn režime geçildi",
          switchedOfflineMode: "Awtonom režime geçildi",
          lightModeEnabled: "Açyk tema",
          darkModeEnabled: "Garaňky tema",
          switchToLightMode: "Açyk tema geç",
          switchToDarkMode: "Garaňky tema geç"
        },
        game: {
          round: "Tapgyr {{current}}/{{total}}",
          questionCounter: "S: {{count}}"
        }
      }
    };
    
    return this.deepMerge(translations[langCode] || translations.en, additions[langCode] || additions.en);
  }
};

// Global shorthand function
function t(key, params = {}) {
  return i18n.t(key, params);
}

// Make available globally
window.i18n = i18n;
window.t = t;
