import type { RenderRequest } from "../../types";

export function productTemplate(input: RenderRequest) {
  const subtitle = input.subtitle ?? "Launch-ready social card";
  const brand = input.brand ?? "Ogify";

  return `<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#ECFDF5"/>
  <rect x="80" y="92" width="1040" height="446" rx="20" fill="#FFFFFF" stroke="#99F6E4"/>
  <circle cx="960" cy="190" r="92" fill="#0F766E"/>
  <text x="120" y="168" fill="#134E4A" font-family="Arial" font-size="30" font-weight="700">${brand}</text>
  <text x="120" y="312" fill="#0F172A" font-family="Arial" font-size="76" font-weight="800">${input.title}</text>
  <text x="120" y="392" fill="#475569" font-family="Arial" font-size="34">${subtitle}</text>
</svg>`;
}
