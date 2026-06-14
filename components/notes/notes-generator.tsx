"use client"

import { useEffect, useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Sparkles,
  FileText,
  PencilLine,
  Loader2,
  Download,
  Upload,
  BookOpenCheck,
  RefreshCw,
} from "lucide-react";
import { Notes } from "@/app/api/notes/route";
import { Button } from "../ui/button";

type Mode = "topic" | "pdf";

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(",")[1] ?? "");
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

const PALETTE = [
  "var(--gradient-hero)",
  "var(--gradient-accent)",
];

const PDF_COLORS = {
  ink: [23, 23, 23] as const,
  muted: [88, 88, 88] as const,
  teal: [0, 150, 120] as const,
  coral: [220, 92, 92] as const,
  amberFill: [255, 248, 226] as const,
  amberBorder: [245, 190, 92] as const,
  paperLine: [220, 220, 220] as const,
};

function safeFileName(name: string) {
  return name.replace(/[^a-z0-9-_ ]/gi, "").trim() || "exam-notes";
}

// ─── Universal PDF sanitizer ───────────────────────────────────────────────────
// Converts all non-ASCII characters jsPDF/Helvetica can't render into
// readable ASCII equivalents. Covers: subscripts, superscripts, Greek letters,
// math operators, arrows, currencies, accented Latin, and typographic symbols.

function sanitizeForPdf(text: string): string {
  return text
    // ── Subscripts ──────────────────────────────────────────────────────────
    .replace(/₀/g, "0").replace(/₁/g, "1").replace(/₂/g, "2")
    .replace(/₃/g, "3").replace(/₄/g, "4").replace(/₅/g, "5")
    .replace(/₆/g, "6").replace(/₇/g, "7").replace(/₈/g, "8")
    .replace(/₉/g, "9").replace(/ₐ/g, "a").replace(/ₑ/g, "e")
    .replace(/ₒ/g, "o").replace(/ₙ/g, "n").replace(/ₖ/g, "k")

    // ── Superscripts ─────────────────────────────────────────────────────────
    .replace(/⁰/g, "0").replace(/¹/g, "1").replace(/²/g, "2")
    .replace(/³/g, "3").replace(/⁴/g, "4").replace(/⁵/g, "5")
    .replace(/⁶/g, "6").replace(/⁷/g, "7").replace(/⁸/g, "8")
    .replace(/⁹/g, "9").replace(/ⁿ/g, "n").replace(/⁺/g, "+")
    .replace(/⁻/g, "-")

    // ── Greek letters (lowercase) ────────────────────────────────────────────
    .replace(/α/g, "alpha").replace(/β/g, "beta").replace(/γ/g, "gamma")
    .replace(/δ/g, "delta").replace(/ε/g, "epsilon").replace(/ζ/g, "zeta")
    .replace(/η/g, "eta").replace(/θ/g, "theta").replace(/ι/g, "iota")
    .replace(/κ/g, "kappa").replace(/λ/g, "lambda").replace(/μ/g, "mu")
    .replace(/ν/g, "nu").replace(/ξ/g, "xi").replace(/π/g, "pi")
    .replace(/ρ/g, "rho").replace(/σ/g, "sigma").replace(/τ/g, "tau")
    .replace(/υ/g, "upsilon").replace(/φ/g, "phi").replace(/χ/g, "chi")
    .replace(/ψ/g, "psi").replace(/ω/g, "omega")

    // ── Greek letters (uppercase) ────────────────────────────────────────────
    .replace(/Α/g, "Alpha").replace(/Β/g, "Beta").replace(/Γ/g, "Gamma")
    .replace(/Δ/g, "Delta").replace(/Ε/g, "Epsilon").replace(/Ζ/g, "Zeta")
    .replace(/Η/g, "Eta").replace(/Θ/g, "Theta").replace(/Ι/g, "Iota")
    .replace(/Κ/g, "Kappa").replace(/Λ/g, "Lambda").replace(/Μ/g, "Mu")
    .replace(/Ν/g, "Nu").replace(/Ξ/g, "Xi").replace(/Π/g, "Pi")
    .replace(/Ρ/g, "Rho").replace(/Σ/g, "Sigma").replace(/Τ/g, "Tau")
    .replace(/Υ/g, "Upsilon").replace(/Φ/g, "Phi").replace(/Χ/g, "Chi")
    .replace(/Ψ/g, "Psi").replace(/Ω/g, "Omega")

    // ── Arrows ───────────────────────────────────────────────────────────────
    .replace(/→/g, "->").replace(/←/g, "<-").replace(/↔/g, "<->")
    .replace(/⇒/g, "=>").replace(/⇐/g, "<=").replace(/⇔/g, "<=>")
    .replace(/⇌/g, "<->").replace(/↑/g, "(up)").replace(/↓/g, "(down)")
    .replace(/↗/g, "->").replace(/↘/g, "->").replace(/⟶/g, "->")
    .replace(/⟵/g, "<-").replace(/⟷/g, "<->")

    // ── Math operators & symbols ─────────────────────────────────────────────
    .replace(/×/g, "x").replace(/÷/g, "/").replace(/±/g, "+/-")
    .replace(/∓/g, "-/+").replace(/≈/g, "~=").replace(/≠/g, "!=")
    .replace(/≤/g, "<=").replace(/≥/g, ">=").replace(/≡/g, "===")
    .replace(/∝/g, "proportional to").replace(/∞/g, "infinity")
    .replace(/√/g, "sqrt").replace(/∛/g, "cbrt").replace(/∑/g, "sum")
    .replace(/∏/g, "product").replace(/∫/g, "integral")
    .replace(/∂/g, "d").replace(/∇/g, "nabla").replace(/∆/g, "Delta")
    .replace(/∈/g, "in").replace(/∉/g, "not in").replace(/⊂/g, "subset of")
    .replace(/⊃/g, "superset of").replace(/∪/g, "union").replace(/∩/g, "intersection")
    .replace(/∅/g, "{}").replace(/∀/g, "for all").replace(/∃/g, "there exists")
    .replace(/¬/g, "not").replace(/∧/g, "AND").replace(/∨/g, "OR")
    .replace(/⊕/g, "XOR").replace(/∴/g, "therefore").replace(/∵/g, "because")
    .replace(/°/g, " deg").replace(/′/g, "'").replace(/″/g, '"')
    .replace(/½/g, "1/2").replace(/¼/g, "1/4").replace(/¾/g, "3/4")
    .replace(/⅓/g, "1/3").replace(/⅔/g, "2/3")

    // ── Currency ─────────────────────────────────────────────────────────────
    .replace(/€/g, "EUR").replace(/£/g, "GBP").replace(/¥/g, "JPY")
    .replace(/₹/g, "INR").replace(/₿/g, "BTC").replace(/¢/g, "cents")

    // ── Typography / punctuation ─────────────────────────────────────────────
    .replace(/\u201C/g, '"').replace(/\u201D/g, '"') // " "
    .replace(/\u2018/g, "'").replace(/\u2019/g, "'") // ' '
    .replace(/…/g, "...").replace(/–/g, "-").replace(/—/g, "--")
    .replace(/•/g, "*").replace(/·/g, ".")
    .replace(/©/g, "(c)").replace(/®/g, "(R)").replace(/™/g, "(TM)")
    .replace(/§/g, "S.").replace(/¶/g, "P.").replace(/†/g, "+")
    .replace(/‡/g, "++")

    // ── Accented / Latin extended ─────────────────────────────────────────────
    .replace(/[àáâãäå]/g, "a").replace(/[èéêë]/g, "e")
    .replace(/[ìíîï]/g, "i").replace(/[òóôõö]/g, "o")
    .replace(/[ùúûü]/g, "u").replace(/[ýÿ]/g, "y")
    .replace(/[ÀÁÂÃÄÅ]/g, "A").replace(/[ÈÉÊË]/g, "E")
    .replace(/[ÌÍÎÏ]/g, "I").replace(/[ÒÓÔÕÖ]/g, "O")
    .replace(/[ÙÚÛÜ]/g, "U").replace(/[Ý]/g, "Y")
    .replace(/ñ/g, "n").replace(/Ñ/g, "N").replace(/ç/g, "c")
    .replace(/Ç/g, "C").replace(/ß/g, "ss").replace(/æ/g, "ae")
    .replace(/Æ/g, "AE").replace(/œ/g, "oe").replace(/Œ/g, "OE")
    .replace(/ø/g, "o").replace(/Ø/g, "O")

    // ── Fallback: drop anything still non-ASCII ───────────────────────────────
    .replace(/[^\x00-\x7F]/g, "?");
}

// ─────────────────────────────────────────────────────────────────────────────

async function imageToDataUrl(src: string) {
  if (src.startsWith("data:")) return src;
  const response = await fetch(src);
  const blob = await response.blob();
  return await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

// ─── API helpers ──────────────────────────────────────────────────────────────

async function apiGenerateNotes(payload: object): Promise<Notes> {
  const res = await fetch("/api/notes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json?.error || "Failed to generate notes.");
  return json as Notes;
}

async function apiGenerateDiagram(payload: { prompt: string; caption?: string }): Promise<{ image: string }> {
  const res = await fetch("/api/notes?action=diagram", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json?.error || "Failed to generate diagram.");
  return { image: `data:${json.mimeType};base64,${json.data}` };
}

// ─── DiagramCard ──────────────────────────────────────────────────────────────

function DiagramCard({ prompt, caption, onImage }: { prompt: string; caption: string; onImage?: (image: string) => void }) {
  const [img, setImg] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const started = useRef(false);

  const load = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await apiGenerateDiagram({ prompt, caption });
      setImg(res.image);
      onImage?.(res.image);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <figure className="mt-5 overflow-hidden rounded-xl border border-border bg-white">
      {loading && (
        <div className="flex h-64 flex-col items-center justify-center gap-3 bg-neutral-100 text-neutral-500">
          {/* ↑ was bg-secondary text-muted-foreground — now a lighter, more distinct grey */}
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <span className="text-sm">Sketching diagram…</span>
        </div>
      )}
      {!loading && error && (
        <div className="flex h-48 flex-col items-center justify-center gap-3 bg-neutral-100 text-neutral-500">
          <span className="text-sm">Couldn't draw this one.</span>
          <Button size="sm" variant="secondary" onClick={load}>
            <RefreshCw className="h-4 w-4" /> Retry
          </Button>
        </div>
      )}
      {!loading && img && (
        <img src={img} alt={caption} className="w-full object-cover" crossOrigin="anonymous" />
      )}
      {caption && (
        <figcaption className="bg-neutral-100 px-4 py-2 text-center text-sm italic text-neutral-600 border-t border-neutral-200">
          {/* ↑ was bg-card text-muted-foreground — now visually distinct from the placeholder */}
          <span className="not-italic font-semibold text-neutral-500">Fig: </span>{caption}
        </figcaption>
      )}
    </figure>
  );
}



export function NotesGenerator() {
  const [mode, setMode] = useState<Mode>("topic");
  const [topic, setTopic] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [notes, setNotes] = useState<Notes | null>(null);
  const [diagramImages, setDiagramImages] = useState<Record<number, string>>({});

  const handleGenerate = async () => {
    if (mode === "topic" && !topic.trim()) {
      toast.error("Describe a topic or paste your syllabus first.");
      return;
    }
    if (mode === "pdf" && !file) {
      toast.error("Upload a PDF first.");
      return;
    }
    setLoading(true);
    setNotes(null);
    setDiagramImages({});
    try {
      let payload: any = { mode };
      if (mode === "topic") payload.text = topic.trim();
      else {
        const b64 = await fileToBase64(file!);
        payload.pdfBase64 = b64;
        payload.fileName = file!.name;
      }
      const result = await apiGenerateNotes(payload);
      setNotes(result);
      toast.success("Your exam notes are ready!");
    } catch (e: any) {
      toast.error(e?.message || "Failed to generate notes.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!notes) return;
    setDownloading(true);
    try {
      const { jsPDF } = await import("jspdf");
      const pdf = new jsPDF({ orientation: "p", unit: "mm", format: "a4" });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const margin = 16;
      const usableW = pageW - margin * 2;
      let y = 20;

      const pageBreak = (needed = 14) => {
        if (y + needed > pageH - margin) {
          pdf.addPage();
          y = 20;
        }
      };

      // writeText sanitizes automatically — every pdf.text() call goes through here
      const writeText = (text: string, x: number, width: number, lineHeight = 6, after = 3) => {
        const lines = pdf.splitTextToSize(sanitizeForPdf(text), width) as string[];
        pageBreak(lines.length * lineHeight + after);
        pdf.text(lines, x, y);
        y += lines.length * lineHeight + after;
      };

      pdf.setFillColor(255, 255, 255);
      pdf.rect(0, 0, pageW, pageH, "F");
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(11);
      pdf.setTextColor(...PDF_COLORS.teal);
      pdf.text(sanitizeForPdf(notes.subject.toUpperCase()), margin, y);
      y += 12;
      pdf.setFont("helvetica", "bolditalic");
      pdf.setFontSize(24);
      pdf.setTextColor(...PDF_COLORS.ink);
      writeText(notes.title, margin, usableW, 10, 2);
      pdf.setDrawColor(...PDF_COLORS.paperLine);
      pdf.setLineDashPattern([2, 2], 0);
      pdf.line(margin, y, pageW - margin, y);
      pdf.setLineDashPattern([], 0);
      y += 12;

      for (const [i, section] of notes.sections.entries()) {
        pageBreak(24);
        if (i % 2 === 0) pdf.setFillColor(...PDF_COLORS.teal);
        else pdf.setFillColor(...PDF_COLORS.coral);
        pdf.roundedRect(margin, y - 6, 9, 9, 2, 2, "F");
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(11);
        pdf.setTextColor(255, 255, 255);
        pdf.text(String(i + 1), margin + 4.5, y, { align: "center" });

        pdf.setTextColor(...PDF_COLORS.ink);
        pdf.setFontSize(17);
        writeText(section.heading, margin + 13, usableW - 13, 7, 1);

        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(12);
        pdf.setTextColor(...PDF_COLORS.muted);
        writeText(section.summary, margin, usableW, 6, 3);

        pdf.setTextColor(...PDF_COLORS.ink);
        pdf.setFontSize(11);
        for (const point of section.points) {
          // sanitizeForPdf applied here since splitTextToSize bypasses writeText
          const lines = pdf.splitTextToSize(sanitizeForPdf(point), usableW - 8) as string[];
          pageBreak(lines.length * 5.5 + 2);
          pdf.setFillColor(...PDF_COLORS.teal);
          pdf.circle(margin + 1.5, y - 1.5, 0.9, "F");
          pdf.text(lines, margin + 6, y);
          y += lines.length * 5.5 + 2;
        }

        if (section.keyTerms.length > 0) {
          y += 2;
          // sanitizeForPdf applied here since splitTextToSize bypasses writeText
          const keyLines = section.keyTerms.flatMap((term) =>
            pdf.splitTextToSize(
              sanitizeForPdf(`${term.term}: ${term.definition}`),
              usableW - 10,
            ) as string[],
          );
          const boxH = keyLines.length * 5.2 + 14;
          pageBreak(boxH + 4);
          pdf.setFillColor(...PDF_COLORS.amberFill);
          pdf.setDrawColor(...PDF_COLORS.amberBorder);
          pdf.roundedRect(margin, y, usableW, boxH, 3, 3, "FD");
          y += 7;
          pdf.setFont("helvetica", "bolditalic");
          pdf.setFontSize(13);
          pdf.setTextColor(165, 95, 15);
          pdf.text("Key terms", margin + 5, y);
          y += 7;
          pdf.setFont("helvetica", "normal");
          pdf.setFontSize(10);
          pdf.setTextColor(...PDF_COLORS.ink);
          for (const line of keyLines) {
            pdf.text(line, margin + 5, y);
            y += 5.2;
          }
          y += 5;
        }

        const diagramSrc = diagramImages[i];
        if (diagramSrc) {
          try {
            const dataUrl = await imageToDataUrl(diagramSrc);
            const imageFormat = dataUrl.includes("image/jpeg") || dataUrl.includes("image/jpg") ? "JPEG" : "PNG";
            const imageW = Math.min(usableW, 150);
            const imageH = imageW * 0.62;
            pageBreak(imageH + 14);
            pdf.addImage(dataUrl, imageFormat, margin, y, imageW, imageH);
            y += imageH + 5;
            if (section.diagram?.caption) {
              pdf.setFont("helvetica", "italic");
              pdf.setFontSize(9);
              pdf.setTextColor(...PDF_COLORS.muted);
              writeText(section.diagram.caption, margin, imageW, 4.5, 2);
            }
          } catch (imageError) {
            console.warn("Skipping diagram in PDF", imageError);
          }
        }

        y += 8;
      }

      const pageCount = pdf.getNumberOfPages();
      for (let page = 1; page <= pageCount; page += 1) {
        pdf.setPage(page);
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(9);
        pdf.setTextColor(...PDF_COLORS.muted);
        pdf.text(`NoteForge • Page ${page} of ${pageCount}`, pageW / 2, pageH - 8, { align: "center" });
      }

      pdf.save(`${safeFileName(notes.title)}.pdf`);
      toast.success("PDF downloaded.");
    } catch (e) {
      console.error("PDF export failed", e);
      toast.error("Could not export PDF.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-4 pb-24">
      {/* Input card */}
      <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] sm:p-7">
        <div className="mb-5 flex gap-2 rounded-xl bg-secondary p-1">
          <button
            onClick={() => setMode("topic")}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
              mode === "topic" ? "bg-primary text-primary-foreground shadow" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <PencilLine className="h-4 w-4" /> Describe a topic
          </button>
          <button
            onClick={() => setMode("pdf")}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
              mode === "pdf" ? "bg-primary text-primary-foreground shadow" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <FileText className="h-4 w-4" /> Upload PDF / syllabus
          </button>
        </div>

        {mode === "topic" ? (
          <Textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. Photosynthesis for Grade 10 biology, or paste your full syllabus / chapter list here…"
            className="min-h-[160px] resize-none border-border bg-secondary/50 text-base"
          />
        ) : (
          <label className="flex min-h-[160px] cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border bg-secondary/40 p-6 text-center transition hover:border-primary/60">
            <Upload className="h-8 w-8 text-primary" />
            {file ? (
              <span className="font-medium text-foreground">{file.name}</span>
            ) : (
              <>
                <span className="font-medium text-foreground">Click to upload a PDF</span>
                <span className="text-sm text-muted-foreground">Notes will be generated strictly from this file</span>
              </>
            )}
            <input
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
          </label>
        )}

        <Button
          variant="hero"
          size="lg"
          className="mt-5 w-full"
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" /> Generating notes…
            </>
          ) : (
            <>
              <Sparkles className="h-5 w-5" /> Generate exam notes
            </>
          )}
        </Button>
      </div>

      {/* Notes output */}
      {notes && (
        <div className="mt-10">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <BookOpenCheck className="h-4 w-4 text-primary" /> {notes.sections.length} sections generated
            </p>
            <Button variant="accent" onClick={handleDownload} disabled={downloading}>
              {downloading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
              Download PDF
            </Button>
          </div>

          <div className="rounded-2xl bg-white p-6 text-neutral-900 sm:p-10">
            <header className="mb-8 border-b-2 border-dashed border-neutral-300 pb-5">
              <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">{notes.subject}</p>
              <h2 className="font-hand text-4xl font-bold text-neutral-900 sm:text-5xl">{notes.title}</h2>
            </header>

            <div className="space-y-10">
              {notes.sections.map((s, i) => (
                <section key={i}>
                  <h3 className="mb-2 flex items-center gap-3 text-2xl font-bold text-neutral-900">
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-base font-bold text-white"
                      style={{ background: PALETTE[i % PALETTE.length] }}
                    >
                      {i + 1}
                    </span>
                    {s.heading}
                  </h3>
                  <p className="mb-3 text-neutral-600">{s.summary}</p>
                  <ul className="space-y-2">
                    {s.points.map((p, j) => (
                      <li key={j} className="flex gap-2 text-neutral-800">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                  {s.keyTerms.length > 0 && (
                    <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4">
                      <p className="mb-2 font-hand text-lg font-bold text-amber-700">Key terms</p>
                      <dl className="space-y-1.5">
                        {s.keyTerms.map((kt, k) => (
                          <div key={k} className="text-sm">
                            <dt className="inline font-bold text-neutral-900">{kt.term}: </dt>
                            <dd className="inline text-neutral-700">{kt.definition}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  )}
                  {s.diagram && (
                    <DiagramCard
                      prompt={s.diagram.prompt}
                      caption={s.diagram.caption}
                      onImage={(image) => setDiagramImages((current) => ({ ...current, [i]: image }))}
                    />
                  )}
                </section>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}