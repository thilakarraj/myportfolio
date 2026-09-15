import { architecturePrinciples } from "@/data/architecture";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { ArchitectureFlow } from "@/components/sections/architecture-flow";

export function Architecture() {
  return (
    <section
      id="architecture"
      aria-labelledby="architecture-title"
      className="section-y relative border-y border-border bg-surface/30"
    >
      <div className="container-x">
        <SectionHeading
          index="03"
          label="Signature architecture"
          titleId="architecture-title"
          title={
            <>
              How a request moves through a system I&apos;d{" "}
              <span className="text-accent">stand behind.</span>
            </>
          }
          description="An architecture approach, not a single product. The layers below represent how I structure platforms; individual projects use the subset each one needs."
        />

        <Reveal amount={0.1}>
          <ArchitectureFlow />
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="text-label mb-3">Principles</p>
            <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Boring where it should be. Deliberate where it matters.
            </h3>
            <p className="mt-4 text-muted leading-relaxed">
              These are the rules I apply when designing, reviewing, or
              rescuing a system. They are deliberately unexciting; that is what
              keeps platforms maintainable years after launch.
            </p>
          </Reveal>
          <Stagger
            as="ol"
            stagger={0.05}
            className="grid gap-3 sm:grid-cols-2 lg:col-span-8"
          >
            {architecturePrinciples.map((p, i) => (
              <StaggerItem
                key={p.title}
                as="li"
                className="group flex gap-4 rounded-[var(--radius-md)] border border-border bg-surface p-4 transition-colors hover:border-border-strong hover:bg-surface-2"
              >
                <span className="font-mono text-xs text-accent pt-0.5">0{i + 1}</span>
                <div>
                  <p className="font-semibold tracking-tight text-text">{p.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{p.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
