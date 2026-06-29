"use client";

import { CATEGORIES } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { LuHistory, LuHeart, LuCalendar, LuLoaderCircle } from "react-icons/lu";
import { useState, useEffect, useRef, useCallback } from "react";
import { ToolCard } from "@/featuers/discover/tool-card";

import { useDiscoverQuery } from "@/hooks/use-discover-query";
import { PaginationControls } from "@/featuers/discover/pagination-controls";
import { Suspense } from "react";
import { useWebStore } from "@/store/websiteStore";
import { WebsiteType } from "@/types/website";
import { useUser } from "@/store/userStore";

const PAGE_SIZE = 30;

function DiscoverFeedContent() {
  const { category: activeCategory, page, sortby, order, setQuery } = useDiscoverQuery();
  const [selectedTool, setSelectedTool] = useState<WebsiteType | null>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);

  const handleCategoryWheel = useCallback((e: WheelEvent) => {
    const el = categoriesRef.current;
    if (!el) return;
    // Only hijack when there is overflow to scroll horizontally
    const hasHorizontalOverflow = el.scrollWidth > el.clientWidth;
    if (!hasHorizontalOverflow) return;
    e.preventDefault();
    el.scrollLeft += e.deltaY || e.deltaX;
  }, []);

  useEffect(() => {
    const el = categoriesRef.current;
    if (!el) return;
    // passive: false is required so we can call preventDefault()
    el.addEventListener("wheel", handleCategoryWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleCategoryWheel);
  }, [handleCategoryWheel]);
  const { websites, fetchWebsites, loading } = useWebStore();
  const user = useUser((state) => state.user);
  const [isLoading, setIsLoading] = useState(loading);
  const [tools, setTools] = useState<WebsiteType[]>([]);

  useEffect(() => {
    fetchWebsites();
  }, []);
  
  useEffect(() => {
    setTools(websites);
  }, [websites]);

  const sortedTools = [...tools].sort((a, b) => {
    switch (sortby) {
      case "Latest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case "Oldest":
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case "Popular":
        return b.likesCount - a.likesCount;
      default:
        return 0;
    }
  });
  
  const filteredTools = sortedTools.filter(
    (t) =>
      activeCategory === "All AI" ||
      t.tags.some((tag) => tag.toLowerCase() === activeCategory.toLowerCase())
  );

  // Pagination logic
  const totalTools = filteredTools.length;
  const totalPages = Math.ceil(totalTools / PAGE_SIZE);

  // Ensure we don't exceed max pages if filters change
  const currentPage = Math.min(page, totalPages || 1);

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedTools = filteredTools.slice(
    startIndex,
    startIndex + PAGE_SIZE,
  );

  return (
    <div className="space-y-12">
      {/* Welcome Banner */}
      <div>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
          Good morning, {user?.name} 👋
        </h1>

        {/* Quick Filters */}
        {/* <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            className="h-10 rounded-full px-5 text-sm font-medium gap-2 hover:bg-secondary"
          >
            <LuHistory />{" "}
            Recently Viewed
          </Button>
          <Button
            variant="outline"
            className="h-10 rounded-full px-5 text-sm font-medium gap-2 hover:bg-secondary"
          >
            <LuHeart className="h-4 w-4 text-pink-600" />{" "}
            My Favorites
          </Button>
          <Button
            variant="outline"
            className="h-10 rounded-full px-5 text-sm font-medium gap-2 text-primary border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors"
          >
            <LuCalendar className="h-4 w-4" /> New This Week
          </Button>
        </div> */}
      </div>

      {/* Featured Banner component representing the Top category "AI Tools" */}
      <div className="rounded-3xl bg-gradient-to-r from-[#2B3252] to-[#5B58F2] overflow-hidden relative shadow-lg">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/abstract-bg/1200/400')] opacity-10 mix-blend-overlay" />
        <div className="p-10 md:p-14 relative z-10 flex flex-col md:flex-row gap-8 items-center md:items-start">
          <div className="h-24 w-24 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-xl shrink-0">
            <svg
              className="w-12 h-12 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              <circle cx="12" cy="12" r="4" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-[#fbbf24] text-[#78350f] text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-sm">
                Top Category
              </span>
              <span className="text-white/70 text-sm font-medium">
                {tools.length} tools curated
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tighter">
              AI Tools
            </h2>
            <p className="text-white/80 text-lg max-w-2xl leading-relaxed">
              Discover the next generation of artificial intelligence. From LLMs
              to generative art, explore the tools redefining the digital
              horizon.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4">
          <div className="flex items-baseline gap-3">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Discover
            </h2>
            <span className="text-muted-foreground font-medium text-lg">
              ({totalTools} total)
            </span>
          </div>
          {/* <div className="flex items-center gap-2 text-sm font-medium bg-muted/50 p-1.5 rounded-xl border border-border/50 shadow-inner">
            <button className="px-4 py-1.5 bg-background shadow-sm rounded-lg text-foreground font-semibold">
              Popular
            </button>
            <button className="px-4 py-1.5 text-muted-foreground hover:text-foreground transition-colors rounded-lg">
              New
            </button>
            <button className="px-4 py-1.5 text-muted-foreground hover:text-foreground transition-colors rounded-lg">
              Alpha
            </button>
          </div> */}
        </div>

        {/* Categories */}
        <div ref={categoriesRef} className="flex items-center gap-3 overflow-x-auto pb-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setQuery({ category: cat })}
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
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <LuLoaderCircle className="h-12 w-12 animate-spin text-primary opacity-20" />
            <span className="text-sm font-medium text-muted-foreground animate-pulse">
              Hunting for best websites...
            </span>
          </div>
        ) : paginatedTools.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-10">
              {paginatedTools.map((tool) => (
                <ToolCard
                  key={tool._id}
                  tool={tool}
                  onClick={() => setSelectedTool(tool)}
                />
              ))}
            </div>

            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(p) => setQuery({ page: p })}
            />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-4">
              <LuHistory className="h-10 w-10 text-muted-foreground opacity-20" />
            </div>
            <h3 className="text-xl font-bold">No websites found</h3>
            <p className="text-muted-foreground">
              Try a different category or check back later.
            </p>
          </div>
        )}
      </div>

      {/* Detail Modal Overlay */}
      {/* <Dialog open={!!selectedTool} onOpenChange={(open) => !open && setSelectedTool(null)}>
        {selectedTool && <ToolModal tool={selectedTool} />}
      </Dialog> */}
    </div>
  );
}

export function DiscoverFeed() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-24">
          <LuLoaderCircle className="h-12 w-12 animate-spin text-primary opacity-20" />
        </div>
      }
    >
      <DiscoverFeedContent />
    </Suspense>
  );
}
