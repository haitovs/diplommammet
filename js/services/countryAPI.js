/**
 * GeoQuest - Country API Service
 * Fetches country data from REST Countries API with flag images from FlagCDN
 */

const CountryAPI = {
  BASE_URL: 'https://restcountries.com/v3.1',
  FLAG_CDN: 'https://flagcdn.com',
  CACHE_KEY: 'geoquest_countries_cache',
  CACHE_EXPIRY: 24 * 60 * 60 * 1000, // 24 hours

  isOnline: true,

  /**
   * Initialize API - fetch and cache countries
   */
  async init() {
    try {
      const cached = this.getFromCache();
      if (cached) {
        console.log('📦 Using cached country data');
        this.isOnline = true;
        return cached;
      }

      console.log('🌐 Fetching fresh country data from API...');
      const countries = await this.fetchAllCountries();
      this.saveToCache(countries);
      this.isOnline = true;
      return countries;
    } catch (error) {
      console.warn('⚠️ API fetch failed, using fallback data:', error.message);
      this.isOnline = false;
      return this.getFallbackData();
    }
  },

  /**
   * Fetch all countries from REST Countries API
   */
  async fetchAllCountries() {
    const fields = 'name,capital,flags,region,subregion,population,cca2,currencies,languages,borders';
    const response = await fetch(`${this.BASE_URL}/all?fields=${fields}`);
    
    if (!response.ok) {
      throw new Error(`API responded with ${response.status}`);
    }

    const data = await response.json();
    return this.transformApiData(data);
  },

  /**
   * Transform API response to our game format
   */
  transformApiData(apiData) {
    return apiData
      .filter(c => c.name && c.capital && c.capital.length > 0)
      .map(country => {
        const code = country.cca2.toLowerCase();
        return {
          id: code,
          name: country.name.common,
          capital: country.capital[0],
          continent: country.region || 'Unknown',
          region: country.subregion || country.region || 'Unknown',
          population: country.population || 0,
          languages: country.languages ? Object.values(country.languages) : [],
          currency: this.extractCurrency(country.currencies),
          flag: country.flags?.png || this.getFlagUrl(code),
          flagSvg: country.flags?.svg || this.getFlagUrl(code, 'svg'),
          flagEmoji: this.getEmojiFlag(code),
          difficulty: this.calculateDifficulty(country),
          facts: [], // Will be populated from local data
          neighbors: country.borders || []
        };
      });
  },

  /**
   * Extract currency info
   */
  extractCurrency(currencies) {
    if (!currencies) return { name: 'Unknown', code: 'N/A', symbol: '' };
    const key = Object.keys(currencies)[0];
    const curr = currencies[key];
    return {
      name: curr?.name || 'Unknown',
      code: key || 'N/A',
      symbol: curr?.symbol || ''
    };
  },

  /**
   * Calculate difficulty based on population and region
   */
  calculateDifficulty(country) {
    const pop = country.population || 0;
    const commonRegions = ['Europe', 'Americas', 'Asia'];
    
    if (pop > 50000000 && commonRegions.includes(country.region)) {
      return 'easy';
    } else if (pop > 10000000) {
      return 'medium';
    }
    return 'hard';
  },

  /**
   * Get flag URL from CDN
   */
  getFlagUrl(countryCode, format = 'png', size = 320) {
    const code = countryCode.toLowerCase();
    if (format === 'svg') {
      return `${this.FLAG_CDN}/${code}.svg`;
    }
    return `${this.FLAG_CDN}/w${size}/${code}.png`;
  },

  /**
   * Get emoji flag from country code
   */
  getEmojiFlag(countryCode) {
    const code = countryCode.toUpperCase();
    const offset = 127397;
    return String.fromCodePoint(...[...code].map(c => c.charCodeAt(0) + offset));
  },

  /**
   * Get from localStorage cache
   */
  getFromCache() {
    try {
      const cached = localStorage.getItem(this.CACHE_KEY);
      if (!cached) return null;

      const { data, timestamp } = JSON.parse(cached);
      const isExpired = Date.now() - timestamp > this.CACHE_EXPIRY;
      
      if (isExpired) {
        localStorage.removeItem(this.CACHE_KEY);
        return null;
      }

      return data;
    } catch {
      return null;
    }
  },

  /**
   * Save to localStorage cache
   */
  saveToCache(data) {
    try {
      localStorage.setItem(this.CACHE_KEY, JSON.stringify({
        data,
        timestamp: Date.now()
      }));
    } catch (e) {
      console.warn('Could not cache countries:', e);
    }
  },

  /**
   * Get fallback data (use existing COUNTRIES array)
   */
  getFallbackData() {
    if (typeof COUNTRIES !== 'undefined') {
      return COUNTRIES.map(c => ({
        ...c,
        flag: c.flag.length <= 4 ? this.getFlagUrl(c.id) : c.flag,
        flagEmoji: c.flag.length <= 4 ? c.flag : this.getEmojiFlag(c.id)
      }));
    }
    return [];
  },

  /**
   * Merge API data with local facts
   */
  mergeWithLocalFacts(apiCountries, localCountries) {
    const localMap = new Map(localCountries.map(c => [c.id, c]));
    
    return apiCountries.map(country => {
      const local = localMap.get(country.id);
      if (local) {
        return {
          ...country,
          facts: local.facts || [],
          neighbors: local.neighbors?.length > country.neighbors?.length 
            ? local.neighbors 
            : country.neighbors
        };
      }
      return country;
    });
  },

  /**
   * Preload flag images for a batch of countries
   */
  preloadFlags(countries) {
    countries.forEach(country => {
      const img = new Image();
      img.src = country.flag;
    });
  }
};

// Make available globally
window.CountryAPI = CountryAPI;
