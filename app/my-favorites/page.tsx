import { Metadata } from "next";
import FavoritesClient from "./favorites-client";

export const metadata: Metadata = {
  title: "My Favorites",
  description: "View and manage your saved web tools and bookmarks on Web Hunter.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function FavoritePage() {
  return <FavoritesClient />;
}
