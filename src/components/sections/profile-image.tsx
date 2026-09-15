"use client";

import * as React from "react";
import Image from "next/image";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

interface ProfileImageProps {
  className?: string;
  sizes?: string;
  priority?: boolean;
}

/**
 * Renders /images/profile.jpg. If the file is missing or fails to load,
 * falls back to a stable monogram placeholder — never a broken image icon.
 */
export function ProfileImage({ className, sizes = "(min-width: 1024px) 320px, 220px", priority }: ProfileImageProps) {
  const [failed, setFailed] = React.useState(false);

  return (
    <div
      className={cn(
        "relative aspect-[4/5] overflow-hidden rounded-[var(--radius-xl)] border border-border bg-surface-2",
        className,
      )}
    >
      {!failed ? (
        <Image
          src={site.profileImage}
          alt={`Portrait of ${site.name}, ${site.title}`}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover object-top"
          onError={() => setFailed(true)}
        />
      ) : (
        <div
          role="img"
          aria-label={`${site.name} monogram placeholder`}
          className="bg-grid absolute inset-0 flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,var(--accent-soft),transparent_60%)]" />
          <span className="relative font-mono text-6xl font-bold tracking-tighter text-text">
            {site.initials}
          </span>
        </div>
      )}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(11,12,15,0.55))]"
      />
    </div>
  );
}
