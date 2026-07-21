"use client";

import Link from "next/link";
import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { LuSearch, LuMap, LuHouse, LuSpace } from "react-icons/lu";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20">
      <Header />

      <main className="flex-grow flex flex-col items-center justify-center relative px-4 py-20 overflow-hidden">
        {/* Background Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center text-center z-10"
        >
          <h1 className="text-7xl md:text-[10rem] font-black mb-4 leading-none text-muted-foreground dark:text-foreground">
            4<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-indigo-500 to-purple-600">0</span>4
          </h1>
          
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-muted-foreground dark:text-foreground">
            Page Not Found
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed font-medium">
            Oops! It seems you've ventured into uncharted territory. The page you're looking for has been moved, deleted, or possibly never existed.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/">
              <Button size="lg" className="rounded-full shadow-lg shadow-primary/20 flex gap-2 font-bold w-full sm:w-auto h-12 px-8">
                <LuHouse className="h-5 w-5" />
                Return Home
              </Button>
            </Link>
            
            <Link href="/about">
              <Button size="lg" variant="outline" className="rounded-full flex gap-2 font-bold w-full sm:w-auto h-12 px-8">
                <LuSearch className="h-5 w-5" />
                About Web Hunter
              </Button>
            </Link>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
