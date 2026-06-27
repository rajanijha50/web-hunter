import { TEMP } from "@/lib/data";
import { LuSearch, LuX } from "react-icons/lu";
import { ToolCard } from "../discover/tool-card";

interface SearchWebsiteProps {
  onClose: () => void;
}

export default function SearchWebsite({ onClose }: SearchWebsiteProps) {
  // TODO: take the website data from zustand webStore. and return the results by matching title, url, category
  return (
    <div className="fixed inset-0 z-50 w-screen h-screen text-foreground">
      {/* Backdrop overlay with blur */}
      <div
        className="absolute inset-0 backdrop-blur-sm"
        onClick={() => onClose()}
      />

      {/* Search panel */}
      <div className="relative z-10 flex flex-col w-full h-full px-8">
        <div className="h-24 w-full flex items-center gap-2">
          <input
            type="text"
            autoFocus
            placeholder="Search..."
            className="w-full rounded-full bg-muted/50 px-3 py-2 text-sm pl-10"
          />
          <button className="px-4 py-2 bg-primary rounded-full text-primary-foreground cursor-pointer">
            <LuSearch />
          </button>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-5 py-20 overflow-y-auto max-h-[calc(100vh-100px)]">
          {TEMP?.map((t) => {
            return <ToolCard tool={t} key={t._id} />;
          })}
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
