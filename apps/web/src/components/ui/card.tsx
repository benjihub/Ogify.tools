import { cn } from "@/lib/utils";

type CardProps = {
  className?: string;
  children: React.ReactNode;
};

export function Card({ className, children }: CardProps) {
  return (
    <div className={cn("rounded border border-line-dim bg-ink-soft p-5 text-paper", className)}>
      {children}
    </div>
  );
}

export function PaperCard({ className, children }: CardProps) {
  return (
    <div className={cn("rounded bg-paper p-6 text-ink", className)}>
      {children}
    </div>
  );
}
