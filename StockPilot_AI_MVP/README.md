# StockPilot AI — Hackathon MVP

StockPilot is a mobile-first AI equity research desk prototype. It turns an equity research question into a structured brief containing an executive view, drivers, risks, uncertainty, a research signal and source section.

## Run locally

No installation is required for this MVP.

1. Unzip the folder.
2. Open `index.html` in Chrome, Edge, Safari or Firefox.
3. Try:
   - Search `NVDA`
   - Open AI Research
   - Try "What are the biggest risks?"
   - Open Discover and research another company.

## Important

This MVP uses clearly labelled illustrative demo data. It does not execute trades and it is not investment advice.

## Production upgrade path

- Replace demo dataset with permitted read-only market/news data.
- Add an LLM API behind a server-side endpoint (never expose an API key in browser JavaScript).
- Attach source citations to material claims.
- Add a proper backend, authentication and database.
- Add evaluation tests for factuality, citation coverage, latency and task completion.
- Add a paper/simulation module only if permitted by the hackathon rules.

## Hackathon positioning

Track: AI Trading Desk.
Core theme: information insights / signal generation.
Human remains responsible for the final decision.
