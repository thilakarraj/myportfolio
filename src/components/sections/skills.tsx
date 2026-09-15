import {
  Cloud,
  Compass,
  Database,
  Server,
  Shield,
  Smartphone,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { skillGroups, type SkillIcon } from "@/data/skills";
import { SectionHeading } from "@/components/ui/section-heading";
import { Stagger, StaggerItem } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

const icons: Record<SkillIcon, LucideIcon> = {
  compass: Compass,
  server: Server,
  smartphone: Smartphone,
  database: Database,
  cloud: Cloud,
  shield: Shield,
  sparkles: Sparkles,
};

export function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="section-y relative border-y border-border bg-surface/30"
    >
      <div className="container-x">
        <SectionHeading
          index="05"
          label="Skills / technology constellation"
          titleId="skills-title"
          title={
            <>
              Depth in the backend, <span className="text-accent">range</span>{" "}
              everywhere it touches.
            </>
          }
          description="Grouped by how they show up in real work: leading, building, storing, shipping, securing and orchestrating."
        />

        <Stagger
          as="ul"
          stagger={0.06}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {skillGroups.map((group, i) => {
            const Icon = icons[group.icon];
            return (
              <StaggerItem
                key={group.id}
                as="li"
                className={cn(
                  "group relative overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface p-6 transition-colors hover:border-border-strong",
                  group.id === "leadership" && "sm:col-span-2",
                )}
              >
                <div
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute -right-10 -top-10 size-32 rounded-full blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                    group.id === "ai" ? "bg-secondary-soft" : "bg-accent-soft",
                  )}
                />
                <div className="relative flex items-center justify-between">
                  <span
                    className={cn(
                      "inline-flex size-10 items-center justify-center rounded-xl",
                      group.id === "ai"
                        ? "bg-secondary-soft text-secondary"
                        : "bg-accent-soft text-accent",
                    )}
                  >
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <span className="font-mono text-xs text-subtle">0{i + 1}</span>
                </div>
                <h3 className="relative mt-5 text-lg font-semibold tracking-tight">
                  {group.title}
                </h3>
                <ul className="relative mt-4 flex flex-wrap gap-1.5" aria-label={`${group.title} skills`}>
                  {group.skills.map((s) => (
                    <li
                      key={s}
                      className="rounded-full border border-border bg-surface-2 px-2.5 py-1 text-[0.78rem] text-muted transition-colors group-hover:border-border-strong"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
