"use client";

import { SendNotification } from "@/components/feedback/SendNotification";
import InsertAI from "@/features/admin/InsertAI";
import InsertManual from "@/features/admin/InsertManual";
import { useEffect, useState } from "react";
import { LuPlus, LuSparkles } from "react-icons/lu";

export default function AdminClient() {
  const [activeTab, setActiveTab] = useState<"manual" | "bulk">("manual");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  useEffect(() => {
    if (!status) return;
    SendNotification(status?.message, status?.type);
  }, [status]);

  return (
    <div className="container mx-auto px-4 max-w-6xl">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-2">
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground italic">
          Manage web hunter database with manual entry or AI-powered bulk tools.
        </p>
      </div>

      <div className="flex gap-4 mb-8 p-1 bg-muted/30 rounded-xl w-fit">
        <button
          onClick={() => setActiveTab("manual")}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            activeTab === "manual"
              ? "bg-background text-foreground shadow-sm ring-1 ring-border"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <LuPlus className="h-4 w-4" /> Manual Entry
        </button>
        <button
          onClick={() => setActiveTab("bulk")}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            activeTab === "bulk"
              ? "bg-background text-foreground shadow-sm ring-1 ring-border"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <LuSparkles className="h-4 w-4" /> AI Bulk Import
        </button>
      </div>

      {activeTab === "manual" ? (
        <InsertManual
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          setStatus={setStatus}
        />
      ) : (
        <InsertAI
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          setStatus={setStatus}
        />
      )}
    </div>
  );
}
