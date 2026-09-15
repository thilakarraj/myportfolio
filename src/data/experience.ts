export interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  current?: boolean;
  points: string[];
}

export const experience: Experience[] = [
  {
    role: "Technical Lead Engineer",
    company: "Voyage Software Technologies Pvt Ltd",
    location: "Chennai",
    period: "Jan 2025 – Present",
    current: true,
    points: [
      "Technical delivery across healthcare, diagnostics, logistics, SaaS and AI initiatives",
      "Solution design and architecture",
      "Code quality and release readiness",
      "Production support",
      "Security and quality practices",
      "Mentoring and cross-functional collaboration",
    ],
  },
  {
    role: "Senior Software Engineer",
    company: "Just Integrate IT Pvt Ltd",
    location: "Chennai",
    period: "Oct 2021 – Dec 2024",
    points: [
      "Enterprise logistics applications",
      "Java, Spring Boot and microservices",
      "MySQL, MongoDB and Redis",
      "REST API design and application modernization",
      "Performance optimization and production deployments",
      "Code reviews and mentoring",
    ],
  },
  {
    role: "Software Engineer",
    company: "Just Integrate IT Pvt Ltd",
    location: "Chennai",
    period: "Nov 2014 – Sep 2021",
    points: [
      "Enterprise web applications and backend services",
      "Java, Spring, Hibernate and REST",
      "Healthcare, CRM, logistics and business applications",
      "E-commerce integrations and shipment processing",
      "Quotations, invoicing, tracking, pickup requests and EDI bulk processing",
      "Third-party integrations, troubleshooting and production support",
    ],
  },
];
