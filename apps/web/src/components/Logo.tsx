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
      <svg
        aria-hidden="true"
        className={cn("h-7 w-7 shrink-0 text-cinnabar", markClassName)}
        viewBox="0 0 120 120"
        fill="none"
      >
        <circle cx="60" cy="60" r="46" stroke="currentColor" strokeWidth="9" />
        <g className="logo-shutter-blades">
          <path d="M60 24 73 43 60 60Z" fill="currentColor" />
          <path d="M96 60 77 73 60 60Z" fill="currentColor" />
          <path d="M60 96 47 77 60 60Z" fill="currentColor" />
          <path d="M24 60 43 47 60 60Z" fill="currentColor" />
        </g>
        <circle cx="60" cy="60" r="10" className="fill-gold" />
      </svg>
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
