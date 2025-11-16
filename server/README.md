# Guess the Country API

Offline friendly REST API powering the diploma "Guess the Country by Facts" experience. Implements the full gameplay loop using Node.js core modules so it can run anywhere without additional dependencies.

## Scripts

```bash
npm run dev   # start the API on port 4000
npm test      # run lightweight smoke test
```

## Endpoints

| Method | Path | Description |
| --- | --- | --- |
| GET | `/api/game/next?difficulty=easy` | Creates a new round and returns three clues |
| POST | `/api/game/guess` | Validate a guess `{ roundId, guess, playerName }` |
| POST | `/api/game/hint` | Reveal the next hint for an active round |
| GET | `/api/leaderboard` | List in-memory leaderboard entries |
| GET | `/api/meta/health` | Health/deployment metadata |
| GET | `/api/meta/analytics` | Recent tracked events (demo telemetry) |
| POST | `/api/ai/explain` | Returns scripted AI-style guidance for the current clues |

## Notes
- The server also serves the static frontend from `client/` so `http://localhost:4000` is a one-stop demo entry point.
- Data lives in `src/data/countries.js` so it works fully offline.
- `src/services/gameService.js` centralizes scoring, hints, and analytics tracking.
- The API intentionally mimics a larger architecture; plug in Express/Fastify or a database later without changing consumers.
