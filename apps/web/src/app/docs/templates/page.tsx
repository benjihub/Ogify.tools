import { CodeBlock, DocsSection, DocsShell } from "../docs-shell";
import { TemplatePlayground } from "@/components/TemplatePlayground";

const templates = [
  {
    name: "blog",
    description: "Editorial cards for posts, essays, changelogs, and tutorials.",
    schema: `{ "template": "blog", "title": "string", "subtitle": "string?", "brand": "string?" }`,
    imageSrc: "/template-previews/blog.png",
    imageLabel: "Blog preview image",
  },
  {
    name: "product",
    description: "Product announcements, landing pages, and feature launches.",
    schema: `{ "template": "product", "title": "string", "subtitle": "string?", "imageUrl": "string?" }`,
    imageSrc: "/template-previews/product.png",
    imageLabel: "Product preview image",
  },
  {
    name: "saas",
    description: "Clean SaaS-style cards for features, dashboards, and metrics.",
    schema: `{ "template": "saas", "title": "string", "subtitle": "string?", "brand": "string?" }`,
    imageSrc: "/template-previews/saas.png",
    imageLabel: "SaaS preview image",
  },
] as const;

type Template = (typeof templates)[number];

export default function TemplatesPage() {
  return (
    <DocsShell
      title="Template gallery"
      description="Preview the built-in templates and copy the JSON shape each one expects."
    >
      <DocsSection title="Built-in templates">
        <div className="flex flex-col gap-5">
          {templates.map((template) => (
            <div
              key={template.name}
              className="rounded border border-line-dim bg-ink-soft p-5"
            >
              <TemplatePreview template={template} />
              <div className="mt-5 grid min-w-0 gap-4 lg:grid-cols-[0.75fr_1.25fr]">
                <div>
                  <h2 className="font-body text-[17px] font-semibold normal-case tracking-normal text-paper">
                    {template.name}
                  </h2>
                  <p className="mt-2 text-sm text-muted">{template.description}</p>
                </div>
                <div className="min-w-0">
                  <CodeBlock>{template.schema}</CodeBlock>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DocsSection>

      <DocsSection title="Live try-it form">
        <TemplatePlayground />
      </DocsSection>
    </DocsShell>
  );
}

function TemplatePreview({ template }: { template: Template }) {
  return (
    <div
      aria-label={template.imageLabel}
      className="relative aspect-[1200/630] min-h-[260px] w-full overflow-hidden rounded border border-line-dim bg-ink md:min-h-[360px]"
      role="img"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url("${template.imageSrc}")`,
        }}
      />
    </div>
  );
}
