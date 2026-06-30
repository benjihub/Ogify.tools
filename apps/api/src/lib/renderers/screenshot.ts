import type { Env } from "../../types";

export async function renderUrlScreenshot(env: Env["Bindings"], url: string) {
  if (!env.BROWSER) {
    throw new Error("Browser Rendering binding is not configured");
  }

  const response = await env.BROWSER.fetch(url);

  if (!response.ok) {
    throw new Error(`Screenshot request failed with ${response.status}`);
  }

  return new Uint8Array(await response.arrayBuffer());
}
