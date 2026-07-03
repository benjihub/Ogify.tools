import { blogTemplate, type BlogTemplateInput } from "./blog.js";
import { productTemplate, type ProductTemplateInput } from "./product.js";
import { saasTemplate, type SaasTemplateInput } from "./saas.js";
import type { TemplateId, TemplateRenderRequest } from "../../types/index.js";

// Re-export individual generators so callers can import from one place
export { blogTemplate, productTemplate, saasTemplate };

// ── Registry ──────────────────────────────────────────────────────────────

type SharedInput = BlogTemplateInput & ProductTemplateInput & SaasTemplateInput;

const REGISTRY: Record<TemplateId, (input: SharedInput) => string> = {
  blog: blogTemplate,
  product: productTemplate,
  saas: saasTemplate,
};

export const TEMPLATE_IDS = Object.keys(REGISTRY) as TemplateId[];

/**
 * Generates the SVG string for the given template.
 * Throws if the template ID is not registered.
 */
export function renderTemplateSvg(
  req: TemplateRenderRequest
): string {
  const { template, title, author, tag, width = 1200, height = 630 } = req;

  const fn = REGISTRY[template];
  if (!fn) {
    throw new Error(
      `Unknown template "${template}". Valid options: ${TEMPLATE_IDS.join(", ")}.`
    );
  }

  return fn({ title, author, tag, width, height });
}
