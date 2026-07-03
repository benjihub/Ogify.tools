import { cn } from "@/lib/utils";

export function Logo({
  className,
  markClassName,
  textClassName,
}: {
  className?: string;
  markClassName?: string;
  textClassName?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5 text-paper", className)}>
      <img
        src="/logo-mark.svg"
        alt=""
        aria-hidden="true"
        className={cn("h-9 w-9 shrink-0", markClassName)}
      />
      <span
        className={cn(
          "font-display text-xl font-bold uppercase tracking-normal text-paper",
          textClassName
        )}
      >
        ogify
      </span>
    </span>
  );
}
