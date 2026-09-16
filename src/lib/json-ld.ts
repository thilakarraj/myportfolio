import { site, siteUrl } from "@/data/site";

const personId = `${siteUrl}#person`;
const pageId = `${siteUrl}#page`;

export const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": pageId,
      url: siteUrl,
      name: site.seoTitle,
      description: site.description,
      inLanguage: "en-IN",
      isPartOf: {
        "@type": "WebSite",
        "@id": `${siteUrl}#website`,
        name: `${site.fullName} Portfolio`,
        url: siteUrl,
        inLanguage: "en-IN",
        publisher: { "@id": personId },
      },
      about: { "@id": personId },
      mainEntity: { "@id": personId },
    },
    {
      "@type": "Person",
      "@id": personId,
      name: site.fullName,
      givenName: "Thilakar Raj",
      familyName: "Suyambu",
      additionalName: "S",
      alternateName: ["Thilakar Raj", "Thilakar Raj S", site.name],
      jobTitle: "Technical Lead Engineer / Solution Architect",
      description: site.description,
      url: siteUrl,
      image: `${site.url}${site.profileImage}`,
      email: `mailto:${site.email}`,
      telephone: site.phone,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Chennai",
        addressRegion: "Tamil Nadu",
        addressCountry: "IN",
      },
      nationality: { "@type": "Country", name: "India" },
      worksFor: {
        "@type": "Organization",
        name: "Voyage Software Technologies Pvt Ltd",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Chennai",
          addressCountry: "IN",
        },
      },
      hasOccupation: [
        { "@type": "Occupation", name: "Technical Manager" },
        { "@type": "Occupation", name: "Solution Architect" },
        { "@type": "Occupation", name: "Java Technical Lead" },
        { "@type": "Occupation", name: "Software Architect" },
      ],
      knowsAbout: [
        "Java",
        "Spring Boot",
        "Microservices",
        "Solution Architecture",
        "Technical Management",
        "Software Architecture",
        "Healthcare Systems",
        "Logistics Platforms",
        "AI Orchestration",
        "React Native",
      ],
      sameAs: [site.linkedin, site.github],
    },
  ],
};

export function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
