"use client";

import { useEffect, useState } from "react";
import { LuHeart, LuStar, LuExternalLink, LuRotateCcw } from "react-icons/lu";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { WebsiteType } from "@/types/website";
import { useUserStore } from "@/store/userStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchFavorites, toggleFavorite } from "@/lib/api/favorites";

interface ToolCardProps {
  tool: WebsiteType;
  onClick?: () => void;
}

export function ToolCard({ tool, onClick }: ToolCardProps) {
  const [imageError, setImageError] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [LikeCount, setLikeCount] = useState(tool.likesCount);
  const user = useUserStore((state) => state.user);
  const { data: favorites = [], isLoading: loading } = useQuery({
    queryKey: ["favorites", user?._id],
    queryFn: () => fetchFavorites(user?._id!),
    enabled: !!user?._id,
  });
  // console.log('favs in card: ', favorites)
  const isFavorited = favorites.some((fav: any) => fav._id === tool._id);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: toggleFavorite,
    onMutate: async ({ user_id, website_id }) => {
      await queryClient.cancelQueries({ queryKey: ["favorites", user_id] });
      const previous = queryClient.getQueryData<WebsiteType[]>([
        "favorites",
        user_id,
      ]);

      queryClient.setQueryData<WebsiteType[]>(
        ["favorites", user_id],
        (old = []) => {
          const exists = old.some((fav) => fav._id === website_id);
          if (exists) {
            return old.filter((fav) => fav._id !== website_id);
          } else {
            return [...old, tool];
          }
        },
      );

      return { previous };
    },
    onError: (_err, variables, context) => {
      queryClient.setQueryData(
        ["favorites", variables.user_id],
        context?.previous,
      );
    },
    onSettled: (_data, _err, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["favorites", variables.user_id],
      });
    },
  });

  useEffect(() => {
    if (isFavorited) {
      const updatedWebsite = favorites.find((fav: any) => fav._id === tool._id);
      setLikeCount(updatedWebsite?.likesCount);
    }
  }, [favorites]);

  // Extract domain for favicon service
  const getDomain = (url: string) => {
    try {
      const hostname = url.replace(/^(https?:\/\/)?(www\.)?/, "").split("/")[0];
      return hostname;
    } catch {
      return url;
    }
  };

  const domain = getDomain(tool.url);
  const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;

  return (
    <Card
      className="group overflow-hidden transition-all hover:shadow-xl border-border bg-card cursor-default flex flex-col rounded-2xl p-5 w-80 h-80"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-white/80 border border-border flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform overflow-hidden">
            {!imageError ? (
              <img
                src={faviconUrl}
                alt={tool.name}
                className="w-7 h-7 object-contain"
                onError={() => setImageError(true)}
              />
            ) : (
              <span className="text-xl font-bold text-primary">
                {tool.name.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <div>
            <h3 className="text-xl font-bold tracking-tight text-foreground leading-tight group-hover:text-primary transition-colors line-clamp-1">
              {tool.name}
            </h3>
            <div className="flex items-center gap-1.5 mt-1">
              <div className="flex items-center gap-1 text-[11px] font-bold text-foreground bg-secondary px-2 py-0.5 rounded-md">
                <LuStar className="h-2.5 w-2.5 fill-[#eab308] text-[#eab308]" />
                <span>{(4.5 + (tool.name.length % 5) * 0.1).toFixed(1)}</span>
              </div>
              {tool.isPremium && (
                <Badge
                  variant="premium"
                  className="text-[9px] h-4 tracking-tight px-1.5 bg-primary/10 text-primary border-none"
                >
                  PREMIUM
                </Badge>
              )}
            </div>
          </div>
        </div>
        <button
          className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
          disabled={loading}
          onClick={(e) => {
            e.stopPropagation();
            mutation.mutate({
              user_id: user?._id!,
              website_id: tool._id,
            });
          }}
        >
          {loading ? (
            <LuRotateCcw className="h-4 w-4 animate-spin" />
          ) : (
            <LuHeart
              className={`h-4 w-4 ${
                isFavorited
                  ? "text-red-500 fill-red-500"
                  : "text-muted-foreground"
              }`}
            />
          )}
          <span
            className={`text-sm font-bold ${
              isFavorited
                ? "text-red-500 fill-red-500"
                : "text-muted-foreground"
            }`}
          >
            {LikeCount}
          </span>
        </button>
      </div>

      <div className="flex-1">
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-4">
          {tool.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6 line-clamp-2">
          {tool.tags.map((tag, idx) => (
            <Badge
              key={idx}
              variant="outline"
              className="text-[10px] font-medium bg-secondary/30 text-muted-foreground border-border/50"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <div className="mt-auto flex items-center justify-center pt-4 border-t border-border">
        <div className="flex items-center gap-3">
          <a
            className="h-9 rounded-xl px-5 text-sm font-bold bg-primary text-primary-foreground hover:opacity-90 transition-all flex items-center justify-center shadow-md hover:shadow-lg active:scale-95"
            href={
              tool.url.startsWith("http") ? tool.url : `https://${tool.url}`
            }
            target="_blank"
            onClick={(e) => e.stopPropagation()}
          >
            Visit
            <LuExternalLink className="ml-2 h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </Card>
  );
}
