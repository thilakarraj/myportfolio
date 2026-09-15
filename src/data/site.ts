/** Prefix applied to plain asset links when deployed under a sub-path (GitHub Pages). */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const site = {
  name: "Thilakar Raj S",
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
  linkedin: "https://www.linkedin.com/in/thilakar-raj-suyambu",
  resumePath: `${basePath}/Thilakar_Raj_Technical_Lead.pdf`,
  /** Deployed URL (GitHub Pages). Update if you move to a custom domain. */
  url: "https://thilakarraj.github.io/myportfolio",
  profileImage: "/images/profile.jpg",
  availability: "Available for meaningful engineering challenges",
  description:
    "Portfolio of Thilakar Raj S, a Technical Lead Engineer and Software Architect specializing in Java, Spring Boot, microservices, scalable platforms, healthcare systems, logistics and AI orchestration.",
} as const;

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
