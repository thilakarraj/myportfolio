import type { Metadata, Viewport } from "next";
import { Manrope, Geist_Mono } from "next/font/google";
import { basePath, site } from "@/data/site";
import { ThemeScript } from "@/components/providers/theme-script";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const title = "Thilakar Raj S — Technical Lead Engineer & Software Architect";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description: site.description,
  applicationName: "Thilakar Raj S Portfolio",
  authors: [{ name: site.name, url: site.linkedin }],
  keywords: [
    "Thilakar Raj",
    "Technical Lead Engineer",
    "Software Architect",
    "Java",
    "Spring Boot",
    "Microservices",
    "AI Orchestration",
    "Healthcare Systems",
    "Logistics Platforms",
    "Chennai",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    title,
    description: site.description,
    url: "/",
    siteName: "Thilakar Raj S",
    locale: "en_IN",
    firstName: "Thilakar Raj",
    lastName: "S",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: `${basePath}/icon.svg`, type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b0c0f" },
    { media: "(prefers-color-scheme: light)", color: "#f6f5f0" },
  ],
  width: "device-width",
  initialScale: 1,
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.title,
  email: `mailto:${site.email}`,
  telephone: site.phone,
  url: site.url,
  image: `${site.url}${site.profileImage}`,
  sameAs: [site.linkedin],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Chennai",
    addressCountry: "IN",
  },
  knowsAbout: [
    "Java",
    "Spring Boot",
    "Microservices",
    "Software Architecture",
    "Healthcare Systems",
    "Logistics Platforms",
    "AI Orchestration",
    "React Native",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
