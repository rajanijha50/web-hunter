"use client";

import { Header } from "@/components/layout/Header";
import { ToolCard } from "@/features/discover/tool-card";
import { useUserStore } from "@/store/userStore";
import { useQuery } from "@tanstack/react-query";
import { fetchFavorites, getLocalFavorites } from "@/lib/cache/favorites";
import { useEffect, useMemo, useState } from "react";
import { LuSearch } from "react-icons/lu";
import SearchWebsite from "@/features/search/SearchWebsite";
import { useWebsiteStore } from "@/store/websiteStore";
import { WebsiteType } from "@/types/website";

export default function FavoritesClient() {
  const { user } = useUserStore();
  const { websites, fetchWebsites, loading: websitesLoading } = useWebsiteStore();

  const [openSearchWindow, setOpenSearchWindow] = useState(false);

  // 1. Ensure websites are fetched if arriving directly to /my-favorites
  useEffect(() => {
    if (websites.length === 0) {
      fetchWebsites();
    }
  }, [websites.length, fetchWebsites]);

  // 2. Anonymous: subscribe to local-favorites query key for reactive syncing
  const { data: localFavIds = [] } = useQuery({
    queryKey: ["local-favorites"],
    queryFn: getLocalFavorites,
    enabled: !user,
  });

  // 3. Logged-in: fetch from DB via React Query
  const { data: dbFavorites = [], isLoading: dbLoading } = useQuery({
    queryKey: ["favorites", user?._id],
    queryFn: () => fetchFavorites(user?._id!),
    enabled: !!user?._id,
  });

  // 4. Derive local favorites reactively whenever localFavIds or websites change
  const localFavorites = useMemo(() => {
    if (user || websites.length === 0) return [];
    return websites.filter((w) => localFavIds.includes(w._id));
  }, [user, websites, localFavIds]);

  // Unified list
  const favorites: WebsiteType[] = user ? dbFavorites : localFavorites;
  const isLoading = user ? dbLoading : websitesLoading;

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
              {favorites.map((fav: any) => (
                <ToolCard key={fav._id} tool={fav} />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-64">
            <p className="text-muted-foreground">No favorites found!</p>
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
