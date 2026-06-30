import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-line-dim py-14">
      <div className="mx-auto max-w-6xl px-7">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div>
            <div className="mb-2 flex items-center gap-2 font-display text-lg uppercase tracking-wide text-paper">
              <span className="h-[9px] w-[9px] rounded-full bg-cinnabar" />
              Ogify
            </div>
            <p className="text-sm text-muted">
              Beautiful social images for your site, in one API call.
            </p>
          </div>

          <FooterCol
            heading="Product"
            links={[
              { label: "Features", href: "/#features" },
              { label: "Pricing", href: "/pricing" },
              { label: "Docs", href: "/docs" },
            ]}
          />
          <FooterCol
            heading="Resources"
            links={[
              { label: "Blog", href: "#" },
              { label: "GitHub", href: "#" },
              { label: "Community Discord", href: "#" },
            ]}
          />
          <FooterCol
            heading="Legal"
            links={[
              { label: "Privacy policy", href: "/privacy" },
              { label: "Terms of service", href: "/terms" },
            ]}
          />
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-line-dim pt-6">
          <span className="font-mono text-xs text-line">
            Ogify — bootstrapped with $100.
          </span>
          <span className="rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-line">
            Paddle — merchant of record
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  heading,
  links,
}: {
  heading: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="mb-3 font-mono text-[11px] uppercase tracking-wider text-gold">
        {heading}
      </h4>
      <div className="flex flex-col gap-2">
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="text-sm text-muted hover:text-paper"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
