"use client";

import * as React from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

export const staggerContainer = (stagger = 0.08, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  delay?: number;
  once?: boolean;
  amount?: number;
  as?: "div" | "section" | "li" | "article" | "p" | "span";
}

/**
 * Scroll-triggered fade/lift. Small y offset (≤18px) so it reads as a fade,
 * per UI UX Pro Max scroll-reveal guidance. Renders final state under reduced motion.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  once = true,
  amount = 0.2,
  as = "div",
  ...rest
}: RevealProps) {
  const reduce = useReducedMotion();
  const Comp = motion[as] as typeof motion.div;

  if (reduce) {
    const Plain = as as React.ElementType;
    return (
      <Plain className={className} {...rest}>
        {children}
      </Plain>
    );
  }

  return (
    <Comp
      className={cn(className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount, margin: "0px 0px -8% 0px" }}
      variants={{
        hidden: { opacity: 0, y: 18 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: EASE, delay },
        },
      }}
      {...(rest as object)}
    >
      {children}
    </Comp>
  );
}

interface StaggerProps extends React.HTMLAttributes<HTMLDivElement> {
  stagger?: number;
  delay?: number;
  amount?: number;
  as?: "div" | "ul" | "ol";
}

export function Stagger({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  amount = 0.15,
  as = "div",
  ...rest
}: StaggerProps) {
  const reduce = useReducedMotion();
  const Comp = motion[as] as typeof motion.div;

  if (reduce) {
    const Plain = as as React.ElementType;
    return (
      <Plain className={className} {...rest}>
        {children}
      </Plain>
    );
  }

  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount, margin: "0px 0px -8% 0px" }}
      variants={staggerContainer(stagger, delay)}
      {...(rest as object)}
    >
      {children}
    </Comp>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as] as typeof motion.div;
  if (reduce) {
    const Plain = as as React.ElementType;
    return <Plain className={className}>{children}</Plain>;
  }
  return (
    <Comp className={className} variants={revealVariants}>
      {children}
    </Comp>
  );
}
