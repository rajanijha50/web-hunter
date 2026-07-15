"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog } from "@/components/ui/dialog";
import { ToolModal } from "@/features/discover/tool-modal";
import { RiDeleteBinFill } from "react-icons/ri";
import {
  LuLoaderCircle,
  LuDatabase,
  LuSparkles,
  LuCheck,
  LuExternalLink,
  LuPencil,
} from "react-icons/lu";
import { WebsiteType } from "@/types/website";

interface AiInsertProps {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  setStatus: (
    status: { type: "success" | "error"; message: string } | null,
  ) => void;
}

type PreviewTool = {
  name: string;
  url: string;
  description: string;
  tags: string[];
  isPremium: boolean;
};

/** Convert a preview tool (no DB fields) into a shape ToolModal accepts */
function toWebsiteType(tool: PreviewTool, idx: number): WebsiteType {
  return {
    _id: `preview-${idx}`,
    name: tool.name,
    url: tool.url,
    description: tool.description,
    tags: tool.tags,
    isPremium: tool.isPremium,
    likesCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

export default function InsertAI({
  isLoading,
  setIsLoading,
  setStatus,
}: AiInsertProps) {
  const [previewData, setPreviewData] = useState<PreviewTool[]>([]);
  const [editingIdx, setEditingIdx] = useState<number | null>(null);

  const [bulkOptions, setBulkOptions] = useState({
    sheetId: "",
    range: "Sheet1!A:C",
    batchSize: 10,
    startingLetter: "",
  });
  const FocusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (previewData && previewData.length > 0) {
      FocusRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [previewData]);

  const fetchAIPreview = async () => {
    setIsLoading(true);
    setStatus(null);
    setEditingIdx(null);
    try {
      const res = await fetch("/api/admin/bulk/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bulkOptions),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setPreviewData(data.data);
      setStatus({ type: "success", message: data.message });
    } catch (err: any) {
      setStatus({ type: "error", message: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  const confirmBulkInsert = async () => {
    setIsLoading(true);
    setStatus(null);
    try {
      const res = await fetch("/api/admin/bulk/confirm", {
        method: "POST",
        body: JSON.stringify({ tools: previewData }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setStatus({ type: "success", message: data.message });
      setPreviewData([]);
    } catch (err: any) {
      setStatus({ type: "error", message: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  /** Called by ToolModal's save — update the item at editingIdx */
  const handleUpdate = (updated: WebsiteType) => {
    if (editingIdx === null) return;
    setPreviewData((prev) =>
      prev.map((tool, i) =>
        i === editingIdx
          ? {
              ...tool,
              name: updated.name,
              url: updated.url,
              description: updated.description,
              tags: updated.tags,
              isPremium: updated.isPremium,
            }
          : tool,
      ),
    );
    setEditingIdx(null);
  };

  /** Called by ToolModal's delete — remove the item at editingIdx */
  const handleDelete = (_id: string) => {
    if (editingIdx === null) return;
    setPreviewData((prev) => prev.filter((_, i) => i !== editingIdx));
    setEditingIdx(null);
  };

  return (
    <div className="space-y-8">
      {/* ── Edit Dialog ───────────────────────────────────── */}
      {editingIdx !== null && (
        <Dialog open onOpenChange={(open) => !open && setEditingIdx(null)}>
          <ToolModal
            tool={toWebsiteType(previewData[editingIdx], editingIdx)}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        </Dialog>
      )}

      <Card className="border shadow-xl bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 italic font-black">
            <LuDatabase className="h-6 w-6 text-primary" /> AI SPREADSHEET SYNC
          </CardTitle>
          <CardDescription>
            Configure your sheet source and AI processing parameters.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                Sheet ID (Optional)
              </label>
              <input
                value={bulkOptions.sheetId}
                onChange={(e) =>
                  setBulkOptions({ ...bulkOptions, sheetId: e.target.value })
                }
                className="w-full bg-background border rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary/30 outline-none"
                placeholder="Defaults to .env ID"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                Range
              </label>
              <input
                value={bulkOptions.range}
                onChange={(e) =>
                  setBulkOptions({ ...bulkOptions, range: e.target.value })
                }
                className="w-full bg-background border rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary/30 outline-none"
                placeholder="Sheet1!A:C"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                AI Batch Size
              </label>
              <input
                type="number"
                value={bulkOptions.batchSize}
                onChange={(e) =>
                  setBulkOptions({
                    ...bulkOptions,
                    batchSize: parseInt(e.target.value),
                  })
                }
                className="w-full bg-background border rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary/30 outline-none"
                min="1"
                max="50"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                Starting Letter
              </label>
              <select
                value={bulkOptions.startingLetter}
                onChange={(e) =>
                  setBulkOptions({
                    ...bulkOptions,
                    startingLetter: e.target.value,
                  })
                }
                className="w-full bg-background border rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary/30 outline-none"
              >
                <option value="">Any</option>
                {Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ").map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center py-8 border-2 border-dashed rounded-3xl bg-muted/10">
            <LuSparkles className="h-10 w-10 text-primary/40 mb-4 animate-pulse" />
            <Button
              disabled={isLoading}
              onClick={fetchAIPreview}
              className="h-12 px-10 rounded-2xl font-bold bg-foreground text-background hover:bg-foreground/90 transition-all flex items-center gap-2"
            >
              {isLoading ? (
                <LuLoaderCircle className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  Fetch &amp; Analyze with AI <LuSparkles className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {previewData.length > 0 && (
        <div ref={FocusRef} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold flex items-center gap-2 tracking-tight">
              Preview Generated Results{" "}
              <Badge variant="secondary">
                {previewData.length} Items Found
              </Badge>
            </h2>
            <Button
              onClick={confirmBulkInsert}
              disabled={isLoading}
              className="h-11 px-8 rounded-xl font-black bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl shadow-emerald-500/20 flex items-center gap-2"
            >
              {isLoading ? (
                <LuLoaderCircle className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  Confirm Bulk Import <LuCheck className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>

          <div className="rounded-3xl border shadow-2xl overflow-hidden bg-card">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead className="bg-muted/50 border-b text-xs font-black uppercase tracking-widest text-muted-foreground">
                  <tr>
                    <th className="px-6 py-4">#</th>
                    <th className="px-6 py-4">Tool Info</th>
                    <th className="px-6 py-4">Description</th>
                    <th className="px-6 py-4">AI Tags</th>
                    <th className="px-6 py-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {previewData.map((tool, idx) => (
                    <tr
                      key={idx}
                      className="group hover:bg-muted/20 transition-colors"
                    >
                      <td className="px-6 py-6 font-medium align-top whitespace-nowrap text-muted-foreground">
                        {idx + 1}
                      </td>
                      <td className="px-6 py-6 font-medium align-top whitespace-nowrap">
                        <div className="flex flex-col gap-1">
                          <span className="text-base font-bold text-foreground text-wrap break-all">
                            {tool.name}
                          </span>
                          <a
                            href={
                              tool.url.startsWith("http")
                                ? tool.url
                                : `https://${tool.url}`
                            }
                            target="_blank"
                            className="text-xs text-primary flex items-center gap-1 hover:underline"
                          >
                            visit <LuExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      </td>
                      <td className="px-6 py-6 text-muted-foreground max-w-md italic leading-relaxed">
                        {tool.description}
                      </td>
                      <td className="px-6 py-6 align-top">
                        <div className="flex flex-wrap gap-1.5">
                          {tool.tags?.map((tag: string) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="text-[10px] bg-background"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-6 align-top">
                        <div className="flex items-center gap-1.5 justify-center">
                          <Button
                            title="Edit Tool"
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 rounded-full p-0 text-sky-500 hover:text-sky-600 hover:bg-sky-100"
                            onClick={() => setEditingIdx(idx)}
                          >
                            <LuPencil className="h-4 w-4" />
                          </Button>
                          <Button
                            title="Remove Tool"
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 rounded-full p-0 text-rose-500 hover:text-rose-600 hover:bg-rose-100"
                            onClick={() =>
                              setPreviewData((prev) =>
                                prev.filter((_, i) => i !== idx),
                              )
                            }
                          >
                            <RiDeleteBinFill className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
