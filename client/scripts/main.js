import { Api } from './api.js';
import {
  state,
  resetRound,
  startSession,
  endSession,
  completeRound,
  addGuess,
  pushHint,
  setLeaderboard,
  setAiSupport,
  setHealth,
  setRegionFilter,
  setCatalog,
  setCatalogSearch,
  setAnswerMode
} from './state.js';
import {
  renderFacts,
  renderRoundMeta,
  renderRoundsLeft,
  renderContextGrid,
  renderFeedback,
  renderHints,
  renderLeaderboard,
  renderAiPanel,
  renderCatalog
} from './ui.js';

const FALLBACK_OPTIONS = [
  'France',
  'Japan',
  'Brazil',
  'Canada',
  'Germany',
  'Kenya',
  'India',
  'China',
  'United States',
  'United Kingdom',
  'Australia',
  'New Zealand',
  'Spain',
  'Portugal',
  'Italy',
  'Greece',
  'Turkey',
  'United Arab Emirates',
  'Israel',
  'Pakistan',
  'Vietnam',
  'Philippines',
  'Malaysia',
  'Finland',
  'Denmark',
  'Iran',
  'Uruguay',
  'Ireland',
  'Belgium',
  'Czechia',
  'Hungary',
  'Romania',
  'Kazakhstan',
  'Singapore',
  'South Africa',
  'Egypt',
  'Saudi Arabia',
  'Indonesia',
  'Thailand',
  'South Korea',
  'Argentina',
  'Chile',
  'Colombia',
  'Peru'
];

const elements = {
  factList: document.getElementById('fact-list'),
  roundMeta: document.getElementById('round-meta'),
  roundsLeft: document.getElementById('rounds-left'),
  contextGrid: document.getElementById('round-context'),
  leaderboard: document.getElementById('leaderboard'),
  guessInput: document.getElementById('guess-input'),
  guessSelect: document.getElementById('guess-select'),
  playerNameInput: document.getElementById('player-name-input'),
  guessButton: document.getElementById('guess-btn'),
  hintButton: document.getElementById('hint-btn'),
  aiButton: document.getElementById('ai-btn'),
  aiRefreshButton: document.getElementById('ai-refresh-btn'),
  aiSummary: document.getElementById('ai-summary'),
  aiList: document.getElementById('ai-suggestions'),
  feedback: document.getElementById('feedback'),
  hints: document.getElementById('hints'),
  difficultySelect: document.getElementById('difficulty-select'),
  regionSelect: document.getElementById('region-select'),
  newRoundButton: document.getElementById('new-round-btn'),
  catalogList: document.getElementById('catalog-list'),
  catalogSearch: document.getElementById('catalog-search'),
  playButton: document.getElementById('play-btn'),
  roundCountInput: document.getElementById('round-count-input'),
  answerModeRadios: Array.from(document.querySelectorAll('input[name="answer-mode"]')),
  startHint: document.getElementById('start-hint')
};

let isBusy = false;
let catalogSearchTimer = null;

async function bootstrap() {
  bindEvents();
  applyAnswerModeUI();
  renderFeedback(elements.feedback, { message: 'Select rounds, choose answer mode, then press Play.' });
  renderRoundsLeft(elements.roundsLeft, state.roundsRemaining);
  renderRoundMeta(elements.roundMeta, null);
  renderContextGrid(elements.contextGrid, null);
  updateControls();
  await loadHealth();
  await Promise.all([loadLeaderboard(), loadCatalog()]);
}

function bindEvents() {
  elements.playButton.addEventListener('click', startGame);
  elements.newRoundButton.addEventListener('click', skipRound);
  elements.difficultySelect.addEventListener('change', (event) => {
    state.difficulty = event.target.value;
    if (state.playStarted) {
      refreshRound();
    }
  });
  elements.regionSelect.addEventListener('change', (event) => {
    setRegionFilter(event.target.value);
    if (state.playStarted) {
      refreshRound();
    }
    loadCatalog();
  });
  elements.guessButton.addEventListener('click', handleGuess);
  elements.guessInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      handleGuess();
    }
  });
  elements.guessSelect.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      handleGuess();
    }
  });
  elements.hintButton.addEventListener('click', handleHint);
  elements.aiButton.addEventListener('click', fetchAi);
  elements.aiRefreshButton.addEventListener('click', fetchAi);
  elements.catalogSearch.addEventListener('input', handleCatalogSearch);
  elements.answerModeRadios.forEach((radio) =>
    radio.addEventListener('change', () => {
      setAnswerMode(getSelectedAnswerMode());
      applyAnswerModeUI();
      updateControls();
      loadCatalog();
    })
  );
}

function getSelectedAnswerMode() {
  const checked = elements.answerModeRadios.find((radio) => radio.checked);
  return checked ? checked.value : 'free';
}

function applyAnswerModeUI() {
  const mode = state.answerMode;
  if (mode === 'select') {
    elements.guessInput.classList.add('hidden');
    elements.guessSelect.classList.remove('hidden');
  } else {
    elements.guessInput.classList.remove('hidden');
    elements.guessSelect.classList.add('hidden');
  }
}

function updateControls() {
  const locked =
    isBusy || !state.playStarted || !state.currentRound || state.roundsRemaining <= 0;
  elements.guessButton.disabled = locked;
  elements.hintButton.disabled = locked;
  elements.aiButton.disabled = locked;
  elements.aiRefreshButton.disabled = locked;
  elements.newRoundButton.disabled = !state.playStarted || state.roundsRemaining <= 0 || isBusy;
  elements.guessInput.disabled = locked || state.answerMode === 'select';
  elements.guessSelect.disabled = locked || state.answerMode !== 'select';
  elements.catalogSearch.disabled = isBusy;
}

function setBusy(flag) {
  isBusy = flag;
  updateControls();
}

function startGame() {
  const rounds = clamp(Number(elements.roundCountInput.value) || 1, 1, 30);
  const mode = getSelectedAnswerMode();
  setAnswerMode(mode);
  startSession({ rounds, answerMode: mode });
  renderRoundsLeft(elements.roundsLeft, state.roundsRemaining);
  elements.startHint.textContent = `Playing ${rounds} round${rounds > 1 ? 's' : ''} — ${
    mode === 'select' ? 'select answers' : 'type answers'
  }.`;
  renderFeedback(elements.feedback, { message: 'Round loading...' });
  refreshRound();
  updateControls();
}

function endGame(message) {
  endSession();
  resetRound(null);
  renderFacts(elements.factList, []);
  renderRoundMeta(elements.roundMeta, null);
  renderRoundsLeft(elements.roundsLeft, state.roundsRemaining);
  renderContextGrid(elements.contextGrid, null);
  renderHints(elements.hints, []);
  renderFeedback(elements.feedback, { message });
  updateControls();
}

function handleCatalogSearch(event) {
  setCatalogSearch(event.target.value.trim());
  clearTimeout(catalogSearchTimer);
  catalogSearchTimer = window.setTimeout(() => {
    loadCatalog();
  }, 250);
}

function skipRound() {
  if (!state.playStarted || !state.currentRound || isBusy) return;
  renderFeedback(elements.feedback, { message: 'Skipping to the next round.' });
  concludeRound('skipped');
}

async function refreshRound() {
  if (!state.playStarted || state.roundsRemaining <= 0) {
    renderFeedback(elements.feedback, { message: 'Press Play to start your session.' });
    updateControls();
    return;
  }
  try {
    setBusy(true);
    const round = await Api.getNextRound({
      difficulty: state.difficulty,
      region: state.regionFilter !== 'any' ? state.regionFilter : undefined
    });
    resetRound(round);
    renderFacts(elements.factList, round.facts);
    renderRoundMeta(elements.roundMeta, round);
    renderRoundsLeft(elements.roundsLeft, state.roundsRemaining);
    renderContextGrid(elements.contextGrid, round, state.hints.length);
    renderHints(elements.hints, []);
    renderFeedback(elements.feedback, { message: 'New round ready. Good luck!' });
    elements.guessInput.value = '';
    elements.guessSelect.value = '';
    applyAnswerModeUI();
    updateControls();
    await fetchAi().catch(() => {});
  } catch (error) {
    renderFeedback(elements.feedback, { type: 'error', message: error.message });
    updateControls();
  } finally {
    setBusy(false);
  }
}

function getGuessValue() {
  if (state.answerMode === 'select') {
    return elements.guessSelect.value;
  }
  return elements.guessInput.value.trim();
}

async function handleGuess() {
  if (isBusy || !state.playStarted || !state.currentRound) {
    return;
  }
  const guess = getGuessValue();
  if (!guess) {
    renderFeedback(elements.feedback, { type: 'error', message: 'Enter or select a country before guessing.' });
    return;
  }
  setBusy(true);
  try {
    const payload = {
      roundId: state.currentRound.roundId,
      guess,
      playerName: elements.playerNameInput.value.trim() || undefined
    };
    const result = await Api.submitGuess(payload);
    addGuess({ guess, result });
    if (result.correct) {
      renderFeedback(elements.feedback, {
        type: 'success',
        message: `Correct! ${result.country.name} — Score +${result.score}`
      });
      await loadLeaderboard();
      await concludeRound('win');
      return;
    }

    if (result.revealed) {
      const name = result.solution?.name || 'the country';
      renderFeedback(elements.feedback, {
        type: 'error',
        message: result.message || `Out of attempts. The country was ${name}.`
      });
      elements.guessInput.value = name;
      if (state.answerMode === 'select') {
        elements.guessSelect.value = name;
      }
      await concludeRound('revealed');
      return;
    }

    const attemptText = result.attempts ? ` (${result.attempts}/3 tries used)` : '';
    renderFeedback(elements.feedback, {
      type: 'error',
      message: `${result.message}${attemptText}`
    });
  } catch (error) {
    renderFeedback(elements.feedback, { type: 'error', message: error.message });
  } finally {
    setBusy(false);
  }
}

async function concludeRound() {
  completeRound();
  renderRoundsLeft(elements.roundsLeft, state.roundsRemaining);
  if (state.roundsRemaining <= 0) {
    endGame('Session complete. Configure rounds and press Play to go again.');
    return;
  }
  await refreshRound();
}

async function handleHint() {
  if (isBusy || !state.currentRound || !state.playStarted) {
    return;
  }
  try {
    setBusy(true);
    const response = await Api.requestHint(state.currentRound.roundId);
    if (response.hint) {
      pushHint(response.hint);
    }
    renderHints(elements.hints, state.hints);
    renderContextGrid(elements.contextGrid, state.currentRound, state.hints.length);
    renderFeedback(elements.feedback, { message: response.hint ? 'New hint unlocked!' : response.message });
  } catch (error) {
    renderFeedback(elements.feedback, { type: 'error', message: error.message });
  } finally {
    setBusy(false);
  }
}

async function loadLeaderboard() {
  try {
    const data = await Api.getLeaderboard();
    setLeaderboard(data);
    renderLeaderboard(elements.leaderboard, data);
  } catch (error) {
    // Keep existing leaderboard; show gentle feedback
    renderFeedback(elements.feedback, { type: 'error', message: `Leaderboard unavailable: ${error.message}` });
  }
}

async function loadHealth() {
  try {
    const metadata = await Api.getHealth();
    setHealth(metadata);
    populateRegionOptions(metadata?.regions?.regions || []);
  } catch (error) {
    console.error('Health endpoint unavailable', error);
  }
}

function populateRegionOptions(regions) {
  const defaultOption = '<option value="any">Any region</option>';
  const extraOptions = regions
    .map((entry) => `<option value="${entry.label}">${entry.label}</option>`)
    .join('');
  elements.regionSelect.innerHTML = defaultOption + extraOptions;
  elements.regionSelect.value = state.regionFilter;
}

async function loadCatalog() {
  try {
    const data = await Api.getCatalog({
      limit: state.answerMode === 'select' ? 200 : 6,
      region: state.regionFilter !== 'any' ? state.regionFilter : undefined,
      search: state.catalogSearch || undefined
    });
    setCatalog(data);
    renderCatalog(elements.catalogList, data);
    updateGuessSelect(data.map((entry) => entry.name));
  } catch (error) {
    elements.catalogList.innerHTML = `<li class="muted">Catalog unavailable: ${error.message}</li>`;
    updateGuessSelect(FALLBACK_OPTIONS);
  }
}

function updateGuessSelect(names = []) {
  if (!elements.guessSelect) return;
  if (!names.length) {
    elements.guessSelect.innerHTML = '<option value="">No options available</option>';
    return;
  }
  elements.guessSelect.innerHTML = ['<option value="">Select a country</option>']
    .concat(names.sort().map((name) => `<option value="${name}">${name}</option>`))
    .join('');
}

async function fetchAi() {
  if (!state.currentRound || !state.playStarted) {
    return;
  }
  try {
    const payload = {
      difficulty: state.currentRound.difficulty,
      facts: state.currentRound.facts,
      guessHistory: state.guessHistory.map((entry) => entry.guess)
    };
    const data = await Api.askAi(payload);
    setAiSupport(data);
    renderAiPanel(elements.aiSummary, elements.aiList, data);
  } catch (error) {
    renderFeedback(elements.feedback, { type: 'error', message: `AI helper offline: ${error.message}` });
  }
}

function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}

bootstrap();
