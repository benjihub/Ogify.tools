# Ogify — web app

Next.js (App Router) + TypeScript + Tailwind CSS, with Supabase auth and
Paddle billing wired up.

## Setup

```bash
npm install
cp .env.local.example .env.local
# fill in Supabase + Paddle keys in .env.local
npm run dev
```

## Structure

- `src/app` — routes (landing page, login, signup, dashboard, pricing, docs)
- `src/components` — UI primitives (`ui/`), layout chrome (`Layout/`), and
  feature components (auth form, API key card, usage bar, Paddle checkout,
  template playground)
- `src/lib/supabase` — browser client, server client, and the middleware
  session-refresh helper
- `src/lib/paddle.ts` — Paddle.js initialisation + price ID map
- `src/hooks/useUser.ts` — client hook exposing the current Supabase user
- `src/middleware.ts` — redirects unauthenticated users away from
  `/dashboard`, and authenticated users away from `/login` and `/signup`

## Notes / TODOs

- `src/app/dashboard/page.tsx` uses a mock API key generator — swap in a real
  Supabase table + server action for issuing and revoking keys.
- `src/components/PaddleCheckout.tsx` opens the Paddle overlay; you still
  need a webhook handler (e.g. a route handler at
  `src/app/api/paddle/webhook/route.ts`) to update plan/usage in Supabase
  once a checkout completes.
- Price IDs are read from `NEXT_PUBLIC_PADDLE_PRICE_*` env vars — create
  these in your Paddle dashboard and paste the IDs into `.env.local`.
