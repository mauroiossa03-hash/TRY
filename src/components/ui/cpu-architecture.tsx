import { cn } from "@/lib/utils";

export interface CpuArchitectureSvgProps {
  className?: string;
  scale?: number;
  text?: string;
  showCpuConnections?: boolean;
  imageSrc?: string;
  imageAlt?: string;
}

const BASE_WIDTH = 200;
const BASE_HEIGHT = 100;

export function CpuArchitecture({
  className,
  scale = 2,
  text = "CPU",
  showCpuConnections = true,
  imageSrc,
  imageAlt = "",
}: CpuArchitectureSvgProps) {
  return (
    <div
      className={cn("relative", className)}
      style={{ width: BASE_WIDTH * scale, height: BASE_HEIGHT * scale }}
    >
      <div
        className="absolute left-0 top-0"
        style={{
          width: BASE_WIDTH,
          height: BASE_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        <svg
          className="text-edge"
          width={BASE_WIDTH}
          height={BASE_HEIGHT}
          viewBox="0 0 200 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Static line paths */}
          <path d="M 10 20 h 79.5 q 5 0 5 5 v 15" stroke="currentColor" strokeWidth="0.5" />
          <path d="M 180 10 h -69.5 q -5 0 -5 5 v 25" stroke="currentColor" strokeWidth="0.5" />
          <path d="M 130 20 v 11.5 q 0 5 -5 5 h -10" stroke="currentColor" strokeWidth="0.5" />
          <path d="M 170 80 v -11.5 q 0 -5 -5 -5 h -50" stroke="currentColor" strokeWidth="0.5" />
          <path d="M 100 100 v -21.5 q 0 -5 5 -5 h 0" stroke="currentColor" strokeWidth="0.5" />
          <path d="M 50 100 v -21.5 q 0 -5 -5 -5 h 40" stroke="currentColor" strokeWidth="0.5" />
          <path d="M 110 100 v -10 q 0 -5 5 -5 h 0" stroke="currentColor" strokeWidth="0.5" />
          <path d="M 90 100 v -10 q 0 -5 -5 -5 h 0" stroke="currentColor" strokeWidth="0.5" />

          {showCpuConnections && (
            <>
              <circle cx="10" cy="20" r="1.4" fill="var(--color-mint)" />
              <circle cx="180" cy="10" r="1.4" fill="var(--color-red)" />
              <circle cx="115" cy="20" r="1.4" fill="var(--color-mint)" />
              <circle cx="170" cy="80" r="1.4" fill="var(--color-red)" />
              <circle cx="100" cy="100" r="1.4" fill="var(--color-mint)" />
              <circle cx="50" cy="100" r="1.4" fill="var(--color-red)" />
              <circle cx="110" cy="100" r="1.4" fill="var(--color-mint)" />
              <circle cx="90" cy="100" r="1.4" fill="var(--color-red)" />
            </>
          )}

          {/* CPU box */}
          {imageSrc ? (
            <>
              <defs>
                <clipPath id="cpu-box-clip">
                  <rect x="86" y="41" width="28" height="18" rx="1.5" />
                </clipPath>
              </defs>
              <image
                href={imageSrc}
                aria-label={imageAlt}
                x="86"
                y="41"
                width="28"
                height="18"
                preserveAspectRatio="xMidYMid slice"
                clipPath="url(#cpu-box-clip)"
              />
              <rect
                x="85"
                y="40"
                width="30"
                height="20"
                rx="2"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </>
          ) : (
            <>
              <rect
                x="85"
                y="40"
                width="30"
                height="20"
                rx="2"
                fill="var(--color-surface)"
                stroke="currentColor"
                strokeWidth="0.5"
              />
              <text
                x="100"
                y="53"
                fontSize="6"
                fill="currentColor"
                textAnchor="middle"
              >
                {text}
              </text>
            </>
          )}
        </svg>

        {/* Animated light particles travelling along the lines (CSS offset-path) */}
        <div className="cpu-architecture cpu-line-1 absolute h-[3px] w-[3px] rounded-full bg-mint shadow-[0_0_6px_2px_var(--color-mint)]" />
        <div className="cpu-architecture cpu-line-2 absolute h-[3px] w-[3px] rounded-full bg-red shadow-[0_0_6px_2px_var(--color-red)]" />
        <div className="cpu-architecture cpu-line-3 absolute h-[3px] w-[3px] rounded-full bg-mint shadow-[0_0_6px_2px_var(--color-mint)]" />
        <div className="cpu-architecture cpu-line-4 absolute h-[3px] w-[3px] rounded-full bg-red shadow-[0_0_6px_2px_var(--color-red)]" />
        <div className="cpu-architecture cpu-line-5 absolute h-[3px] w-[3px] rounded-full bg-mint shadow-[0_0_6px_2px_var(--color-mint)]" />
        <div className="cpu-architecture cpu-line-6 absolute h-[3px] w-[3px] rounded-full bg-red shadow-[0_0_6px_2px_var(--color-red)]" />
        <div className="cpu-architecture cpu-line-7 absolute h-[3px] w-[3px] rounded-full bg-mint shadow-[0_0_6px_2px_var(--color-mint)]" />
        <div className="cpu-architecture cpu-line-8 absolute h-[3px] w-[3px] rounded-full bg-red shadow-[0_0_6px_2px_var(--color-red)]" />
      </div>
    </div>
  );
}
