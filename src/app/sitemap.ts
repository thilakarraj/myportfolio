import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date().toISOString().slice(0, 10),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
