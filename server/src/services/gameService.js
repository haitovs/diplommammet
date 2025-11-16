const { randomUUID } = require('crypto');
const { COUNTRIES } = require('../data/countries');
const { shuffleArray, getRandomItem } = require('../utils/random');
const { normalizeText } = require('../utils/string');
const analytics = require('./analyticsService');

const DIFFICULTIES = ['easy', 'medium', 'hard'];
const SCORE_BY_DIFFICULTY = { easy: 50, medium: 100, hard: 180 };
const ATTEMPT_PENALTY = 12;
const ROUND_TTL_MS = 15 * 60 * 1000;
const MAX_LEADERBOARD = 25;
const MAX_CATALOG_RETURN = 200;

const activeRounds = new Map();
const leaderboard = [];
const countryIndex = new Map(COUNTRIES.map((record) => [record.iso, record]));

const COUNTRY_SYNONYMS = {
  ARE: ['uae', 'unitedarabemirates'],
  AUS: ['commonwealthofaustralia'],
  BRA: ['federativerepublicofbrazil'],
  CAN: ['dominionofcanada'],
  CHE: ['swissconfederation', 'switzerland'],
  CHL: ['republicofchile'],
  CHN: ['prc', 'peoplesrepublicofchina'],
  COL: ['republicofcolombia'],
  DEU: ['federalrepublicofgermany', 'germany'],
  EGY: ['arabrepublicofegypt'],
  ESP: ['kingdomofspain'],
  ETH: ['federaldemocraticrepublicofethiopia'],
  FRA: ['frenchrepublic'],
  GBR: ['uk', 'greatbritain', 'unitedkingdom'],
  GRC: ['hellenicrepublic'],
  IDN: ['republicofindonesia'],
  IND: ['bharat', 'republicofindia'],
  ISL: ['iceland'],
  ITA: ['italianrepublic'],
  JPN: ['nihon', 'nippon'],
  KEN: ['republicofkenya'],
  KOR: ['republicofkorea', 'rok', 'southkorea'],
  MAR: ['kingdomofmorocco'],
  MEX: ['unitedmexicanstates'],
  NGA: ['federalrepublicofnigeria'],
  NLD: ['kingdomofthenetherlands', 'netherlands'],
  NOR: ['kingdomofnorway'],
  NZL: ['aotearoa'],
  PER: ['republicofperu'],
  PHL: ['republicofthephilippines'],
  POL: ['republicofpoland'],
  PRT: ['portugueserepublic'],
  RUS: ['russianfederation'],
  SAU: ['kingdomofsaudiarabia'],
  SGP: ['republicofsingapore'],
  SWE: ['kingdomofsweden'],
  THA: ['kingdomofthailand', 'siam'],
  TUR: ['republicofturkiye', 'turkiye'],
  UKR: ['ukraine'],
  USA: ['unitedstates', 'unitedstatesofamerica', 'usa'],
  VNM: ['socialistrepublicofvietnam'],
  ZAF: ['republicofsouthafrica']
};

function normalizeValue(value) {
  return normalizeText(value || '');
}

function sanitizeDifficulty(input) {
  if (!input) {
    return 'medium';
  }
  const lower = String(input).toLowerCase();
  return DIFFICULTIES.includes(lower) ? lower : 'medium';
}

function sanitizeFilters(raw = {}) {
  const parsedLimit = raw.limit !== undefined ? Number(raw.limit) : null;
  return {
    region: raw.region ? normalizeValue(raw.region) : null,
    subregion: raw.subregion ? normalizeValue(raw.subregion) : null,
    search: raw.search ? normalizeValue(raw.search) : null,
    limit: Number.isFinite(parsedLimit) ? parsedLimit : null,
    labels: {
      region: raw.region || null,
      subregion: raw.subregion || null,
      search: raw.search || null
    }
  };
}

function matchesFilters(country, filters = {}) {
  if (filters.region && normalizeValue(country.region) !== filters.region) {
    return false;
  }
  if (filters.subregion && normalizeValue(country.subregion) !== filters.subregion) {
    return false;
  }
  if (filters.search) {
    const haystack = [
      country.name,
      country.capital,
      country.region,
      country.subregion,
      ...(country.languages || []),
      ...(country.currencies || [])
    ]
      .map((value) => normalizeValue(value))
      .join(' ');
    if (!haystack.includes(filters.search)) {
      return false;
    }
  }
  return true;
}

function pruneExpiredRounds() {
  const now = Date.now();
  [...activeRounds.entries()].forEach(([roundId, round]) => {
    if (round.expiresAt <= now) {
      activeRounds.delete(roundId);
      analytics.track('round.expired', { roundId, iso: round.iso, difficulty: round.difficulty });
    }
  });
}

function selectCountry(difficulty, filters) {
  const pool = COUNTRIES.filter(
    (country) => Array.isArray(country.clues?.[difficulty]) && matchesFilters(country, filters)
  );
  return getRandomItem(pool);
}

function buildRoundResponse(round, country) {
  return {
    roundId: round.id,
    difficulty: round.difficulty,
    facts: round.facts,
    expiresAt: round.expiresAt,
    metadata: {
      region: country.region,
      subregion: country.subregion,
      areaKm2: country.areaKm2,
      populationMillions: country.populationMillions
    },
    hintCount: country.hints.length,
    flagCode: country.iso.toLowerCase(),
    filters: round.filters
  };
}

function createRound(requestedDifficulty, rawFilters = {}) {
  pruneExpiredRounds();
  const difficulty = sanitizeDifficulty(requestedDifficulty);
  const filters = sanitizeFilters(rawFilters);
  const country = selectCountry(difficulty, filters);
  if (!country) {
    throw new Error('No dataset available for requested difficulty/filters.');
  }
  const facts = shuffleArray(country.clues[difficulty]).slice(0, 3);
  const round = {
    id: randomUUID(),
    iso: country.iso,
    difficulty,
    facts,
    createdAt: Date.now(),
    expiresAt: Date.now() + ROUND_TTL_MS,
    attempts: 0,
    revealedHints: 0,
    filters: filters.labels
  };
  activeRounds.set(round.id, round);
  analytics.track('round.created', {
    roundId: round.id,
    difficulty,
    iso: country.iso,
    filters: round.filters
  });
  return buildRoundResponse(round, country);
}

function getCountryByRound(round) {
  return countryIndex.get(round?.iso);
}

function buildSynonyms(country) {
  const base = new Set();
  base.add(normalizeValue(country.name));
  base.add(normalizeValue(country.name.replace('the ', '')));
  base.add(normalizeValue(country.iso));
  const extra = COUNTRY_SYNONYMS[country.iso] || [];
  extra.forEach((alias) => base.add(normalizeValue(alias)));
  return base;
}

function registerLeaderboardEntry({ playerName, score, round, country }) {
  const safeName = playerName?.trim() ? playerName.trim().slice(0, 32) : 'Explorer';
  const entry = {
    id: randomUUID(),
    playerName: safeName,
    country: country.name,
    difficulty: round.difficulty,
    score,
    createdAt: new Date().toISOString()
  };
  leaderboard.push(entry);
  leaderboard.sort((a, b) => {
    if (b.score === a.score) {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
    return b.score - a.score;
  });
  while (leaderboard.length > MAX_LEADERBOARD) {
    leaderboard.pop();
  }
  return entry;
}

function evaluateGuess({ roundId, guess, playerName }) {
  pruneExpiredRounds();
  const round = activeRounds.get(roundId);
  if (!round) {
    return { status: 404, body: { message: 'Round not found or expired.' } };
  }
  const country = getCountryByRound(round);
  if (!country) {
    activeRounds.delete(roundId);
    return { status: 410, body: { message: 'Round data missing.' } };
  }
  const normalizedGuess = normalizeValue(guess);
  if (!normalizedGuess) {
    return { status: 400, body: { message: 'Guess is required.' } };
  }
  const matchSet = buildSynonyms(country);
  const isCorrect = matchSet.has(normalizedGuess);
  if (isCorrect) {
    const baseScore = SCORE_BY_DIFFICULTY[round.difficulty] || 50;
    const penalty = round.attempts * ATTEMPT_PENALTY;
    const awarded = Math.max(baseScore - penalty, Math.floor(baseScore * 0.3));
    activeRounds.delete(roundId);
    const leaderboardEntry = registerLeaderboardEntry({ playerName, score: awarded, round, country });
    analytics.track('round.completed', {
      roundId,
      iso: country.iso,
      attempts: round.attempts + 1,
      awarded,
      playerName: leaderboardEntry.playerName
    });
    return {
      status: 200,
      body: {
        correct: true,
        score: awarded,
        explanation: `${country.name} fits all provided clues. Capital: ${country.capital}.`,
        country: {
          name: country.name,
          capital: country.capital,
          region: country.region,
          subregion: country.subregion,
          flagCode: country.iso.toLowerCase()
        },
        leaderboardEntry
      }
    };
  }

  round.attempts += 1;
  analytics.track('round.guess', { roundId, iso: country.iso, correct: false });
  if (round.attempts >= 3) {
    activeRounds.delete(roundId);
    analytics.track('round.failed', { roundId, iso: country.iso, attempts: round.attempts });
    return {
      status: 200,
      body: {
        correct: false,
        revealed: true,
        message: `Out of attempts. The country was ${country.name}.`,
        attempts: round.attempts,
        solution: {
          name: country.name,
          capital: country.capital,
          region: country.region,
          subregion: country.subregion,
          flagCode: country.iso.toLowerCase()
        }
      }
    };
  }
  return {
    status: 200,
    body: {
      correct: false,
      message: 'Not quite right. Try another guess or request a hint.',
      attempts: round.attempts
    }
  };
}

function requestHint(roundId) {
  pruneExpiredRounds();
  const round = activeRounds.get(roundId);
  if (!round) {
    return { status: 404, body: { message: 'Round not found or expired.' } };
  }
  const country = getCountryByRound(round);
  if (!country) {
    activeRounds.delete(roundId);
    return { status: 410, body: { message: 'Round data missing.' } };
  }
  if (round.revealedHints >= country.hints.length) {
    return { status: 200, body: { hint: null, message: 'No more hints available.' } };
  }
  const hint = country.hints[round.revealedHints];
  round.revealedHints += 1;
  analytics.track('round.hint', { roundId, iso: country.iso, index: round.revealedHints });
  return {
    status: 200,
    body: {
      hint,
      remaining: country.hints.length - round.revealedHints
    }
  };
}

function getLeaderboard(limit = 10) {
  return leaderboard.slice(0, limit);
}

function listDifficulties() {
  return DIFFICULTIES.map((key) => ({
    difficulty: key,
    baseScore: SCORE_BY_DIFFICULTY[key]
  }));
}

function listCountries(options = {}) {
  const filters = sanitizeFilters(options);
  const limit = filters.limit ? Math.min(Math.max(filters.limit, 1), MAX_CATALOG_RETURN) : null;
  const collection = COUNTRIES.filter((country) => matchesFilters(country, filters)).map((country) => ({
    iso: country.iso,
    name: country.name,
    capital: country.capital,
    region: country.region,
    subregion: country.subregion,
    populationMillions: country.populationMillions,
    areaKm2: country.areaKm2,
    languages: country.languages,
    hintCount: country.hints.length,
    difficulties: DIFFICULTIES.filter((level) => Array.isArray(country.clues?.[level]))
  }));
  return limit ? collection.slice(0, limit) : collection;
}

function listRegions() {
  const regionMap = new Map();
  const subregionMap = new Map();
  COUNTRIES.forEach((country) => {
    const regionKey = normalizeValue(country.region);
    if (country.region && !regionMap.has(regionKey)) {
      regionMap.set(regionKey, { key: regionKey, label: country.region });
    }
    const subKey = normalizeValue(country.subregion);
    if (country.subregion && !subregionMap.has(subKey)) {
      subregionMap.set(subKey, {
        key: subKey,
        label: country.subregion,
        region: country.region
      });
    }
  });
  return {
    regions: [...regionMap.values()].sort((a, b) => a.label.localeCompare(b.label)),
    subregions: [...subregionMap.values()].sort((a, b) => a.label.localeCompare(b.label))
  };
}

function seedLeaderboard() {
  const sampleNames = ['Amina', 'Diego', 'Sven', 'Haruka', 'Noah'];
  const sampleDifficulty = ['easy', 'medium', 'hard'];
  for (let i = 0; i < 5; i += 1) {
    const iso = COUNTRIES[i].iso;
    const round = { difficulty: sampleDifficulty[i % sampleDifficulty.length] };
    registerLeaderboardEntry({
      playerName: sampleNames[i],
      score: SCORE_BY_DIFFICULTY[round.difficulty] - i * 5,
      round,
      country: countryIndex.get(iso)
    });
  }
}

seedLeaderboard();

module.exports = {
  createRound,
  evaluateGuess,
  requestHint,
  getLeaderboard,
  listDifficulties,
  listCountries,
  listRegions
};
