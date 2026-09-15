"use client";

import * as React from "react";
import { Navbar } from "@/components/layout/navbar";
import { CommandPalette } from "@/components/interactions/command-palette";
import { CustomCursor } from "@/components/interactions/custom-cursor";
import { Spotlight } from "@/components/interactions/spotlight";

/**
 * Client shell: owns global interaction state (command palette) and mounts
 * pointer-only enhancements. Page sections are passed in as server-rendered children.
 */
export function Shell({ children }: { children: React.ReactNode }) {
  const [paletteOpen, setPaletteOpen] = React.useState(false);
  const openPalette = React.useCallback(() => setPaletteOpen(true), []);
  const closePalette = React.useCallback(() => setPaletteOpen(false), []);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <Spotlight />
      <Navbar onOpenPalette={openPalette} />
      <main id="main" className="relative z-[1] flex-1">
        {children}
      </main>
      <CommandPalette open={paletteOpen} onClose={closePalette} />
      <CustomCursor />
    </>
  );
}
