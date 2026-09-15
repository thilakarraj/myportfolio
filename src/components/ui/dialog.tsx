"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  describedBy?: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Accessible modal built on the native <dialog> element:
 * - showModal() traps focus and makes the rest of the page inert
 * - Escape closes (cancel event), backdrop click closes
 * - Focus is restored to the previously focused element on close
 * - Body scroll is locked while open
 */
export function Dialog({
  open,
  onClose,
  labelledBy,
  describedBy,
  children,
  className,
}: DialogProps) {
  const ref = React.useRef<HTMLDialogElement>(null);
  const lastFocused = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (open && !el.open) {
      lastFocused.current = document.activeElement as HTMLElement | null;
      el.showModal();
      document.body.style.overflow = "hidden";
      // Move focus to the close button (first focusable) for predictable start.
      const first = el.querySelector<HTMLElement>("[data-autofocus]");
      first?.focus();
    } else if (!open && el.open) {
      el.close();
    }
  }, [open]);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleCancel = (e: Event) => {
      e.preventDefault();
      onClose();
    };
    const handleClose = () => {
      document.body.style.overflow = "";
      lastFocused.current?.focus?.();
      // Keep React state in sync if the browser closed the dialog natively.
      onClose();
    };
    const handleClick = (e: MouseEvent) => {
      if (e.target === el) onClose();
    };
    // Explicit Escape handling: some environments skip the `cancel` event.
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        onClose();
      }
    };

    el.addEventListener("cancel", handleCancel);
    el.addEventListener("close", handleClose);
    el.addEventListener("click", handleClick);
    el.addEventListener("keydown", handleKey);
    return () => {
      el.removeEventListener("cancel", handleCancel);
      el.removeEventListener("close", handleClose);
      el.removeEventListener("click", handleClick);
      el.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
      className={cn(
        "m-auto w-[min(100vw-1.5rem,52rem)] max-h-[min(100dvh-1.5rem,52rem)] overflow-hidden rounded-[var(--radius-xl)] border border-border bg-surface p-0 text-text shadow-soft backdrop:bg-transparent",
        "open:flex open:flex-col",
        className,
      )}
    >
      <div className="relative flex max-h-[min(100dvh-1.5rem,52rem)] flex-col overflow-y-auto">
        <button
          type="button"
          data-autofocus
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute right-4 top-4 z-10 inline-flex size-10 items-center justify-center rounded-full border border-border bg-surface-2/80 text-muted backdrop-blur transition-colors hover:text-text hover:bg-surface-hover"
        >
          <X className="size-4" aria-hidden />
        </button>
        {children}
      </div>
    </dialog>
  );
}
