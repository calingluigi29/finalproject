# Courtside — NBA, in focus

Courtside is a client-side React single-page app for following NBA game scores, looking up player profiles and season averages, and finding recent highlight clips. Save players to a personal list that persists in the browser.

## Data API

The app uses ESPN's public NBA REST endpoints:

- [NBA scoreboard](https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard) for scores, schedules, and game status.
- [ESPN player search](https://site.api.espn.com/apis/common/v3/search) for player lookup.
- [ESPN player profiles and videos](https://site.web.api.espn.com/apis/common/v3/sports/basketball/nba/athletes/1966) for profile details, season stats, and video clips.

These public endpoints do not require an API key. ESPN controls the service and its availability; video clips open on ESPN and can vary by region.

## Setup

Requirements: Node.js 18 or newer and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. Create a production build with `npm run build`.

## Environment variables

No environment variables or API keys are required.

## Features

- Discover: browse current and previous/next-day NBA game scores and status.
- Player search: search ESPN's player index by name and open a profile.
- Player details: view profile information, season averages, and recent highlight clips.
- My players: save and remove players; saved players persist in `localStorage`.
- Client-side routes: `/`, `/players/:id`, and `/favorites`.
- Loading indicators, empty states, and retryable API error messages.

## Collaboration workflow

Keep work on feature branches (for example, `feature/player-search` or `feature/live-scores`) and merge through pull requests; do not commit directly to `main`. Use descriptive conventional commit messages such as `feat: add player search` and `fix: retry scoreboard requests`.

## Team contributions

Complete this section with your pair's names and actual contributions before submission:

- **Team member 1:** [Name] — [features or components contributed].
- **Team member 2:** [Name] — [features or components contributed].
