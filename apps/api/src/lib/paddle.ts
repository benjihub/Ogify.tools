import type { Env, PaddleWebhookEvent } from "../types";

async function hmacSha256(secret: string, payload: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(payload)
  );

  return [...new Uint8Array(signature)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function verifyPaddleWebhook(
  env: Env["Bindings"],
  body: string,
  signatureHeader: string | null
) {
  if (!signatureHeader || !env.PADDLE_WEBHOOK_SECRET) {
    return false;
  }

  const expected = await hmacSha256(env.PADDLE_WEBHOOK_SECRET, body);
  return signatureHeader.includes(expected);
}

export async function processPaddleWebhook(event: PaddleWebhookEvent) {
  return {
    handled: true,
    eventType: event.event_type
  };
}
