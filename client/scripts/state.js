export const state = {
  difficulty: 'medium',
  regionFilter: 'any',
  currentRound: null,
  playStarted: false,
  roundsRemaining: 0,
  roundsTarget: 0,
  answerMode: 'free',
  hints: [],
  guessHistory: [],
  leaderboard: [],
  aiSupport: null,
  health: null,
  catalog: [],
  catalogSearch: ''
};

export function resetRound(round) {
  state.currentRound = round;
  state.hints = [];
  state.guessHistory = [];
  state.aiSupport = null;
}

export function startSession({ rounds, answerMode }) {
  state.playStarted = true;
  state.roundsRemaining = rounds;
  state.roundsTarget = rounds;
  state.answerMode = answerMode || 'free';
}

export function endSession() {
  state.playStarted = false;
  state.roundsRemaining = 0;
  state.currentRound = null;
}

export function completeRound() {
  state.roundsRemaining = Math.max(state.roundsRemaining - 1, 0);
}

export function addGuess(result) {
  state.guessHistory.push(result);
}

export function pushHint(text) {
  state.hints.push(text);
}

export function setLeaderboard(list) {
  state.leaderboard = list;
}

export function setAiSupport(payload) {
  state.aiSupport = payload;
}

export function setHealth(metadata) {
  state.health = metadata;
}

export function setRegionFilter(value) {
  state.regionFilter = value || 'any';
}

export function setCatalog(entries) {
  state.catalog = entries;
}

export function setCatalogSearch(value) {
  state.catalogSearch = value;
}

export function setAnswerMode(value) {
  state.answerMode = value === 'select' ? 'select' : 'free';
}
