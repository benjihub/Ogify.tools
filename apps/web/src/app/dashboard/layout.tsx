import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-line-dim">
        <div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between px-7">
          <Link
            href="/"
            className="flex items-center gap-2 font-display text-xl uppercase tracking-wide text-paper"
          >
            <span className="h-[9px] w-[9px] rounded-full bg-cinnabar" />
            Ogify
          </Link>
          <span className="font-mono text-xs text-muted">{user.email}</span>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-7 py-12">{children}</main>
    </div>
  );
}
