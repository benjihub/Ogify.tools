import type { OgImageTemplate, RenderRequest } from "../../types";
import { blogTemplate } from "./blog";
import { productTemplate } from "./product";

const templates: Record<OgImageTemplate, (input: RenderRequest) => string> = {
  blog: blogTemplate,
  product: productTemplate
};

export function renderTemplate(input: RenderRequest) {
  return templates[input.template](input);
}

export const templateNames = Object.keys(templates) as OgImageTemplate[];
