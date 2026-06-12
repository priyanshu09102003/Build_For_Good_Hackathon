"use client";

import { Brain, NotebookPen, Target, BarChart3, Hammer, StickyNote, Library } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { FeatureCard } from "./FeatureCard";

const features = [

  {
    icon: NotebookPen,
    title: "Guided Path",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore repellendus eum rem, est sunt, assumenda corporis dolorem beatae quibusdam nihil explicabo consectetur sint quaerat quae placeat iure. Delectus, suscipit quos!",
    gradient: "linear-gradient(135deg, oklch(0.82 0.16 200), oklch(0.72 0.22 250))",
    href: "/",
    cta: "Start Learning"
  },
  {
    icon: Brain,
    title: "Express Lane",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore repellendus eum rem, est sunt, assumenda corporis dolorem beatae quibusdam nihil explicabo consectetur sint quaerat quae placeat iure. Delectus, suscipit quos!",
    gradient: "linear-gradient(135deg, oklch(0.72 0.22 250), oklch(0.62 0.24 275))",
    href: "/",
    cta: "Start Learning"
  },
  {
    icon: Target,
    title: "Learn In Your Language",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore repellendus eum rem, est sunt, assumenda corporis dolorem beatae quibusdam nihil explicabo consectetur sint quaerat quae placeat iure. Delectus, suscipit quos!",
    gradient: "linear-gradient(135deg, oklch(0.62 0.26 305), oklch(0.62 0.24 275))",
    href: "/",
    cta: "Start Learning"
  },
  {
    icon: Hammer,
    title: "Vocational Training Hub",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore repellendus eum rem, est sunt, assumenda corporis dolorem beatae quibusdam nihil explicabo consectetur sint quaerat quae placeat iure. Delectus, suscipit quos!",
    gradient: "linear-gradient(135deg, oklch(0.7 0.2 200), oklch(0.62 0.26 305))",
    href: "/",
    cta: "View Documentation"
  },

  {
    icon: StickyNote,
    title: "Smart Notes",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore repellendus eum rem, est sunt, assumenda corporis dolorem beatae quibusdam nihil explicabo consectetur sint quaerat quae placeat iure. Delectus, suscipit quos!",
    gradient: "linear-gradient(135deg, oklch(0.7 0.2 200), oklch(0.62 0.26 305))",
    href: "/",
    cta: "Prepare Notes"
  },

  {
    icon: Library,
    title: "AI-Powered Digital Library",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore repellendus eum rem, est sunt, assumenda corporis dolorem beatae quibusdam nihil explicabo consectetur sint quaerat quae placeat iure. Delectus, suscipit quos!",
    gradient: "linear-gradient(135deg, oklch(0.7 0.2 200), oklch(0.62 0.26 305))",
    href: "/",
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