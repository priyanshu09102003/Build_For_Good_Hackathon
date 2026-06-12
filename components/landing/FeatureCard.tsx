"use client"

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Props {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
  index?: number;
  href?: string;
  cta?: string;
}

export function FeatureCard({ icon: Icon, title, description, gradient, index = 0, href = "/", cta = "Start Learning" }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      className="group glass-panel card-hover relative overflow-hidden p-7 flex flex-col"
    >
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-60"
        style={{ background: gradient }}
      />
      <div
        className="relative mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/10"
        style={{ background: gradient }}
      >
        <Icon className="h-6 w-6 text-white" strokeWidth={1.75} />
      </div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>

      <Link
        href={href}
        className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/80 backdrop-blur-sm transition-all duration-200 hover:border-white/20 hover:bg-white/10 hover:text-white active:scale-95"
      >
        {cta}
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
      </Link>
    </motion.div>
  );
}