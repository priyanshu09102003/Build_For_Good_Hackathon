import { Sparkles } from "lucide-react";
import { NeuralWordmark } from "./NeuralWordmark";

const cols = [
  {
    title: "Product",
    links: ["Features", "Learning Tools", "Analytics"],
  },
  {
    title: "Resources",
    links: ["Documentation", "Guides", "FAQs"],
  },
  {
    title: "Company",
    links: ["About", "Contact", "Privacy"],
  },
];

export function Footer() {
  return (
    <footer id="contact" className="relative border-t border-white/10 pt-16 pb-10">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <a href="#home" className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg btn-primary">
                <Sparkles className="h-4 w-4" strokeWidth={2.2} />
              </span>
              <span className="font-display text-base font-semibold tracking-tight text-white">
                SPEC<span className="text-gradient">TRUM</span>
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              The AI learning ecosystem helping students think clearer, study smarter, and grow
              faster.
            </p>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <div className="text-sm font-semibold text-white">{c.title}</div>
              <ul className="mt-4 space-y-3">
                {c.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-white"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <NeuralWordmark text="SPECTRUM" />


        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-muted-foreground sm:flex-row">
          <div>© 2026 SPECTRUM. Made In India. All Rights Reserved</div>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
