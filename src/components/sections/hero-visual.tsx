"use client";

import { motion, useReducedMotion } from "motion/react";
import { ProfileImage } from "@/components/sections/profile-image";

const nodes = [
  { label: "API", angle: 20, r: 46 },
  { label: "Async", angle: 140, r: 46 },
  { label: "Data", angle: 255, r: 46 },
  { label: "LLM", angle: 80, r: 36 },
  { label: "Mobile", angle: 200, r: 36 },
  { label: "CI/CD", angle: 320, r: 36 },
];

function polar(angle: number, r: number) {
  const a = (angle * Math.PI) / 180;
  return { x: 50 + r * Math.cos(a), y: 50 + r * Math.sin(a) };
}

/**
 * Orbital / network motif: rotating rings with labelled nodes around the portrait.
 * Pure SVG + CSS animation; static under reduced motion.
 */
export function HeroVisual() {
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[17rem] sm:max-w-[24rem] lg:max-w-[30rem]">
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 size-full overflow-visible"
        aria-hidden
        focusable="false"
      >
        <defs>
          <radialGradient id="hero-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.18" />
            <stop offset="60%" stopColor="var(--secondary)" stopOpacity="0.06" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="49" fill="url(#hero-glow)" />

        <g className="orbit-c">
          <circle
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke="var(--border-strong)"
            strokeWidth="0.25"
            strokeDasharray="0.6 2"
          />
        </g>
        <g className="orbit-a">
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke="var(--border-strong)"
            strokeWidth="0.3"
          />
          {nodes
            .filter((n) => n.r === 46)
            .map((n) => {
              const p = polar(n.angle, n.r);
              return (
                <g key={n.label}>
                  <circle cx={p.x} cy={p.y} r="1.6" fill="var(--bg)" stroke="var(--accent)" strokeWidth="0.5" />
                  <circle cx={p.x} cy={p.y} r="0.6" fill="var(--accent)" />
                </g>
              );
            })}
        </g>
        <g className="orbit-b">
          <circle
            cx="50"
            cy="50"
            r="36"
            fill="none"
            stroke="var(--border)"
            strokeWidth="0.3"
            strokeDasharray="3 2"
          />
          {nodes
            .filter((n) => n.r === 36)
            .map((n) => {
              const p = polar(n.angle, n.r);
              return (
                <g key={n.label}>
                  <circle cx={p.x} cy={p.y} r="1.4" fill="var(--bg)" stroke="var(--secondary)" strokeWidth="0.5" />
                  <circle cx={p.x} cy={p.y} r="0.5" fill="var(--secondary)" />
                </g>
              );
            })}
        </g>

        {/* connecting chords */}
        <g stroke="var(--border-strong)" strokeWidth="0.2" opacity="0.6">
          <line x1="50" y1="4" x2="50" y2="14" />
          <line x1="96" y1="50" x2="86" y2="50" />
          <line x1="50" y1="96" x2="50" y2="86" />
          <line x1="4" y1="50" x2="14" y2="50" />
        </g>
      </svg>

      {/* Static labels (kept readable; not rotated) */}
      <ul className="pointer-events-none absolute inset-0 m-0 list-none p-0 font-mono text-[0.6rem] tracking-[0.14em] uppercase text-subtle">
        {[
          { l: "Architecture", cls: "left-0 top-[8%]" },
          { l: "Delivery", cls: "right-0 top-[8%] text-right" },
          { l: "Systems", cls: "left-0 bottom-[8%]" },
          { l: "AI", cls: "right-0 bottom-[8%] text-right" },
        ].map((t) => (
          <li key={t.l} className={`absolute ${t.cls}`}>
            {t.l}
          </li>
        ))}
      </ul>

      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="absolute left-1/2 top-1/2 w-[52%] -translate-x-1/2 -translate-y-1/2"
      >
        <ProfileImage priority className="shadow-soft" />
      </motion.div>

      <div className="glass absolute bottom-[6%] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-3 py-1.5 font-mono text-[0.65rem] tracking-wide text-muted">
        <span className="mr-2 inline-block size-1.5 rounded-full bg-accent align-middle" aria-hidden />
        11+ yrs · Chennai
      </div>
    </div>
  );
}
