"use client";

import * as React from "react";
import { ArrowUpRight, Check, Copy, Download, Mail, Phone } from "lucide-react";
import { site } from "@/data/site";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { buttonClasses } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";

export function Contact() {
  const [copied, setCopied] = React.useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable; the mailto link remains */
    }
  };

  const mailto = `mailto:${site.email}?subject=${encodeURIComponent("Let's build the right system")}`;

  return (
    <section id="contact" aria-labelledby="contact-title" className="section-y relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[40rem] w-[70rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,var(--accent-soft),transparent)] blur-3xl opacity-70"
      />
      <div className="container-x relative">
        <Reveal className="mx-auto max-w-[62rem] text-center">
          <div className="mb-6 flex items-center justify-center gap-3">
            <span className="text-label text-accent">06</span>
            <span aria-hidden className="h-px w-8 bg-border-strong" />
            <span className="text-label">Contact</span>
          </div>
          <h2
            id="contact-title"
            className="text-display text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.25rem]"
          >
            Have a complex problem?
            <span className="block text-muted">Let&apos;s build the right system.</span>
          </h2>
          <p className="mx-auto mt-7 max-w-[52ch] text-base text-muted sm:text-lg">
            Open to technical leadership, architecture and platform engineering
            conversations. Email is the fastest way to reach me.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Magnetic>
              <a href={mailto} data-cursor="link" className={buttonClasses({ variant: "primary", size: "lg" })}>
                <Mail className="size-4" aria-hidden />
                {site.email}
              </a>
            </Magnetic>
            <button
              type="button"
              onClick={copyEmail}
              className={buttonClasses({ variant: "outline", size: "lg" })}
              aria-live="polite"
            >
              {copied ? <Check className="size-4 text-accent" aria-hidden /> : <Copy className="size-4" aria-hidden />}
              {copied ? "Copied" : "Copy email"}
            </button>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mx-auto mt-14 grid max-w-[62rem] gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="link"
            className="group surface-card flex items-center justify-between gap-4 p-5 transition-colors hover:border-border-strong hover:bg-surface-2"
          >
            <span className="flex items-center gap-3">
              <span className="inline-flex size-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
                <LinkedinIcon className="size-4" aria-hidden />
              </span>
              <span className="text-left">
                <span className="block text-label">LinkedIn</span>
                <span className="block text-sm font-medium text-text">thilakar-raj-suyambu</span>
              </span>
            </span>
            <ArrowUpRight className="size-4 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
          </a>

          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="link"
            className="group surface-card flex items-center justify-between gap-4 p-5 transition-colors hover:border-border-strong hover:bg-surface-2"
          >
            <span className="flex items-center gap-3">
              <span className="inline-flex size-10 items-center justify-center rounded-xl bg-surface-2 text-text">
                <GithubIcon className="size-4" aria-hidden />
              </span>
              <span className="text-left">
                <span className="block text-label">GitHub</span>
                <span className="block text-sm font-medium text-text">thilakarraj</span>
              </span>
            </span>
            <ArrowUpRight className="size-4 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
          </a>

          <a
            href={site.phoneHref}
            data-cursor="link"
            className="group surface-card flex items-center justify-between gap-4 p-5 transition-colors hover:border-border-strong hover:bg-surface-2"
          >
            <span className="flex items-center gap-3">
              <span className="inline-flex size-10 items-center justify-center rounded-xl bg-secondary-soft text-secondary">
                <Phone className="size-4" aria-hidden />
              </span>
              <span className="text-left">
                <span className="block text-label">Phone</span>
                <span className="block text-sm font-medium text-text">{site.phone}</span>
              </span>
            </span>
            <ArrowUpRight className="size-4 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
          </a>

          <a
            href={site.resumePath}
            download
            data-cursor="link"
            className="group surface-card flex items-center justify-between gap-4 p-5 transition-colors hover:border-border-strong hover:bg-surface-2"
          >
            <span className="flex items-center gap-3">
              <span className="inline-flex size-10 items-center justify-center rounded-xl bg-surface-2 text-text">
                <Download className="size-4" aria-hidden />
              </span>
              <span className="text-left">
                <span className="block text-label">Résumé</span>
                <span className="block text-sm font-medium text-text">Download PDF</span>
              </span>
            </span>
            <ArrowUpRight className="size-4 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
