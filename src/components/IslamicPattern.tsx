const IslamicPattern = () => (
  <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.04]">
    <svg width="100%" height="100%">
      <defs>
        <pattern id="islamic" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
          <polygon points="40,4 76,20 76,60 40,76 4,60 4,20" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-primary" />
          <circle cx="40" cy="40" r="12" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
          <line x1="4" y1="40" x2="76" y2="40" stroke="currentColor" strokeWidth="0.3" className="text-primary" />
          <line x1="40" y1="4" x2="40" y2="76" stroke="currentColor" strokeWidth="0.3" className="text-primary" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#islamic)" />
    </svg>
  </div>
);

export default IslamicPattern;
