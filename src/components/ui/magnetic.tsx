"use client";

import * as React from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { usePointerFine } from "@/hooks/use-pointer-fine";

interface MagneticProps {
  children: React.ReactNode;
  /** 0–1: how far the element follows the pointer within its bounds. */
  strength?: number;
  className?: string;
}

/**
 * Subtle magnetic wrapper (21st.dev "magnetic button" pattern, tuned down).
 * Disabled for coarse pointers and reduced-motion users.
 */
export function Magnetic({ children, strength = 0.18, className }: MagneticProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const fine = usePointerFine();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 22, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 260, damping: 22, mass: 0.4 });

  const enabled = fine && !reduce;

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!enabled || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    x.set(dx * strength);
    y.set(dy * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={enabled ? { x: sx, y: sy, display: "inline-block" } : { display: "inline-block" }}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.div>
  );
}
