export type ArchIcon =
  | "monitor"
  | "shield"
  | "boxes"
  | "workflow"
  | "database"
  | "plug"
  | "cloud";

export interface ArchLayer {
  id: string;
  title: string;
  caption: string;
  icon: ArchIcon;
  items: string[];
}

/**
 * Representative engineering model — an architecture *approach*, not a claim that
 * every listed technology was used in every project.
 */
export const architectureLayers: ArchLayer[] = [
  {
    id: "clients",
    title: "Client & Channels",
    caption: "Web, mobile and device entry points",
    icon: "monitor",
    items: ["React web apps", "React Native", "BLE devices", "Partner systems"],
  },
  {
    id: "api",
    title: "API / Security Layer",
    caption: "Authenticated, validated boundaries",
    icon: "shield",
    items: ["REST APIs", "Spring Security", "JWT", "Role-based access"],
  },
  {
    id: "domain",
    title: "Domain Services",
    caption: "Business logic with clear ownership",
    icon: "boxes",
    items: ["Spring Boot", "Microservices", "Domain modules", "Validation"],
  },
  {
    id: "async",
    title: "Async Processing / Messaging",
    caption: "Heavy workloads off the request path",
    icon: "workflow",
    items: ["Thread pools", "Batch jobs", "Background sync", "ETL pipelines"],
  },
  {
    id: "data",
    title: "Data Stores",
    caption: "Indexed, tuned, cached",
    icon: "database",
    items: ["MySQL / PostgreSQL", "MongoDB", "Redis", "Solr", "SQLite"],
  },
  {
    id: "integrations",
    title: "Integrations",
    caption: "Failure-aware external calls",
    icon: "plug",
    items: ["Carrier APIs", "LLM providers", "E-commerce", "Medical devices"],
  },
  {
    id: "platform",
    title: "Cloud / CI/CD / Observability",
    caption: "Repeatable delivery and visibility",
    icon: "cloud",
    items: ["AWS", "Docker", "GitHub Actions", "Nginx / Linux", "Quality gates"],
  },
];

export const architecturePrinciples = [
  {
    title: "Separation of responsibilities",
    body: "Each layer owns one concern so change stays local and reviewable.",
  },
  {
    title: "Secure API boundaries",
    body: "Authentication, authorization and validation happen at the edge, every time.",
  },
  {
    title: "Asynchronous processing for heavy workloads",
    body: "Long-running work moves to batch and background execution.",
  },
  {
    title: "Database indexing and query optimization",
    body: "Access patterns drive indexes; slow queries are measured, not guessed.",
  },
  {
    title: "Caching where appropriate",
    body: "Hot reads are cached with explicit invalidation rules.",
  },
  {
    title: "Failure-aware integrations",
    body: "Third-party calls assume timeouts, retries and clear error reporting.",
  },
  {
    title: "Automated quality gates",
    body: "Tests, static analysis and security scans run before every release.",
  },
  {
    title: "Repeatable delivery",
    body: "Branching, review and CI/CD conventions make releases predictable.",
  },
];
