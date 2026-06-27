import Link from "next/link";
import { Button } from "../ui/button";
import { LuArrowRight, LuBookmark, LuListFilter, LuSearch } from "react-icons/lu";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden flex flex-col items-center justify-center text-center px-4">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium bg-amber-400/10 text-amber-400 rounded-full border border-amber-400/20 mb-8 z-10">
          <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-pulse"></span>
          NEW CURATIONS LIVE
        </div>

        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-6 z-10 leading-[1.1] text-foreground">
          Stop scrolling.
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-primary">
            Start discovering.
          </span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 z-10 leading-relaxed">
          Web Hunter curates thousands of useful, niche websites you won't find
          on traditional search engines. Escape the algorithm and find the
          extraordinary.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 z-10">
          <Link href="/discover">
            <Button className="h-14 px-8 text-lg font-semibold rounded-full bg-foreground text-background hover:bg-foreground/90 transition-colors flex items-center gap-2">
              Explore For Free <LuArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-background text-foreground px-4 md:px-8">
        <div className="container mx-auto max-w-6xl">
          <span className="text-xs font-bold tracking-widest text-primary uppercase mb-4 block">
            The Process
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-16">
            Three steps to the niche web
          </h2>

          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center mb-6 border shadow-sm">
                <LuSearch className="h-8 w-8 text-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-3">Search or Browse</h3>
              <p className="text-muted-foreground leading-relaxed">
                Use our semantic search or browse curated collections of indie
                makers and niche directories.
              </p>
            </div>
            <div>
              <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center mb-6 border shadow-sm">
                <LuListFilter className="h-8 w-8 text-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-3">Explore Cards</h3>
              <p className="text-muted-foreground leading-relaxed">
                View interactive previews and curator notes for every site in
                our index. No dead links, ever.
              </p>
            </div>
            <div>
              <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center mb-6 border shadow-sm">
                <LuBookmark className="h-8 w-8 text-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-3">Save and Unlock</h3>
              <p className="text-muted-foreground leading-relaxed">
                Collect your findings in private lists or unlock the full pro
                database for deeper research.
              </p>
            </div>
          </div>

          <div className="mt-16 flex flex-wrap gap-3 overflow-x-auto pb-4 scrollbar-none">
            {[
              "AI Tools",
              "Productivity",
              "Design Systems",
              "SaaS Templates",
              "Creative Coding",
              "Market Research",
              "No-Code",
              "Web3 Insights",
            ].map((tag, i) => (
              <span
                key={tag}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap cursor-pointer transition-colors ${
                  i === 0
                    ? "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 hover:bg-indigo-200"
                    : i === 1
                      ? "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 hover:bg-amber-200"
                      : i === 3
                        ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-200"
                        : i === 4
                          ? "bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400 hover:bg-rose-200"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
