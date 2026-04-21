"use client";

import { TopNav } from "@/components/layout/top-nav";
import { Button } from "@/components/ui/button";
import { Search, ListFilter, Bookmark, ArrowRight, Quote } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ToolCard } from "@/components/tool-card";
import { TOOLS, TESTIMONIALS } from "@/lib/data";
import { useEffect } from "react";

export default function LandingPage() {
  const trendingTools = TOOLS.slice(0, 3);

  const fetchTest = async () => {
    try {
      const res = await fetch("/api/websites");
      const data = await res.json();
      if (data.success) {
        console.log(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchTest();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <TopNav />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden flex flex-col items-center justify-center text-center px-4">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background pointer-events-none" />
        
        <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full border border-primary/20 mb-8 z-10">
          <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
          NEW CURATIONS LIVE
        </div>
        
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-6 z-10 leading-[1.1] text-foreground">
          Stop scrolling.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-primary">Start discovering.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 z-10 leading-relaxed">
          Web Hunter curates thousands of useful, niche websites you won't find on traditional search engines. Escape the algorithm and find the extraordinary.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 z-10">
          <Link href="/discover">
            <Button className="h-14 px-8 text-lg font-semibold rounded-full bg-foreground text-background hover:bg-foreground/90 transition-colors flex items-center gap-2">
              Explore Free <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/pricing">
            <Button variant="outline" className="h-14 px-8 text-lg font-semibold rounded-full border-border bg-transparent hover:bg-accent transition-colors">
              See Pricing
            </Button>
          </Link>
        </div>
      </section>

      {/* Trust Banners */}
      <div className="hidden border-y border-border bg-muted/30 backdrop-blur-sm relative z-10 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 opacity-60">
            <span className="text-xs font-bold tracking-widest uppercase text-muted-foreground">Trusted by curators at</span>
            <div className="flex items-center gap-8 md:gap-16 grayscale dark:invert">
              <span className="text-xl font-bold tracking-tighter mix-blend-plus-lighter">LINEAR</span>
              <span className="text-xl font-serif font-bold mix-blend-plus-lighter">NOTION</span>
              <span className="text-xl font-bold italic tracking-tighter mix-blend-plus-lighter">FRAMER</span>
              <span className="text-xl font-black tracking-widest mix-blend-plus-lighter">VERCEL</span>
            </div>
          </div>
        </div>
      </div>

      {/* Process Section */}
      <section className="py-24 bg-background text-foreground px-4 md:px-8">
        <div className="container mx-auto max-w-6xl">
          <span className="text-xs font-bold tracking-widest text-primary uppercase mb-4 block">The Process</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-16">Three steps to the niche web</h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center mb-6 border shadow-sm">
                <Search className="h-8 w-8 text-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-3">Search or Browse</h3>
              <p className="text-muted-foreground leading-relaxed">
                Use our semantic search or browse curated collections of indie makers and niche directories.
              </p>
            </div>
            <div>
              <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center mb-6 border shadow-sm">
                <ListFilter className="h-8 w-8 text-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-3">Explore Cards</h3>
              <p className="text-muted-foreground leading-relaxed">
                View interactive previews and curator notes for every site in our index. No dead links, ever.
              </p>
            </div>
            <div>
              <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center mb-6 border shadow-sm">
                <Bookmark className="h-8 w-8 text-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-3">Save and Unlock</h3>
              <p className="text-muted-foreground leading-relaxed">
                Collect your findings in private lists or unlock the full pro database for deeper research.
              </p>
            </div>
          </div>
          
          <div className="mt-16 flex flex-wrap gap-3 overflow-x-auto pb-4 scrollbar-none">
            {["AI Tools", "Productivity", "Design Systems", "SaaS Templates", "Creative Coding", "Market Research", "No-Code", "Web3 Insights"].map((tag, i) => (
              <span key={tag} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap cursor-pointer transition-colors ${
                i === 0 ? "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 hover:bg-indigo-200" : 
                i === 1 ? "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 hover:bg-amber-200" :
                i === 3 ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-200" :
                i === 4 ? "bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400 hover:bg-rose-200" :
                "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-24 bg-muted/30 text-foreground px-4 md:px-8 border-y border-border">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
               <span className="text-xs font-bold tracking-widest text-primary uppercase mb-4 block">Trending Now</span>
               <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Discovered this week</h2>
            </div>
            <Link href="/discover" className="text-sm font-bold flex items-center gap-1 hover:text-primary transition-colors">
              View full directory <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trendingTools.map((tool) => (
               <Link href="/discover" key={tool.id} className="block group">
                 <div className="bg-card rounded-2xl border shadow-sm overflow-hidden h-full flex flex-col transition-shadow hover:shadow-xl">
                    <div className="relative aspect-video bg-muted p-4">
                      <div className="absolute inset-0 z-0 opacity-10 dark:opacity-20">
                        <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(var(--border) 1px, transparent 0)', backgroundSize: '20px 20px' }}></div>
                      </div>
                      <div className="relative z-10 w-full h-full rounded-xl overflow-hidden border border-border shadow-md">
                        <Image 
                          src={`https://picsum.photos/seed/${tool.imageSeed}-trending/600/400`} 
                          alt={tool.name} 
                          fill 
                          className="object-cover group-hover:scale-105 transition-transform duration-500" 
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-2 right-2 bg-background/80 backdrop-blur text-foreground text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                          {tool.category.split(' ')[0]}
                        </div>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-lg font-bold mb-2">{tool.name}</h3>
                      <p className="text-sm text-muted-foreground mb-6 flex-1">{tool.description}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-4">
                        <span className="flex items-center gap-1">by @{tool.developer.toLowerCase().replace(/\s/g, '_')}</span>
                        <Bookmark className="h-4 w-4 hover:text-primary transition-colors" />
                      </div>
                    </div>
                 </div>
               </Link>
            ))}
          </div>

          <div className="mt-16 text-center relative max-w-2xl mx-auto p-8 rounded-3xl bg-card border shadow-xl">
             <div className="relative z-10">
               <h3 className="text-2xl font-bold mb-2">Ready to see more?</h3>
               <p className="text-muted-foreground mb-6">We have 4,200+ more curated sites waiting for you. Join the community to unlock them all.</p>
               <Link href="/pricing" className="inline-block w-full sm:w-auto">
                 <Button className="h-12 px-8 rounded-xl font-bold w-full shadow-lg">Sign up to see all</Button>
               </Link>
             </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 md:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-widest text-primary uppercase mb-4 block">The Explorer's Voice</span>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <div key={t.id} className="bg-muted/30 border border-border rounded-3xl p-8 relative">
                {i === 0 && <div className="absolute -top-4 -left-4 bg-primary h-10 w-10 rounded-full flex items-center justify-center border-4 border-background"><Quote className="h-4 w-4 text-primary-foreground fill-primary-foreground" /></div>}
                
                <p className="text-muted-foreground italic mb-8 relative z-10 leading-relaxed text-lg">"{t.content}"</p>
                
                <div className="flex items-center gap-4 mt-auto">
                  <div className="h-12 w-12 rounded-full overflow-hidden bg-muted shrink-0 border-2 border-border relative">
                     <Image 
                       src={`https://picsum.photos/seed/${t.avatarSeed}-user/100/100`} 
                       alt={t.name}
                       fill
                       className="object-cover"
                       referrerPolicy="no-referrer"
                     />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-sm">{t.name}</h4>
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background text-muted-foreground py-16 border-t border-border px-4">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row justify-between gap-8">
          <div className="max-w-xs">
             <Link href="/" className="flex items-center space-x-2 mb-4">
               <span className="font-bold text-xl tracking-tight text-foreground">Web<span className="font-medium text-muted-foreground">Hunter</span></span>
             </Link>
             <p className="text-xs text-muted-foreground mb-6">Discovery redefined. We hunt for the websites that the algorithms forgot to show you.</p>
             <div className="flex gap-4">
                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center hover:bg-accent cursor-pointer transition-colors"><span className="text-xs">X</span></div>
                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center hover:bg-accent cursor-pointer transition-colors"><span className="text-xs">in</span></div>
             </div>
          </div>
          
          <div className="flex gap-16">
            <div>
              <h5 className="font-bold text-[10px] text-foreground mb-4 uppercase tracking-wider">Platform</h5>
              <ul className="space-y-3 text-xs">
                <li><Link href="/discover" className="hover:text-primary transition-colors">Discover</Link></li>
                <li><span className="hover:text-primary transition-colors cursor-pointer">Curators</span></li>
                <li><Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-[10px] text-foreground mb-4 uppercase tracking-wider">Support</h5>
              <ul className="space-y-3 text-xs">
                <li><span className="hover:text-primary transition-colors cursor-pointer">Help Center</span></li>
                <li><span className="hover:text-primary transition-colors cursor-pointer">Contact Us</span></li>
                <li><span className="hover:text-primary transition-colors cursor-pointer">Guidelines</span></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-[10px] text-foreground mb-4 uppercase tracking-wider">Company</h5>
              <ul className="space-y-3 text-xs">
                <li><span className="hover:text-primary transition-colors cursor-pointer">About</span></li>
                <li><span className="hover:text-primary transition-colors cursor-pointer">Careers</span></li>
                <li><span className="hover:text-primary transition-colors cursor-pointer">Privacy</span></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container mx-auto max-w-6xl mt-16 pt-8 border-t border-border text-[10px] flex flex-col md:flex-row justify-between items-center gap-4 uppercase tracking-widest text-muted-foreground">
           <span>© {new Date().getFullYear()} Web Hunter. Discovery Redefined.</span>
           <div className="flex gap-8">
             <span className="hover:text-foreground cursor-pointer transition-colors">Privacy</span>
             <span className="hover:text-foreground cursor-pointer transition-colors">Terms</span>
           </div>
        </div>
      </footer>
    </div>
  );
}
