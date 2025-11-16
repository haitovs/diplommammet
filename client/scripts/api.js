const DEFAULT_ORIGIN =
  window.location.origin && window.location.origin !== 'null'
    ? window.location.origin
    : 'http://localhost:4000';
const API_BASE = window.__GT_C_API__ || DEFAULT_ORIGIN;

function buildQuery(params = {}) {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) {
      return;
    }
    if (typeof value === 'string' && value.trim() === '') {
      return;
    }
    if (value === 'any') {
      return;
    }
    search.append(key, value);
  });
  const queryString = search.toString();
  return queryString ? `?${queryString}` : '';
}

async function request(path, options = {}) {
  const config = {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options
  };
  try {
    const response = await fetch(`${API_BASE}${path}`, config);
    if (!response.ok) {
      const errorPayload = await response.json().catch(() => ({ message: response.statusText }));
      throw new Error(errorPayload.message || 'Request failed');
    }
    return response.json();
  } catch (error) {
    console.error('API error', error);
    const offlineMessage =
      'Failed to reach the API. Start the server (`cd server && npm run dev`) and open http://localhost:4000.';
    throw new Error(error?.message?.includes('Failed to fetch') ? offlineMessage : error.message);
  }
}

export const Api = {
  getNextRound: (params = {}) => request(`/api/game/next${buildQuery(params)}`),
  submitGuess: (payload) =>
    request('/api/game/guess', {
      method: 'POST',
      body: JSON.stringify(payload)
    }),
  requestHint: (roundId) =>
    request('/api/game/hint', {
      method: 'POST',
      body: JSON.stringify({ roundId })
    }),
  getLeaderboard: () => request('/api/leaderboard'),
  getCatalog: (params = {}) => request(`/api/game/catalog${buildQuery(params)}`),
  askAi: (payload) =>
    request('/api/ai/explain', {
      method: 'POST',
      body: JSON.stringify(payload)
    }),
  getHealth: () => request('/api/meta/health')
};
