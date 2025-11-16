# Guess the Country – Architecture Overview

## Vision
- Deliver a diploma-ready template for a "Guess the Country by Facts" geography game.
- Showcase key IT faculty outcomes: modular architecture, API-first design, clean UI, and extensibility hooks (AI, analytics, accessibility).
- Use static data + public endpoints so everything appears fully functional without needing proprietary services.

## High-Level Components
1. **Backend (`server/`)**
   - Pure Node.js (HTTP core module) + modular services, no third-party installs needed.
   - Serves REST API for facts, game rounds, leaderboards (in-memory), analytics log, scripted AI helper, and catalog search.
   - Uses a curated static dataset (30+ countries, 3 difficulty tiers, hints) so everything runs offline and deterministically.

2. **Frontend (`client/`)**
   - Vanilla JS SPA (ES modules + CSS) to keep the template lightweight and dependency-free.
   - Consumes the backend APIs, orchestrates the game loop, hints, leaderboard, AI helper panel, and dataset explorer.
   - Modular scripts (`api.js`, `state.js`, `ui.js`, `main.js`) mimic component responsibilities without a build step.

3. **Shared Resources**
   - Docs (`README`, architecture notes, demo script) for presentation.
   - Static assets (flags, icons) stored locally.
   - Utility scripts for seeding demo leaderboard and running both services together.

## Key Features / Deliverables
- Multi-round quiz: show 3 facts, allow guess, reveal answer + explanation.
- Difficulty tiers (easy/medium/hard) determined by facts chosen plus **region/subregion filters** for themed rounds.
- Hint system pulling additional facts on demand.
- Lightweight analytics log (in-memory) for user actions.
- AI helper endpoint returning scripted suggestions (looks real but static).
- Dataset catalog endpoint powering the UI sidebar search.
- Accessibility: keyboard navigation + ARIA labels.
- Internationalization-ready strings.

## Development Phases
1. **Core API + data modeling** – HTTP handlers, validation, scoring, analytics, filtering.
2. **Gameplay UI** – state machine, input handling, dataset explorer, result display via vanilla JS.
3. **Enhancements** – hinting, AI helper, leaderboard, docs.

## Run Strategy
- `npm run dev` in `server/` for backend (port 4000).
- Open `client/index.html` directly in a browser (or through any static file server).
- Optional: extend the Node server to also serve the `client/` folder for a single-command demo.

## Future Extensions (for viva/presentation)
- Swap static dataset with DB or external API.
- Replace AI stub with OpenAI/Azure call.
- Persist analytics + leaderboard to SQLite/Postgres.
- Deploy via Docker compose; add auth + progress tracking.
