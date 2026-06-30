import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line-dim bg-ink/90 backdrop-blur">
      <div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between px-7">
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-xl uppercase tracking-wide text-paper"
        >
          <span className="h-[9px] w-[9px] rounded-full bg-cinnabar" />
          Ogify
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-muted md:flex">
          <Link href="/#features" className="hover:text-paper">Features</Link>
          <Link href="/pricing" className="hover:text-paper">Pricing</Link>
          <Link href="/docs" className="hover:text-paper">Docs</Link>
          <Link href="/login" className="hover:text-paper">Login</Link>
        </nav>

        <Link href="/signup">
          <Button variant="primary" size="sm">Get started free</Button>
        </Link>
      </div>
    </header>
  );
}
