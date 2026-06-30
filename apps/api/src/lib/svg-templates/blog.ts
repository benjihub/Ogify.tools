import type { RenderRequest } from "../../types";

export function blogTemplate(input: RenderRequest) {
  const subtitle = input.subtitle ?? "Published with Ogify";
  const brand = input.brand ?? "Ogify";

  return `<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#F8FAFC"/>
  <rect x="72" y="72" width="1056" height="486" rx="24" fill="#FFFFFF" stroke="#D8E0EA"/>
  <text x="112" y="160" fill="#0F766E" font-family="Arial" font-size="28" font-weight="700">${brand}</text>
  <text x="112" y="305" fill="#172033" font-family="Arial" font-size="72" font-weight="800">${input.title}</text>
  <text x="112" y="382" fill="#5F6C80" font-family="Arial" font-size="34">${subtitle}</text>
</svg>`;
}
