"use client";
import { useEffect, useState } from "react";
import { LuLoaderCircle, LuSave, LuX, LuCheck, LuTrash } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SendNotification } from "@/components/feedback/SendNotification";
import { CATEGORIES } from "@/lib/data";
import { WebsiteType } from "@/types/website";
import { useUserStore } from "@/store/userStore";

interface ToolModalProps {
  tool: WebsiteType;
  onUpdate?: (updated: WebsiteType) => void;
  onDelete?: (id: string) => void
}

export function ToolModal({ tool, onUpdate, onDelete }: ToolModalProps) {
  const user = useUserStore((state) => state.user);
  const isAdmin = user?.role === "admin";

  const [form, setForm] = useState({
    name: tool.name,
    url: tool.url,
    description: tool.description,
    tags: [...tool.tags],
    isPremium: tool.isPremium,
    likesCount: tool.likesCount,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const toggleTag = (tag: string) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const hasChanges =
    form.name !== tool.name ||
    form.url !== tool.url ||
    form.description !== tool.description ||
    form.isPremium !== tool.isPremium ||
    form.likesCount !== tool.likesCount ||
    JSON.stringify(form.tags.sort()) !== JSON.stringify([...tool.tags].sort());

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus(null);

    try {
      const res = await fetch("/api/admin/manual", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: tool._id, ...form }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update");

      setStatus({ type: "success", message: "Tool updated successfully!" });
      onUpdate?.(data);
    } catch (err: any) {
      setStatus({ type: "error", message: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTool = async () => {
    if (!user) return;
    try {
      const res = await fetch("/api/admin/manual", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: tool._id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete");

      setStatus({ type: "success", message: "Tool deleted successfully!" });
      onDelete?.(tool._id);
    } catch (err: any) {
      setStatus({ type: "error", message: err.message });
    }
  };

  useEffect(() => {
    if (!status) return;
    SendNotification(status?.message, status?.type);
  }, [status]);

  return (
    <div className="flex flex-col w-full h-full max-h-[85vh] overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-card/80 backdrop-blur-md border-b px-6 py-5 flex items-center gap-4">
        <div className="h-14 w-14 rounded-2xl bg-muted/50 border shadow-sm flex items-center justify-center overflow-hidden relative shrink-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5" />
          <div className="relative text-2xl font-bold font-serif text-primary">
            <img
              src={`https://www.google.com/s2/favicons?domain=${tool.url}&sz=64`}
              onError={() => (
                <span className="text-xl font-bold text-primary">
                  {tool.name.charAt(0).toUpperCase()}
                </span>
              )}
              alt={tool.name}
              className="w-7 h-7 object-contain"
            />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-bold tracking-tight text-foreground truncate">
            Edit Tool Details
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            {isAdmin
              ? "Modify the fields below and save your changes."
              : "You need admin privileges to edit tools."}
          </p>
        </div>
        {hasChanges && (
          <Badge
            variant="secondary"
            className="shrink-0 bg-amber-500/10 text-amber-600 border-amber-500/20 text-[10px] font-bold"
          >
            UNSAVED
          </Badge>
        )}
      </div>

      {/* Form Content */}
      <form onSubmit={handleSave} className="p-6 space-y-6 flex-1">
        {/* Name & URL */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
              Tool Name
            </label>
            <input
              required
              disabled={!isAdmin}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-background border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
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
              disabled={!isAdmin}
              value={form.url}
              onChange={(e) => setForm({ ...form, url: e.target.value })}
              className="w-full bg-background border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="https://example.com"
            />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
            Description
          </label>
          <textarea
            required
            rows={4}
            disabled={!isAdmin}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full bg-background border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium resize-none disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="Provide a compelling description of the tool..."
          />
        </div>

        {/* Tags */}
        <div className="space-y-3">
          <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground block">
            Select Tags
          </label>
          <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto p-4 bg-muted/20 border rounded-2xl scrollbar-thin">
            {CATEGORIES.map((category) => (
              <button
                type="button"
                key={category}
                disabled={!isAdmin}
                onClick={() => toggleTag(category)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                  form.tags.includes(category)
                    ? "bg-primary text-primary-foreground border-primary shadow-md"
                    : "bg-background text-muted-foreground border-border hover:border-primary/50"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Premium Toggle */}
        <div className="hidden items-center gap-3 p-4 rounded-xl bg-muted/20 border">
          <input
            type="checkbox"
            id="edit-premium"
            disabled={!isAdmin}
            checked={form.isPremium}
            onChange={(e) => setForm({ ...form, isPremium: e.target.checked })}
            className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <label
            htmlFor="edit-premium"
            className="text-sm font-bold cursor-pointer select-none"
          >
            Mark as Premium Tool
          </label>
          {form.isPremium && (
            <Badge
              variant="premium"
              className="ml-auto text-[10px] py-1 text-primary"
            >
              PREMIUM
            </Badge>
          )}
        </div>

        {/* Meta Info (read-only) */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
              Likes
            </label>
            <input
              type="number"
              disabled={!isAdmin}
              value={form.likesCount}
              onChange={(e) =>
                setForm({ ...form, likesCount: Number(e.target.value) })
              }
              onFocus={(e) => e.target.select()}
              className="w-full bg-background border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
              Date Created
            </label>
            <input
              disabled
              readOnly
              value={new Date(tool.createdAt).toLocaleDateString("en-IN", {
                dateStyle: "medium",
              })}
              className="w-full bg-background border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium resize-none disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
        </div>

        {/* Save Button */}
        {isAdmin && (
          <div className="pt-2 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Button
                type="submit"
                disabled={isLoading || !hasChanges}
                className="h-12 px-8 rounded-xl font-bold bg-primary text-primary-foreground shadow-lg shadow-primary/20 gap-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <LuLoaderCircle className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <LuSave className="h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
              {!hasChanges && (
                <p className="text-xs text-muted-foreground">
                  No changes to save
                </p>
              )}
            </div>

            <div>
              <Button
                type="button"
                disabled={isLoading}
                onClick={() => deleteTool()}
                className="h-12 px-8 rounded-xl font-bold bg-red-500/10 hover:bg-red-600/40 text-red-500 shadow-lg gap-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <LuLoaderCircle className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <LuTrash className="h-4 w-4" />
                    Delete Tool
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
