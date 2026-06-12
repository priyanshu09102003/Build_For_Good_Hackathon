"use client"

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Spotlight } from "./Spotlight";

export function CTASection() {
  return (
    <section id="cta" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.01] p-10 text-center backdrop-blur-xl sm:p-16"
        >
          <div className="absolute -top-32 left-1/2 h-72 w-[600px] -translate-x-1/2 rounded-full bg-[oklch(0.62_0.24_275/0.55)] blur-3xl" />
          <div className="absolute -bottom-32 left-1/4 h-64 w-[500px] rounded-full bg-[oklch(0.82_0.16_200/0.35)] blur-3xl" />
          <div className="absolute -bottom-32 right-0 h-64 w-[500px] rounded-full bg-[oklch(0.62_0.26_305/0.45)] blur-3xl" />

          <Spotlight className="relative rounded-3xl" size={520} color="oklch(0.82 0.16 200 / 0.18)">
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
              Ready To <span className="text-gradient">Transform</span> The Way You Learn?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
              Join thousands of students using AI to study smarter and learn faster.
            </p>
            <div className="mt-9 flex justify-center">
              <a
                href="#"
                className="btn-primary inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-medium"
              >
                Start Your Learning Journey
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </Spotlight>
        </motion.div>
      </div>
    </section>
  );
}
