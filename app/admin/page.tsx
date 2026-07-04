"use client";
import InsertAI from "@/featuers/admin/InsertAI";
import InsertManual from "@/featuers/admin/InsertManual";
import { useState } from "react";
import {
  LuPlus,
  LuSparkles,
  LuCheck,
  LuX,
} from "react-icons/lu";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"manual" | "bulk">("manual");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

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

      {status && (
        <div
          className={`mb-6 p-4 rounded-xl border flex items-center gap-3 animate-in fade-in slide-in-from-top-2 ${
            status.type === "success"
              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400"
              : "bg-rose-500/10 border-rose-500/20 text-rose-600 dark:text-rose-400"
          }`}
        >
          {status.type === "success" ? (
            <LuCheck className="h-5 w-5" />
          ) : (
            <LuX className="h-5 w-5" />
          )}
          <p className="text-sm font-medium">{status.message}</p>
        </div>
      )}

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
