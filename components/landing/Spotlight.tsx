"use client"

import { useRef, type ReactNode, type MouseEvent, type CSSProperties } from "react";

interface SpotlightProps {
  children: ReactNode;
  className?: string;
  size?: number;
  color?: string;
  as?: "div" | "section" | "article" | "li" | "ul";
}

export function Spotlight({
  children,
  className = "",
  size = 380,
  color = "oklch(0.72 0.22 250 / 0.18)",
  as: Tag = "div",
}: SpotlightProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--sx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--sy", `${e.clientY - rect.top}px`);
  };

  const style: CSSProperties = {
    // @ts-expect-error custom props
    "--spot-size": `${size}px`,
    "--spot-color": color,
  };

  const Component = Tag as unknown as "div";

  return (
    <Component
      ref={ref as never}
      onMouseMove={onMove as never}
      style={style}
      className={`spotlight-host group/spot relative ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-32 opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
        style={{
          background:
            "radial-gradient(var(--spot-size) circle at var(--sx,50%) var(--sy,50%), color-mix(in oklab, var(--spot-color) 95%, white 5%) 0%, var(--spot-color) 20%, color-mix(in oklab, var(--spot-color) 55%, transparent) 42%, transparent 72%)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </Component>
  );
}

