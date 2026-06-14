"use client"

import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Target, Zap, TrendingUp, Sparkles, ChevronDown, Hammer, NotebookPen, Brain, StickyNote, Library } from "lucide-react";
import { Spotlight } from "./Spotlight";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const floatingCards = [
  { icon: BookOpen, title: "Smart Notes", sub: "Auto-summarized", x: "left-0 top-4", delay: 0 },
  { icon: Target, title: "Dual Mode", sub: "Tuned for you", x: "right-0 top-24", delay: 0.6 },
  { icon: Zap, title: "AI Assistance", sub: "Instant answers", x: "left-6 bottom-12", delay: 1.2 },
  { icon: TrendingUp, title: "Vocational Training Hub", sub: "+38% this week", x: "right-4 bottom-0", delay: 1.8 },
];

const featureLinks = [
  { icon: NotebookPen, title: "Guided Path", description: "Auto-summarized study material", href: "#smart-notes" },
  { icon: Brain, title: "Express Lane", description: "Learning tuned to your pace", href: "#dual-mode" },
  { icon: Target, title: "Learn In Your Language", description: "Instant answers & explanations", href: "#ai-assistance" },
  { icon: Hammer, title: "Vocational Training Hub", description: "Visualize your growth", href: "#progress" },
  { icon: StickyNote, title: "Smart Notes", description: "Visualize your growth", href: "/notes" },
  { icon: Library, title: "AI-Powered Digital Library", description: "Visualize your growth", href: "#progress" },
];

export function HeroSection() {
  return (
    <section id="home" className="relative pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_1fr]">
          {/* Left */}
          <Spotlight className="rounded-3xl p-2 -m-2" size={520} color="oklch(0.72 0.22 250 / 0.16)">

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur"
            >
              <Sparkles className="h-3.5 w-3.5 text-[oklch(0.82_0.16_200)]" />
              Next-gen AI learning, built for students
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-6 text-balance text-5xl font-semibold leading-[1.02] tracking-tight text-white sm:text-6xl md:text-7xl"
            >
              Learn <span className="text-gradient">Smarter.</span>
              <br />
              Not Harder.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="mt-6 max-w-xl text-lg text-muted-foreground"
            >
              Your AI-powered learning companion.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="mt-3 max-w-xl text-sm text-muted-foreground/80"
            >
              Study faster, understand deeper, and achieve more with intelligent educational tools and vocational trainings
              designed for modern students.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <a
                href="#cta"
                className="btn-primary inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium"
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </a>

              <DropdownMenu>
                <DropdownMenuTrigger>
                  <button className="btn-ghost inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium">
                    Explore Features
                    <ChevronDown className="h-4 w-4 transition-transform duration-200 [data-state=open]:rotate-180" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  sideOffset={8}
                  className="w-64 rounded-xl border border-white/10 bg-[oklch(0.14_0.02_265)] p-1.5 shadow-xl backdrop-blur-xl overflow-auto"
                  side="bottom"
                >
                  <p className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">Explore Features</p>
                  <div className="my-1 h-px bg-white/10" />
                  {featureLinks.map((feature) => (
                    <DropdownMenuItem key={feature.href} className="rounded-lg focus:bg-white/[0.06]">
                      <Link
                        href={feature.href}
                        className="flex cursor-pointer items-center gap-3 px-2 py-2.5"
                      >
                        <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-[oklch(0.72_0.22_250)] to-[oklch(0.62_0.26_305)]">
                          <feature.icon className="h-4 w-4 text-white" strokeWidth={1.8} />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-white">{feature.title}</span>
                          <span className="text-xs text-muted-foreground">{feature.description}</span>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-10 flex items-center gap-3 text-xs text-muted-foreground"
            >
              <div className="flex -space-x-2">
                {[
                  "https://randomuser.me/api/portraits/women/44.jpg",
                  "https://randomuser.me/api/portraits/men/32.jpg",
                  "https://randomuser.me/api/portraits/women/53.jpg",
                  "https://randomuser.me/api/portraits/men/41.jpg",
                ].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt="Student"
                    className="h-7 w-7 rounded-full border border-white/20 object-cover"
                  />
                ))}
              </div>
              Trusted by 50,000+ students across the country
            </motion.div>
          </Spotlight>

          {/* Right - floating cards */}
          <div className="relative hidden h-[520px] lg:block">
            {/* Center orb */}
            <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,oklch(0.72_0.22_250/0.5),transparent_70%)] blur-2xl" />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.01] p-6 backdrop-blur-xl"
            >
              <div className="flex h-full flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="grid h-8 w-8 place-items-center rounded-lg btn-primary">
                      <Sparkles className="h-4 w-4" />
                    </span>
                    <span className="text-sm font-medium text-white">SPECTRUM</span>
                  </div>
                  <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgb(52,211,153)]" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Today's focus</div>
                  <div className="mt-1 text-lg font-semibold text-white">
                    Calculus · Limits & Continuity
                  </div>
                  <div className="mt-4 h-1.5 w-full rounded-full bg-white/10">
                    <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-[oklch(0.82_0.16_200)] to-[oklch(0.62_0.26_305)]" />
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">76% complete</div>
                </div>
              </div>
            </motion.div>

            {floatingCards.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                className={`absolute ${c.x} w-52 rounded-2xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-xl animate-float`}
                style={{ animationDelay: `${c.delay}s` }}
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-[oklch(0.72_0.22_250)] to-[oklch(0.62_0.26_305)]">
                    <c.icon className="h-4.5 w-4.5 text-white" strokeWidth={1.8} />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">{c.title}</div>
                    <div className="text-xs text-muted-foreground">{c.sub}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}