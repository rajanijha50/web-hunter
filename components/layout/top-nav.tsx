"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Bell, Search, User, Menu, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

export function TopNav() {
  const pathname = usePathname();
  const isLandingPage = pathname === "/";
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  
  return (
    <header className={`sticky top-0 z-50 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all ${
      isLandingPage 
        ? 'bg-background/80 border-border/40' 
        : 'bg-background/95 border-border'
    }`}>
      <div className="container flex h-16 items-center justify-between px-4 md:px-8 mx-auto">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl tracking-tight">
              Web<span className="font-medium text-muted-foreground">Hunter</span>
            </span>
          </Link>
          
          <div className="hidden lg:flex relative w-80 xl:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search 3,200+ websites..."
              aria-label="Search websites"
              className="flex h-10 w-full rounded-full border border-input bg-muted/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden xl:flex items-center gap-1">
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <span className="text-xs">⌘</span>K
              </kbd>
            </div>
          </div>
        </div>
        
        <nav className="flex items-center gap-4 md:gap-6 text-sm font-medium">
          <div className="hidden md:flex items-center gap-6">
            <Link 
              href="/discover" 
              className={`transition-colors hover:text-primary ${pathname.startsWith('/discover') ? 'text-primary' : 'text-muted-foreground'}`}
            >
              Discover
            </Link>
            <Link href="#" className="transition-colors text-muted-foreground hover:text-primary">Curators</Link>
            <Link href="/pricing" className="transition-colors text-muted-foreground hover:text-primary">Premium</Link>
            <Link href="#" className="transition-colors text-muted-foreground hover:text-primary">Submit</Link>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4 border-l pl-4 md:pl-6 ml-2 border-border/60">
            <ThemeToggle />
            
            {session && (
              <button className="text-muted-foreground hover:text-foreground relative p-2 transition-colors">
                <Bell className="h-5 w-5" />
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive"></span>
              </button>
            )}
            
            {!isLoading && (
              <>
                {session ? (
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full border border-border overflow-hidden bg-muted flex items-center justify-center shrink-0 cursor-pointer hover:border-primary/50 transition-colors">
                      {session.user?.image ? (
                        <Image 
                          src={session.user.image} 
                          alt={session.user.name || "User"} 
                          width={36} 
                          height={36}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <User className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-muted-foreground hover:text-destructive"
                      onClick={() => signOut()}
                    >
                      <LogOut className="h-5 w-5" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Link href="/login" className="hidden sm:block text-muted-foreground hover:text-foreground transition-colors">
                      Login
                    </Link>
                    <Link href="/login">
                      <Button size="sm" className="rounded-full px-4 font-semibold shadow-sm">
                        Get Started
                      </Button>
                    </Link>
                  </div>
                )}
              </>
            )}

            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
