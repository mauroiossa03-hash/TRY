interface LogoProps {
  className?: string;
  title?: string;
  /** Render purely as decoration (hidden from assistive tech). */
  decorative?: boolean;
}

/**
 * Quantitative Betting emblem mark — a red table-tennis paddle with a
 * peach probability histogram on a baseline shelf and a black Gaussian
 * curve across its face. Pure SVG so it stays crisp at any size
 * (navbar, footer, favicon, section backdrops).
 */
export default function Logo({
  className = "",
  title = "Quantitative Betting",
  decorative = false,
}: LogoProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : title}
      aria-hidden={decorative ? true : undefined}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* wood blade behind the head: stripe + highlight */}
      <rect x="42" y="60" width="16" height="33" rx="5" fill="#d9c3a0" />
      <rect x="48.3" y="60" width="3.6" height="33" fill="#2b3440" />
      <rect x="52.3" y="60" width="1.5" height="33" fill="#f2efe9" />

      {/* paddle head: pale-wood rim + red rubber */}
      <ellipse cx="50" cy="38" rx="33.5" ry="34.5" fill="#e9d9bf" />
      <ellipse cx="50" cy="38" rx="32" ry="33" fill="#d83a2f" />

      {/* baseline shelf the bars and curve rest on */}
      <rect x="8" y="61.5" width="84" height="4.5" rx="2.25" fill="#e9c49e" />

      {/* probability histogram (peach / light-orange bars) */}
      <g fill="#f4bd9b">
        <rect x="20" y="50" width="6" height="12" rx="1" />
        <rect x="29" y="40" width="6" height="22" rx="1" />
        <rect x="38" y="30" width="6" height="32" rx="1" />
        <rect x="47" y="22" width="6" height="40" rx="1" />
        <rect x="56" y="30" width="6" height="32" rx="1" />
        <rect x="65" y="40" width="6" height="22" rx="1" />
        <rect x="74" y="50" width="6" height="12" rx="1" />
      </g>

      {/* Gaussian / bell curve */}
      <path
        d="M9 60 C 27 60, 34 15, 50 15 C 66 15, 73 60, 91 60"
        fill="none"
        stroke="#15171a"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
