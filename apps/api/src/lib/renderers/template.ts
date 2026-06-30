import { initWasm, Resvg } from "@resvg/resvg-wasm";

let initialized = false;

async function ensureResvg() {
  if (!initialized) {
    await initWasm(
      new URL("../../../node_modules/@resvg/resvg-wasm/index_bg.wasm", import.meta.url)
    );
    initialized = true;
  }
}

export async function renderSvgToPng(svg: string) {
  await ensureResvg();
  const renderer = new Resvg(svg, {
    fitTo: {
      mode: "width",
      value: 1200
    }
  });

  return renderer.render().asPng();
}
