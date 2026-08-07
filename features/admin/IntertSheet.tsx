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


export default function InsertSheet({
  isLoading,
  setIsLoading,
  setStatus,
}: AiInsertProps) {
  const [url, setUrl] = useState("");
  const [sheetId, setSheetId] = useState("");
  
  

  const fetchSheetInsert = async () => {
    if (!url) {
        return;
    }
    console.log("data in insertsheet.tsx: ", url, sheetId)
    setIsLoading(true);
    setStatus(null);
    try {
        const res = await fetch("/api/admin/add-to-sheet", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                url,
                sheetId,
            }),
        });
        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.error);
        }
        setStatus({ type: "success", message: data.message });
    } catch (error: any) {
        setStatus({ type: "error", message: error.message });
    } finally {
        setIsLoading(false);
        setUrl("");
    }
    
  };

  

  return (
    <div className="space-y-8">
      <Card className="border shadow-xl bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 italic font-black">
            <LuDatabase className="h-6 w-6 text-primary" /> ADD URL TO SHEET
          </CardTitle>
          <CardDescription>
            Configure your url to insert into the sheet.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                Sheet ID (Optional)
              </label>
              <input
                value={sheetId}
                onChange={(e) =>
                  setSheetId(e.target.value)
                }
                className="w-full bg-background border rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary/30 outline-none"
                placeholder="Defaults to .env ID"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                URL
              </label>
              <input
                value={url}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                      fetchSheetInsert();
                  }
                }}
                onChange={(e) => {
                  setUrl(e.target.value)
                }}
                className="w-full bg-background border rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary/30 outline-none"
                placeholder="https://www.example.com"
              />
            </div>
            
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
