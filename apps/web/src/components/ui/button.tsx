import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "primary" | "secondary" | "ghost" | "paper";
  size?: "sm" | "md";
  asChild?: boolean;
  href?: string;
  children: React.ReactNode;
};

export function Button({
  variant = "default",
  size = "md",
  asChild,
  href,
  className,
  children,
  ...props
}: ButtonProps) {
  const styles = cn(
    "inline-flex items-center justify-center rounded font-mono uppercase tracking-wide transition-colors",
    size === "sm" ? "h-8 px-3 text-[11px]" : "h-10 px-4 text-[12.5px]",
    (variant === "default" || variant === "primary") &&
      "border border-cinnabar bg-cinnabar text-paper hover:bg-cinnabar-dark",
    variant === "secondary" &&
      "border border-line-dim bg-ink-soft text-paper hover:border-line",
    variant === "ghost" &&
      "border border-line-dim bg-transparent text-paper hover:border-line hover:bg-ink-soft",
    variant === "paper" &&
      "border border-paper bg-paper text-ink hover:bg-paper-dim",
    className
  );

  if (asChild && href) {
    return (
      <Link className={styles} href={href}>
        {children}
      </Link>
    );
  }

  return (
    <button className={styles} {...props}>
      {children}
    </button>
  );
}
