import { ArrowUp, Github, Mail } from "lucide-react";
import { site } from "@/data/site";
import { LinkedinIcon } from "@/components/ui/icons";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="container-x flex flex-col gap-8 py-10 md:flex-row md:items-end md:justify-between">
        <div>
          <a
            href="#top"
            className="inline-flex items-center gap-2 font-mono text-sm font-semibold tracking-[0.18em]"
            aria-label={`${site.name} — back to top`}
          >
            <span className="inline-flex size-8 items-center justify-center rounded-lg bg-accent text-[0.7rem] text-accent-fg tracking-tight">
              {site.initials}
            </span>
            {site.brand}
          </a>
          <p className="mt-4 text-sm font-medium text-text">{site.name}</p>
          <p className="text-sm text-muted">{site.title}</p>
          <p className="mt-1 text-sm text-subtle">{site.location}</p>
        </div>

        <div className="flex flex-col gap-4 md:items-end">
          <ul className="flex flex-wrap gap-2">
            <li>
              <a href={`mailto:${site.email}`} className="inline-flex h-9 items-center gap-2 rounded-full border border-border px-3.5 text-sm text-muted transition-colors hover:text-text hover:bg-surface-2">
                <Mail className="size-3.5" aria-hidden />
                {site.email}
              </a>
            </li>
            <li>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex h-9 items-center gap-2 rounded-full border border-border px-3.5 text-sm text-muted transition-colors hover:text-text hover:bg-surface-2">
                <LinkedinIcon className="size-3.5" aria-hidden />
                LinkedIn
              </a>
            </li>
            <li>
              <a href={site.github} target="_blank" rel="noopener noreferrer" className="inline-flex h-9 items-center gap-2 rounded-full border border-border px-3.5 text-sm text-muted transition-colors hover:text-text hover:bg-surface-2">
                <Github className="size-3.5" aria-hidden />
                GitHub
              </a>
            </li>
            <li>
              <a href="#top" aria-label="Back to top" className="inline-flex size-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:text-text hover:bg-surface-2">
                <ArrowUp className="size-3.5" aria-hidden />
              </a>
            </li>
          </ul>
          <p className="font-mono text-[0.68rem] tracking-[0.1em] text-subtle md:text-right">
            © {year} {site.name} · Built with Next.js, TypeScript, Tailwind CSS &amp; Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
