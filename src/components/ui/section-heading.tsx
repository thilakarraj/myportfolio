import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";

interface SectionHeadingProps {
  index: string;
  label: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  titleId?: string;
}

export function SectionHeading({
  index,
  label,
  title,
  description,
  align = "left",
  className,
  titleId,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "mb-12 md:mb-16 flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <span className="text-label text-accent">{index}</span>
        <span aria-hidden className="h-px w-8 bg-border-strong" />
        <span className="text-label">{label}</span>
      </div>
      <h2
        id={titleId}
        className="text-display text-[2.25rem] sm:text-[2.75rem] md:text-[3.25rem] lg:text-[3.75rem] max-w-[18ch]"
      >
        {title}
      </h2>
      {description ? (
        <p className="max-w-[58ch] text-base md:text-lg text-muted leading-relaxed">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
