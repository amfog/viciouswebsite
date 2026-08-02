# The Vicious — Website

Next.js 15 (App Router) + React 19 + TypeScript + Tailwind v4 + Framer Motion + next-intl.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000 — it redirects to `/en`. Arabic lives at `/ar` with full RTL layout mirroring.

Production build:

```bash
npm run build
npm run start
```

Both were verified to complete with zero errors before this was handed off.

## Architecture

```
app/[locale]/        Routes — everything is locale-prefixed (/en, /ar)
components/          UI components, mostly presentational
services/news/       Repository pattern for the News feed (see below)
data/                Mock data for teams/players/achievements/partners —
                     shaped to match what Vicious OS will eventually supply
types/                Shared TypeScript interfaces — the contract Vicious OS
                     implementations must satisfy
i18n/                next-intl routing/navigation config
messages/            en.json / ar.json translation strings
```

Every list on the site (teams, players, achievements, sponsors, news) reads
through a typed interface, not a hardcoded array baked into a component —
that's what makes swapping the mock data source for a live Vicious OS
(Supabase) connection later a drop-in change instead of a rewrite.

## Connecting Vicious OS later

1. Implement `TeamRepository`, `PlayerRepository`, etc. (mirror the shape in
   `services/news/NewsRepository.ts`) backed by Supabase queries.
2. Swap the imports in `data/*.ts` consumers for the new repository calls
   (or replace `data/*.ts` entirely with server-side fetches).
3. Types in `types/index.ts` already match the Vicious OS domain model —
   no UI changes should be required if the shapes line up.

## News feed — Instagram / Facebook / X

The news section is wired for **live data**, not scraping:

- `services/news/MetaGraphNewsRepository.ts` — real Instagram + Facebook
  fetches via the Meta Graph API
- `services/news/XNewsRepository.ts` — real X API v2 fetch
- `services/news/MockNewsRepository.ts` — fallback content
- `services/news/index.ts` — merges live sources; if none are configured
  or a call fails, it falls back to mock data so the page is never empty

**You need real credentials for the live sources to activate.** Copy
`.env.example` to `.env.local` and fill in:

- `META_PAGE_ID`, `META_IG_BUSINESS_ACCOUNT_ID`, `META_ACCESS_TOKEN` — requires
  a Meta Business app with Instagram Graph API + Pages API added, the
  Instagram account set to Professional/Business and linked to the Facebook
  Page, and a long-lived Page access token. Long-lived tokens expire after
  roughly 60 days — refresh on a schedule or the feed quietly goes stale.
- `X_BEARER_TOKEN`, `X_USER_ID` — X's free API tier cannot read a timeline;
  you need at least the Basic paid tier.

Without these set, the site runs fine and shows the curated fallback
content — nothing breaks, it just isn't live yet.

## Brand system

- Colors: `--color-void` (near-black bg), `--color-ink` (panel bg),
  `--color-bone` (text), `--color-volt` (signature neon yellow-lime accent),
  `--color-ember` (red, secondary/callout only), `--color-steel` (muted text)
  — defined in `app/globals.css`
- Display type: Oswald (EN) / Cairo (AR); body: Inter (EN) / IBM Plex Sans
  Arabic (AR) — loaded via `<link>` in `app/[locale]/layout.tsx` rather than
  `next/font/google`, since some CI/sandbox environments block outbound
  requests to Google Fonts at build time. On Vercel this makes no difference;
  if you'd rather use `next/font/google` for automatic font optimization,
  swap it back in — it will work fine there.

## Images

Every image slot renders `<PlaceholderBox />` — an elegant placeholder,
never a stock photo. Replace by swapping `PlaceholderBox` usages for
`next/image` once real assets (logos, banners, player photos, gallery) are
ready. Add any new image CDN domains to `next.config.ts` → `images.remotePatterns`.

## Deploying to Vercel

1. Push this repo to GitHub
2. Import into Vercel
3. Add the env vars from `.env.example` in Project Settings → Environment
   Variables (optional — site works without them)
4. Deploy

## What's intentionally not built yet

- Contact form has no backend — it's a UI-only stub (`components/ContactForm.tsx`).
  Wire it to an API route, or a service like Resend/Formspree, or Vicious OS.
- Command menu / search, jersey 3D preview, and video-heavy loading screen
  from the original brief were left out to ship a solid, real, verified-buildable
  foundation first — all are straightforward additions once the core is live.
