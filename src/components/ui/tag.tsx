import { cn } from "@/lib/utils";

export function Tag({
  children,
  className,
  tone = "default",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "default" | "accent" | "secondary";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[0.7rem] leading-none tracking-wide whitespace-nowrap",
        tone === "default" && "border-border bg-surface-2 text-muted",
        tone === "accent" && "border-accent/30 bg-accent-soft text-accent",
        tone === "secondary" && "border-secondary/30 bg-secondary-soft text-secondary",
        className,
      )}
    >
      {children}
    </span>
  );
}
