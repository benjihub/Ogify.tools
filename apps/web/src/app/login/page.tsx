import Link from "next/link";
import { AuthForm } from "@/components/AuthForm";
import { Logo } from "@/components/Logo";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6">
      <Link
        href="/#features"
        aria-label="Back to features"
        className="absolute left-6 top-6 flex h-9 w-9 items-center justify-center rounded border border-line-dim text-muted transition hover:border-line hover:text-paper"
      >
        <span aria-hidden="true" className="font-mono text-lg leading-none">
          ←
        </span>
      </Link>

      <Link
        href="/"
        className="mb-10 flex items-center text-paper"
      >
        <Logo />
      </Link>

      <div className="mb-8 text-center">
        <h1 className="font-display text-2xl uppercase tracking-wide text-paper">
          Log in
        </h1>
        <p className="mt-2 text-sm text-muted">
          Welcome back — pick up where you left off.
        </p>
      </div>

      <AuthForm mode="login" />
    </main>
  );
}
