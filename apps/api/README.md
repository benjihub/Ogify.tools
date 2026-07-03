# Ogify API — Cloudflare Worker

Hono + TypeScript on Cloudflare Workers. Renders SVG templates and URL
screenshots to PNG via `resvg-wasm` and Browser Rendering.

---

## Setup

```bash
npm install
cp .dev.vars.example .dev.vars   # fill in Supabase + Paddle secrets
npm run dev                       # wrangler dev --env dev
```

---

## Deploy

```bash
# One-time: create KV namespace and paste the IDs into wrangler.toml
wrangler kv:namespace create CACHE
wrangler kv:namespace create CACHE --preview

# One-time: create R2 bucket
wrangler r2 bucket create ogify-renders

# Set production secrets
wrangler secret put SUPABASE_URL
wrangler secret put SUPABASE_SERVICE_ROLE_KEY
wrangler secret put PADDLE_WEBHOOK_SECRET
wrangler secret put CACHE_SIGNING_KEY

# Deploy
npm run deploy
```

---

## Supabase

Run `supabase-migration.sql` once in the SQL editor.  It creates:

| Table | Purpose |
|---|---|
| `api_keys` | SHA-256 hashes of issued API keys |
| `subscriptions` | Per-user plan, Paddle IDs, status |
| `usage` | Per-user per-month render counts |

Plus a `increment_usage(p_user_id, p_period)` RPC called after every render.

---

## API reference

All render endpoints require the header:
```
x-api-key: ogfy_live_...
```

### `POST /render/template`

```json
{
  "template": "blog",       // "blog" | "product" | "saas"
  "title":    "My Post",    // required, max 80 chars
  "author":   "Jane · site.com",  // optional
  "tag":      "Tutorial",   // optional eyebrow label
  "width":    1200,         // optional, 200–2400
  "height":   630           // optional, 100–1400
}
```

Returns `image/png`. Cached in KV indefinitely (content-addressed).

**Response headers**

| Header | Value |
|---|---|
| `X-Cache` | `HIT` or `MISS` |
| `X-Renders-Used` | renders consumed this month |
| `X-Renders-Limit` | monthly limit for this plan |

---

### `POST /render/url`

```json
{
  "url":             "https://yoursite.com/blog/my-post",
  "viewport_width":  1200,   // optional, default 1200
  "viewport_height": 630,    // optional, default 630
  "delay":           500     // optional ms, max 5000
}
```

Returns `image/png`. **Not cached** (page content may change).
Requires Workers Paid plan for the Browser Rendering binding.

---

### `GET /me/usage`

```json
{
  "plan":              "starter",
  "renders_used":      47,
  "renders_limit":     500,
  "renders_remaining": 453,
  "period":            "2024-11",
  "resets_on":         "2024-12-01"
}
```

---

### `POST /webhooks/paddle`

Registered in the Paddle dashboard as your notification URL.
Verifies `Paddle-Signature`, then processes:

| Event | Action |
|---|---|
| `subscription.activated` | upsert subscription row, set plan + limit |
| `subscription.updated` | update plan / limit |
| `subscription.cancelled` | mark status = `cancelled` |
| `subscription.paused` | mark status = `paused` |
| `transaction.completed` | detect lifetime purchase, upsert subscription |

Paddle must include `custom_data: { user_id: "<supabase-auth-uid>" }` on
every checkout — set this via Paddle's `custom_data` field when opening the
overlay in `PaddleCheckout.tsx`.

---

### `GET /health`

```json
{ "status": "ok", "env": "production", "ts": "2024-11-01T12:00:00.000Z" }
```

No auth required.

---

## Error format

All errors return JSON:

```json
{
  "error": "Monthly render limit reached (100/100). Upgrade your plan to continue.",
  "code":  "AUTH_ERROR"
}
```

| Code | Meaning |
|---|---|
| `AUTH_ERROR` | Missing / invalid / revoked API key, or limit reached |
| `VALIDATION_ERROR` | Bad request body |
| `FORBIDDEN` | SSRF-blocked URL |
| `RENDER_ERROR` | resvg-wasm failure |
| `SCREENSHOT_ERROR` | Puppeteer failure |
| `INTERNAL_ERROR` | Unhandled exception |
| `NOT_FOUND` | Unknown route |
