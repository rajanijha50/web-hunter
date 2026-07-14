"use client";

import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import {
  LuSparkles,
  LuSearch,
  LuHeart,
  LuCpu,
  LuGlobe,
  LuCircleCheck,
  LuRocket,
  LuTarget,
} from "react-icons/lu";
import Link from "next/link";
import { useUserStore } from "@/store/userStore";

export default function AboutClient() {

  const user = useUserStore((state) => state.user)
  const features = [
    {
      icon: LuGlobe,
      title: "Niche Curation",
      description:
        "Tired of algorithmic feeds? We hunt down hand-crafted, high-utility websites that Google hides on page 10.",
      color: "from-blue-500 to-indigo-500",
    },
    {
      icon: LuCpu,
      title: "AI-Powered Curation",
      description:
        "Our backend utilizes AI to automatically clean and generate new website data.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: LuSearch,
      title: "Instant Shortcut Search",
      description:
        "Press '/' anywhere on the index page to trigger a lightning-fast fuzzy search overlay across names, tags, and content.",
      color: "from-amber-500 to-orange-500",
    },
    {
      icon: LuHeart,
      title: "Optimistic Favorites",
      description:
        "Save tools to your profile instantly. Backed by React Query caching, updating likes is smooth and immediate.",
      color: "from-rose-500 to-red-500",
    },
  ];

  const steps = [
    {
      num: "01",
      title: "Collect & Import",
      description:
        "We fetch spreadsheets or user submissions into the system, checking for broken URLs or error markers automatically.",
    },
    {
      num: "02",
      title: "AI Analysis",
      description:
        "Groq LLMs analyze the submission, stripping common SEO title garbage (like '| Home' or '- Best Free Tool') and generating tags.",
    },
    {
      num: "03",
      title: "Admin Review",
      description:
        "Curators preview the categorized suggestions in a visual dashboard table, tweaking descriptions and approving commits.",
    },
    {
      num: "04",
      title: "Live Database Commit",
      description:
        "Approved items are committed to Mongoose/MongoDB, making them instantly searchable and indexable for all users.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 overflow-hidden flex flex-col items-center justify-center text-center px-4">
        {/* Background Gradient Orbs */}
        <div className="absolute top-10 left-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center justify-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium bg-amber-400/10 text-amber-400 rounded-full border border-amber-400/20 mb-8 z-10">

            <LuRocket className="h-3.5 w-3.5" />
            THE MISSION
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 z-10 max-w-4xl leading-tight">
            Discovery Redefined.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-indigo-500 to-purple-600">
              Escaping the Algorithm.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 z-10 leading-relaxed font-medium">
            Web Hunter is a premium curated directory of high-utility tools,
            niche resources, and outstanding websites. We bypass SEO spam to
            surface authentic utility.
          </p>

          <div className="z-10 flex gap-4">
            <Link
              href={user ? '/' : '/auth'}
              className="hover:scale-105 transition-all duration-300 h-12 px-6 text-sm font-bold rounded-full bg-primary text-primary-foreground hover:bg-primary/95 flex items-center gap-2 shadow-lg shadow-primary/20"
            >
              Start Exploring
            </Link>
            <a
              href="#features"
              className="hover:scale-105 transition-all duration-300 h-12 px-6 text-sm font-bold rounded-full border border-border bg-card hover:bg-muted flex items-center justify-center"
            >
              How It Works
            </a>
          </div>
        </motion.div>
      </section>

      {/* Key Highlights Grid */}
      <section
        id="features"
        className="py-20 px-4 md:px-8 border-t border-border bg-muted/10 relative"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
              Platform Features
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              How Web Hunter solves the directory discovery and curation
              lifecycle.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((f, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                key={idx}
                className="group relative bg-card border border-border/60 hover:border-primary/50 rounded-3xl p-8 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 flex gap-6 cursor-default"
              >
                <div
                  className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-all shadow-md`}
                >
                  <f.icon className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold tracking-tight text-foreground">
                    {f.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {f.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Curation Pipeline */}
      <section className="py-24 px-4 md:px-8 border-t border-border">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
              The AI Curation Pipeline
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              How raw spreadsheet URLs transform into a pristine public index.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connector Line for Desktop */}
            <div className="hidden md:block absolute top-[45px] left-10 right-10 h-0.5 bg-gradient-to-r from-primary/10 via-primary/30 to-purple-600/10 pointer-events-none z-0" />

            {steps.map((s, idx) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                key={idx}
                className="bg-card border rounded-3xl p-6 relative z-10 flex flex-col h-full shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xs font-black tracking-widest text-primary bg-primary/10 px-3 py-1.5 rounded-lg border border-primary/20">
                    STEP {s.num}
                  </span>
                  <LuCircleCheck className="h-5 w-5 text-emerald-500 opacity-60" />
                </div>
                <h3 className="text-lg font-bold tracking-tight text-foreground mb-3">
                  {s.title}
                </h3>
                <p className="text-muted-foreground text-xs leading-relaxed mt-auto">
                  {s.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-4 md:px-8 border-t border-border relative overflow-hidden bg-card text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl md:text-5xl font-black">
            Start hunting today
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
            Register automatically by logging in, start favoriting your top
            choices, and surface premium resources.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href={user ? '/' : '/auth'}
              className="hover:scale-105 transition-all duration-300 h-14 px-8 text-base font-bold rounded-full bg-primary text-primary-foreground hover:bg-primary/95 flex items-center justify-center gap-2 shadow-xl shadow-primary/20"
            >
              Get Started Now
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
