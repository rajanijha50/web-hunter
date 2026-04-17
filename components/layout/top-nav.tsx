"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Bell, Search, User, Globe, Mail } from "lucide-react";
import { usePathname } from "next/navigation";

export function TopNav() {
  const pathname = usePathname();
  const isLandingPage = pathname === "/";
  
  return (
    <header className={`sticky top-0 z-50 w-full backdrop-blur supports-[backdrop-filter]:bg-background/60 ${isLandingPage ? 'bg-[#0d1117]/80 text-white border-slate-800' : 'bg-background/95 border-b'}`}>
      <div className="container flex h-16 items-center justify-between px-4 md:px-8 max-w-[1400px] mx-auto">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className={`font-bold text-xl tracking-tight ${isLandingPage ? 'text-white' : 'text-foreground'}`}>Web<span className={`font-medium ${isLandingPage ? 'text-slate-400' : 'text-muted-foreground'}`}>Hunter</span></span>
          </Link>
          
          <div className="hidden lg:flex relative w-96 max-w-lg">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search 3,200+ websites..."
              className={`flex h-9 w-full rounded-md border px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 pl-9 ${isLandingPage ? 'bg-slate-800/50 border-slate-700 text-white' : 'bg-muted/30 border-input text-foreground'}`}
            />
            <div className="absolute right-2.5 top-2.5 flex items-center gap-1">
              <kbd className={`pointer-events-none inline-flex h-4 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 ${isLandingPage ? 'bg-slate-800 border-slate-700 text-slate-400' : 'bg-muted border-border text-muted-foreground'}`}>
                <span className="text-xs">⌘</span>K
              </kbd>
            </div>
          </div>
        </div>
        
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link href="/discover" className={`transition-colors hover:text-primary ${!isLandingPage ? 'border-b-2 border-primary py-5 text-primary' : 'text-slate-300'}`}>Discover</Link>
          <Link href="#" className={`transition-colors hidden md:block hover:text-primary ${isLandingPage ? 'text-slate-300' : 'text-muted-foreground'}`}>Curators</Link>
          <Link href="/pricing" className={`transition-colors hidden md:block hover:text-primary ${isLandingPage ? 'text-slate-300' : 'text-muted-foreground'}`}>Premium</Link>
          <Link href="#" className={`transition-colors hidden sm:block hover:text-primary ${isLandingPage ? 'text-slate-300' : 'text-muted-foreground'}`}>Submit</Link>
          
          <div className="flex items-center gap-4 ml-2">
            {!isLandingPage && (
              <button className="text-muted-foreground hover:text-foreground relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-destructive"></span>
              </button>
            )}
            
            {isLandingPage ? (
              <div className="flex items-center gap-4 ml-4">
                <Link href="/discover" className="hidden sm:block text-slate-300 hover:text-white transition-colors">Login</Link>
                <Link href="/discover">
                  <Button className="h-8 rounded-md bg-white hover:bg-slate-200 text-[#0d1117] font-bold text-xs shadow-md">Get Started</Button>
                </Link>
              </div>
            ) : (
              <div className="h-8 w-8 rounded-full border border-border overflow-hidden bg-muted flex items-center justify-center shrink-0">
                 <User className="h-5 w-5 text-muted-foreground" />
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
