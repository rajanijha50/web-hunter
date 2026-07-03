"use client";
import { Header } from "@/components/layout/Header";
import { ToolCard } from "@/featuers/discover/tool-card";
import { useUserStore } from "@/store/userStore";
import { useQuery } from "@tanstack/react-query";
import { fetchFavorites } from "@/lib/api/favorites";

export default function FavoritePage() {
  const { user } = useUserStore();
  const { data: favorites = [], isLoading } = useQuery({
    queryKey: ["favorites", user?._id],
    queryFn: () => fetchFavorites(user?._id!),
    enabled: !!user?._id,
  });
  console.log("favs in main page: ", favorites);
  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        ) : favorites && favorites.length > 0 ? (
          <div className="flex flex-wrap justify-center items-center gap-5">
            {favorites.map((fav: any, idx: number) => (
              <ToolCard key={idx} tool={fav} />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-64">
            <p className="text-muted-foreground">No favorites found</p>
          </div>
        )}
      </div>
    </>
  );
}
