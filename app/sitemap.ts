import type { MetadataRoute } from "next";

import { featuredProjects } from "@/content/site-data";

const siteUrl = "https://skylersmith.me";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const projectEntries = featuredProjects.map((project) => ({
    url: `${siteUrl}/projects/${project.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...projectEntries,
  ];
}
