import type { Context, MiddlewareHandler } from "hono";
import { createMiddleware } from "hono/factory";
import type { Env } from "../types";
import { createSupabaseAdmin } from "./supabase";

type ApiKeyValidation = {
  ok: boolean;
  userId?: string;
  reason?: string;
};

async function sha256(value: string) {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(digest)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function validateApiKey(
  c: Context<Env>,
  apiKey: string
): Promise<ApiKeyValidation> {
  const supabase = createSupabaseAdmin(c.env);
  const keyHash = await sha256(apiKey);

  const { data, error } = await supabase
    .from("api_keys")
    .select("id,user_id,usage_count,usage_limit,active")
    .eq("key_hash", keyHash)
    .maybeSingle();

  if (error || !data || !data.active) {
    return { ok: false, reason: "Invalid API key" };
  }

  if (data.usage_count >= data.usage_limit) {
    return { ok: false, reason: "Usage limit exceeded" };
  }

  await supabase
    .from("api_keys")
    .update({ usage_count: data.usage_count + 1 })
    .eq("id", data.id);

  return { ok: true, userId: data.user_id };
}

export const requireApiKey: MiddlewareHandler<Env> = createMiddleware<Env>(
  async (c, next) => {
    const authorization = c.req.header("Authorization");
    const apiKey = authorization?.replace(/^Bearer\s+/i, "");

    if (!apiKey) {
      return c.json({ error: "Missing API key" }, 401);
    }

    const result = await validateApiKey(c, apiKey);

    if (!result.ok) {
      return c.json({ error: result.reason }, 401);
    }

    c.set("userId", result.userId);
    await next();
  }
);
