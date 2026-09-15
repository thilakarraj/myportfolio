"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Command, Download, Menu, X } from "lucide-react";
import { navLinks, site } from "@/data/site";
import { useActiveSection } from "@/hooks/use-active-section";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { buttonClasses } from "@/components/ui/button";
import { GithubIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

const ids = navLinks.map((l) => l.id);

export function Navbar({ onOpenPalette }: { onOpenPalette?: () => void }) {
  const active = useActiveSection(ids, 140);
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const reduce = useReducedMotion();
  const menuRef = React.useRef<HTMLDialogElement>(null);
  const menuButtonRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile menu: native <dialog> gives focus trap + Escape for free.
  React.useEffect(() => {
    const el = menuRef.current;
    if (!el) return;
    if (menuOpen && !el.open) {
      el.showModal();
      document.body.style.overflow = "hidden";
    } else if (!menuOpen && el.open) {
      el.close();
    }
  }, [menuOpen]);

  React.useEffect(() => {
    const el = menuRef.current;
    if (!el) return;
    const onCancel = (e: Event) => {
      e.preventDefault();
      setMenuOpen(false);
    };
    const onClose = () => {
      document.body.style.overflow = "";
      menuButtonRef.current?.focus();
      setMenuOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (e.target === el) setMenuOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        setMenuOpen(false);
      }
    };
    el.addEventListener("cancel", onCancel);
    el.addEventListener("close", onClose);
    el.addEventListener("click", onClick);
    el.addEventListener("keydown", onKey);
    return () => {
      el.removeEventListener("cancel", onCancel);
      el.removeEventListener("close", onClose);
      el.removeEventListener("click", onClick);
      el.removeEventListener("keydown", onKey);
    };
  }, []);

  // Close menu when crossing to desktop.
  React.useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) setMenuOpen(false);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-fg"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 flex justify-center transition-[padding] duration-300",
          scrolled ? "pt-3 px-3 sm:px-5" : "pt-0 px-0",
        )}
      >
        <nav
          aria-label="Primary"
          className={cn(
            "flex h-[var(--nav-h)] w-full items-center justify-between gap-4 px-4 sm:px-6 transition-[border-radius,background-color,border-color,max-width,box-shadow] duration-300",
            scrolled
              ? "glass max-w-[calc(var(--container)+1rem)] rounded-full shadow-soft"
              : "max-w-none border-b border-transparent bg-transparent",
          )}
        >
          <a
            href="#top"
            className="group flex items-center gap-2 font-mono text-sm font-semibold tracking-[0.18em] text-text"
            aria-label={`${site.name} — back to top`}
          >
            <span className="inline-flex size-8 items-center justify-center rounded-lg bg-accent text-[0.7rem] text-accent-fg tracking-tight">
              {site.initials}
            </span>
            <span className="hidden sm:inline">{site.brand}</span>
          </a>

          <ul className="hidden lg:flex items-center gap-1 rounded-full border border-border bg-surface/40 p-1">
            {navLinks.map((link) => {
              const isActive = active === link.id;
              return (
                <li key={link.id} className="relative">
                  <a
                    href={`#${link.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative z-10 block rounded-full px-3.5 py-1.5 text-[0.85rem] font-medium transition-colors",
                      isActive ? "text-text" : "text-muted hover:text-text",
                    )}
                  >
                    {link.label}
                  </a>
                  {isActive ? (
                    <motion.span
                      layoutId={reduce ? undefined : "nav-indicator"}
                      aria-hidden
                      className="absolute inset-0 rounded-full bg-surface-2 border border-border-strong"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  ) : null}
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            {onOpenPalette ? (
              <button
                type="button"
                onClick={onOpenPalette}
                className="hidden md:inline-flex h-10 items-center gap-2 rounded-full border border-border px-3 font-mono text-[0.72rem] text-muted transition-colors hover:text-text hover:bg-surface-2"
                aria-label="Open command palette"
              >
                <Command className="size-3.5" aria-hidden />
                <span>K</span>
              </button>
            ) : null}
            <ThemeToggle />
            <a
              href={site.resumePath}
              download
              className={cn(
                buttonClasses({ variant: "secondary", size: "sm" }),
                "hidden sm:inline-flex",
              )}
            >
              <Download className="size-3.5" aria-hidden />
              Resume
            </a>
            <button
              ref={menuButtonRef}
              type="button"
              className="inline-flex lg:hidden size-10 items-center justify-center rounded-full border border-border text-text transition-colors hover:bg-surface-2"
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen(true)}
            >
              <Menu className="size-5" aria-hidden />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <dialog
        ref={menuRef}
        id="mobile-menu"
        aria-label="Navigation menu"
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0 backdrop:bg-transparent"
      >
        <AnimatePresence>
          {menuOpen ? (
            <motion.div
              key="sheet"
              initial={reduce ? false : { opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="glass m-3 rounded-[var(--radius-xl)] p-5 shadow-soft"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-semibold tracking-[0.18em]">
                  {site.brand}
                </span>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close navigation menu"
                  className="inline-flex size-10 items-center justify-center rounded-full border border-border text-text hover:bg-surface-2"
                >
                  <X className="size-5" aria-hidden />
                </button>
              </div>
              <ul className="mt-6 flex flex-col divide-y divide-border">
                {navLinks.map((link, i) => (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      onClick={() => setMenuOpen(false)}
                      aria-current={active === link.id ? "true" : undefined}
                      className={cn(
                        "flex items-center justify-between py-4 text-2xl font-semibold tracking-tight transition-colors",
                        active === link.id ? "text-accent" : "text-text hover:text-accent",
                      )}
                    >
                      <span>{link.label}</span>
                      <span className="font-mono text-xs text-subtle">
                        0{i + 1}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-col gap-3">
                <a
                  href={site.resumePath}
                  download
                  className={buttonClasses({ variant: "primary", size: "lg", className: "w-full" })}
                >
                  <Download className="size-4" aria-hidden />
                  Download resume
                </a>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClasses({ variant: "outline", size: "lg", className: "w-full" })}
                >
                  Connect on LinkedIn
                </a>
                <a
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClasses({ variant: "outline", size: "lg", className: "w-full" })}
                >
                  <GithubIcon className="size-4" aria-hidden />
                  GitHub profile
                </a>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </dialog>
    </>
  );
}
