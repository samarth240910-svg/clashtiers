# Clash Tier — Frontend (Phase 1)

Public-facing website for Clash Tier, a Minecraft PvP tier-testing platform.
This is **Phase 1 only**: the complete frontend, running entirely on
centralized mock data. Nothing here talks to a database, API, or the Discord
bot yet — that's Phase 2/3.

## Stack

- Next.js 16 (App Router, TypeScript)
- Tailwind CSS v4
- Recharts (Skill Spectrum radar chart on profiles)
- All content in `src/data/` — no mock data inline in components

## Design

Warm dark theme — Baloo 2 (rounded display font) + Inter, red→amber gradient
accents, soft `rounded-2xl`/`rounded-3xl` cards, and glow-blob backgrounds on
hero sections. Revised after the first pass read as too sharp/harsh; this
version favors softer edges and warmer tone throughout.

## Run it locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Then open **http://localhost:3000**.

> First build needs internet access once, to fetch the Rajdhani/Inter fonts
> from Google Fonts via `next/font/google`. After that they're cached locally.

## Routes

| Route | Description |
|---|---|
| `/` | Homepage — hero, stats, gamemodes, featured rankings, recent results, featured testers |
| `/tierlist` | Overall ranking across every gamemode, with search + region filter |
| `/tierlist/[gamemode]` | Per-gamemode tierlist, grouped by tier (HT1 -> LT5) |
| `/profile/[username]` | Player profile - rank, points, per-gamemode breakdown, test history |
| `/testers` | Tester rankings by tests completed, region, gamemodes, activity |
| `/guide` | Testing guide with sidebar table of contents |

Try `/profile/zomicxd`, `/profile/Karthik987`, or `/tierlist/sword` to see it
populated. Global search (navbar) works against the mock player list too.

## Project structure

```
src/
  app/                     # routes (App Router)
    tierlist/[gamemode]/
    profile/[username]/
    testers/, guide/
  components/              # UI components (Navbar, TierBadge, LeaderboardRow, ...)
  data/                    # single source of truth for mock content
    gamemodes.ts           # ALL gamemodes are defined here - add one, it
                            # propagates to tierlist tabs, profile cards, and
                            # (in Phase 3) bot slash-command autocomplete
    tiers.ts               # tier system: divisions, points, rank titles
    players.ts             # mock players + per-gamemode tier history
    testers.ts              # mock tester roster
    results.ts               # recent results feed
    queues.ts                 # mock active queues (for a future /queues view)
  lib/                        # small formatting helpers
```

## Switching from mock data to the real API later

Every page currently imports directly from `src/data/*.ts`. When Phase 2's
API is ready, those files become thin fetch wrappers with the same exported
shapes (`players`, `getPlayer`, `rankedPlayers`, etc.) so the components
above don't need to change - just what backs them.

## Notes on the reference bot (read during Phase 1, not yet touched)

The existing Discord bot (nextcord/Python) is currently **single-gamemode** -
there's no gamemode concept in its DB, `/results`, or `/openqueue` commands
yet, and config lives in `config.yml`, not `config.js`. Phase 3 will need to
extend its schema and commands to match the multi-gamemode model this
frontend already assumes. Flagging this now so it isn't a surprise later -
nothing here blocks approving the frontend.

## Not built yet (by design - later phases)

- Backend/API, PostgreSQL, WebSockets/SSE
- Bot integration (`/setup`, `/sendembed`, gamemode-aware `/openqueue`, rich
  profile embeds)
- Auth, rate limiting, audit logging
