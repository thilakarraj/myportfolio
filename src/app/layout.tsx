import type { Metadata, Viewport } from "next";
import { Manrope, Geist_Mono } from "next/font/google";
import { site, siteUrl } from "@/data/site";
import { withBasePath } from "@/lib/paths";
import { jsonLd, serializeJsonLd } from "@/lib/json-ld";
import { ThemeScript } from "@/components/providers/theme-script";
import "./globals.css";

const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: site.seoTitle,
    template: `%s | ${site.fullName}`,
  },
  description: site.description,
  applicationName: `${site.fullName} Portfolio`,
  authors: [{ name: site.fullName, url: siteUrl }],
  creator: site.fullName,
  publisher: site.fullName,
  keywords: [
    "Thilakar Raj",
    "Thilakar Raj Suyambu",
    "Thilakar Raj S",
    "Thilakar Raj Technical Manager",
    "Thilakar Raj Solution Architect",
    "Thilakar Raj Java Technical Manager",
    "Technical Manager",
    "Solution Architect",
    "Technical Lead Engineer",
    "Software Architect",
    "Java",
    "Spring Boot",
    "Microservices",
    "Chennai",
  ],
  alternates: { canonical: siteUrl },
  openGraph: {
    type: "profile",
    title: site.seoTitle,
    description: site.description,
    url: siteUrl,
    siteName: site.fullName,
    locale: "en_IN",
    firstName: "Thilakar Raj",
    lastName: "Suyambu",
    username: "thilakarraj",
    images: [
      {
        url: `${site.url}/og.png`,
        width: 1200,
        height: 630,
        alt: `${site.fullName} — Technical Manager, Solution Architect and Java Technical Lead`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.seoTitle,
    description: site.description,
    images: [`${site.url}/og.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "portfolio",
  icons: { icon: [{ url: withBasePath("/icon.svg"), type: "image/svg+xml" }] },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
    : {}),
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b0c0f" },
    { media: "(prefers-color-scheme: light)", color: "#f6f5f0" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${manrope.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
