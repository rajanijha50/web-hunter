import Image from "next/image";
import { type Tool } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LuExternalLink, LuBookmark, LuCircleCheck, LuCopy } from "react-icons/lu";

interface ToolModalProps {
  tool: Tool;
}

export function ToolModal({ tool }: ToolModalProps) {
  return (
    <div className="flex flex-col md:flex-row w-full h-full max-h-[85vh] overflow-y-auto md:overflow-hidden">
      {/* Visual Content (Left side on desktop) */}
      <div className="w-full md:w-[65%] shrink-0 bg-muted/30 p-6 md:p-10 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r relative overflow-y-auto">
        <div className="w-full max-w-2xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-16 w-16 rounded-2xl bg-card border shadow-sm flex items-center justify-center overflow-hidden relative shrink-0">
               {/* Abstract placeholder logo matching industrial aesthetic */}
               <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5" />
               <div className="relative text-2xl font-bold font-serif text-primary">
                 {tool.name.charAt(0)}
               </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">{tool.name}</h2>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary" className="bg-background text-[10px] py-1">{tool.tags[0] || "General"}</Badge>
                {tool.isPremium && <Badge variant="premium" className="text-[10px] py-1 text-primary">AI ASSISTED</Badge>}
                <Badge variant="outline" className="text-[10px] py-1 bg-background">BROWSER-BASED</Badge>
              </div>
            </div>
          </div>
          
          <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border shadow-lg bg-black">
            <Image
              src={`https://picsum.photos/seed/${tool.name}-app/1200/900`}
              alt={`${tool.name} Interface`}
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
            {/* Simulating an industrial device frame */}
            <div className="absolute inset-0 pointer-events-none border-[12px] border-zinc-900 rounded-2xl mix-blend-overlay opacity-80" />
          </div>

          <div className="mt-8">
            <p className="text-lg text-muted-foreground leading-relaxed">
              {tool.description}
            </p>
          </div>
          
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 border-t pt-8 pb-4">
             <Button 
               className="w-full sm:w-auto h-12 px-8 text-base font-semibold gap-2 shadow-md"
               onClick={() => window.open(tool.url, "_blank")}
             >
               Visit Site
               <LuExternalLink className="h-4 w-4" />
             </Button>
             <Button variant="secondary" className="w-full sm:w-auto h-12 px-6 gap-2 text-foreground font-medium bg-secondary/60 hover:bg-secondary">
               <LuBookmark className="h-4 w-4" />
               Add to Collection
               <Badge variant="premium" className="ml-2 scale-90">PRO</Badge>
             </Button>
          </div>
        </div>
      </div>

      {/* Details & Similar Tools (Right side on desktop) */}
      <div className="w-full md:w-[35%] bg-card p-6 md:p-8 flex flex-col md:overflow-y-auto">
        <div className="mb-8">
          <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4 border-b pb-2">Details</h4>
          <dl className="space-y-4 text-sm">
            <div className="flex justify-between items-center">
              <dt className="text-muted-foreground">URL</dt>
              <dd className="font-semibold text-foreground flex items-center gap-1">
                {new URL(tool.url).hostname}
                <LuCircleCheck className="h-4 w-4 text-primary" />
              </dd>
            </div>
            <div className="flex justify-between items-center">
              <dt className="text-muted-foreground">Pricing</dt>
              <dd className="font-medium text-foreground">Freemium</dd>
            </div>
            <div className="flex justify-between items-center">
              <dt className="text-muted-foreground">Likes</dt>
              <dd className="font-medium text-foreground">{tool.likesCount}</dd>
            </div>
          </dl>
        </div>

        <div className="flex-1">
          <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4 border-b pb-2">Tags</h4>
          <div className="flex flex-wrap gap-2">
            {tool.tags.map(tag => (
              <Badge key={tag} variant="outline" className="text-[10px]">{tag}</Badge>
            ))}
          </div>
        </div>

        <div className="mt-8 p-6 rounded-2xl bg-primary text-primary-foreground relative overflow-hidden shadow-xl">
           <div className="absolute top-0 right-0 p-4 opacity-20">
             <LuBookmark className="h-24 w-24 -mr-8 -mt-8" />
           </div>
           <h4 className="font-bold mb-2 text-white relative z-10">Want organized collections?</h4>
           <p className="text-xs text-white/80 mb-4 relative z-10 leading-relaxed">
             Upgrade to Pro to create unlimited folders and share collections with your team.
           </p>
           <Button variant="secondary" className="w-full bg-white text-primary hover:bg-white/90 shadow-sm relative z-10 font-bold text-xs h-10">
             LEARN MORE
           </Button>
        </div>
      </div>
    </div>
  );
}
