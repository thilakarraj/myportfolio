import { withBasePath } from "@/lib/paths";

export const site = {
  name: "Thilakar Raj S",
  fullName: "Thilakar Raj Suyambu",
  shortName: "Thilakar Raj",
  initials: "TR",
  brand: "THILAKAR.",
  title: "Technical Lead Engineer / Software Architect",
  role: "Technical Lead Engineer & Software Architect",
  location: "Chennai, India",
  experience: "11+ years",
  email: "thilakarraj.s@gmail.com",
  phone: "+91 95245 42420",
  phoneHref: "tel:+919524542420",
  linkedin: "https://www.linkedin.com/in/thilakar-raj-suyambu/",
  github: "https://github.com/thilakarraj",
  resumePath: withBasePath("/Thilakar_Raj_Technical_Lead.pdf"),
  /** Deployed URL (GitHub Pages). No trailing slash. */
  url: "https://thilakarraj.github.io/myportfolio",
  /** Root-relative. ProfileImage prefixes BASE_PATH for GitHub Pages. */
  profileImage: "/images/profile.jpg",
  availability: "Available for meaningful engineering challenges",
  seoTitle: "Thilakar Raj Suyambu | Technical Manager & Solution Architect",
  description:
    "Official portfolio of Thilakar Raj Suyambu (Thilakar Raj) — Technical Manager, Solution Architect and Java Technical Lead in Chennai. 11+ years in Spring Boot, microservices, healthcare systems and AI orchestration.",
} as const;

export const siteUrl = `${site.url}/`;

export const navLinks = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "architecture", label: "Architecture" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
] as const;

export type SectionId = (typeof navLinks)[number]["id"];

export const tickerItems = [
  "Java",
  "Spring Boot",
  "Microservices",
  "System Design",
  "AI Orchestration",
  "Cloud",
  "Delivery Leadership",
] as const;
