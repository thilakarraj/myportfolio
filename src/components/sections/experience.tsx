import { Building2, MapPin } from "lucide-react";
import { experience } from "@/data/experience";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

export function ExperienceSection() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="section-y relative">
      <div className="container-x">
        <SectionHeading
          index="04"
          label="Experience"
          titleId="experience-title"
          title={
            <>
              Eleven years of <span className="text-accent">shipping.</span>
            </>
          }
          description="From hands-on backend engineering through technical leadership."
        />

        <ol className="relative">
          <span
            aria-hidden
            className="absolute left-[0.6rem] top-2 bottom-2 w-px bg-[linear-gradient(180deg,var(--accent),var(--border-strong)_40%,transparent)] md:left-[calc(25%+0.6rem)] lg:left-[calc(25%+0.6rem)]"
          />
          {experience.map((job, i) => (
            <Reveal
              as="li"
              key={`${job.role}-${job.period}`}
              delay={i * 0.05}
              className="relative grid gap-4 pb-12 pl-9 last:pb-0 md:grid-cols-4 md:gap-8 md:pl-0"
            >
              <div className="md:col-span-1 md:pr-8 md:text-right">
                <span
                  aria-hidden
                  className={cn(
                    "absolute left-0 top-1.5 inline-flex size-5 items-center justify-center rounded-full border-2 bg-bg md:left-[25%]",
                    job.current ? "border-accent" : "border-border-strong",
                  )}
                >
                  {job.current ? (
                    <span className="size-2 rounded-full bg-accent" />
                  ) : null}
                </span>
                <p className="font-mono text-[0.75rem] tracking-[0.1em] uppercase text-muted">
                  {job.period}
                </p>
                {job.current ? (
                  <p className="mt-1.5 inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent-soft px-2 py-0.5 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-accent">
                    Current
                  </p>
                ) : null}
              </div>

              <div className="surface-card p-6 md:col-span-3 md:ml-8 md:p-7">
                <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">{job.role}</h3>
                <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <Building2 className="size-3.5" aria-hidden />
                    {job.company}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="size-3.5" aria-hidden />
                    {job.location}
                  </span>
                </p>
                <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                  {job.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted">
                      <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-accent/80" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
