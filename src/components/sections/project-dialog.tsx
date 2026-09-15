"use client";

import { Check, FolderOpen } from "lucide-react";
import type { Project } from "@/data/projects";
import { Dialog } from "@/components/ui/dialog";
import { Tag } from "@/components/ui/tag";
import { ProjectMotif } from "@/components/sections/project-motif";

interface ProjectDialogProps {
  project: Project | null;
  open: boolean;
  onClose: () => void;
}

export function ProjectDialog({ project, open, onClose }: ProjectDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      labelledBy="project-dialog-title"
      describedBy="project-dialog-desc"
    >
      {project ? (
        <article className="flex flex-col">
          <div className="relative border-b border-border bg-bg-elevated p-6 pr-16 md:p-8 md:pr-20">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-label text-accent">{project.domain}</span>
              <span aria-hidden className="h-px w-6 bg-border-strong" />
              <span className="text-label">{project.category}</span>
            </div>
            <h3
              id="project-dialog-title"
              className="text-display mt-3 text-[1.9rem] sm:text-[2.4rem]"
            >
              {project.name}
            </h3>
            <p id="project-dialog-desc" className="mt-3 max-w-[60ch] text-muted">
              {project.summary}
            </p>
          </div>

          <div className="grid gap-8 p-6 md:grid-cols-5 md:p-8">
            <div className="md:col-span-3">
              <div className="space-y-4 text-[0.95rem] leading-relaxed text-muted">
                {project.description.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>

              <h4 className="text-label mt-8 mb-3">What it covers</h4>
              <ul className="space-y-2.5">
                {project.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 text-sm text-text">
                    <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                      <Check className="size-3" aria-hidden />
                    </span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-2">
              <div className="relative overflow-hidden rounded-[var(--radius-md)] border border-border bg-surface-2 p-3 text-subtle">
                <div className="bg-grid absolute inset-0 opacity-70 [background-size:20px_20px]" aria-hidden />
                <ProjectMotif kind={project.motif} className="relative" />
                <span className="absolute bottom-2 right-3 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-subtle">
                  conceptual
                </span>
              </div>

              <h4 className="text-label mt-6 mb-3">Technology</h4>
              <ul className="flex flex-wrap gap-1.5">
                {project.tags.map((t) => (
                  <li key={t}>
                    <Tag>{t}</Tag>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex items-start gap-3 rounded-[var(--radius-md)] border border-dashed border-border-strong p-3.5 text-xs leading-relaxed text-subtle">
                <FolderOpen className="mt-0.5 size-4 shrink-0" aria-hidden />
                <p>
                  Screenshots are intentionally omitted. Product visuals can be
                  added later under{" "}
                  <code className="font-mono text-muted">
                    public/images/projects/{project.assetFolder}/
                  </code>
                  .
                </p>
              </div>
            </div>
          </div>
        </article>
      ) : null}
    </Dialog>
  );
}
