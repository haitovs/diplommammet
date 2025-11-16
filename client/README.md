# Guess the Country – Frontend

Vanilla JS single-page experience that consumes the local Guess the Country API. Designed as a diploma-ready mockup with polished UI and scripted AI helper copy.

## Usage
1. Start the backend API (`npm run dev` inside `server/`).
2. Open `client/index.html` in your browser (double-click or use `npx serve`/`python -m http.server`).
3. Pick a difficulty, read the facts, and start guessing!

## Features
- Three rotating facts per round with animated cards.
- Player name input so correct answers hit the leaderboard.
- Hint button that gradually reveals curated hints.
- AI Copilot button that calls the mock `/api/ai/explain` endpoint for reasoning tips.
- Context sidebar summarizing region, area, and population.

Because everything is static, the experience looks production-ready yet remains easy to demo offline.
