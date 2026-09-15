"use client";

import * as React from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { usePointerFine } from "@/hooks/use-pointer-fine";

const INTERACTIVE = "a, button, [role='button'], input, textarea, select, summary, [data-cursor]";

/**
 * Custom cursor for fine-pointer devices only.
 * - dot follows instantly, ring follows with a spring
 * - ring expands over interactive elements; shows a label for data-cursor="view"
 * - hidden entirely for touch devices and reduced-motion users
 */
export function CustomCursor() {
  const fine = usePointerFine();
  const reduce = useReducedMotion();
  const enabled = fine && !reduce;

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 420, damping: 34, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 420, damping: 34, mass: 0.5 });

  const [visible, setVisible] = React.useState(false);
  const [mode, setMode] = React.useState<"default" | "hover" | "view" | "link">("default");

  React.useEffect(() => {
    if (!enabled) {
      document.documentElement.removeAttribute("data-custom-cursor");
      return;
    }
    document.documentElement.setAttribute("data-custom-cursor", "true");

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
      const target = (e.target as Element | null)?.closest?.(INTERACTIVE) as HTMLElement | null;
      if (!target) {
        setMode("default");
        return;
      }
      const hint = target.dataset.cursor;
      if (hint === "view") setMode("view");
      else if (hint === "link") setMode("link");
      else setMode("hover");
    };
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    document.documentElement.addEventListener("pointerenter", onEnter);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.documentElement.removeEventListener("pointerenter", onEnter);
      document.documentElement.removeAttribute("data-custom-cursor");
    };
  }, [enabled, visible, x, y]);

  if (!enabled) return null;

  const ringSize = mode === "view" ? 72 : mode === "default" ? 34 : 52;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[9999]">
      <motion.div
        className="absolute left-0 top-0 size-1.5 rounded-full bg-accent"
        style={{ x, y, translateX: "-50%", translateY: "-50%", opacity: visible && mode !== "view" ? 1 : 0 }}
      />
      <motion.div
        className="absolute left-0 top-0 flex items-center justify-center rounded-full border border-accent/70 mix-blend-difference"
        style={{ x: rx, y: ry, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: ringSize,
          height: ringSize,
          opacity: visible ? 1 : 0,
          backgroundColor:
            mode === "view" ? "var(--accent)" : mode === "default" ? "rgba(0,0,0,0)" : "var(--accent-soft)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 26, mass: 0.6 }}
      >
        <motion.span
          className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-accent-fg"
          animate={{ opacity: mode === "view" ? 1 : 0, scale: mode === "view" ? 1 : 0.8 }}
          transition={{ duration: 0.18 }}
        >
          View
        </motion.span>
      </motion.div>
    </div>
  );
}
