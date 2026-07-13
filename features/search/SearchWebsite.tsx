"use client";
import { LuSearch, LuX } from "react-icons/lu";
import { ToolCard } from "../discover/tool-card";
import { useWebsiteStore } from "@/store/websiteStore";
import { ChangeEvent, useEffect, useState } from "react";
import { WebsiteType } from "@/types/website";
import { Button } from "@/components/ui/button";

interface SearchWebsiteProps {
  WebData: WebsiteType[];
  onClose: () => void;
}

export default function SearchWebsite({
  WebData,
  onClose,
}: SearchWebsiteProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<WebsiteType[]>([]);
  const [noResults, setNoResults] = useState(false);

  const handleSearch = (value: string) => {
    // console.log('search input: ', value, 'websites: ', websites.length)
    if (!value || value === "") {
      return setResults([]);
    }

    const filteredResults = WebData?.filter(
      (website) =>
        website?.name?.toLowerCase().includes(value.toLowerCase()) ||
        website?.url?.toLowerCase().includes(value.toLowerCase()) ||
        website?.tags?.some((tag) =>
          tag.toLowerCase().includes(value.toLowerCase()),
        ),
    );
    setNoResults(filteredResults.length == 0);
    setResults(filteredResults);
  };

  const openSearchWindowByShortcut = (e: KeyboardEvent) => {
    if (e.key === "/") {
      e.preventDefault();
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", openSearchWindowByShortcut);
    return () => {
      window.removeEventListener("keydown", openSearchWindowByShortcut);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 w-screen h-screen text-foreground">
      {/* Backdrop overlay with blur */}
      <div
        className="absolute inset-0 backdrop-blur-sm"
        onClick={() => onClose()}
      />

      {/* Search panel */}
      <div className="relative z-10 flex flex-col w-full h-full px-8 mt-10">
        <div className="h-24 w-full flex items-center gap-2">
          <input
            type="text"
            autoFocus
            placeholder="Search..."
            className="w-full border-none rounded-full bg-muted/50 px-3 py-2 text-sm pl-10 focus:ring-0 focus:outline-primary"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setResults([]);
              setNoResults(false);
              handleSearch(e.target.value)
            }}
            onKeyDown={(e) => e.key === "Enter" && handleSearch(searchQuery)}
          />
          <Button
            variant="ghost"
            onClick={() => handleSearch(searchQuery)}
            className="px-3 h-12 w-12 bg-primary rounded-full text-primary-foreground cursor-pointer hover:bg-primary/50"
          >
            <LuSearch />
          </Button>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-5 py-20 overflow-y-auto max-h-[calc(100vh-100px)]">
          {noResults ? (
            <p className="text-muted-foreground">No results found</p>
          ) : searchQuery.length > 0 && results.length > 0 ? (
            results?.map((t) => <ToolCard tool={t} key={t._id} />)
          ) : (
            <p className="text-muted-foreground">Search for a website</p>
          )}
        </div>
      </div>

      {/* Close button */}
      <button
        onClick={() => onClose()}
        className="absolute top-4 right-4 z-20 bg-primary text-primary-foreground text-lg font-semibold rounded-xl px-4 py-2 transition-all hover:bg-primary/90 shadow-lg"
      >
        <LuX />
      </button>
    </div>
  );
}
