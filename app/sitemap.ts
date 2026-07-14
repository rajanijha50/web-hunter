import { MetadataRoute } from "next";
import { CATEGORIES } from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const domain = process.env.NEXT_PUBLIC_SITE_URL ?? "https://webhunterrr.vercel.app/";
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${domain}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${domain}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${domain}/my-favorites`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = CATEGORIES.filter(
    (c) => c !== "All AI"
  ).map((c) => ({
    url: `${domain}/?category=${encodeURIComponent(c)}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...categoryRoutes];
}
