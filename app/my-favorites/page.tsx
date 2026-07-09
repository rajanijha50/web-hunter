"use client";
import { Header } from "@/components/layout/Header";
import { ToolCard } from "@/features/discover/tool-card";
import { useUserStore } from "@/store/userStore";
import { useQuery } from "@tanstack/react-query";
import { fetchFavorites } from "@/lib/cache/favorites";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SendNotification } from "@/components/feedback/SendNotification";
import { LuSearch } from "react-icons/lu";
import SearchWebsite from "@/features/search/SearchWebsite";

export default function FavoritePage() {
  const { user } = useUserStore();
  const router = useRouter();

  const [openSearchWindow, setOpenSearchWindow] = useState(false);

  const { data: favorites = [], isLoading } = useQuery({
    queryKey: ["favorites", user?._id],
    queryFn: () => fetchFavorites(user?._id!),
    enabled: !!user?._id,
  });

  useEffect(() => {
    if (!user) {
      SendNotification("Please login to access your favorites!", "error");
      router.push("/auth?redirect=/my-favorites");
    }
  }, [user]);
  return (
    <>
      <Header />
      <div className="animate-slide-in-top max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        ) : favorites && favorites.length > 0 ? (
          <div className="space-y-6">
            <div className="flex relative border-b justify-center items-center py-5">
              <LuSearch className="relative left-8 h-4 w-4" />
              <input
                type="search"
                placeholder="Search your favorites"
                aria-label="Search websites"
                readOnly
                onClick={() => setOpenSearchWindow(true)}
                className="pl-10 border p-4 rounded-full cursor-pointer text-sm"
              />
            </div>
            <div className="flex flex-wrap justify-center items-center gap-5">
              {favorites.map((fav: any, idx: number) => (
                <ToolCard key={idx} tool={fav} />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-64">
            <p className="text-muted-foreground">No favorites found</p>
          </div>
        )}
      </div>
      {openSearchWindow && (
        <SearchWebsite
          WebData={favorites}
          onClose={() => setOpenSearchWindow(false)}
        />
      )}
    </>
  );
}
