import { Metadata } from "next";
import AboutClient from "./about-client";

export const metadata: Metadata = {
  title: "Web Hunter — About",
  description: "About",
  openGraph: {
    title: "Web Hunter — About",
    description: "About",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/about`,
  },
  icons: {
    icon: ["/favicon.ico"],
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
