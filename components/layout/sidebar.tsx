import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LuCompass, LuShoppingCart, LuWrench, LuPalette, LuSparkles, LuSettings, LuCircleHelp } from "react-icons/lu";

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-16 z-30 hidden h-[calc(100vh-4rem)] w-64 shrink-0 overflow-y-auto border-r bg-background md:block">
      <div className="py-6 px-4 flex flex-col h-full">
        <div className="mb-6">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Filters</p>
          <p className="text-xs text-muted-foreground mb-4">Narrow your search</p>
          
          <nav className="space-y-1">
            <Link href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-muted font-medium">
              <LuCompass className="h-4 w-4" /> All Platforms
            </Link>
            <Link href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-primary bg-primary/10 font-medium">
              <LuSparkles className="h-4 w-4" /> AI Directory
            </Link>
            <Link href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted font-medium">
              <LuShoppingCart className="h-4 w-4" /> E-Commerce
            </Link>
            <Link href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted font-medium">
              <LuWrench className="h-4 w-4" /> SaaS Tools
            </Link>
            <Link href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted font-medium">
              <LuPalette className="h-4 w-4" /> Design Inspiration
            </Link>
          </nav>
        </div>
        
        <div className="mt-auto mb-6">
           <div className="rounded-xl border bg-card p-4 shadow-sm mb-4 bg-gradient-to-br from-indigo-900/10 to-transparent">
             <div className="flex items-center gap-2 mb-2">
               <LuSparkles className="h-4 w-4 text-primary" />
             </div>
             <p className="font-semibold text-sm mb-1">Upgrade to Pro</p>
             <p className="text-xs text-muted-foreground mb-3">Unlock advanced filtering and curator insights.</p>
             <Link href="/discover" className="block w-full">
              <Button className="w-full h-8 text-xs bg-primary hover:bg-primary/90 text-white border-0 shadow-none">Go Premium</Button>
             </Link>
           </div>
           
           <nav className="space-y-1 border-t pt-4">
            <Link href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted font-medium">
              <LuSettings className="h-4 w-4" /> Settings
            </Link>
            <Link href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted font-medium">
              <LuCircleHelp className="h-4 w-4" /> Help
            </Link>
          </nav>
        </div>
      </div>
    </aside>
  );
}
