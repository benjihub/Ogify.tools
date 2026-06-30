import { Hono } from "hono";
import type { ApiStatus } from "@ogify/shared";
import { requireApiKey } from "./lib/auth";
import { processPaddleWebhook, verifyPaddleWebhook } from "./lib/paddle";
import { renderUrlScreenshot } from "./lib/renderers/screenshot";
import { renderSvgToPng } from "./lib/renderers/template";
import { renderTemplate, templateNames } from "./lib/svg-templates";
import type { Env, PaddleWebhookEvent, RenderRequest } from "./types";

const app = new Hono<Env>();

function toArrayBuffer(bytes: Uint8Array) {
  const copy = new Uint8Array(bytes.byteLength);
  copy.set(bytes);
  return copy.buffer;
}

app.get("/", (c) => {
  return c.json<ApiStatus>({
    ok: true,
    service: "ogify-api",
    timestamp: new Date().toISOString()
  });
});

app.get("/health", (c) => {
  return c.json({ ok: true });
});

app.get("/v1/templates", (c) => {
  return c.json({ templates: templateNames });
});

app.post("/v1/render", requireApiKey, async (c) => {
  const body = await c.req.json<RenderRequest>();

  if (!templateNames.includes(body.template)) {
    return c.json({ error: "Unknown template" }, 400);
  }

  const svg = renderTemplate(body);
  const png = await renderSvgToPng(svg);

  return new Response(toArrayBuffer(png), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "no-store"
    }
  });
});

app.post("/v1/screenshot", requireApiKey, async (c) => {
  const { url } = await c.req.json<{ url?: string }>();

  if (!url) {
    return c.json({ error: "Missing url" }, 400);
  }

  const image = await renderUrlScreenshot(c.env, url);

  return new Response(
    toArrayBuffer(image),
    {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "no-store"
    }
    }
  );
});

app.post("/webhooks/paddle", async (c) => {
  const body = await c.req.text();
  const verified = await verifyPaddleWebhook(
    c.env,
    body,
    c.req.header("Paddle-Signature") ?? null
  );

  if (!verified) {
    return c.json({ error: "Invalid signature" }, 401);
  }

  const result = await processPaddleWebhook(JSON.parse(body) as PaddleWebhookEvent);
  return c.json(result);
});

export default app;
