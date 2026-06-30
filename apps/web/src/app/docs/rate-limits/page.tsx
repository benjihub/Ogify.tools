import Link from "next/link";
import { CodeBlock, DocsSection, DocsShell } from "../docs-shell";

export default function RateLimitsPage() {
  return (
    <DocsShell
      title="Rate limits & usage"
      description="Understand plan limits, how usage is counted, and what happens when an account runs out of quota."
    >
      <DocsSection title="Plan limits">
        <ul className="list-disc space-y-2 pl-5">
          <li>Free: 100 renders per month.</li>
          <li>Starter: 500 renders per month.</li>
          <li>Pro: 2,000 renders per month.</li>
          <li>Business: 10,000 renders per month.</li>
        </ul>
      </DocsSection>

      <DocsSection title="Check usage">
        <p>Use the dashboard for now. A `/usage` API endpoint can be added later for automated monitoring.</p>
        <Link href="/dashboard" className="text-cinnabar hover:underline">
          Open dashboard
        </Link>
      </DocsSection>

      <DocsSection title="Limit exceeded behavior">
        <p>When a key exceeds its limit, Ogify returns HTTP 429 with a retry hint.</p>
        <CodeBlock>{`HTTP/1.1 429 Too Many Requests
Retry-After: 86400
Content-Type: application/json

{ "error": "Rate limit exceeded" }`}</CodeBlock>
      </DocsSection>

      <DocsSection title="Caching & best practices">
        <ul className="list-disc space-y-2 pl-5">
          <li>Cache generated images at the edge and respect ETags.</li>
          <li>Use stable `og:image` URLs so social platforms can reuse previews.</li>
          <li>Pre-generate important images during CI/CD for launch pages and high-traffic posts.</li>
        </ul>
      </DocsSection>
    </DocsShell>
  );
}
