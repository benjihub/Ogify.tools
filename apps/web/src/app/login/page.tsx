import Link from "next/link";
import { AuthForm } from "@/components/AuthForm";
import { Logo } from "@/components/Logo";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6">
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
