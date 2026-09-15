"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";
import { LinkedinIcon } from "@/components/ui/icons";
import { buttonClasses } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { HeroVisual } from "@/components/sections/hero-visual";

const EASE = [0.22, 1, 0.36, 1] as const;

const lines = ["Complex systems.", "Clear direction."];
const roles = [
  "Technical Lead",
  "Software Architect",
  "Backend & distributed systems",
  "AI orchestration",
];

export function Hero() {
  const reduce = useReducedMotion();

  const fade = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, ease: EASE, delay },
        };

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative overflow-hidden pt-[calc(var(--nav-h)+2.5rem)] pb-14 md:pt-[calc(var(--nav-h)+4rem)] md:pb-20 lg:min-h-[calc(100svh-1rem)] lg:flex lg:items-center"
    >
      <div
        aria-hidden
        className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,#000_20%,transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[32rem] w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,var(--secondary-soft),transparent)] blur-2xl"
      />

      <div className="container-x relative grid items-center gap-8 md:gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <motion.p
            {...fade(0)}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1.5 font-mono text-[0.62rem] tracking-[0.08em] uppercase text-muted sm:mb-6 sm:text-[0.7rem] sm:tracking-[0.12em]"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            {site.availability}
          </motion.p>

          <h1
            id="hero-title"
            className="text-display text-[clamp(2.75rem,10.5vw,4.25rem)] sm:text-[clamp(3rem,7.5vw,5.25rem)] lg:text-[clamp(3.25rem,4.2vw,4.5rem)]"
          >
            {lines.map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  className={i === 1 ? "block text-muted" : "block"}
                  initial={reduce ? false : { y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease: EASE, delay: 0.1 + i * 0.12 }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            {...fade(0.45)}
            className="mt-7 max-w-[54ch] text-base leading-relaxed text-muted sm:text-lg"
          >
            I&apos;m <span className="text-text font-semibold">{site.name}</span>, a{" "}
            {site.title} in {site.location} with {site.experience} of building
            healthcare, logistics and AI platforms that stay maintainable at scale.
          </motion.p>

          <motion.ul
            {...fade(0.55)}
            aria-label="Focus areas"
            className="mt-6 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[0.72rem] tracking-[0.12em] uppercase text-subtle"
          >
            {roles.map((r, i) => (
              <li key={r} className="flex items-center gap-4">
                {i > 0 ? <span aria-hidden className="size-1 rounded-full bg-border-strong" /> : null}
                <span>{r}</span>
              </li>
            ))}
          </motion.ul>

          <motion.div {...fade(0.65)} className="mt-8 flex flex-wrap items-center gap-3 sm:mt-9">
            <Magnetic>
              <a
                href="#work"
                data-cursor="link"
                className={buttonClasses({ variant: "primary", size: "lg" })}
              >
                Explore selected work
                <ArrowUpRight
                  className="size-4 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                  aria-hidden
                />
              </a>
            </Magnetic>
            <Magnetic strength={0.12}>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="link"
                className={buttonClasses({ variant: "outline", size: "lg" })}
              >
                <LinkedinIcon className="size-4" aria-hidden />
                Connect on LinkedIn
              </a>
            </Magnetic>
          </motion.div>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="lg:col-span-5"
        >
          <HeroVisual />
        </motion.div>
      </div>

      <motion.a
        {...fade(1)}
        href="#about"
        aria-label="Scroll to About section"
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-2 font-mono text-[0.65rem] tracking-[0.16em] uppercase text-subtle transition-colors hover:text-text lg:inline-flex"
      >
        Scroll
        <ArrowDown className="size-3.5 motion-safe:animate-bounce" aria-hidden />
      </motion.a>
    </section>
  );
}
