"use client"

import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";

const nav = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "Why Us", href: "#why" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-[#050505]/70 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#home" className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg btn-primary">
            <Sparkles className="h-4 w-4" strokeWidth={2.2} />
          </span>
          <span className="font-display text-base font-semibold tracking-tight text-white">
            SPEC<span className="text-gradient">TRUM</span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-white"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#cta"
          className="btn-primary inline-flex items-center rounded-lg px-4 py-2 text-sm font-medium"
        >
          Start Learning
        </a>
      </nav>
    </header>
  );
}
