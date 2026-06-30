import { CodeBlock, DocsSection, DocsShell } from "../docs-shell";

const templates = [
  {
    name: "blog",
    description: "Editorial cards for posts, essays, changelogs, and tutorials.",
    schema: `{ "template": "blog", "title": "string", "subtitle": "string?", "brand": "string?" }`,
    preview: "blog",
  },
  {
    name: "product",
    description: "Product announcements, landing pages, and feature launches.",
    schema: `{ "template": "product", "title": "string", "subtitle": "string?", "imageUrl": "string?" }`,
    preview: "product",
  },
  {
    name: "saas",
    description: "Clean SaaS-style cards for features, dashboards, and metrics.",
    schema: `{ "template": "saas", "title": "string", "subtitle": "string?", "brand": "string?" }`,
    preview: "saas",
  },
] as const;

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
              <TemplatePreview kind={template.preview} />
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

function TemplatePreview({ kind }: { kind: "blog" | "product" | "saas" }) {
  if (kind === "product") {
    return (
      <svg
        aria-label="Product template preview"
        className="mb-4 aspect-[1200/630] w-full rounded border border-line-dim bg-ink"
        viewBox="0 0 1200 630"
        role="img"
      >
        <rect width="1200" height="630" fill="#10141B" />
        <rect x="72" y="72" width="1056" height="486" rx="28" fill="#EFE8D8" />
        <circle cx="912" cy="210" r="108" fill="#C73E1D" />
        <circle cx="976" cy="286" r="60" fill="#D4A12C" />
        <rect x="118" y="118" width="104" height="20" rx="10" fill="#C73E1D" />
        <text x="118" y="268" fill="#14181F" fontFamily="Arial, sans-serif" fontSize="72" fontWeight="800">
          Ship the launch
        </text>
        <text x="118" y="344" fill="#5B5B55" fontFamily="Arial, sans-serif" fontSize="34">
          Product cards with bold visual focus.
        </text>
        <rect x="118" y="426" width="210" height="48" rx="24" fill="#14181F" />
        <text x="154" y="457" fill="#EFE8D8" fontFamily="Arial, sans-serif" fontSize="22" fontWeight="700">
          ogify.dev
        </text>
      </svg>
    );
  }

  if (kind === "saas") {
    return (
      <svg
        aria-label="SaaS template preview"
        className="mb-4 aspect-[1200/630] w-full rounded border border-line-dim bg-ink"
        viewBox="0 0 1200 630"
        role="img"
      >
        <rect width="1200" height="630" fill="#14181F" />
        <rect x="78" y="82" width="1044" height="466" rx="20" fill="#1D232C" stroke="#3A4150" strokeWidth="3" />
        <rect x="128" y="128" width="282" height="176" rx="16" fill="#EFE8D8" />
        <rect x="446" y="128" width="626" height="176" rx="16" fill="#222B36" />
        <rect x="128" y="338" width="944" height="150" rx="16" fill="#222B36" />
        <rect x="168" y="176" width="72" height="18" rx="9" fill="#C73E1D" />
        <text x="168" y="246" fill="#14181F" fontFamily="Arial, sans-serif" fontSize="48" fontWeight="800">
          99.9%
        </text>
        <text x="486" y="214" fill="#EFE8D8" fontFamily="Arial, sans-serif" fontSize="44" fontWeight="800">
          Metrics that matter
        </text>
        <text x="486" y="272" fill="#A9AFBC" fontFamily="Arial, sans-serif" fontSize="26">
          Dashboard-ready previews for SaaS teams.
        </text>
        <path d="M170 430 C260 372 330 462 410 410 S560 388 650 438 S800 458 914 384" fill="none" stroke="#D4A12C" strokeWidth="14" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg
      aria-label="Blog template preview"
      className="mb-4 aspect-[1200/630] w-full rounded border border-line-dim bg-ink"
      viewBox="0 0 1200 630"
      role="img"
    >
      <rect width="1200" height="630" fill="#EFE8D8" />
      <rect x="76" y="76" width="1048" height="478" rx="18" fill="#14181F" />
      <rect x="118" y="118" width="126" height="24" rx="12" fill="#D4A12C" />
      <text x="118" y="246" fill="#EFE8D8" fontFamily="Arial, sans-serif" fontSize="68" fontWeight="800">
        Notes from the build
      </text>
      <text x="118" y="322" fill="#A9AFBC" fontFamily="Arial, sans-serif" fontSize="32">
        Editorial Open Graph images for every post.
      </text>
      <line x1="118" y1="414" x2="704" y2="414" stroke="#3A4150" strokeWidth="4" />
      <text x="118" y="472" fill="#C73E1D" fontFamily="Arial, sans-serif" fontSize="26" fontWeight="700">
        Ogify Journal
      </text>
    </svg>
  );
}
