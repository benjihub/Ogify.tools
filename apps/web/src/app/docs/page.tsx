import Link from "next/link";
import { DocsSection, DocsShell } from "./docs-shell";

export default function DocsPage() {
  return (
    <DocsShell
      title="Ogify documentation"
      description="Start with the quickstart, then use the reference pages when you need exact request fields, limits, caching behavior, and template schemas."
    >
      <DocsSection title="Smallest launch-ready docs structure">
        <div className="grid gap-4 md:grid-cols-2">
          {[
            ["Quickstart", "/docs/quickstart", "Render your first image in a few minutes."],
            ["Authentication", "/docs/authentication", "API keys, headers, rotation, and security."],
            ["Render template", "/docs/api-reference/render-template", "JSON body fields, responses, and errors."],
            ["Render URL", "/docs/api-reference/render-url", "Screenshot parameters, viewport, and caching."],
            ["Templates", "/docs/templates", "Built-in template gallery and schemas."],
            ["Rate limits", "/docs/rate-limits", "Plan limits, usage checks, and 429 behavior."],
          ].map(([title, href, body]) => (
            <Link
              key={href}
              href={href}
              className="rounded border border-line-dim bg-ink-soft p-5 hover:border-line"
            >
              <h2 className="font-body text-[16px] font-semibold normal-case tracking-normal text-paper">
                {title}
              </h2>
              <p className="mt-2 text-sm text-muted">{body}</p>
            </Link>
          ))}
        </div>
      </DocsSection>
    </DocsShell>
  );
}
