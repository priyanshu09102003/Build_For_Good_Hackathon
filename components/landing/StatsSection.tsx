"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Spotlight } from "./Spotlight";

const stats = [
  { value: "50K+", label: "Impacted Students" },
  { value: "20+", label: "Vocational Documentations" },
  { value: "95%", label: "Success Rate" },
  { value: "24/7", label: "AI Assistance" },
];

function parseValue(val: string) {
  const match = val.match(/^(\d+(?:\.\d+)?)(K|M)?(\+|%|\/7)?$/);
  if (!match) return null;
  const num = parseFloat(match[1]);
  const multiplier = match[2] === "M" ? "M" : match[2] === "K" ? "K" : "";
  const suffix = match[3] ?? "";
  return { num, multiplier, suffix };
}

function useCountUp(target: number, duration = 1800, inView: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) {
      setCount(0); // reset when scrolled away
      return;
    }
    let start: number | null = null;
    let raf: number;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
      else setCount(target);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf); // cleanup if inView flips mid-animation
  }, [inView, target, duration]);

  return count;
}

function AnimatedStat({ value, label, delay }: { value: string; label: string; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-80px" }); // once: false
  const parsed = parseValue(value);
  const count = useCountUp(parsed ? parsed.num : 0, 1800, inView);

  const display = parsed
    ? `${count}${parsed.multiplier}${parsed.suffix}`
    : value;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-80px" }} // once: false
      transition={{ duration: 0.5, delay }}
      className="bg-[#070708]"
    >
      <Spotlight className="px-6 py-10 text-center h-full" size={300} color="oklch(0.62 0.26 305 / 0.18)">
        <div className="text-4xl font-semibold tracking-tight text-gradient sm:text-5xl">
          {display}
        </div>
        <div className="mt-2 text-sm text-muted-foreground">{label}</div>
      </Spotlight>
    </motion.div>
  );
}

export function StatsSection() {
  return (
    <section className="relative py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="glass-panel grid grid-cols-2 gap-px overflow-hidden bg-white/[0.04] md:grid-cols-4">
          {stats.map((s, i) => (
            <AnimatedStat key={s.label} value={s.value} label={s.label} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}