import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const domain =
    (process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://www.webhunter.space").replace(/\/$/, "");
  const now = new Date();

  return [
    {
      url: domain,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${domain}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
