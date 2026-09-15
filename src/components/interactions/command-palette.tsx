"use client";

import * as React from "react";
import {
  ArrowRight,
  Copy,
  CornerDownLeft,
  Download,
  FolderKanban,
  Mail,
  Navigation,
  Search,
  SunMoon,
} from "lucide-react";
import { LinkedinIcon, GithubIcon } from "@/components/ui/icons";
import { navLinks, site } from "@/data/site";
import { projects } from "@/data/projects";
import { useTheme } from "@/hooks/use-theme";
import { OPEN_PROJECT_EVENT } from "@/components/sections/work";
import { cn } from "@/lib/utils";

interface Action {
  id: string;
  group: "Navigate" | "Projects" | "Actions";
  label: string;
  hint?: string;
  icon: React.ComponentType<{ className?: string }>;
  run: () => void;
}

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const listRef = React.useRef<HTMLUListElement>(null);
  const [query, setQuery] = React.useState("");
  const [cursor, setCursor] = React.useState(0);
  const { toggle } = useTheme();

  const actions = React.useMemo<Action[]>(() => {
    const go = (id: string) => () => {
      onClose();
      // Let the dialog close before scrolling so the scroll lock is released.
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    };
    return [
      ...navLinks.map<Action>((l) => ({
        id: `nav-${l.id}`,
        group: "Navigate",
        label: l.label,
        hint: `#${l.id}`,
        icon: Navigation,
        run: go(l.id),
      })),
      ...projects.map<Action>((p) => ({
        id: `project-${p.slug}`,
        group: "Projects",
        label: p.name,
        hint: p.category,
        icon: FolderKanban,
        run: () => {
          onClose();
          requestAnimationFrame(() => {
            document.getElementById("work")?.scrollIntoView({ behavior: "smooth", block: "start" });
            window.setTimeout(() => {
              window.dispatchEvent(new CustomEvent(OPEN_PROJECT_EVENT, { detail: p.slug }));
            }, 350);
          });
        },
      })),
      {
        id: "theme",
        group: "Actions",
        label: "Toggle theme",
        hint: "Dark / light",
        icon: SunMoon,
        run: () => {
          toggle();
          onClose();
        },
      },
      {
        id: "copy-email",
        group: "Actions",
        label: "Copy email address",
        hint: site.email,
        icon: Copy,
        run: () => {
          void navigator.clipboard?.writeText(site.email);
          onClose();
        },
      },
      {
        id: "email",
        group: "Actions",
        label: "Send an email",
        hint: "Opens your mail client",
        icon: Mail,
        run: () => {
          window.location.href = `mailto:${site.email}`;
          onClose();
        },
      },
      {
        id: "linkedin",
        group: "Actions",
        label: "Open LinkedIn",
        hint: "New tab",
        icon: LinkedinIcon,
        run: () => {
          window.open(site.linkedin, "_blank", "noopener,noreferrer");
          onClose();
        },
      },
      {
        id: "github",
        group: "Actions",
        label: "Open GitHub profile",
        hint: "thilakarraj",
        icon: GithubIcon,
        run: () => {
          window.open(site.github, "_blank", "noopener,noreferrer");
          onClose();
        },
      },
      {
        id: "resume",
        group: "Actions",
        label: "Download résumé",
        hint: "PDF",
        icon: Download,
        run: () => {
          const a = document.createElement("a");
          a.href = site.resumePath;
          a.download = "";
          a.click();
          onClose();
        },
      },
    ];
  }, [onClose, toggle]);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter(
      (a) =>
        a.label.toLowerCase().includes(q) ||
        a.hint?.toLowerCase().includes(q) ||
        a.group.toLowerCase().includes(q),
    );
  }, [actions, query]);

  const onQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setCursor(0);
  };

  // open/close sync with native dialog
  React.useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    if (open && !el.open) {
      el.showModal();
      document.body.style.overflow = "hidden";
      setQuery("");
      setCursor(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    } else if (!open && el.open) {
      el.close();
    }
  }, [open]);

  React.useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    const onCancel = (e: Event) => {
      e.preventDefault();
      onClose();
    };
    const onCloseEvt = () => {
      document.body.style.overflow = "";
      onClose();
    };
    const onClick = (e: MouseEvent) => {
      if (e.target === el) onClose();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        onClose();
      }
    };
    el.addEventListener("cancel", onCancel);
    el.addEventListener("close", onCloseEvt);
    el.addEventListener("click", onClick);
    el.addEventListener("keydown", onKey);
    return () => {
      el.removeEventListener("cancel", onCancel);
      el.removeEventListener("close", onCloseEvt);
      el.removeEventListener("click", onClick);
      el.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => Math.min(c + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => Math.max(c - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[cursor]?.run();
    }
  };

  React.useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-index="${cursor}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [cursor]);

  const groups = ["Navigate", "Projects", "Actions"] as const;
  let runningIndex = -1;

  return (
    <dialog
      ref={dialogRef}
      aria-label="Command palette"
      className="m-auto mt-[12vh] w-[min(100vw-1.5rem,38rem)] overflow-hidden rounded-[var(--radius-xl)] border border-border bg-surface p-0 text-text shadow-soft backdrop:bg-transparent"
    >
      <div className="flex items-center gap-3 border-b border-border px-4">
        <Search className="size-4 shrink-0 text-muted" aria-hidden />
        <input
          ref={inputRef}
          type="text"
          role="combobox"
          aria-expanded="true"
          aria-controls="palette-list"
          aria-activedescendant={filtered[cursor] ? `palette-${filtered[cursor].id}` : undefined}
          aria-autocomplete="list"
          placeholder="Jump to a section, open a project, or run an action…"
          value={query}
          onChange={onQueryChange}
          onKeyDown={onKeyDown}
          className="h-14 w-full bg-transparent text-[0.95rem] text-text outline-none placeholder:text-subtle"
        />
        <kbd className="hidden rounded-md border border-border bg-surface-2 px-1.5 py-0.5 font-mono text-[0.62rem] text-subtle sm:inline">
          ESC
        </kbd>
      </div>

      <ul
        ref={listRef}
        id="palette-list"
        role="listbox"
        aria-label="Commands"
        className="max-h-[50vh] overflow-y-auto p-2"
      >
        {filtered.length === 0 ? (
          <li className="px-3 py-8 text-center text-sm text-muted">No matches for “{query}”.</li>
        ) : (
          groups.map((g) => {
            const items = filtered.filter((a) => a.group === g);
            if (items.length === 0) return null;
            return (
              <li key={g} role="presentation">
                <p className="text-label px-3 pb-1 pt-3 text-[0.62rem]">{g}</p>
                <ul role="group" aria-label={g}>
                  {items.map((a) => {
                    runningIndex += 1;
                    const idx = runningIndex;
                    const selected = idx === cursor;
                    const Icon = a.icon;
                    return (
                      <li
                        key={a.id}
                        id={`palette-${a.id}`}
                        role="option"
                        aria-selected={selected}
                        data-index={idx}
                        onMouseEnter={() => setCursor(idx)}
                        onClick={a.run}
                        className={cn(
                          "flex cursor-pointer items-center gap-3 rounded-[var(--radius-sm)] px-3 py-2.5 text-sm transition-colors",
                          selected ? "bg-surface-2 text-text" : "text-muted",
                        )}
                      >
                        <span
                          className={cn(
                            "inline-flex size-7 items-center justify-center rounded-md border border-border",
                            selected ? "bg-accent-soft text-accent" : "text-subtle",
                          )}
                        >
                          <Icon className="size-3.5" />
                        </span>
                        <span className="flex-1 truncate font-medium">{a.label}</span>
                        {a.hint ? (
                          <span className="hidden truncate font-mono text-[0.68rem] text-subtle sm:inline">
                            {a.hint}
                          </span>
                        ) : null}
                        {selected ? (
                          <CornerDownLeft className="size-3.5 text-subtle" aria-hidden />
                        ) : (
                          <ArrowRight className="size-3.5 opacity-0" aria-hidden />
                        )}
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })
        )}
      </ul>

      <div className="flex items-center justify-between border-t border-border px-4 py-2.5 font-mono text-[0.62rem] tracking-wide text-subtle">
        <span>↑↓ navigate · ↵ select</span>
        <span>{site.brand}</span>
      </div>
    </dialog>
  );
}
