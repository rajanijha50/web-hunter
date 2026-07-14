import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const domain = process.env.NEXT_PUBLIC_SITE_URL ?? "https://webhunterrr.vercel.app";
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/", "/auth"],
      },
    ],
    sitemap: `${domain}/sitemap.xml`,
    host: domain,
  };
}
