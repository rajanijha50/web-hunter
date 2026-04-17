import Image from "next/image";
import { Heart, Star, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { type Tool } from "@/lib/data";

interface ToolCardProps {
  tool: Tool;
  onClick?: () => void;
}

export function ToolCard({ tool, onClick }: ToolCardProps) {
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-xl border-border bg-card cursor-pointer flex flex-col h-full rounded-2xl" onClick={onClick}>
      <div className="relative aspect-[16/10] overflow-hidden bg-muted m-2 rounded-xl">
        <Image
          src={`https://picsum.photos/seed/${tool.imageSeed}/800/500`}
          alt={tool.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <button 
          className="absolute right-3 top-3 rounded-full bg-white/90 p-2 text-slate-500 backdrop-blur-sm transition-colors hover:bg-white hover:text-[#e11d48] shadow-sm z-10"
          onClick={(e) => {
            e.stopPropagation();
            // handle favorite
          }}
        >
          <Heart className="h-4 w-4" />
        </button>
      </div>
      
      <CardContent className="p-5 flex flex-col flex-1">
        <div className="mb-4 flex items-center justify-between text-[11px] font-bold text-muted-foreground uppercase tracking-widest">
          <div className="flex items-center gap-2">
            {tool.isPremium && <Badge variant="premium" className="text-[10px] tracking-widest bg-primary/10 text-primary hover:bg-primary/20">PREMIUM</Badge>}
            {tool.isTopRated && <Badge variant="gold" className="text-[10px] tracking-widest bg-amber-100 text-amber-700 hover:bg-amber-200">TOP RATED</Badge>}
            {tool.isEditorPick && <Badge variant="gold" className="text-[10px] tracking-widest bg-orange-100 text-orange-700 hover:bg-orange-200">EDITOR'S PICK</Badge>}
            {!tool.isPremium && !tool.isTopRated && !tool.isEditorPick && <span>{tool.category}</span>}
            {(tool.isPremium || tool.isTopRated || tool.isEditorPick) && <span>{tool.category}</span>}
          </div>
          <div className="flex items-center gap-1 text-foreground bg-slate-100 px-2 py-1 rounded-md">
            <Star className="h-3 w-3 fill-[#eab308] text-[#eab308]" />
            <span>{tool.rating.toFixed(1)}</span>
          </div>
        </div>
        
        <h3 className="mb-2 text-xl font-bold tracking-tight text-slate-900">{tool.name}</h3>
        <p className="mb-6 text-sm text-slate-500 line-clamp-2 leading-relaxed">
          {tool.description}
        </p>
        
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
          <span className="text-xs font-bold text-slate-500">{tool.priceType}</span>
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                <Heart className="h-3 w-3" />
                {tool.likes}
             </div>
             <Button 
               className="h-8 rounded-lg px-4 text-xs font-bold bg-[#0d1117] text-white hover:bg-slate-800 transition-colors shadow-sm"
               onClick={(e) => {
                 e.stopPropagation();
               }}
             >
               Visit Site
             </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
