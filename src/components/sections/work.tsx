"use client";

import * as React from "react";
import { ArrowRight, FileText } from "lucide-react";
import { projects, type Project } from "@/data/projects";
import { site } from "@/data/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { Stagger, StaggerItem } from "@/components/ui/reveal";
import { ProjectCard } from "@/components/sections/project-card";
import { ProjectDialog } from "@/components/sections/project-dialog";
import { buttonClasses } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const OPEN_PROJECT_EVENT = "tr:open-project";

const spanClass: Record<Project["span"], string> = {
  wide: "lg:col-span-4",
  tall: "lg:col-span-2 lg:row-span-2",
  default: "lg:col-span-2",
};

export function Work() {
  const [selected, setSelected] = React.useState<Project | null>(null);
  const [open, setOpen] = React.useState(false);

  const openProject = React.useCallback((p: Project) => {
    setSelected(p);
    setOpen(true);
  }, []);

  const close = React.useCallback(() => setOpen(false), []);

  // Allow the command palette (or anything else) to open a project by slug.
  React.useEffect(() => {
    const handler = (e: Event) => {
      const slug = (e as CustomEvent<string>).detail;
      const p = projects.find((x) => x.slug === slug);
      if (p) openProject(p);
    };
    window.addEventListener(OPEN_PROJECT_EVENT, handler);
    return () => window.removeEventListener(OPEN_PROJECT_EVENT, handler);
  }, [openProject]);

  return (
    <section id="work" aria-labelledby="work-title" className="section-y relative">
      <div className="container-x">
        <SectionHeading
          index="02"
          label="Selected work"
          titleId="work-title"
          title={
            <>
              Platforms built to <span className="text-accent">last.</span>
            </>
          }
          description="Five systems across healthcare, diagnostics, logistics and AI. Each card opens a detail view; visuals are conceptual diagrams, not product screenshots."
        />

        <Stagger
          stagger={0.08}
          className="grid auto-rows-[minmax(0,auto)] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6 lg:gap-5"
        >
          {projects.map((p, i) => (
            <StaggerItem
              key={p.slug}
              className={cn(
                "min-h-0",
                p.span === "wide" && "md:col-span-2",
                spanClass[p.span],
              )}
            >
              <ProjectCard project={p} index={i} onOpen={openProject} />
            </StaggerItem>
          ))}

          {/* Fills the bento; a real CTA rather than filler */}
          <StaggerItem className="lg:col-span-2">
            <div className="relative flex h-full min-h-[14rem] flex-col justify-between overflow-hidden rounded-[var(--radius-xl)] border border-border bg-[linear-gradient(160deg,var(--secondary-soft),transparent_60%)] p-6 md:p-7">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-[radial-gradient(closest-side,var(--secondary-soft),transparent)] blur-xl"
              />
              <div>
                <p className="text-label text-secondary">More detail</p>
                <h3 className="mt-3 text-xl font-semibold tracking-tight sm:text-2xl">
                  Full project history and responsibilities are in the resume.
                </h3>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={site.resumePath}
                  download
                  data-cursor="link"
                  className={buttonClasses({ variant: "secondary", size: "md" })}
                >
                  <FileText className="size-4" aria-hidden />
                  Download resume
                </a>
                <a
                  href="#contact"
                  data-cursor="link"
                  className={buttonClasses({ variant: "ghost", size: "md" })}
                >
                  Get in touch
                  <ArrowRight className="size-4" aria-hidden />
                </a>
              </div>
            </div>
          </StaggerItem>
        </Stagger>
      </div>

      <ProjectDialog project={selected} open={open} onClose={close} />
    </section>
  );
}
