"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export type DocLink = {
  href: string;
  label: string;
};

export function DocsNav({ links }: { links: DocLink[] }) {
  const pathname = usePathname();

  return (
    <>
      <Link
        href="/docs"
        className={cn(
          "mb-5 block font-display text-lg uppercase tracking-wide text-paper",
          pathname === "/docs" && "font-bold"
        )}
      >
        Docs
      </Link>
      <nav className="flex flex-col gap-2 border-l border-line-dim pl-4">
        {links.map((link) => {
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium text-muted transition hover:text-paper",
                isActive && "font-bold text-paper"
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
