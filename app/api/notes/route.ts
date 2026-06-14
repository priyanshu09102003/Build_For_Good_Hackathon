import { NextRequest, NextResponse } from "next/server";
import { generateText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { z } from "zod";

// ─── Schemas ──────────────────────────────────────────────────────────────────

const NotesSchema = z.object({
  title: z.string(),
  subject: z.string(),
  sections: z.array(
    z.object({
      heading: z.string(),
      summary: z.string(),
      points: z.array(z.string()),
      keyTerms: z.array(
        z.object({ term: z.string(), definition: z.string() }),
      ),
      diagram: z
        .object({
          caption: z.string(),
          prompt: z.string(),
        })
        .nullable(),
    }),
  ),
});

export type Notes = z.infer<typeof NotesSchema>;

const GenerateInput = z.object({
  mode: z.enum(["topic", "pdf"]),
  text: z.string().max(8000).optional(),
  pdfBase64: z.string().optional(),
  fileName: z.string().max(255).optional(),
});

const DiagramInput = z.object({
  prompt: z.string().min(1).max(2000),
  caption: z.string().max(300).optional(),
});

// ─── Constants ────────────────────────────────────────────────────────────────

const SYSTEM = `You are an expert study-notes creator. Produce clear, exam-ready revision notes.
Rules:
- Break the material into 4-8 focused sections covering the most exam-relevant concepts.
- Each section: a short heading, a 1-2 sentence summary, 4-8 concise bullet points (facts, formulas, definitions, examples), and 1-4 key terms with short definitions.
- For sections that benefit from a visual, add a diagram with a caption and a detailed "prompt" describing a colourful hand-drawn flowchart/diagram/mind-map illustrating that concept. Use diagrams for ~half the sections; set diagram to null otherwise.
- The diagram "prompt" must fully describe what to draw (boxes, arrows, labels, relationships) so an illustrator could draw it without seeing the notes.
- Be accurate and concise. No fluff.`;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getGeminiKey(): string {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error("Missing GEMINI_API_KEY");
  return key;
}

function getCFCredentials(): { accountId: string; apiToken: string } {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;
  if (!accountId) throw new Error("Missing CLOUDFLARE_ACCOUNT_ID");
  if (!apiToken) throw new Error("Missing CLOUDFLARE_API_TOKEN");
  return { accountId, apiToken };
}

// ─── POST /api/notes ──────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const url = new URL(req.url);
  const action = url.searchParams.get("action");

  try {
    if (action === "diagram") {
      return await handleGenerateDiagram(req);
    }
    return await handleGenerateNotes(req);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[/api/notes] Error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// ─── Handler: generate notes ──────────────────────────────────────────────────

async function handleGenerateNotes(req: NextRequest): Promise<NextResponse> {
  const body = await req.json();
  const data = GenerateInput.parse(body);

  const key = getGeminiKey();
  const google = createGoogleGenerativeAI({ apiKey: key });

  const userContent: any[] = [];

  if (data.mode === "pdf") {
    if (!data.pdfBase64) throw new Error("No PDF provided");
    userContent.push({
      type: "text",
      text: "Create exam revision notes STRICTLY from the content of the attached PDF. Do not add information that is not in the document.",
    });
    userContent.push({
      type: "file",
      file: {
        filename: data.fileName || "document.pdf",
        file_data: `data:application/pdf;base64,${data.pdfBase64}`,
      },
    });
  } else {
    const topic = (data.text || "").trim();
    if (!topic) throw new Error("No topic provided");
    userContent.push({
      type: "text",
      text: `Create comprehensive exam revision notes about the following topic / syllabus. Generate the knowledge yourself from this description:\n\n${topic}`,
    });
  }

  const schemaHint = `Respond with ONLY a valid JSON object (no markdown, no code fences) matching exactly this shape:
{
  "title": string,
  "subject": string,
  "sections": [
    {
      "heading": string,
      "summary": string,
      "points": string[],
      "keyTerms": [ { "term": string, "definition": string } ],
      "diagram": { "caption": string, "prompt": string } | null
    }
  ]
}`;
  userContent.push({ type: "text", text: schemaHint });

  const { text } = await generateText({
    model: google("gemini-2.5-flash"),
    messages: [
      { role: "system", content: SYSTEM },
      { role: "user", content: userContent },
    ],
  });

  let raw = text.trim();
  const fence = raw.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fence) raw = fence[1].trim();
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start !== -1 && end !== -1) raw = raw.slice(start, end + 1);

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error("The AI returned an unexpected format. Please try again.");
  }

  const notes = NotesSchema.parse(parsed);
  return NextResponse.json(notes);
}

// ─── Handler: generate diagram via Cloudflare Workers AI (FLUX.1-schnell) ────


async function handleGenerateDiagram(req: NextRequest): Promise<NextResponse> {
  const body = await req.json();
  const data = DiagramInput.parse(body);

  const { accountId, apiToken } = getCFCredentials();

  const fullPrompt =
    `A colourful hand-drawn educational diagram on clean white paper. ` +
    `Style: neat handwritten study notes with marker and highlighter colours, ` +
    `labelled boxes, arrows, doodles. Clear legible hand-lettered text. ` +
    `Not photorealistic. Clean white background. ` +
    `Content: ${data.prompt}`;

  const cfUrl = `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/@cf/black-forest-labs/flux-1-schnell`;

  console.log("[CF diagram] Sending request to Cloudflare Workers AI...");

  let response: Response;
  try {
    response = await fetch(cfUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: fullPrompt,
        num_steps: 4,      // FLUX-schnell: 1-8 steps, 4 is sweet spot
        width: 1024,
        height: 1024,
      }),
    });
  } catch (fetchErr: unknown) {
    console.error("[CF diagram] fetch() threw:", fetchErr);
    const msg = fetchErr instanceof Error ? fetchErr.message : String(fetchErr);
    throw new Error(`Network error reaching Cloudflare: ${msg}`);
  }

  console.log("[CF diagram] Response status:", response.status);

  if (!response.ok) {
    const errorText = await response.text().catch(() => "Unknown CF error");
    console.error("[CF diagram] Error body:", errorText);
    throw new Error(`Cloudflare API error ${response.status}: ${errorText}`);
  }

  // Cloudflare Workers AI returns raw image bytes directly for image models
  const contentType = response.headers.get("content-type") ?? "image/png";

  // Some CF responses wrap in JSON with base64, others return raw bytes
  // Handle both cases:
  if (contentType.includes("application/json")) {
    const json = await response.json();
    // CF sometimes returns { result: { image: "<base64>" } }
    const base64 =
      json?.result?.image ??
      json?.image ??
      (() => { throw new Error("Unexpected Cloudflare JSON response shape"); })();
    return NextResponse.json({ mimeType: "image/png", data: base64 });
  }

  // Raw bytes path
  const arrayBuffer = await response.arrayBuffer();
  if (arrayBuffer.byteLength === 0) {
    throw new Error("Cloudflare returned an empty response.");
  }

  const base64 = Buffer.from(arrayBuffer).toString("base64");
  console.log(`[CF diagram] Success — ${arrayBuffer.byteLength} bytes`);

  return NextResponse.json({ mimeType: contentType, data: base64 });
}