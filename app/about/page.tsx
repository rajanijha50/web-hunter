import { Metadata } from "next";
import AboutClient from "./about-client";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Web Hunter, our mission to curate the best free websites, AI utilities, and developer tools online.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Web Hunter",
    description:
      "Learn about Web Hunter, our mission to curate the best free websites, AI utilities, and developer tools online.",
    url: "/about",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
