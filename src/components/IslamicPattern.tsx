/**
 * BackgroundPattern — modern grid + dot pattern overlay (replaces old IslamicPattern).
 * Kept filename for backward import compatibility.
 */
const BackgroundPattern = () => (
  <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.06]">
    <svg width="100%" height="100%">
      <defs>
        <pattern id="grid-dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="currentColor" className="text-primary" />
        </pattern>
        <radialGradient id="fade" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id="fade-mask">
          <rect width="100%" height="100%" fill="url(#fade)" />
        </mask>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-dots)" mask="url(#fade-mask)" />
    </svg>

    {/* Soft brand glow blobs */}
    <div
      className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full opacity-30 blur-3xl"
      style={{ background: "radial-gradient(circle, hsl(var(--violet) / 0.6), transparent 70%)" }}
    />
    <div
      className="absolute bottom-[-15%] right-[-10%] w-[600px] h-[600px] rounded-full opacity-25 blur-3xl"
      style={{ background: "radial-gradient(circle, hsl(var(--cyan) / 0.5), transparent 70%)" }}
    />
  </div>
);

export default BackgroundPattern;
