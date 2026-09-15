export type SkillIcon =
  | "compass"
  | "server"
  | "smartphone"
  | "database"
  | "cloud"
  | "shield"
  | "sparkles";

export interface SkillGroup {
  id: string;
  title: string;
  icon: SkillIcon;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: "leadership",
    title: "Leadership & Architecture",
    icon: "compass",
    skills: [
      "Technical ownership",
      "Solution design",
      "Architecture reviews",
      "Code reviews",
      "Technical governance",
      "Mentoring",
      "Requirement analysis",
      "Risk management",
      "Production support",
    ],
  },
  {
    id: "backend",
    title: "Backend",
    icon: "server",
    skills: [
      "Java 8–17",
      "Spring Boot",
      "Spring MVC",
      "Spring Security",
      "Spring Data JPA",
      "Hibernate",
      "REST APIs",
      "Microservices",
      "Asynchronous processing",
    ],
  },
  {
    id: "frontend",
    title: "Frontend & Mobile",
    icon: "smartphone",
    skills: [
      "React",
      "JavaScript",
      "TypeScript",
      "React Native",
      "BLE",
      "Offline-first architecture",
      "SQLite",
      "Thymeleaf",
    ],
  },
  {
    id: "data",
    title: "Data",
    icon: "database",
    skills: [
      "MySQL",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "ETL",
      "Query optimization",
      "Indexing",
      "Caching",
      "Batch processing",
    ],
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    icon: "cloud",
    skills: [
      "AWS",
      "Docker",
      "Linux",
      "Nginx",
      "Tomcat",
      "Git",
      "GitHub Actions",
      "CI/CD",
    ],
  },
  {
    id: "quality",
    title: "Quality & Security",
    icon: "shield",
    skills: [
      "Playwright",
      "TypeScript automation",
      "Page Object Model",
      "SAST",
      "Semgrep",
      "SonarQube",
      "Dependency scanning",
      "Secret scanning",
      "Security testing",
    ],
  },
  {
    id: "ai",
    title: "AI & LLM",
    icon: "sparkles",
    skills: [
      "OpenAI",
      "Claude",
      "Gemini",
      "RAG",
      "Prompt engineering",
      "MCP",
      "AI agents",
      "LLM orchestration",
    ],
  },
];
