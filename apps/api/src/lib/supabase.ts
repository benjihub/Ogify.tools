import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Env } from "../types/index.js";

/**
 * Creates a Supabase admin client that bypasses Row Level Security.
 * Use this ONLY in the Worker — never expose the service role key to the
 * browser. One fresh client per request is cheap and avoids cross-request
 * state contamination.
 *
 * Required Supabase tables (see src/types/index.ts for column definitions):
 *   - api_keys
 *   - subscriptions
 *   - usage
 */
export function makeSupabase(env: Env): SupabaseClient {
  return createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      // Workers runtime has no persistent cookie store.
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
    // Route fetch calls through the Workers runtime (no Node.js fetch polyfill needed).
    global: { fetch: fetch.bind(globalThis) },
  });
}
