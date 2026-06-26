# Quantitative Betting

> Data-Driven. Advantage Playing.

Marketing site for a quantitative betting signal service focused on
table tennis round-robin markets (Czech Liga Pro, TT Cup). Built with
React, TypeScript, Vite, Tailwind v4, and Framer Motion.

## Develop

```bash
npm install
npm run dev
```

## Brand

- Emblem mark: `src/components/Logo.tsx` (also `public/favicon.svg` and
  `public/apple-touch-icon.png`) — a red paddle with a Gaussian curve over a
  probability histogram.
- Palette and brand name live in `src/index.css` (`@theme` tokens) and
  `src/lib/config.ts` (`BRAND_NAME`, `BRAND_TAGLINE`).

## Placeholders to swap before launch

All in `src/lib/config.ts`:

- `TELEGRAM_URL` / `INSTAGRAM_URL` — real channel/profile links.
- `HERO_VIDEO_URL` — drop a looping mp4 at `public/videos/hero-loop.mp4`.
- `HERO_FALLBACK_IMAGE` — drop a static still at `public/images/hero-fallback.jpg`
  (used on mobile, on reduced-motion, and as the video poster).

Mock performance/strategy data lives in `src/lib/mockData.ts` — replace
with real tracked results when available.

## Pages

- `/` — hero, service, approach, performance, pricing.
- `/telegram` — branded redirect to the Telegram channel.
- `/instagram` — branded redirect to the Instagram profile.
