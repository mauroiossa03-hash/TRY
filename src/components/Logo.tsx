interface LogoProps {
  className?: string;
  title?: string;
}

/**
 * Quantitative Betting emblem mark — a red table-tennis paddle with a
 * peach probability histogram and a Gaussian curve across its face.
 * Pure SVG so it stays crisp at any size (navbar, footer, favicon).
 */
export default function Logo({ className = "", title = "Quantitative Betting" }: LogoProps) {
  return (
    <svg
      viewBox="0 0 80 80"
      className={className}
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* paddle handle (wood blade + navy stripe) */}
      <rect x="33.5" y="49" width="13" height="25" rx="4" fill="#d8c39f" />
      <rect x="37.7" y="49" width="4.6" height="25" rx="2.3" fill="#1b2a4a" />

      {/* paddle head: cream rim + red rubber */}
      <circle cx="40" cy="33" r="24.5" fill="#efe6d6" />
      <circle cx="40" cy="33" r="23" fill="#d23a2f" />

      {/* probability histogram (peach bars) */}
      <g fill="#f4bd9b">
        <rect x="21" y="35" width="6" height="11" rx="1" />
        <rect x="29" y="26" width="6" height="20" rx="1" />
        <rect x="37" y="18" width="6" height="28" rx="1" />
        <rect x="45" y="26" width="6" height="20" rx="1" />
        <rect x="53" y="35" width="6" height="11" rx="1" />
      </g>

      {/* Gaussian / bell curve */}
      <path
        d="M14 44 C 25 44, 30 15, 40 15 C 50 15, 55 44, 66 44"
        fill="none"
        stroke="#15202f"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
