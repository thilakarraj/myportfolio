"use client";

import * as React from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import {
  Boxes,
  Cloud,
  Database,
  Monitor,
  Pause,
  Play,
  Plug,
  Shield,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { architectureLayers, type ArchIcon } from "@/data/architecture";
import { cn } from "@/lib/utils";

const icons: Record<ArchIcon, LucideIcon> = {
  monitor: Monitor,
  shield: Shield,
  boxes: Boxes,
  workflow: Workflow,
  database: Database,
  plug: Plug,
  cloud: Cloud,
};

/**
 * Animated request flow through a representative platform.
 * Desktop: horizontal stepper with animated connectors + detail panel.
 * Mobile: vertical rail with inline details.
 * Auto-advances while in view; pauses on interaction, focus, or reduced motion.
 */
export function ArchitectureFlow() {
  const [active, setActive] = React.useState(0);
  const [userPaused, setUserPaused] = React.useState(false);
  const [interacting, setInteracting] = React.useState(false);
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });

  const playing = inView && !userPaused && !interacting && !reduce;

  React.useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      setActive((a) => (a + 1) % architectureLayers.length);
    }, 2800);
    return () => window.clearInterval(id);
  }, [playing]);

  const current = architectureLayers[active];

  return (
    <div
      ref={ref}
      className="surface-card relative overflow-hidden p-5 md:p-8"
      onPointerEnter={() => setInteracting(true)}
      onPointerLeave={() => setInteracting(false)}
      onFocusCapture={() => setInteracting(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setInteracting(false);
      }}
    >
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-60 [background-size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,#000,transparent_80%)]" aria-hidden />

      <div className="relative mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-label">
          Request flow · <span className="text-accent">representative engineering model</span>
        </p>
        <button
          type="button"
          onClick={() => setUserPaused((p) => !p)}
          aria-pressed={userPaused}
          aria-label={userPaused ? "Resume architecture walkthrough" : "Pause architecture walkthrough"}
          className="inline-flex h-8 items-center gap-2 rounded-full border border-border px-3 font-mono text-[0.68rem] text-muted transition-colors hover:text-text hover:bg-surface-2 motion-reduce:hidden"
        >
          {userPaused ? <Play className="size-3" aria-hidden /> : <Pause className="size-3" aria-hidden />}
          {userPaused ? "Play" : "Auto"}
        </button>
      </div>

      {/* Desktop stepper */}
      <div className="relative hidden lg:block">
        <svg
          className="pointer-events-none absolute left-0 right-0 top-[2.1rem] h-2 w-full"
          viewBox="0 0 1000 8"
          preserveAspectRatio="none"
          aria-hidden
        >
          <line x1="70" y1="4" x2="930" y2="4" stroke="var(--border-strong)" strokeWidth="1" />
          <line
            x1="70"
            y1="4"
            x2="930"
            y2="4"
            className="flow-line"
            stroke="var(--accent)"
            strokeWidth="1.5"
            opacity="0.7"
          />
        </svg>
        <ol className="relative grid grid-cols-7 gap-3" aria-label="Architecture layers">
          {architectureLayers.map((layer, i) => {
            const Icon = icons[layer.icon];
            const isActive = i === active;
            return (
              <li key={layer.id} className="flex flex-col items-center text-center">
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-pressed={isActive}
                  aria-label={`${layer.title}: ${layer.caption}`}
                  className={cn(
                    "relative inline-flex size-[4.25rem] items-center justify-center rounded-2xl border bg-surface transition-[border-color,background-color,box-shadow,transform] duration-300",
                    isActive
                      ? "border-accent text-accent shadow-glow scale-105"
                      : "border-border text-muted hover:border-border-strong hover:text-text",
                  )}
                >
                  <Icon className="size-6" aria-hidden />
                  <span
                    aria-hidden
                    className={cn(
                      "absolute -bottom-1.5 left-1/2 size-2 -translate-x-1/2 rounded-full bg-accent transition-opacity",
                      isActive ? "opacity-100" : "opacity-0",
                    )}
                  />
                </button>
                <span
                  className={cn(
                    "mt-4 text-[0.78rem] font-semibold leading-snug tracking-tight transition-colors",
                    isActive ? "text-text" : "text-muted",
                  )}
                >
                  {layer.title}
                </span>
                <span className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-subtle">
                  0{i + 1}
                </span>
              </li>
            );
          })}
        </ol>

        <div
          className="relative mt-8 min-h-[7.5rem] rounded-[var(--radius-md)] border border-border bg-bg-elevated/70 p-5"
          aria-live="polite"
          aria-atomic="true"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current.id}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center"
            >
              <div>
                <p className="text-label text-accent">0{active + 1} · {current.title}</p>
                <p className="mt-2 text-lg font-medium tracking-tight text-text">{current.caption}</p>
              </div>
              <ul className="flex flex-wrap gap-1.5 md:justify-end">
                {current.items.map((it) => (
                  <li
                    key={it}
                    className="rounded-full border border-border bg-surface px-3 py-1 font-mono text-[0.7rem] text-muted"
                  >
                    {it}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile / tablet vertical rail */}
      <ol className="relative lg:hidden" aria-label="Architecture layers">
        <span
          aria-hidden
          className="absolute left-[1.45rem] top-6 bottom-6 w-px bg-[linear-gradient(180deg,var(--accent),var(--secondary),transparent)] opacity-60"
        />
        {architectureLayers.map((layer, i) => {
          const Icon = icons[layer.icon];
          const isActive = i === active;
          return (
            <li key={layer.id} className="relative flex gap-4 pb-6 last:pb-0">
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={isActive}
                aria-label={`${layer.title}: ${layer.caption}`}
                className={cn(
                  "relative z-10 inline-flex size-12 shrink-0 items-center justify-center rounded-xl border bg-surface transition-colors",
                  isActive ? "border-accent text-accent shadow-glow" : "border-border text-muted",
                )}
              >
                <Icon className="size-5" aria-hidden />
              </button>
              <div className="min-w-0 flex-1 pt-1">
                <p className="text-[0.95rem] font-semibold tracking-tight text-text">{layer.title}</p>
                <p className="mt-0.5 text-sm text-muted">{layer.caption}</p>
                <ul className="mt-2.5 flex flex-wrap gap-1.5">
                  {layer.items.map((it) => (
                    <li
                      key={it}
                      className="rounded-full border border-border bg-surface-2 px-2.5 py-1 font-mono text-[0.65rem] text-muted"
                    >
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
