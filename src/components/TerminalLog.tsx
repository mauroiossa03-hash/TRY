import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const LOG_LINES = [
  "SCRAPE      czech-liga-pro/group-4 ........... ok",
  "GROUP_ID    match_no=3 state=1W-1L vs 2W",
  "ODDS_FETCH  source=exchange price=1.92",
  "DEMARGIN    book_margin=4.8% -> true_prob=0.51",
  "EDGE_CHECK  model=0.61 market=0.51 edge=+0.10",
  "FILTER      odds[1.65,2.30] -> PASS",
  "SIGNAL      strategy=3M odds=1.92 stake=1.0u FIRED",
  "DISPATCH    telegram channel -> sent",
];

const TICK_MS = 850;

export default function TerminalLog({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-80px" });
  const [count, setCount] = useState(0);
  const [baseTime, setBaseTime] = useState(() => new Date());

  useEffect(() => {
    if (!inView) return;
    const interval = window.setInterval(() => {
      setCount((c) => {
        if (c >= LOG_LINES.length) {
          setBaseTime(new Date());
          return 0;
        }
        return c + 1;
      });
    }, TICK_MS);
    return () => clearInterval(interval);
  }, [inView]);

  const visible = LOG_LINES.slice(0, count);

  return (
    <div
      ref={ref}
      className={`rounded-2xl border border-border bg-[#080b10] overflow-hidden ${className}`}
    >
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-surface-2/60">
        <span className="size-2.5 rounded-full bg-red/70" />
        <span className="size-2.5 rounded-full bg-amber/70" />
        <span className="size-2.5 rounded-full bg-mint/70" />
        <span className="ml-3 font-mono text-xs text-text-faint">signal-engine.log</span>
      </div>
      <div className="p-5 sm:p-6 font-mono text-[13px] leading-relaxed min-h-[260px]">
        {visible.map((line, i) => {
          const d = new Date(baseTime.getTime() + i * 1000);
          const isSignal = line.startsWith("SIGNAL");
          return (
            <div key={i} className="flex gap-3">
              <span className="text-text-faint shrink-0">[{d.toTimeString().slice(0, 8)}]</span>
              <span className={isSignal ? "text-mint" : "text-text-dim"}>{line}</span>
            </div>
          );
        })}
        <span className="inline-block w-2 h-3.5 bg-mint align-middle animate-pulse" />
      </div>
    </div>
  );
}
