import Link from "next/link";
import { AuthForm } from "@/components/AuthForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6">
      <Link
        href="/"
        className="mb-10 flex items-center gap-2 font-display text-xl uppercase tracking-wide text-paper"
      >
        <span className="h-[9px] w-[9px] rounded-full bg-cinnabar" />
        Ogify
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
