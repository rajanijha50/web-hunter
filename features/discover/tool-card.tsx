"use client";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LuHeart, LuStar, LuExternalLink, LuRotateCcw } from "react-icons/lu";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SendNotification } from "@/components/feedback/SendNotification";
import { fetchFavorites, toggleFavorite } from "@/lib/cache/favorites";
import { WebsiteType } from "@/types/website";
import { useUserStore } from "@/store/userStore";

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
      setLikeCount(Math.max(updatedWebsite?.likesCount, LikeCount));
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
      className="group overflow-hidden hover:shadow-xl border-border bg-card cursor-default flex flex-col rounded-2xl p-5 w-80 h-80 hover:border-primary transition-all duration-300 delay-100"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-white/80 border border-border flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-150 delay-75 overflow-hidden">
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
            <h3 title={tool.name} className="text-xl font-bold tracking-tight text-foreground leading-tight transition-colors line-clamp-1">
              {tool.name}
            </h3>
          </div>
        </div>
        <button
          className="flex flex-col justify-center items-center rounded-full p-2 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive cursor-pointer"
          disabled={loading}
          title={isFavorited ? "Dislike" : "Like"}
          onClick={(e) => {
            e.stopPropagation();
            if (!user) {
              SendNotification("Please login to add favorites!", "error");
              return;
            }
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
              className={`h-4 w-4 ${isFavorited
                ? "text-red-500 fill-red-500"
                : "text-muted-foreground"
                }`}
            />
          )}
          <span
            className={`text-sm font-bold text-center ${isFavorited
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
          {user ? (
            <a
              className="h-9 rounded-xl px-5 text-sm font-bold bg-primary text-primary-foreground hover:opacity-90 transition-all flex items-center justify-center shadow-md hover:shadow-lg active:scale-95"
              href={
                tool.url.startsWith("http://") || tool.url.startsWith("https://")
                  ? tool.url
                  : `https://${tool.url}`
              }
              target="_blank"
              onClick={(e) => e.stopPropagation()}
            >
              Visit
              <LuExternalLink className="ml-2 h-3.5 w-3.5" />
            </a>
          ) : (
            <button className="h-9 rounded-xl px-5 text-sm font-bold bg-primary text-primary-foreground hover:opacity-90 transition-all flex items-center justify-center shadow-md hover:shadow-lg active:scale-95"
              onClick={(e) => {
                e.stopPropagation();
                if (!user) {
                  SendNotification("Please login to visit website!", "error");
                  return;
                }
              }}
            >
              Visit
              <LuExternalLink className="ml-2 h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>
    </Card>
  );
}
