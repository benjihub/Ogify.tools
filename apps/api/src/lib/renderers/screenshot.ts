/**
 * URL → PNG screenshot using Cloudflare Browser Rendering (Puppeteer).
 * Requires the [browser] binding in wrangler.toml + a Workers Paid plan.
 */
import puppeteer from "@cloudflare/puppeteer";
import type { Env } from "../../types/index.js";

export interface ScreenshotOptions {
  url: string;
  viewportWidth?: number;
  viewportHeight?: number;
  delay?: number;
}

export async function screenshotUrl(
  env: Env,
  {
    url,
    viewportWidth = 1200,
    viewportHeight = 630,
    delay = 0,
  }: ScreenshotOptions
): Promise<Uint8Array> {
  const clampedDelay = Math.min(Math.max(0, delay), 5_000);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const browser = await puppeteer.launch(env.BROWSER as any);

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: viewportWidth, height: viewportHeight });

    await page.setRequestInterception(true);
    page.on("request", (req: { resourceType: () => string; abort: () => void; continue: () => void }) => {
      if (["media", "font", "websocket"].includes(req.resourceType())) {
        req.abort();
      } else {
        req.continue();
      }
    });

    await page.goto(url, { waitUntil: "networkidle0", timeout: 15_000 });

    if (clampedDelay > 0) {
      await new Promise((r) => setTimeout(r, clampedDelay));
    }

    const screenshot = (await page.screenshot({
      type: "png",
      clip: { x: 0, y: 0, width: viewportWidth, height: viewportHeight },
    })) as unknown;

    if (screenshot instanceof Uint8Array) {
      return screenshot;
    }

    if (screenshot instanceof ArrayBuffer) {
      return new Uint8Array(screenshot);
    }

    throw new Error("Browser screenshot did not return binary PNG data.");
  } finally {
    await browser.close();
  }
}
