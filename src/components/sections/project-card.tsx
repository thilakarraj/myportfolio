"use client";

import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { ProjectMotif } from "@/components/sections/project-motif";
import { Tag } from "@/components/ui/tag";
import { usePointerFine } from "@/hooks/use-pointer-fine";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpen: (project: Project) => void;
}

/**
 * Bento card with a pointer-following glow (21st.dev "spotlight card" pattern
 * adapted to design tokens) and a very light tilt. Whole card is a single button
 * so keyboard users get one focus stop per project.
 */
export function ProjectCard({ project, index, onOpen }: ProjectCardProps) {
  const ref = React.useRef<HTMLButtonElement>(null);
  const fine = usePointerFine();

  const onMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!fine || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    ref.current.style.setProperty("--mx", `${x}px`);
    ref.current.style.setProperty("--my", `${y}px`);
    const rx = ((y / r.height) - 0.5) * -3;
    const ry = ((x / r.width) - 0.5) * 3;
    ref.current.style.setProperty("--rx", `${rx}deg`);
    ref.current.style.setProperty("--ry", `${ry}deg`);
  };

  const onLeave = () => {
    ref.current?.style.setProperty("--rx", "0deg");
    ref.current?.style.setProperty("--ry", "0deg");
  };

  const visibleTags = project.tags.slice(0, project.span === "wide" ? 6 : 4);
  const remaining = project.tags.length - visibleTags.length;

  return (
    <button
      ref={ref}
      type="button"
      data-cursor="view"
      onClick={() => onOpen(project)}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      aria-label={`View details: ${project.name} — ${project.category}`}
      className={cn(
        "group relative flex h-full w-full flex-col overflow-hidden rounded-[var(--radius-xl)] border border-border bg-surface text-left transition-[border-color,box-shadow,transform] duration-300 ease-[var(--ease-out)]",
        "hover:border-border-strong hover:shadow-soft focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring",
        "[transform:perspective(1200px)_rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))] motion-reduce:[transform:none]",
      )}
      style={{ ["--mx" as string]: "50%", ["--my" as string]: "30%" }}
    >
      {/* pointer glow */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--mx) var(--my), var(--accent-soft), transparent 55%)",
        }}
      />

      <div className="relative flex items-start justify-between gap-4 p-6 pb-0 md:p-7 md:pb-0">
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <span className="text-label text-accent">0{index + 1}</span>
            <span className="text-label truncate">{project.category}</span>
          </div>
          <h3 className="mt-3 text-xl font-semibold tracking-tight text-text sm:text-2xl">
            {project.name}
          </h3>
        </div>
        <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-surface-2 text-muted transition-[background-color,color,transform] duration-300 group-hover:bg-accent group-hover:text-accent-fg group-hover:-rotate-12">
          <ArrowUpRight className="size-4" aria-hidden />
        </span>
      </div>

      <div
        className={cn(
          "relative mx-6 mt-5 flex-1 rounded-[var(--radius-md)] border border-border bg-bg-elevated/70 text-subtle md:mx-7",
          project.span === "tall" ? "min-h-[13rem] lg:max-h-[22rem]" : "min-h-[11rem] max-h-[14rem]",
        )}
      >
        <div className="bg-grid absolute inset-0 rounded-[inherit] opacity-70 [background-size:24px_24px]" aria-hidden />
        <div className="absolute inset-3">
          <ProjectMotif
            kind={project.motif}
            className="transition-transform duration-500 ease-[var(--ease-out)] group-hover:scale-[1.02]"
          />
        </div>
        <span className="absolute bottom-2 right-3 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-subtle">
          conceptual diagram
        </span>
      </div>

      <div className="relative p-6 pt-5 md:p-7 md:pt-5">
        <p className="text-sm leading-relaxed text-muted md:text-[0.95rem]">
          {project.summary}
        </p>
        {project.span === "tall" ? (
          <ul className="mt-5 hidden space-y-2 lg:block" aria-label="Key capabilities">
            {project.highlights.slice(0, 4).map((h) => (
              <li key={h} className="flex items-start gap-2.5 text-sm text-muted">
                <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-secondary" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        ) : null}
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
          {visibleTags.map((t) => (
            <li key={t}>
              <Tag>{t}</Tag>
            </li>
          ))}
          {remaining > 0 ? (
            <li>
              <Tag tone="secondary">+{remaining}</Tag>
            </li>
          ) : null}
        </ul>
      </div>
    </button>
  );
}
