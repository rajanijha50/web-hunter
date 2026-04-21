"use client";

import { useState } from "react";
import { Heart, Star, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { type Tool } from "@/lib/data";

interface ToolCardProps {
  tool: Tool;
  onClick?: () => void;
}

export function ToolCard({ tool, onClick }: ToolCardProps) {
  const [imageError, setImageError] = useState(false);
  
  // Extract domain for favicon service
  const getDomain = (url: string) => {
    try {
      const hostname = url.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0];
      return hostname;
    } catch {
      return url;
    }
  };

  const domain = getDomain(tool.url);
  const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;

  return (
    <Card
      className="group overflow-hidden transition-all hover:shadow-xl border-border bg-card cursor-pointer flex flex-col h-full rounded-2xl p-5"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-border flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform overflow-hidden bg-background">
            {!imageError ? (
              <img 
                src={faviconUrl} 
                alt={tool.name} 
                className="w-7 h-7 object-contain" 
                onError={() => setImageError(true)}
              />
            ) : (
              <span className="text-xl font-bold text-primary">{tool.name.charAt(0).toUpperCase()}</span>
            )}
          </div>
          <div>
            <h3 className="text-xl font-bold tracking-tight text-foreground leading-tight group-hover:text-primary transition-colors">{tool.name}</h3>
            <div className="flex items-center gap-1.5 mt-1">
              <div className="flex items-center gap-1 text-[11px] font-bold text-foreground bg-secondary px-2 py-0.5 rounded-md">
                <Star className="h-2.5 w-2.5 fill-[#eab308] text-[#eab308]" />
                <span>{(4.5 + (tool.name.length % 5) * 0.1).toFixed(1)}</span>
              </div>
              {tool.isPremium && (
                <Badge variant="premium" className="text-[9px] h-4 tracking-tight px-1.5 bg-primary/10 text-primary border-none">
                  PREMIUM
                </Badge>
              )}
            </div>
          </div>
        </div>
        <button
          className="rounded-full bg-secondary p-2 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Heart className="h-4 w-4" />
        </button>
      </div>

      <div className="flex-1">
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-4">
          {tool.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
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

      <div className="mt-auto flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <Heart className="h-3.5 w-3.5" />
          <span className="font-bold">{tool.likesCount}</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">Free to Try</span>
          <a
            className="h-9 rounded-xl px-5 text-sm font-bold bg-primary text-primary-foreground hover:opacity-90 transition-all flex items-center justify-center shadow-md hover:shadow-lg active:scale-95"
            href={tool.url.startsWith('http') ? tool.url : `https://${tool.url}`}
            target="_blank"
            onClick={(e) => e.stopPropagation()}
          >
            Visit
            <ExternalLink className="ml-2 h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </Card>
  );
}
