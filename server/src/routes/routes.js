const {
  createRound,
  evaluateGuess,
  requestHint,
  getLeaderboard,
  listDifficulties,
  listCountries,
  listRegions
} = require('../services/gameService');
const analytics = require('../services/analyticsService');
const { buildAiResponse } = require('../services/aiService');

const routes = [
  {
    method: 'GET',
    path: '/',
    handler: () => ({
      status: 200,
      body: {
        message: 'Guess the Country API is running.',
        docs: 'Visit /api/meta/health for telemetry and available filters.',
        endpoints: [
          { method: 'GET', path: '/api/meta/health' },
          { method: 'GET', path: '/api/meta/analytics' },
          { method: 'GET', path: '/api/game/next' },
          { method: 'POST', path: '/api/game/guess' },
          { method: 'POST', path: '/api/game/hint' },
          { method: 'GET', path: '/api/leaderboard' },
          { method: 'GET', path: '/api/game/catalog' },
          { method: 'POST', path: '/api/ai/explain' }
        ]
      }
    })
  },
  {
    method: 'GET',
    path: '/api/meta/health',
    handler: () => ({
      status: 200,
      body: {
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptimeSeconds: Math.round(process.uptime()),
        difficulties: listDifficulties(),
        regions: listRegions()
      }
    })
  },
  {
    method: 'GET',
    path: '/api/meta/analytics',
    handler: ({ query }) => {
      const limit = Number(query.get('limit') || '25');
      return {
        status: 200,
        body: analytics.recent(Math.min(Math.max(limit, 1), 100))
      };
    }
  },
  {
    method: 'GET',
    path: '/api/game/next',
    handler: ({ query }) => {
      const filters = {
        region: query.get('region') || undefined,
        subregion: query.get('subregion') || undefined
      };
      return {
        status: 200,
        body: createRound(query.get('difficulty'), filters)
      };
    }
  },
  {
    method: 'POST',
    path: '/api/game/guess',
    handler: ({ body }) => evaluateGuess({
      roundId: body?.roundId,
      guess: body?.guess,
      playerName: body?.playerName
    })
  },
  {
    method: 'POST',
    path: '/api/game/hint',
    handler: ({ body }) => requestHint(body?.roundId)
  },
  {
    method: 'GET',
    path: '/api/leaderboard',
    handler: ({ query }) => {
      const limit = Number(query.get('limit') || '10');
      return {
        status: 200,
        body: getLeaderboard(Math.min(Math.max(limit, 1), 25))
      };
    }
  },
  {
    method: 'GET',
    path: '/api/game/catalog',
    handler: ({ query }) => {
      const limit = Number(query.get('limit') || '0');
      const filters = {
        region: query.get('region') || undefined,
        subregion: query.get('subregion') || undefined,
        search: query.get('search') || undefined,
        limit: Number.isNaN(limit) ? 0 : limit
      };
      return {
        status: 200,
        body: listCountries(filters)
      };
    }
  },
  {
    method: 'POST',
    path: '/api/ai/explain',
    handler: ({ body }) => ({
      status: 200,
      body: buildAiResponse(body)
    })
  }
];

module.exports = { routes };
