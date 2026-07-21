import { Metadata } from "next";
import HomeClient from "./home-client";

export const metadata: Metadata = {
  title: "Web Hunter — Discover Useful Websites",
  keywords: ["Web Hunter", "Useful Websites", "Websites List", "AI Tools", "Productivity Tools", "Design Tools", "Marketing Tools", "SEO Tools", "Development Tools", "Learning Tools", "Entertainment Tools", "Productivity Apps"],
  description:
    "Curated collection of useful websites organized by category.",
  openGraph: {
    title: "Web Hunter — Discover Useful Websites",
    description:
      "Curated collection of useful websites organized by category.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
  },
  icons: {
    icon: [`${process.env.NEXT_PUBLIC_SITE_URL}/favicon.ico`],
  },
};

export default function Page() {
  return <HomeClient />;
}
