"use client";
import { useWebsiteStore } from "@/store/websiteStore";
import { useEffect, useState } from "react";
import { WebsiteType } from "@/types/website";
import { ToolCard } from "@/features/discover/tool-card";
import Link from "next/link";
import { Button } from "../ui/button";
import { LuArrowRight } from "react-icons/lu";

export default function Trending() {
  const websites = useWebsiteStore((state) => state.websites);

  const [trendingWebsites, setTrendingWebsites] = useState<WebsiteType[]>([]);
  const [count, setCount] = useState(0);
  const [targetCount, setTargetCount] = useState(0);

  useEffect(() => {
    if (websites.length > 0) {
      console.log("length: ", websites.length)
      const sorted = [...websites].sort((a, b) => b.likesCount - a.likesCount);
      setTrendingWebsites(sorted.slice(0, 10));
      setTargetCount(Math.floor(websites.length / 100) * 100);
    }
  }, [websites]);

  useEffect(() => {
    if(targetCount === 0) return;
    let startTimestamp: number | null = null;
    const duration = 2500; // 2 seconds animation 
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * targetCount));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [targetCount]);

  return (
    <>
      {/* Trending Now Marquee Banner */}
      {trendingWebsites.length > 0 && (
        <section className="animate-fade-in py-12 bg-background overflow-hidden border-t">
          <div className="mb-8 px-4 md:px-8 flex flex-col justify-center items-center gap-4">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-center ">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-primary to-amber-400">
                Trending Now
              </span>
            </h2>
            <span className="mx-auto text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-primary to-amber-400">
              {count}+ websites and counting
            </span>
          </div> 

          <div
            className="group relative w-full"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
            }}
          >
            <div className="flex gap-6 w-max animate-marquee group-hover:[animation-play-state:paused]">
              {/* First set */}
              {trendingWebsites.map((website) => (
                <div key={website._id} className="shrink-0">
                  <ToolCard tool={website} />
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {trendingWebsites.map((website) => (
                <div key={`dup-${website._id}`} className="shrink-0">
                  <ToolCard tool={website} />
                </div>
              ))}
            </div>
          </div>

          <div className="mx-auto mt-10 flex justify-center items-center ">
            <Link
              href="/auth"
              className="hover:scale-105 transition-all duration-300 h-14 px-8 text-lg font-semibold rounded-full bg-primary text-background dark:bg-foreground dark:text-primary hover:bg-primary/90 dark:hover:bg-foreground/90 flex items-center gap-2"
            >
              Explore More For Free <LuArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
