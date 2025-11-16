# Guess the Country – Frontend

Vanilla JS single-page experience that consumes the local Guess the Country API. Designed as a diploma-ready mockup with polished UI, region-aware rounds, and a scripted AI helper.

## Usage
1. Start the backend API (`npm run dev` inside `server/`).
2. Visit `http://localhost:4000` (the backend now serves the static client to avoid `file://` CORS issues with ES modules).
   - Alternative: use any static server from the `client/` folder (`npx serve`, `python -m http.server`, etc.).
3. Pick a difficulty + region, read the facts, and start guessing!

## Features
- Three rotating facts per round with animated cards.
- Difficulty plus region filter hooked directly to `/api/game/next`.
- Session setup gate: pick number of rounds and answer mode (type or select) before play starts.
- Auto-reveal the solution after three incorrect guesses to keep the flow moving.
- Player name input so correct answers hit the leaderboard.
- Hint button that gradually reveals curated hints.
- AI Copilot panel that calls the mock `/api/ai/explain` endpoint for reasoning tips.
- Dataset Explorer sidebar wired to `/api/game/catalog` for quick searches across the 30+ country profiles.
- Context sidebar summarizing region, area, and population.

Because everything is static, the experience looks production-ready yet remains easy to demo offline.
