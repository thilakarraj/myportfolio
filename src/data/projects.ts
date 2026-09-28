export type ProjectMotif =
  | "orchestrator"
  | "ble"
  | "pipeline"
  | "etl"
  | "carriers"
  | "vision";

export interface ProjectScreenshot {
  src: string;
  alt: string;
  caption: string;
}

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
  /** Folder under public/images/projects/. */
  assetFolder: string;
  screenshots?: ProjectScreenshot[];
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
  {
    slug: "multi-drug-screen-cv",
    name: "Multi-Drug Screen Test — Computer Vision POC",
    category: "POC / R&D",
    domain: "Computer Vision / R&D",
    summary:
      "A computer-vision proof of concept that reads a photographed multi-lane screen cassette, locates strip lanes, and overlays control/test-line geometry.",
    description: [
      "Reading a multi-lane screen cassette by eye is visual and repetitive. This R&D pass asks whether a still photo of the cassette can be turned into lane geometry and line-presence overlays.",
      "The pipeline is generic computer vision: capture a cassette photo, locate the strip lanes, detect control and test lines, then draw review overlays on the source image. Labels on the annotated still are computer-vision output for inspection — not a clinical result, and not a production medical device.",
    ],
    highlights: [
      "Still-photo capture of a multi-lane screen cassette",
      "Lane localization with geometry overlays",
      "Control and test line presence classified as computer-vision output",
      "Annotated stills intended for visual review",
      "Scoped as a proof of concept, not a certified diagnostic",
    ],
    tags: [
      "Computer Vision",
      "Image Processing",
      "AI",
      "Pattern Detection",
      "Image Classification",
      "Automated Test Analysis",
      "Proof of Concept",
    ],
    motif: "vision",
    span: "default",
    assetFolder: "multi-drug-screen-cv",
    screenshots: [
      {
        src: "/images/projects/multi-drug-screen-cv/capture.jpg",
        alt: "Sanitized photograph of a multi-lane screen cassette used as pipeline input",
        caption:
          "Source cassette still after identifying marks were removed. Pipeline input only.",
      },
      {
        src: "/images/projects/multi-drug-screen-cv/lanes.jpg",
        alt: "Same cassette photograph with lane-geometry overlay lines drawn by the locator step",
        caption: "Lane-geometry overlay from the locator step.",
      },
      {
        src: "/images/projects/multi-drug-screen-cv/overlay.jpg",
        alt: "Cassette photograph with lane guides and control or test line presence labels from the computer-vision pipeline",
        caption:
          "Lane guides plus control/test-line presence labels. Computer-vision output for review — not a clinical result.",
      },
    ],
  },
];
