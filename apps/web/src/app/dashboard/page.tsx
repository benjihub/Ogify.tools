"use client";

import { useState } from "react";
import Link from "next/link";
import { useUser } from "@/hooks/useUser";
import { ApiKeyCard } from "@/components/ApiKeyCard";
import { UsageBar } from "@/components/UsageBar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function generateMockKey() {
  const chars = "abcdef0123456789";
  const random = Array.from({ length: 32 }, () =>
    chars[Math.floor(Math.random() * chars.length)]
  ).join("");
  return `ogfy_live_${random}`;
}

export default function DashboardPage() {
  const { user } = useUser();
  const [apiKey, setApiKey] = useState(generateMockKey);

  // Replace with a real fetch against your usage/plan table once wired up.
  const plan = { name: "Free", limit: 100, used: 42 };

  async function handleRegenerate() {
    // TODO: call a server action / API route that revokes the old key
    // and persists a new one in Supabase before updating local state.
    await new Promise((resolve) => setTimeout(resolve, 400));
    setApiKey(generateMockKey());
  }

  return (
    <div>
      <h1 className="font-display text-2xl uppercase tracking-wide text-paper">
        Dashboard
      </h1>
      <p className="mt-2 text-sm text-muted">
        Signed in as {user?.email ?? "…"}
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <ApiKeyCard apiKey={apiKey} onRegenerate={handleRegenerate} />

        <Card>
          <h3 className="mb-1 font-mono text-[11px] uppercase tracking-wider text-gold">
            Plan
          </h3>
          <p className="mb-5 text-sm text-muted">
            You&apos;re currently on the {plan.name} plan.
          </p>

          <UsageBar used={plan.used} limit={plan.limit} planName={plan.name} />

          <Link href="/pricing" className="mt-5 inline-block">
            <Button variant="ghost" size="sm">
              View plans
            </Button>
          </Link>
        </Card>
      </div>

      <Card className="mt-6">
        <h3 className="mb-1 font-mono text-[11px] uppercase tracking-wider text-gold">
          Quickstart
        </h3>
        <p className="mb-4 text-sm text-muted">
          Render your first image with this key.
        </p>
        <pre className="overflow-x-auto rounded bg-ink p-4 font-mono text-[12.5px] leading-relaxed text-[#CFE8D9]">
{`curl -X POST https://api.ogify.dev/render/template \\
  -H "x-api-key: ${apiKey}" \\
  -d '{"template":"blog","title":"My Post"}' \\
  --output social.png`}
        </pre>
      </Card>
    </div>
  );
}
