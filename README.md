# Motive Care Website

Website for Motive Care, an auto repair and motor parts shop in Markham, Ontario.
Built with Vite, React and Tailwind CSS v4.

## Business Details Used

- Name: Motive Care
- Category: Auto repair shop
- Address: 20 Heritage Rd, Markham, ON L3P 3P3
- Phone: (905) 201-0087
- Public rating snapshot: 4.7 stars from 98 Google Maps reviews
- Listing notes: onsite services, mechanic, washroom, appointments recommended, credit cards, debit cards, NFC mobile payments

## Structure

- `index.html` - app shell, SEO meta, and LocalBusiness (AutoRepair) schema
- `src/App.jsx` - page composition
- `src/components/` - one component per section
  - `Logo.jsx` - the gear + "MC" monogram mark and wordmark lockup
  - `TrustBar.jsx` - continuously rotating shop-highlights strip
  - `Services.jsx` - the full service menu
  - `Reviews.jsx` - continuously rotating review rails with click-to-expand
  - `Gallery.jsx` - mechanic-at-work photography
- `src/index.css` - Tailwind theme, marquee engine, motion-preference fallbacks
- `public/` - everything copied verbatim into the deploy output:
  - `chatbot.js` - the self-contained Motive Care Assistant chat widget
  - `favicon.svg`, `site.webmanifest`, `robots.txt`, `sitemap.xml`
  - `_headers`, `_redirects` - Cloudflare Pages headers and SPA routing
- `tests/` - static content checks

> Static files must live in `public/`, not the repo root. Vite only copies
> `public/` into `dist/`, so anything at the root is silently left out of the
> deploy.

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build     # outputs to dist/
npm run preview
```

## Deploy (Cloudflare Pages)

Connected to this repository; pushing to `main` triggers a deploy.

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node version | 20 or later |

`public/_redirects` sends unmatched paths to `index.html` so client-side routes
survive a refresh, and `public/_headers` sets security headers plus long-lived
caching for hashed assets.

## Verify

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\tests\site-content.ps1
powershell -NoProfile -ExecutionPolicy Bypass -File .\tests\chatbot-content.ps1
```

## Motion and accessibility

The rotating strips pause on hover and on keyboard focus. Under
`prefers-reduced-motion: reduce` they stop moving and become manually
scrollable instead, so every review stays reachable. The expanded review is a
focus-trapped modal that closes on Escape and returns focus to the card.
