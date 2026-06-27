import Link from "next/link";
import { Button } from "../ui/button";
import { LuArrowRight, LuBookmark } from "react-icons/lu";
import { TOOLS } from "@/lib/data";

export default function Trending() {
  const trendingTools = TOOLS.slice(0, 3);
  return (
    <>
      {/* Trending Section */}
      <section className="py-24 bg-muted/30 text-foreground px-4 md:px-8 border-y border-border">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <span className="text-xs font-bold tracking-widest text-primary uppercase mb-4 block">
                Trending Now
              </span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                Discovered this week
              </h2>
            </div>
            <Link
              href="/discover"
              className="text-sm font-bold flex items-center gap-1 hover:text-primary transition-colors"
            >
              View full directory <LuArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trendingTools.map((tool) => (
              <Link href="/discover" key={tool._id} className="block group">
                <div className="bg-card rounded-2xl border shadow-sm overflow-hidden h-full flex flex-col transition-shadow hover:shadow-xl">
                  <div className="relative aspect-video bg-muted p-4">
                    <div className="absolute inset-0 z-0 opacity-10 dark:opacity-20">
                      <div
                        className="w-full h-full"
                        style={{
                          backgroundImage:
                            "radial-gradient(var(--border) 1px, transparent 0)",
                          backgroundSize: "20px 20px",
                        }}
                      ></div>
                    </div>
                    <div className="relative z-10 w-full h-full rounded-xl overflow-hidden border border-border shadow-md">
                      {/* <Image 
                          src={`https://picsum.photos/seed/${tool.imageSeed}-trending/600/400`} 
                          alt={tool.name} 
                          fill 
                          className="object-cover group-hover:scale-105 transition-transform duration-500" 
                          referrerPolicy="no-referrer"
                        /> */}
                      <div className="absolute top-2 right-2 bg-background/80 backdrop-blur text-foreground text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                        {tool.tags}
                      </div>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-lg font-bold mb-2">{tool.name}</h3>
                    <p className="text-sm text-muted-foreground mb-6 flex-1">
                      {tool.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-4">
                      <LuBookmark className="h-4 w-4 hover:text-primary transition-colors" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-16 text-center relative max-w-2xl mx-auto p-8 rounded-3xl bg-card border shadow-xl">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-2">Ready to see more?</h3>
              <p className="text-muted-foreground mb-6">
                We have 4,200+ more curated sites waiting for you. Join the
                community to unlock them all.
              </p>
              <Link href="/discover" className="inline-block w-full sm:w-auto">
                <Button className="h-12 px-8 rounded-xl font-bold w-full shadow-lg">
                  Sign up to see all
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
