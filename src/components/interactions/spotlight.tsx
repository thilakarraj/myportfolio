"use client";

import * as React from "react";
import { usePointerFine } from "@/hooks/use-pointer-fine";

/**
 * Soft radial spotlight that follows the pointer. Fine pointers only.
 * Uses CSS variables + a single fixed layer, so it costs one composite op.
 */
export function Spotlight() {
  const fine = usePointerFine();
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!fine) return;
    let frame = 0;
    let px = window.innerWidth / 2;
    let py = window.innerHeight * 0.3;

    const paint = () => {
      frame = 0;
      ref.current?.style.setProperty("--sx", `${px}px`);
      ref.current?.style.setProperty("--sy", `${py}px`);
    };
    const onMove = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      if (!frame) frame = requestAnimationFrame(paint);
    };
    paint();
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [fine]);

  if (!fine) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 opacity-80 transition-opacity duration-500 motion-reduce:hidden"
      style={{
        background:
          "radial-gradient(600px circle at var(--sx, 50%) var(--sy, 30%), var(--secondary-soft), transparent 60%)",
      }}
    />
  );
}
