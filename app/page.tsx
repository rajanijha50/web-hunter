import { Metadata } from "next";
import HomeClient from "./home-client";

export const metadata: Metadata = {
  title: "Web Hunter — Discover Useful Websites",
  description:
    "Curated collection of useful websites organized by category.",
  openGraph: {
    title: "Web Hunter — Discover Useful Websites",
    description:
      "Curated collection of useful websites organized by category.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
  },
  icons: {
    icon: ["/favicon.ico"],
  },
};

export default function Page() {
  return <HomeClient />;
}
