import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const domain =
    (process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://www.webhunter.space").replace(/\/$/, "");

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/", "/auth/", "/my-favorites"],
      },
    ],
    sitemap: `${domain}/sitemap.xml`,
    host: domain,
  };
}
