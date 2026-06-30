import { type InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, id, ...props }, ref) => {
    return (
      <div className="mb-4">
        {label && (
          <label
            htmlFor={id}
            className="mb-2 block font-mono text-[11px] uppercase tracking-wider text-line"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            "w-full rounded border border-line-dim bg-ink px-3 py-2.5 font-body text-sm text-paper",
            "placeholder:text-muted focus:outline-none focus:border-cinnabar",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";
