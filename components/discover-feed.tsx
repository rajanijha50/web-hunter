"use client";

import { TOOLS, CATEGORIES, type Tool } from "@/lib/data";
import { ToolCard } from "@/components/tool-card";
import { Button } from "@/components/ui/button";
import { History, Heart, Calendar } from "lucide-react";
import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { ToolModal } from "@/components/tool-modal";

export function DiscoverFeed() {
  const [activeCategory, setActiveCategory] = useState("All AI");
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  
  return (
    <div className="space-y-12">
      {/* Welcome Banner */}
      <div>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Good morning, Alex 👋</h1>
        
        {/* Quick Filters */}
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" className="h-10 rounded-full px-5 text-sm font-medium gap-2 hover:bg-slate-50">
            <History className="h-4 w-4 text-muted-foreground bg-slate-100 p-0.5 rounded-sm" /> Recently Viewed
          </Button>
          <Button variant="outline" className="h-10 rounded-full px-5 text-sm font-medium gap-2 hover:bg-slate-50">
            <Heart className="h-4 w-4 text-destructive bg-red-50 p-0.5 rounded-sm" /> My Favorites
          </Button>
          <Button variant="outline" className="h-10 rounded-full px-5 text-sm font-medium gap-2 text-primary border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors">
            <Calendar className="h-4 w-4" /> New This Week
          </Button>
        </div>
      </div>
      
      {/* Featured Banner component representing the Top category "AI Tools" */}
      <div className="rounded-3xl bg-gradient-to-r from-[#2B3252] to-[#5B58F2] overflow-hidden relative shadow-lg">
         <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/abstract-bg/1200/400')] opacity-10 mix-blend-overlay" />
         <div className="p-10 md:p-14 relative z-10 flex flex-col md:flex-row gap-8 items-center md:items-start">
            <div className="h-24 w-24 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-xl shrink-0">
               <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                  <circle cx="12" cy="12" r="4" />
               </svg>
            </div>
            <div>
               <div className="flex items-center gap-3 mb-2">
                 <span className="bg-[#fbbf24] text-[#78350f] text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-sm">Top Category</span>
                 <span className="text-white/70 text-sm font-medium">847 tools curated</span>
               </div>
               <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tighter">AI Tools</h2>
               <p className="text-white/80 text-lg max-w-2xl leading-relaxed">
                 Discover the next generation of artificial intelligence. From LLMs to generative art, explore the tools redefining the digital horizon.
               </p>
            </div>
         </div>
      </div>

      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4">
          <div className="flex items-baseline gap-3">
             <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Discover</h2>
             <span className="text-muted-foreground font-medium text-lg">(3,241 tools)</span>
          </div>
          <div className="flex items-center gap-2 text-sm font-medium bg-muted/50 p-1.5 rounded-xl border border-border/50 shadow-inner">
             <button className="px-4 py-1.5 bg-background shadow-sm rounded-lg text-foreground font-semibold">Popular</button>
             <button className="px-4 py-1.5 text-muted-foreground hover:text-foreground transition-colors rounded-lg">New</button>
             <button className="px-4 py-1.5 text-muted-foreground hover:text-foreground transition-colors rounded-lg">Alpha</button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-none">
          {CATEGORIES.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                activeCategory === cat 
                  ? "bg-[#0d1117] text-white shadow-md scale-105" 
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 gap-y-10">
          {TOOLS.filter(t => activeCategory === "All AI" || t.category.includes(activeCategory.split(" ")[0])).map(tool => (
            <ToolCard 
              key={tool.id} 
              tool={tool} 
              onClick={() => setSelectedTool(tool)}
            />
          ))}
        </div>
        
        {/* Loading Spinner for infinite scroll illusion */}
        <div className="flex flex-col items-center justify-center pt-16 pb-8 gap-4">
          <svg className="animate-spin h-10 w-10 text-primary opacity-50" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-xs font-bold tracking-widest text-muted-foreground uppercase">Loading more tools...</span>
        </div>
      </div>

      {/* Detail Modal Overlay */}
      <Dialog open={!!selectedTool} onOpenChange={(open) => !open && setSelectedTool(null)}>
        {selectedTool && <ToolModal tool={selectedTool} />}
      </Dialog>
    </div>
  );
}
