import {
  ClipboardCheck,
  Code2,
  Gauge,
  GitPullRequest,
  LifeBuoy,
  MessagesSquare,
  Network,
  Shield,
  Rocket,
  Users,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";

const practices = [
  { label: "Solution design", icon: Network },
  { label: "Software architecture", icon: Code2 },
  { label: "Technical ownership", icon: ClipboardCheck },
  { label: "Code reviews", icon: GitPullRequest },
  { label: "Performance engineering", icon: Gauge },
  { label: "Security practices", icon: Shield },
  { label: "Release governance", icon: Rocket },
  { label: "Production support", icon: LifeBuoy },
  { label: "Mentoring", icon: Users },
  { label: "Stakeholder communication", icon: MessagesSquare },
];

const domains = [
  "Healthcare",
  "Medical diagnostics",
  "Logistics",
  "Enterprise SaaS",
  "Mobile applications",
  "AI-driven automation",
];

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section-y relative">
      <div className="container-x">
        <SectionHeading
          index="01"
          label="About / Perspective"
          titleId="about-title"
          title={
            <>
              Engineering with <span className="text-accent">ownership.</span>
            </>
          }
        />

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-xl leading-snug font-medium tracking-tight text-text sm:text-2xl md:text-[1.75rem] md:leading-[1.3]">
                I turn complex requirements into maintainable platforms—from
                high-volume data pipelines and secure APIs to offline-first
                mobile systems and AI orchestration.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-7 max-w-[62ch] text-base leading-relaxed text-muted md:text-lg">
                Thilakar Raj Suyambu is a Technical Lead Engineer, Technical Manager
                and Solution Architect with 11+ years of software engineering
                experience across healthcare, medical diagnostics, logistics,
                enterprise SaaS, mobile applications, and AI-driven automation. He
                combines hands-on Java and Spring Boot engineering with the
                responsibilities that keep a platform healthy long after launch.
              </p>
            </Reveal>

            <Reveal delay={0.15} className="mt-9">
              <p className="text-label mb-3">Domains</p>
              <ul className="flex flex-wrap gap-2">
                {domains.map((d) => (
                  <li
                    key={d}
                    className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-muted"
                  >
                    {d}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal>
              <p className="text-label mb-4">Hands-on engineering, combined with</p>
            </Reveal>
            <Stagger as="ul" stagger={0.05} className="grid grid-cols-1 gap-2 xs:grid-cols-2">
              {practices.map(({ label, icon: Icon }) => (
                <StaggerItem
                  key={label}
                  as="li"
                  className="group flex items-center gap-3 rounded-[var(--radius-md)] border border-border bg-surface px-3.5 py-3 transition-colors hover:border-border-strong hover:bg-surface-2"
                >
                  <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                    <Icon className="size-4" aria-hidden />
                  </span>
                  <span className="text-sm font-medium text-text">{label}</span>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  );
}
