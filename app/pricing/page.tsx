import { TopNav } from "@/components/layout/top-nav";
import { Button } from "@/components/ui/button";
import { Check, Info } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <main className="container mx-auto px-4 md:px-8 py-16 max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Unlock the full <br/>
            <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-400">internet.</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Choose a plan that fits your curiosity. From solo explorers to professional hunting teams.
          </p>
          
          <div className="inline-flex items-center rounded-full border p-1 bg-muted/50">
            <button className="px-6 py-2 rounded-full bg-background shadow-sm text-sm font-medium">Monthly</button>
            <button className="px-6 py-2 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground transition-colors overflow-hidden relative">
              Annual
              <span className="ml-2 inline-block px-2 py-0.5 rounded-full bg-[#fef3c7] text-[#b45309] text-[10px] uppercase font-bold tracking-wider">Save 40%</span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-24">
          {/* Free Tier */}
          <div className="rounded-2xl border bg-card p-8 flex flex-col hover:shadow-lg transition-shadow">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">Explorer</span>
              <h3 className="text-2xl font-bold mb-2">Free</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-5xl font-extrabold tracking-tighter">$0</span>
                <span className="text-muted-foreground">/mo</span>
              </div>
            </div>
            
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-start gap-3 text-sm">
                <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>Basic web discovery</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>3 Curated collections</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>Community support</span>
              </li>
            </ul>
            
            <Button variant="outline" className="w-full h-12 rounded-xl">Current Plan</Button>
          </div>

          {/* Pro Tier */}
          <div className="rounded-2xl border-2 border-primary bg-card p-8 flex flex-col relative shadow-xl transform md:-translate-y-4">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <span className="bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">Most Popular</span>
            </div>
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-primary mb-2 block">Pro Hunter</span>
              <h3 className="text-2xl font-bold mb-2">Advanced</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-5xl font-extrabold tracking-tighter text-primary">$9</span>
                <span className="text-muted-foreground">/mo</span>
              </div>
            </div>
            
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-start gap-3 text-sm font-medium">
                <div className="mt-0.5 rounded-full bg-primary/20 p-0.5 text-primary"><Check className="h-3 w-3" /></div>
                <span>Unlimited collections</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>Advanced AI filtering</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>Early access to new lenses</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>API Access (1k req/mo)</span>
              </li>
            </ul>
            
            <Button className="w-full h-12 rounded-xl text-md">Upgrade to Pro</Button>
          </div>

          {/* Enterprise Tier */}
          <div className="rounded-2xl border bg-foreground text-background p-8 flex flex-col hover:shadow-lg transition-shadow">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-muted mb-2 block">Enterprise</span>
              <h3 className="text-2xl font-bold mb-2">Team</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-5xl font-extrabold tracking-tighter">$29</span>
                <span className="text-muted">/mo</span>
              </div>
            </div>
            
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-start gap-3 text-sm">
                <Check className="h-4 w-4 text-[#fbbf24] shrink-0 mt-0.5" />
                <span>Up to 10 members</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Check className="h-4 w-4 text-[#fbbf24] shrink-0 mt-0.5" />
                <span>Shared library sync</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Check className="h-4 w-4 text-[#fbbf24] shrink-0 mt-0.5" />
                <span>SSO & Admin controls</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Check className="h-4 w-4 text-[#fbbf24] shrink-0 mt-0.5" />
                <span>Priority 24/7 support</span>
              </li>
            </ul>
            
            <Button variant="outline" className="w-full h-12 rounded-xl bg-background text-foreground hover:bg-muted">Contact Sales</Button>
          </div>
        </div>

        <div className="rounded-3xl bg-foreground text-background p-12 text-center max-w-4xl mx-auto flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold mb-4">Not sure? Start free.</h2>
          <p className="text-muted mb-8 max-w-xl">
            Explore the basic features and see why thousands of curators trust Web Hunter. Upgrade whenever you're ready for more.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="h-12 px-8 rounded-xl bg-primary hover:bg-primary/90 text-white font-medium text-base">Create Free Account</Button>
            <Button variant="outline" className="h-12 px-8 rounded-xl bg-transparent border-border/20 text-background hover:bg-white/10 font-medium text-base">View Demo</Button>
          </div>
        </div>
      </main>
    </div>
  );
}
