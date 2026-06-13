# #byBakari — Premium African Fashion

E-commerce site for #byBakari (Harare, Zimbabwe): the MOSI signature print, shop with cart,
Paynow payments (card + EcoCash/OneMoney), WhatsApp ordering, and an AI shopping stylist
powered by Claude.

Built with TanStack Start (React 19, SSR), Tailwind CSS v4, and Nitro.

## Local development

```sh
npm install --legacy-peer-deps
cp .env.example .env        # then fill in the values below
npm run dev                 # http://localhost:8080
```

## Environment variables

| Variable | Purpose |
| --- | --- |
| `PAYNOW_INTEGRATION_ID` | Paynow merchant integration ID |
| `PAYNOW_INTEGRATION_KEY` | Paynow integration key (secret) |
| `ANTHROPIC_API_KEY` | Claude API key for the AI stylist chat (`/api/chat`) |

Without `ANTHROPIC_API_KEY` the stylist chat gracefully falls back to WhatsApp.

## Deploying to Vercel

The build is pre-configured for Vercel (`nitro: { preset: "vercel" }` in `vite.config.ts`
produces a `.vercel/output` bundle).

1. Push this repository to GitHub.
2. On [vercel.com/new](https://vercel.com/new), import the repository.
   Framework preset: **Other**. Build command: `npm run build`. Install command:
   `npm install --legacy-peer-deps`. Leave the output directory empty (Vercel picks up
   `.vercel/output` automatically).
3. Add the three environment variables above under **Settings → Environment Variables**.
4. Deploy. Point the `bybakari.com` domain at the project when ready.

Paynow's return/result URLs are derived from the request origin, so they work on any
deployment URL with no extra config.

## Notes

- Product catalog lives in `src/lib/products.ts`; prices are always validated server-side
  at checkout (`src/routes/api.checkout.ts`).
- Brand contact details are centralized in `src/lib/site-config.ts`.
- `scripts/optimize-images.mjs` regenerates WebP versions of everything in
  `public/bybakari/` (run after adding new photos).
- While the Paynow integration is in test mode, test payments must use the merchant
  account email and Paynow shows "Fake Payment" options instead of charging real money.
