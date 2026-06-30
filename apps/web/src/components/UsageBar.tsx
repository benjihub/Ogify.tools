import { cn, formatNumber } from "@/lib/utils";

interface UsageBarProps {
  used: number;
  limit: number;
  planName: string;
}

export function UsageBar({ used, limit, planName }: UsageBarProps) {
  const pct = Math.min(100, Math.round((used / limit) * 100));
  const isNearLimit = pct >= 80;

  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <span className="font-mono text-[11px] uppercase tracking-wider text-line">
          {planName} plan usage
        </span>
        <span className="font-mono text-xs text-muted">
          {formatNumber(used)} / {formatNumber(limit)} renders
        </span>
      </div>

      <div className="h-2 w-full overflow-hidden rounded-full bg-ink">
        <div
          className={cn(
            "h-full rounded-full transition-all",
            isNearLimit ? "bg-cinnabar" : "bg-gold"
          )}
          style={{ width: `${pct}%` }}
        />
      </div>

      {isNearLimit && (
        <p className="mt-2 font-mono text-xs text-cinnabar">
          You&apos;re close to your monthly limit — consider upgrading.
        </p>
      )}
    </div>
  );
}
