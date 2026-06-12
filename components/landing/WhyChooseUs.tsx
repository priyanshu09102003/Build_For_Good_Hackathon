"use client";

import { motion } from "framer-motion";
import { Check, BookOpen, Sparkles, TrendingUp } from "lucide-react";
import { Spotlight } from "./Spotlight";

const bullets = [
  "Personalized Learning",
  "AI-Powered Assistance",
  "Dual-Mode Approach",
  "Vocational Training",
  "Personalized Roadmaps",
  "Native Language Support",
];

export function WhyChooseUs() {
  return (
    <section id="why" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* Left visual stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="relative h-[460px]"
          >
            <div className="absolute -inset-10 bg-[radial-gradient(circle_at_center,oklch(0.62_0.24_275/0.35),transparent_70%)] blur-3xl" />

            <div className="glass-panel absolute left-0 top-4 w-72 p-5 animate-float">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-[oklch(0.82_0.16_200)] to-[oklch(0.72_0.22_250)]">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-sm font-medium text-white">Today's Recap</div>
                  <div className="text-xs text-muted-foreground">12 concepts mastered</div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {[0.4, 0.7, 1, 0.6, 0.85, 0.5].map((h, i) => (
                  <div
                    key={i}
                    className="h-14 rounded-md bg-gradient-to-t from-white/5 to-[oklch(0.72_0.22_250/0.4)]"
                    style={{ opacity: h }}
                  />
                ))}
              </div>
            </div>

            <div className="glass-panel absolute right-0 top-32 w-72 p-5 animate-float-slow">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-[oklch(0.62_0.26_305)] to-[oklch(0.62_0.24_275)]">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-sm font-medium text-white">AI Suggestion</div>
                  <div className="text-xs text-muted-foreground">Next best topic</div>
                </div>
              </div>
              <p className="mt-3 text-sm text-white/80">
                "Review derivatives before tomorrow's quiz — you're 92% ready."
              </p>
            </div>

            <div className="glass-panel absolute bottom-0 left-10 w-80 p-5 animate-float" style={{ animationDelay: "1.2s" }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-[oklch(0.7_0.2_200)] to-[oklch(0.62_0.26_305)]">
                    <TrendingUp className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">Weekly Progress</div>
                    <div className="text-xs text-muted-foreground">+38% retention</div>
                  </div>
                </div>
                <div className="text-gradient text-2xl font-semibold">A+</div>
              </div>
              <div className="mt-4 h-1.5 w-full rounded-full bg-white/10">
                <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-[oklch(0.82_0.16_200)] to-[oklch(0.62_0.26_305)]" />
              </div>
            </div>
          </motion.div>

          {/* Right content */}
          <Spotlight className="rounded-3xl p-2 -m-2" size={460} color="oklch(0.62 0.26 305 / 0.16)">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.72_0.22_250)] shadow-[0_0_12px_oklch(0.72_0.22_250)]" />
              Why Us
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55 }}
              className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl"
            >
              Education Should Be <span className="text-gradient">Effortless</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="mt-4 text-base text-muted-foreground sm:text-lg"
            >
              We believe learning should be accessible, personalized, and engaging. Our platform
              removes complexity and helps students focus on what truly matters — understanding and
              growth.
            </motion.p>

            <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {bullets.map((b, i) => (
                <motion.li
                  key={b}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3"
                >
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-[oklch(0.72_0.22_250)] to-[oklch(0.62_0.26_305)]">
                    <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                  </span>
                  <span className="text-sm text-white">{b}</span>
                </motion.li>
              ))}
            </ul>
          </Spotlight>
        </div>
      </div>
    </section>
  );
}
