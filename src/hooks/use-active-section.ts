"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which section is currently "active" based on scroll position,
 * using the section whose top has passed the nav offset most recently.
 */
export function useActiveSection(ids: readonly string[], offset = 120) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    let frame = 0;

    const compute = () => {
      frame = 0;
      const y = window.scrollY + offset;
      let current: string | null = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.offsetTop <= y) current = id;
      }
      // At the very bottom, force the last section active.
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2
      ) {
        current = ids[ids.length - 1] ?? current;
      }
      setActive(current);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ids, offset]);

  return active;
}
