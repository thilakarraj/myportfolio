"use client";

import * as React from "react";
import { Pause, Play } from "lucide-react";
import { tickerItems } from "@/data/site";

/**
 * Credibility strip. CSS-driven marquee that:
 * - duplicates content once for a seamless loop (second copy aria-hidden)
 * - pauses on hover/focus and via an explicit control
 * - is fully static under prefers-reduced-motion
 * - never causes horizontal page overflow (overflow hidden + edge fade)
 */
export function Ticker() {
  const [paused, setPaused] = React.useState(false);

  const items = tickerItems.map((item) => (
    <li key={item} className="flex items-center gap-6 whitespace-nowrap">
      <span className="text-sm font-medium tracking-tight text-muted sm:text-base">
        {item}
      </span>
      <span aria-hidden className="size-1 rounded-full bg-accent/70" />
    </li>
  ));

  return (
    <section aria-label="Core capabilities" className="relative border-y border-border bg-surface/40">
      <div className="ticker container-x relative flex items-center gap-4 py-4">
        <div className="fade-edges-x relative flex-1 overflow-hidden">
          <div
            className="ticker-track flex w-max gap-6"
            data-paused={paused ? "true" : "false"}
          >
            <ul className="m-0 flex list-none gap-6 p-0">{items}</ul>
            <ul className="m-0 flex list-none gap-6 p-0" aria-hidden>
              {items}
            </ul>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          aria-label={paused ? "Resume capability ticker" : "Pause capability ticker"}
          className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-border text-muted transition-colors hover:text-text hover:bg-surface-2 motion-reduce:hidden"
        >
          {paused ? (
            <Play className="size-3.5" aria-hidden />
          ) : (
            <Pause className="size-3.5" aria-hidden />
          )}
        </button>
      </div>
    </section>
  );
}
