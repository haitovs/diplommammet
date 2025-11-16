# Demo Script

1. **Intro (1 min)**
   - Present the goal: guess the country using layered facts, hints, AI helper, and region filters.
   - Highlight offline-friendly stack: Node API + vanilla JS SPA + static dataset.

2. **Backend walkthrough (2 min)**
   - Show `server/src/data/countries.js` (30+ entries) and how filters tie into `gameService`.
   - Hit `http://localhost:4000/` to prove the API is up, then `GET /api/game/next?difficulty=hard&region=Asia`.
   - Demo `/api/game/catalog?search=coffee` to show the dataset browser feed.

3. **Frontend walkthrough (2 min)**
   - Open `client/index.html` and switch difficulty + region, grab hints, watch leaderboard updates.
   - Use the Dataset Explorer search box to show how it syncs with the new catalog endpoint.

4. **AI helper story (1 min)**
   - Explain `/api/ai/explain` returns scripted reasoning so the demo feels intelligent without calling paid APIs.

5. **Future roadmap (1 min)**
   - Mention how to plug in real AI, persistence, React/Vite, or deploy everything via Docker for production.
