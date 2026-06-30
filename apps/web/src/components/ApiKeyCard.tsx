"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ApiKeyCardProps {
  apiKey: string;
  onRegenerate: () => Promise<void>;
}

export function ApiKeyCard({ apiKey, onRegenerate }: ApiKeyCardProps) {
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [regenerating, setRegenerating] = useState(false);

  const masked = `${apiKey.slice(0, 8)}${"•".repeat(20)}${apiKey.slice(-4)}`;

  async function handleCopy() {
    await navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  async function handleRegenerate() {
    if (!confirm("Regenerating revokes the current key immediately. Continue?")) return;
    setRegenerating(true);
    await onRegenerate();
    setRegenerating(false);
  }

  return (
    <Card>
      <h3 className="mb-1 font-mono text-[11px] uppercase tracking-wider text-gold">
        API key
      </h3>
      <p className="mb-4 text-sm text-muted">
        Use this key in the <code className="text-paper">x-api-key</code> header on every request.
      </p>

      <div className="flex items-center justify-between rounded border border-line-dim bg-ink px-4 py-3 font-mono text-sm text-paper">
        <span>{revealed ? apiKey : masked}</span>
        <button
          onClick={() => setRevealed((v) => !v)}
          className="text-xs text-line hover:text-paper"
        >
          {revealed ? "Hide" : "Reveal"}
        </button>
      </div>

      <div className="mt-4 flex gap-3">
        <Button variant="ghost" size="sm" onClick={handleCopy}>
          {copied ? "Copied" : "Copy key"}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleRegenerate}
          disabled={regenerating}
        >
          {regenerating ? "Regenerating…" : "Regenerate"}
        </Button>
      </div>
    </Card>
  );
}
