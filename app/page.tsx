import { Metadata } from "next";
import HomeClient from "./home-client";

export const metadata: Metadata = {
  title: "Discover Useful Websites & AI Tools",
  description:
    "Explore 500+ handpicked websites, generative AI tools, developer utilities, and free online resources by category.",
  alternates: {
    canonical: "/",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Web Hunter",
    url: "https://www.webhunter.space",
    description:
      "Curated directory of 500+ useful websites, AI tools, developer utilities, and resources organized across 90+ categories.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.webhunter.space/?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeClient />
    </>
  );
}
