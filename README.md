# SPINEDGE

Marketing site for a quantitative betting signal service focused on
table tennis round-robin markets (Czech Liga Pro, TT Cup). Built with
React, TypeScript, Vite, Tailwind v4, Framer Motion, and Recharts.

## Develop

```bash
npm install
npm run dev
```

## Placeholders to swap before launch

All in `src/lib/config.ts`:

- `TELEGRAM_URL` / `INSTAGRAM_URL` — real channel/profile links.
- `HERO_VIDEO_URL` — drop a looping mp4 at `public/videos/hero-loop.mp4`.
- `HERO_FALLBACK_IMAGE` — drop a static still at `public/images/hero-fallback.jpg`
  (used on mobile, on reduced-motion, and as the video poster).

Mock performance/strategy data lives in `src/lib/mockData.ts` — replace
with real tracked results when available.

## Pages

- `/` — hero, service, approach, strategy matrix, performance, pricing.
- `/telegram` — branded redirect to the Telegram channel.
- `/instagram` — branded redirect to the Instagram profile.
