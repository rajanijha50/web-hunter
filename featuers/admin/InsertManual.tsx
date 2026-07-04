"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LuLoaderCircle,
} from "react-icons/lu";
import { CATEGORIES } from "@/lib/data";

interface ManualInsertProps {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  setStatus: (
    status: { type: "success" | "error"; message: string } | null,
  ) => void;
}

export default function InsertManual({
  isLoading,
  setIsLoading,
  setStatus,
}: ManualInsertProps) {
  // Manual Form State
  const [manualTool, setManualTool] = useState({
    name: "",
    url: "",
    description: "",
    tags: [] as string[],
    isPremium: false,
  });

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus(null);

    try {
      const res = await fetch("/api/admin/manual", {
        method: "POST",
        body: JSON.stringify(manualTool),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setStatus({ type: "success", message: "Tool added successfully!" });
      setManualTool({
        name: "",
        url: "",
        description: "",
        tags: [],
        isPremium: false,
      });
    } catch (err: any) {
      setStatus({ type: "error", message: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTag = (tag: string) => {
    setManualTool((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  return (
    <Card className="border shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
      <CardHeader className="border-b bg-muted/20">
        <CardTitle>Manual Tool Insertion</CardTitle>
        <CardDescription>
          Fill in the details to add a new website to the directory.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-8">
        <form onSubmit={handleManualSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                Tool Name
              </label>
              <input
                required
                value={manualTool.name}
                onChange={(e) =>
                  setManualTool({ ...manualTool, name: e.target.value })
                }
                className="w-full bg-background border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                placeholder="e.g. ChatGPT"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                URL
              </label>
              <input
                required
                type="text"
                value={manualTool.url}
                onChange={(e) =>
                  setManualTool({ ...manualTool, url: e.target.value })
                }
                className="w-full bg-background border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                placeholder="https://example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
              Description
            </label>
            <textarea
              required
              rows={4}
              value={manualTool.description}
              onChange={(e) =>
                setManualTool({ ...manualTool, description: e.target.value })
              }
              className="w-full bg-background border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium resize-none"
              placeholder="Provide a compelling description of the tool..."
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground block">
              Select Tags
            </label>
            <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto p-4 bg-muted/20 border rounded-2xl scrollbar-thin">
              {CATEGORIES.map((category) => (
                <button
                  type="button"
                  key={category}
                  onClick={() => toggleTag(category)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                    manualTool.tags.includes(category)
                      ? "bg-primary text-primary-foreground border-primary shadow-md"
                      : "bg-background text-muted-foreground border-border hover:border-primary/50"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="premium"
              checked={manualTool.isPremium}
              onChange={(e) =>
                setManualTool({ ...manualTool, isPremium: e.target.checked })
              }
              className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label
              htmlFor="premium"
              className="text-sm font-bold cursor-pointer select-none"
            >
              Mark as Premium Tool
            </label>
          </div>

          <div className="pt-4">
            <Button
              disabled={isLoading}
              className="h-12 px-8 rounded-xl font-bold bg-primary text-primary-foreground shadow-lg shadow-primary/20 w-full sm:w-auto"
            >
              {isLoading ? (
                <LuLoaderCircle className="h-5 w-5 animate-spin" />
              ) : (
                "Publish to Directory"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
