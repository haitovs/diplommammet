export function renderFacts(target, facts = []) {
  target.innerHTML = facts.map((fact) => `<li>${fact}</li>`).join('');
}

export function renderRoundMeta(target, round) {
  if (!round) {
    target.textContent = '—';
    return;
  }
  target.textContent = `${capitalize(round.difficulty)} · ${round.metadata?.region || 'Unknown'}`;
}

export function renderRoundsLeft(target, remaining) {
  if (!target) return;
  if (typeof remaining === 'number' && remaining >= 0) {
    target.textContent = `Rounds left: ${remaining}`;
  } else {
    target.textContent = 'Rounds left: —';
  }
}

export function renderContextGrid(target, round, hintsUsed = 0) {
  if (!round) {
    target.innerHTML = '<p class="muted">Start a round to see more context.</p>';
    return;
  }
  const entries = [
    ['Region', round.metadata?.region],
    ['Subregion', round.metadata?.subregion],
    ['Area', round.metadata?.areaKm2 ? `${round.metadata.areaKm2.toLocaleString()} km²` : '—'],
    ['Population', round.metadata?.populationMillions ? `${round.metadata.populationMillions} M` : '—'],
    ['Hints', `${Math.max(round.hintCount - hintsUsed, 0)} left`]
  ];
  target.innerHTML = entries
    .map(([label, value]) => `<dt>${label}</dt><dd>${value || '—'}</dd>`)
    .join('');
}

export function renderFeedback(target, { type = 'info', message }) {
  target.className = `feedback ${type === 'success' ? 'success' : type === 'error' ? 'error' : ''}`;
  target.textContent = message || '';
}

export function renderHints(container, hints = []) {
  if (!hints.length) {
    container.innerHTML = '';
    return;
  }
  container.innerHTML = hints.map((text, idx) => `<div class="hint">Hint ${idx + 1}: ${text}</div>`).join('');
}

export function renderLeaderboard(container, leaderboard = []) {
  if (!leaderboard.length) {
    container.innerHTML = '<li>No scores yet.</li>';
    return;
  }
  container.innerHTML = leaderboard
    .map(
      (entry, index) => `
        <li>
          <span>${index + 1}. ${entry.playerName}</span>
          <span>${entry.score} pts · ${capitalize(entry.difficulty)}</span>
        </li>
      `
    )
    .join('');
}

export function renderAiPanel(summaryEl, listEl, payload) {
  if (!payload) {
    summaryEl.textContent = 'Ask the assistant for reasoning tips tailored to your current clues.';
    listEl.innerHTML = '';
    return;
  }
  summaryEl.textContent = payload.summary;
  listEl.innerHTML = payload.suggestions
    .map((tip) => `
      <li>
        <strong>${tip.title}</strong>
        <p>${tip.tip}</p>
      </li>
    `)
    .join('');
}

export function renderCatalog(container, entries = []) {
  const top = entries.slice(0, 3);
  if (!top.length) {
    container.innerHTML = '<li class="muted">No matches yet.</li>';
    return;
  }
  container.innerHTML = top
    .map(
      (entry) => `
        <li>
          <strong>${entry.name}</strong>
          <p>${entry.region} · Capital: ${entry.capital}</p>
          <span>${entry.languages?.slice(0, 2).join(', ') || ''}</span>
        </li>
      `
    )
    .join('');
}

function capitalize(value = '') {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
