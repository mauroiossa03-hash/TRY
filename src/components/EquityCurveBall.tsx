import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import type { PnlPoint } from "../lib/mockData";

const PADDING = { top: 16, right: 12, bottom: 28, left: 38 };

interface EquityCurveBallProps {
  data: PnlPoint[];
  className?: string;
}

export default function EquityCurveBall({ data, className = "" }: EquityCurveBallProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const trailRef = useRef<SVGPathElement>(null);
  const ballRef = useRef<SVGCircleElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });
  const startedRef = useRef(false);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [hover, setHover] = useState<{ x: number; y: number; point: PnlPoint } | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setSize({ width, height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { width, height } = size;
  const innerW = Math.max(width - PADDING.left - PADDING.right, 1);
  const innerH = Math.max(height - PADDING.top - PADDING.bottom, 1);

  const values = data.map((d) => d.cumPnl);
  const minV = Math.min(0, ...values);
  const maxV = Math.max(...values);
  const span = maxV - minV || 1;

  const points = data.map((d, i) => ({
    x: PADDING.left + (i / (data.length - 1)) * innerW,
    y: PADDING.top + innerH - ((d.cumPnl - minV) / span) * innerH,
    point: d,
  }));

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  const zeroY = PADDING.top + innerH - ((0 - minV) / span) * innerH;
  const last = points[points.length - 1];
  const first = points[0];
  const areaPath = last && first ? `${linePath} L${last.x},${zeroY} L${first.x},${zeroY} Z` : "";

  useEffect(() => {
    if (!inView || !width || !height || startedRef.current) return;
    startedRef.current = true;
    const path = pathRef.current;
    const trail = trailRef.current;
    const ball = ballRef.current;
    if (!path || !trail || !ball) return;
    const totalLength = path.getTotalLength();
    trail.style.strokeDasharray = `${totalLength}`;
    trail.style.strokeDashoffset = `${totalLength}`;
    ball.style.opacity = "1";

    const controls = animate(0, 1, {
      duration: 2.4,
      ease: [0.16, 0.84, 0.36, 1],
      onUpdate: (progress) => {
        const len = progress * totalLength;
        trail.style.strokeDashoffset = `${totalLength - len}`;
        const pt = path.getPointAtLength(len);
        ball.setAttribute("cx", `${pt.x}`);
        ball.setAttribute("cy", `${pt.y}`);
      },
      onComplete: () => {
        ball.style.opacity = "0.85";
      },
    });
    return () => controls.stop();
  }, [inView, width, height]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <svg
        width={width}
        height={height}
        className="block w-full"
        onPointerMove={(e) => {
          if (!points.length) return;
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          let nearest = points[0];
          let nearestDist = Infinity;
          for (const p of points) {
            const dist = Math.abs(p.x - x);
            if (dist < nearestDist) {
              nearest = p;
              nearestDist = dist;
            }
          }
          setHover({ x: nearest.x, y: nearest.y, point: nearest.point });
        }}
        onPointerLeave={() => setHover(null)}
      >
        <defs>
          <linearGradient id="equityFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#34dba8" stopOpacity={0.22} />
            <stop offset="100%" stopColor="#34dba8" stopOpacity={0} />
          </linearGradient>
        </defs>

        {[0, 0.25, 0.5, 0.75, 1].map((f) => {
          const y = PADDING.top + innerH * f;
          const val = maxV - span * f;
          return (
            <g key={f}>
              <line
                x1={PADDING.left}
                x2={width - PADDING.right}
                y1={y}
                y2={y}
                stroke="#2b3445"
                strokeWidth={1}
              />
              <text
                x={PADDING.left - 8}
                y={y}
                textAnchor="end"
                dominantBaseline="middle"
                fontSize={10}
                fill="#717c93"
              >
                {val.toFixed(0)}u
              </text>
            </g>
          );
        })}
        <line
          x1={PADDING.left}
          x2={width - PADDING.right}
          y1={zeroY}
          y2={zeroY}
          stroke="#3c4759"
        />

        <path d={areaPath} fill="url(#equityFill)" stroke="none" />
        <path ref={pathRef} d={linePath} fill="none" stroke="transparent" />
        <path
          ref={trailRef}
          d={linePath}
          fill="none"
          stroke="#34dba8"
          strokeWidth={2}
          strokeLinecap="round"
        />
        <circle ref={ballRef} r={5} fill="#34dba8" stroke="#0d1117" strokeWidth={2} opacity={0} />

        {hover && (
          <>
            <line
              x1={hover.x}
              x2={hover.x}
              y1={PADDING.top}
              y2={height - PADDING.bottom}
              stroke="#3c4759"
              strokeDasharray="3 3"
            />
            <circle cx={hover.x} cy={hover.y} r={4} fill="#34dba8" stroke="#0d1117" strokeWidth={2} />
          </>
        )}
      </svg>

      {hover && (
        <div
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-full rounded-lg border border-edge bg-surface-2 px-3 py-2 shadow-xl"
          style={{ left: hover.x, top: hover.y - 10 }}
        >
          <p className="text-xs text-text-faint font-mono">{hover.point.date}</p>
          <p className="font-mono-tabular text-sm text-mint">
            {hover.point.cumPnl >= 0 ? "+" : ""}
            {hover.point.cumPnl.toFixed(2)}u
          </p>
        </div>
      )}
    </div>
  );
}
