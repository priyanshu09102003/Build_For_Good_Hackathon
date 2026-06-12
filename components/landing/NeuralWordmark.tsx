"use client"

import { useMemo, useState } from "react";

type Node = { x: number; y: number; r: number; pulse: number };
type Edge = { a: number; b: number };

function generateGraph(width: number, height: number, count: number, seed: number) {

  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };

  const nodes: Node[] = [];
  for (let i = 0; i < count; i++) {
    nodes.push({
      x: rand() * width,
      y: rand() * height,
      r: 1.2 + rand() * 2.4,
      pulse: rand() * 2,
    });
  }

  const edges: Edge[] = [];
  for (let i = 0; i < nodes.length; i++) {
    // connect to 2 nearest-ish neighbors
    const dists = nodes
      .map((n, j) => ({ j, d: (n.x - nodes[i].x) ** 2 + (n.y - nodes[i].y) ** 2 }))
      .filter((o) => o.j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, 2);
    dists.forEach((o) => {
      if (!edges.find((e) => (e.a === i && e.b === o.j) || (e.a === o.j && e.b === i))) {
        edges.push({ a: i, b: o.j });
      }
    });
  }
  return { nodes, edges };
}

export function NeuralWordmark({ text }: { text: string }) {
  const [hover, setHover] = useState(false);
  const VIEW_W = 1200;
  const VIEW_H = 260;

  const graph = useMemo(() => generateGraph(VIEW_W, VIEW_H, 70, 42), []);
  const flareSeeds = useMemo(
    () => Array.from({ length: 8 }, (_, i) => ({
      x: ((i * 137) % VIEW_W),
      y: ((i * 71) % VIEW_H),
      delay: i * 0.7,
    })),
    []
  );

  return (
    <div
      className="mt-20 select-none overflow-hidden"
      aria-hidden="true"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        className="w-full h-auto block"
        style={{
          filter: hover
            ? "drop-shadow(0 0 6px rgba(140,190,255,0.35))"
            : "none",
          transition: "filter 400ms ease",
        }}
      >
        <defs>
          <clipPath id="text-clip">
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="central"
              fontFamily="var(--font-display, 'Space Grotesk'), system-ui, sans-serif"
              fontWeight={800}
              fontSize={200}
              letterSpacing={8}
            >
              {text}
            </text>
          </clipPath>

          <radialGradient id="flare-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(180,220,255,0.95)" />
            <stop offset="40%" stopColor="rgba(120,170,240,0.45)" />
            <stop offset="100%" stopColor="rgba(40,80,140,0)" />
          </radialGradient>

          <linearGradient id="edge-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(140,190,255,0.0)" />
            <stop offset="50%" stopColor="rgba(140,190,255,0.85)" />
            <stop offset="100%" stopColor="rgba(140,190,255,0.0)" />
          </linearGradient>
        </defs>

        {/* Neural network inside the letterforms */}
        <g clipPath="url(#text-clip)">
          {/* soft inner glow background */}
          <rect
            x={0}
            y={0}
            width={VIEW_W}
            height={VIEW_H}
            fill="rgba(30,55,100,0.18)"
          />

          {/* flares */}
          {flareSeeds.map((f, i) => (
            <circle
              key={`f-${i}`}
              cx={f.x}
              cy={f.y}
              r={60}
              fill="url(#flare-grad)"
              opacity={hover ? 0.9 : 0.55}
            >
              <animate
                attributeName="r"
                values="40;90;40"
                dur={`${4 + i * 0.4}s`}
                begin={`${f.delay}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.25;0.75;0.25"
                dur={`${4 + i * 0.4}s`}
                begin={`${f.delay}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}

          {/* edges */}
          {graph.edges.map((e, i) => {
            const a = graph.nodes[e.a];
            const b = graph.nodes[e.b];
            return (
              <line
                key={`e-${i}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke="url(#edge-grad)"
                strokeWidth={0.8}
                opacity={hover ? 0.85 : 0.55}
              >
                <animate
                  attributeName="opacity"
                  values="0.25;0.9;0.25"
                  dur={`${3 + (i % 5)}s`}
                  begin={`${(i % 7) * 0.3}s`}
                  repeatCount="indefinite"
                />
              </line>
            );
          })}

          {/* nodes */}
          {graph.nodes.map((n, i) => (
            <g key={`n-${i}`}>
              <circle cx={n.x} cy={n.y} r={n.r + 4} fill="rgba(150,200,255,0.18)">
                <animate
                  attributeName="r"
                  values={`${n.r + 2};${n.r + 8};${n.r + 2}`}
                  dur={`${2.5 + n.pulse}s`}
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={n.x} cy={n.y} r={n.r} fill="rgba(200,225,255,0.95)" />
            </g>
          ))}

          {/* travelling signals */}
          {graph.edges.slice(0, 14).map((e, i) => {
            const a = graph.nodes[e.a];
            const b = graph.nodes[e.b];
            return (
              <circle key={`s-${i}`} r={1.6} fill="rgba(220,240,255,1)">
                <animate
                  attributeName="cx"
                  values={`${a.x};${b.x};${a.x}`}
                  dur={`${3 + (i % 4)}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="cy"
                  values={`${a.y};${b.y};${a.y}`}
                  dur={`${3 + (i % 4)}s`}
                  repeatCount="indefinite"
                />
              </circle>
            );
          })}
        </g>

        {/* Outlined letterforms on top */}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="central"
          fontFamily="var(--font-display, 'Space Grotesk'), system-ui, sans-serif"
          fontWeight={800}
          fontSize={200}
          letterSpacing={8}
          fill="none"
          stroke={hover ? "rgba(20,35,70,0.95)" : "rgba(170,200,235,0.55)"}
          strokeWidth={hover ? 2.4 : 1.6}
          style={{ transition: "stroke 400ms ease, stroke-width 400ms ease" }}
        >
          {text}
        </text>
      </svg>
    </div>
  );
}
