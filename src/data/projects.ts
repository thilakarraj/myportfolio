export type ProjectMotif =
  | "orchestrator"
  | "ble"
  | "pipeline"
  | "etl"
  | "carriers";

export interface Project {
  slug: string;
  name: string;
  category: string;
  domain: string;
  summary: string;
  description: string[];
  highlights: string[];
  tags: string[];
  motif: ProjectMotif;
  /** Grid span hints for the bento layout (desktop). */
  span: "wide" | "tall" | "default";
  /** Folder under public/images/projects/ reserved for future screenshots. */
  assetFolder: string;
}

export const projects: Project[] = [
  {
    slug: "ai-orchestrator",
    name: "AI Orchestrator",
    category: "Enterprise Workflow Automation",
    domain: "AI / Automation",
    summary:
      "A unified orchestration platform that lets enterprise workflows call multiple LLM providers through one governed API surface.",
    description: [
      "Designed as a single integration layer in front of OpenAI, Claude and Gemini so product teams can compose AI-driven workflows without binding to one vendor.",
      "Combines retrieval-augmented generation, prompt engineering and Model Context Protocol tooling with agent-style execution for multi-step automation.",
    ],
    highlights: [
      "Multi-provider LLM integration: OpenAI, Claude, Gemini",
      "Retrieval-augmented generation (RAG) and prompt engineering",
      "Model Context Protocol (MCP) tool integration",
      "AI agents for multi-step workflow execution",
      "Java and Spring Boot service layer exposing REST APIs",
    ],
    tags: [
      "Java",
      "Spring Boot",
      "REST APIs",
      "OpenAI",
      "Claude",
      "Gemini",
      "RAG",
      "MCP",
      "AI Agents",
    ],
    motif: "orchestrator",
    span: "wide",
    assetFolder: "ai-orchestrator",
  },
  {
    slug: "snaphealthcare-mobile",
    name: "SnapHealthcare",
    category: "Breath Analysis Mobile Platform",
    domain: "Healthcare / Mobile",
    summary:
      "An offline-first healthcare mobile app that talks to a Bluetooth-enabled medical device and syncs securely in the background.",
    description: [
      "React Native application integrating a breath-analysis medical device over Bluetooth Low Energy, with local SQLite storage so clinicians can keep working without connectivity.",
      "Background synchronization, firmware over-the-air updates, JWT authentication, audit logging and role-based access keep the system secure and traceable.",
    ],
    highlights: [
      "Bluetooth Low Energy (BLE) medical device communication",
      "Offline-first architecture backed by SQLite",
      "Background synchronization and firmware OTA updates",
      "JWT authentication and role-based access",
      "Audit logging for clinical traceability",
    ],
    tags: [
      "React Native",
      "BLE",
      "SQLite",
      "Offline-first",
      "Background Sync",
      "Firmware OTA",
      "JWT",
      "Audit Logging",
      "RBAC",
    ],
    motif: "ble",
    span: "tall",
    assetFolder: "snaphealthcare",
  },
  {
    slug: "snap-rcm",
    name: "SNAP Healthcare",
    category: "Enterprise RCM Platform",
    domain: "Healthcare / Enterprise SaaS",
    summary:
      "Technical leadership for an enterprise revenue-cycle management platform, from technical design through release governance and production support.",
    description: [
      "Owned technical design and development across the delivery lifecycle: planning, implementation, quality assurance, release management and production support.",
      "Built a Playwright and TypeScript automation framework using the Page Object Model, wired into GitHub Actions alongside Semgrep, SAST, dependency and secret scanning.",
    ],
    highlights: [
      "Technical design and development ownership",
      "Playwright + TypeScript automation with Page Object Model",
      "GitHub Actions pipelines with quality gates",
      "Semgrep, SAST, dependency and secret scanning",
      "Release governance and production support",
    ],
    tags: [
      "Playwright",
      "TypeScript",
      "Page Object Model",
      "GitHub Actions",
      "Semgrep",
      "SAST",
      "Release Governance",
    ],
    motif: "pipeline",
    span: "default",
    assetFolder: "snap",
  },
  {
    slug: "allergy-vitae",
    name: "Allergy Vitae",
    category: "Clinical Diagnostics Platform",
    domain: "Medical Diagnostics",
    summary:
      "A laboratory data platform turning raw instrument output into validated bioinformatics results and patient-ready PDF reports.",
    description: [
      "ETL workflows combine patient configuration, raw instrument data and demographic files into a validated processing pipeline with error reporting.",
      "Calculation engines handle antigen mapping and patient processing, with asynchronous execution, batch operations and SQL optimization for large laboratory datasets.",
    ],
    highlights: [
      "ETL workflows for laboratory data processing",
      "Bioinformatics calculations and antigen mapping",
      "Patient processing and PDF report generation",
      "Asynchronous processing and batch operations",
      "MySQL indexing and query optimization",
    ],
    tags: [
      "Java",
      "Spring Boot",
      "Spring Data JPA",
      "Hibernate",
      "MySQL",
      "ETL",
      "Async Processing",
      "Batch",
      "PDF Reports",
    ],
    motif: "etl",
    span: "default",
    assetFolder: "allergy-vitae",
  },
  {
    slug: "shipcrm-soluship",
    name: "ShipCRM / Soluship",
    category: "Enterprise Logistics CRM",
    domain: "Logistics / Multi-tenant SaaS",
    summary:
      "A multi-tenant shipping and logistics platform connecting customer management, quotations, shipments and invoicing to major carriers.",
    description: [
      "Customer management, shipments, quotations and invoicing run on a Java and Spring backend exposing REST APIs, with MySQL, MongoDB and Solr behind them.",
      "Carrier integrations with UPS, DHL, FedEx and Purolator, plus other third-party services, are served from Linux hosts with Nginx load balancing and ongoing production support.",
    ],
    highlights: [
      "Multi-tenant shipping and logistics platform",
      "Customer management, shipments, quotations, invoicing",
      "Carrier integrations: UPS, DHL, FedEx, Purolator",
      "MySQL, MongoDB and Solr data layer",
      "Linux, Nginx load balancing and production support",
    ],
    tags: [
      "Java",
      "Spring",
      "REST APIs",
      "MySQL",
      "MongoDB",
      "Solr",
      "Linux",
      "Nginx",
      "Carrier Integrations",
    ],
    motif: "carriers",
    span: "wide",
    assetFolder: "shipcrm",
  },
];
