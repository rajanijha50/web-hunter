

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

        
      </section>
    </div>
  );
}
