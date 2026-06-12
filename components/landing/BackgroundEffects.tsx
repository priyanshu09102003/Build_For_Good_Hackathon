export function BackgroundEffects() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">

      {/* Aurora blobs */}
      <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-[oklch(0.62_0.24_275/0.55)] blur-[140px] animate-aurora" />
      <div className="absolute -top-32 right-[-180px] h-[560px] w-[560px] rounded-full bg-[oklch(0.62_0.26_305/0.5)] blur-[160px] animate-aurora" style={{ animationDelay: "3s" }} />
      <div className="absolute top-[35%] left-[-160px] h-[480px] w-[480px] rounded-full bg-[oklch(0.82_0.16_200/0.35)] blur-[150px] animate-aurora" style={{ animationDelay: "5s" }} />
      <div className="absolute top-[55%] right-[-140px] h-[520px] w-[520px] rounded-full bg-[oklch(0.7_0.24_290/0.4)] blur-[160px] animate-aurora" style={{ animationDelay: "7s" }} />
      <div className="absolute bottom-[-220px] left-1/2 h-[620px] w-[620px] -translate-x-1/2 rounded-full bg-[oklch(0.82_0.16_200/0.4)] blur-[170px] animate-aurora" style={{ animationDelay: "6s" }} />

      {/* Base grid — always faintly visible */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
        }}
      />

      {/* Lit grid — top-left blob (indigo) */}
      <div
        className="absolute inset-0 animate-aurora"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.18) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.18) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 460px 460px at 0% 0%, black 0%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse 460px 460px at 0% 0%, black 0%, transparent 70%)",
          animationDelay: "0s",
        }}
      />

      {/* Lit grid — top-right blob (purple) */}
      <div
        className="absolute inset-0 animate-aurora"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 500px 480px at 100% 0%, black 0%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse 500px 480px at 100% 0%, black 0%, transparent 70%)",
          animationDelay: "3s",
        }}
      />

      {/* Lit grid — mid-left blob (cyan) */}
      <div
        className="absolute inset-0 animate-aurora"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.13) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.13) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 420px 420px at 0% 40%, black 0%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse 420px 420px at 0% 40%, black 0%, transparent 70%)",
          animationDelay: "5s",
        }}
      />

      {/* Lit grid — mid-right blob */}
      <div
        className="absolute inset-0 animate-aurora"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.14) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.14) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 460px 440px at 100% 60%, black 0%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse 460px 440px at 100% 60%, black 0%, transparent 70%)",
          animationDelay: "7s",
        }}
      />

      {/* Lit grid — bottom center blob */}
      <div
        className="absolute inset-0 animate-aurora"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 560px 480px at 50% 100%, black 0%, transparent 65%)",
          WebkitMaskImage: "radial-gradient(ellipse 560px 480px at 50% 100%, black 0%, transparent 65%)",
          animationDelay: "6s",
        }}
      />

      {/* Edge vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(5,5,5,0.7)_100%)]" />
    </div>
  );
}