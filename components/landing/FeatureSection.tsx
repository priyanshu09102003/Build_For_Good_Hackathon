"use client";

import { Brain, NotebookPen, Target, BarChart3, Hammer, StickyNote, Library } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { FeatureCard } from "./FeatureCard";

const features = [

  {
    icon: NotebookPen,
    title: "Guided Path",
    description:
      "A structured learning management system built for classroom environment. Teachers assign, track, and grade, while students follow a clear path from lesson to mastery without the chaos of scattered tools.",
    gradient: "linear-gradient(135deg, oklch(0.82 0.16 200), oklch(0.72 0.22 250))",
    href: "https://spectrum-guided.vercel.app/",
    cta: "Start Learning"
  },
  {
    icon: Brain,
    title: "Express Lane",
    description:
      "Tell it what you want to learn and Express Lane generates a full course around your pace and goals — no more sifting through hours of content that doesn't fit how you actually learn.",
    gradient: "linear-gradient(135deg, oklch(0.72 0.22 250), oklch(0.62 0.24 275))",
    href: "https://express-lane-rosy.vercel.app/",
    cta: "Start Learning"
  },
  {
    icon: Target,
    title: "Vidya Vaani - Learn in your language",
    description:
      "Education shouldn't stop at a language barrier. Vidya Vaani delivers lessons and explanations in your own language, so understanding comes first and translation never gets in the way.",
    gradient: "linear-gradient(135deg, oklch(0.62 0.26 305), oklch(0.62 0.24 275))",
    href: "https://vidya-vaani-nine.vercel.app/",
    cta: "Start Learning"
  },
{
    icon: Hammer,
    title: "Vocational Training Hub",
    description:
      "A complete guide to mastering a trade skill — AI-generated roadmaps, an inbuilt tutor to answer questions along the way, and structured documentation covering everything you need from start to finish.",
    gradient: "linear-gradient(135deg, oklch(0.7 0.2 200), oklch(0.62 0.26 305))",
    href: "https://spectrum-ai-vocational-documentatio.vercel.app/",
    cta: "View Documentation"
  },

  {
    icon: StickyNote,
    title: "Smart Notes",
    description:
      "Upload a PDF or text file, or just type a topic, and Smart Notes generates clear, diagram-rich notes you can download as a polished PDF — built for fast revision and better retention.",
    gradient: "linear-gradient(135deg, oklch(0.7 0.2 200), oklch(0.62 0.26 305))",
    href: "/notes",
    cta: "Prepare Notes"
  },

  {
    icon: Library,
    title: "AI-Powered Digital Library",
    description:
      "A growing library of audiobooks narrated for learning on the go — listen while you commute, walk, or unwind, and turn dead time into time well spent.",
    gradient: "linear-gradient(135deg, oklch(0.7 0.2 200), oklch(0.62 0.26 305))",
    href: "https://ai-digital-library-bice.vercel.app/",
    cta: "Explore"
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Features"
          title="Everything You Need To Learn Better"
          subtitle="Powerful tools designed to simplify learning and maximize student success."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {features.map((f, i) => (
            <FeatureCard key={f.title} {...f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}