import { Metadata } from "next";
import FavoritesClient from "./favorites-client";

export const metadata: Metadata = {
  title: "Web Hunter — My Favorites",
  description: "My favorites",
  openGraph: {
    title: "Web Hunter — My Favorites",
    description: "My favorites",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/my-favorites`,
  },
  icons: {
    icon: [`${process.env.NEXT_PUBLIC_SITE_URL}/favicon.ico`],
  },
};

export default function FavoritePage() {
  return <FavoritesClient />;
}
