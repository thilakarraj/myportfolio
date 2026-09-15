"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      aria-pressed={!isDark}
      className={cn(
        "relative inline-flex size-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:text-text hover:bg-surface-2",
        className,
      )}
    >
      <Sun
        aria-hidden
        className={cn(
          "absolute size-[1.05rem] transition-all duration-300",
          isDark ? "scale-0 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100",
        )}
      />
      <Moon
        aria-hidden
        className={cn(
          "absolute size-[1.05rem] transition-all duration-300",
          isDark ? "scale-100 rotate-0 opacity-100" : "scale-0 -rotate-90 opacity-0",
        )}
      />
    </button>
  );
}
