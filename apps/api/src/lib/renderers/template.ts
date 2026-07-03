/**
 * SVG → PNG rendering via @resvg/resvg-wasm.
 *
 * The WASM module must be initialised once before use.  In Cloudflare Workers
 * the module is fetched from the package itself during first cold start
 * (~20 ms) and then reused across requests within the same isolate.
 */
import { Resvg, initWasm } from "@resvg/resvg-wasm";

let initialized = false;

async function initOnce(): Promise<void> {
  if (initialized) return;
  // Fetch the WASM binary directly from the npm package's own CDN path.
  // Wrangler will inline this as a module asset when using the
  // `[[rules]] type = "CompiledWasm"` approach; the fetch fallback works for
  // local development and environments that can reach npm CDNs.
  const resp = await fetch(
    "https://unpkg.com/@resvg/resvg-wasm/index_bg.wasm"
  );
  await initWasm(resp);
  initialized = true;
}

export interface SvgToPngOptions {
  width?: number;
  height?: number;
}

/**
 * Converts an SVG string to a PNG `Uint8Array`.
 */
export async function svgToPng(
  svg: string,
  { width = 1200, height = 630 }: SvgToPngOptions = {}
): Promise<Uint8Array> {
  await initOnce();

  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: width },
    background: "transparent",
    font: { loadSystemFonts: true },
  });

  return resvg.render().asPng();
}

// ── Cache-key helper ──────────────────────────────────────────────────────

/**
 * Derives a deterministic hex cache key from the render inputs.
 */
export async function cacheKey(payload: unknown): Promise<string> {
  const json = JSON.stringify(payload);
  const buf = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(json)
  );
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
