import { CodeBlock, DocsSection, DocsShell } from "../docs-shell";

const templates = [
  {
    name: "blog",
    description: "Editorial cards for posts, essays, changelogs, and tutorials.",
    schema: `{ "template": "blog", "title": "string", "subtitle": "string?", "brand": "string?" }`,
  },
  {
    name: "product",
    description: "Product announcements, landing pages, and feature launches.",
    schema: `{ "template": "product", "title": "string", "subtitle": "string?", "imageUrl": "string?" }`,
  },
  {
    name: "saas",
    description: "Clean SaaS-style cards for features, dashboards, and metrics.",
    schema: `{ "template": "saas", "title": "string", "subtitle": "string?", "brand": "string?" }`,
  },
];

export default function TemplatesPage() {
  return (
    <DocsShell
      title="Template gallery"
      description="Preview the built-in templates and copy the JSON shape each one expects."
    >
      <DocsSection title="Built-in templates">
        <div className="grid gap-5 md:grid-cols-3">
          {templates.map((template) => (
            <div key={template.name} className="rounded border border-line-dim bg-ink-soft p-5">
              <div className="mb-4 aspect-[1200/630] rounded border border-line-dim bg-gradient-to-br from-[#23303A] to-[#171E26] p-5">
                <div className="font-mono text-[10px] uppercase tracking-wider text-gold">
                  {template.name}
                </div>
                <div className="mt-8 font-display text-2xl normal-case leading-tight text-paper">
                  Your title here
                </div>
              </div>
              <h2 className="font-body text-[16px] font-semibold normal-case tracking-normal text-paper">
                {template.name}
              </h2>
              <p className="mt-2 text-sm text-muted">{template.description}</p>
              <CodeBlock>{template.schema}</CodeBlock>
            </div>
          ))}
        </div>
      </DocsSection>

      <DocsSection title="Live try-it form">
        <p>The landing page preview is the live try-it form. Keep it public; it doubles as a selling tool for template quality.</p>
      </DocsSection>
    </DocsShell>
  );
}
