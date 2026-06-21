import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from "recharts";
import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";
import Counter from "./Counter";
import { PNL_SERIES, PERFORMANCE_STATS } from "../lib/mockData";

const STAT_CARDS = [
  {
    label: "Cumulative units",
    value: PERFORMANCE_STATS.units,
    decimals: 2,
    prefix: "+",
    suffix: "u",
  },
  {
    label: "Win rate",
    value: PERFORMANCE_STATS.winRate * 100,
    decimals: 1,
    suffix: "%",
  },
  {
    label: "ROI",
    value: PERFORMANCE_STATS.roi * 100,
    decimals: 1,
    prefix: "+",
    suffix: "%",
  },
  {
    label: "Avg. odds taken",
    value: PERFORMANCE_STATS.avgOdds,
    decimals: 2,
    suffix: "",
  },
];

interface TooltipPayload {
  payload: { date: string; cumPnl: number };
}

function ChartTooltip({ active, payload }: { active?: boolean; payload?: TooltipPayload[] }) {
  if (!active || !payload?.length) return null;
  const point = payload[0].payload;
  return (
    <div className="rounded-lg border border-edge bg-surface-2 px-3 py-2 shadow-xl">
      <p className="text-xs text-text-faint font-mono">{point.date}</p>
      <p className="font-mono-tabular text-sm text-mint">
        {point.cumPnl >= 0 ? "+" : ""}
        {point.cumPnl.toFixed(2)}u
      </p>
    </div>
  );
}

export default function Performance() {
  return (
    <section id="performance" className="relative py-24 sm:py-32 bg-bg border-t border-border">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Performance"
          title="Tracked since day one. No survivorship bias."
          description="Every signal we've sent is logged here — wins, losses, and the cumulative result. Mock data shown below; swap in your own tracked figures."
        />

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STAT_CARDS.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.08}>
              <div className="group rounded-2xl border border-border bg-surface p-6 hover:border-mint/30 hover:-translate-y-1 transition-all duration-300">
                <p className="text-xs uppercase tracking-wide text-text-faint mb-3">
                  {stat.label}
                </p>
                <p className="font-mono-tabular text-3xl text-text font-semibold">
                  <Counter
                    value={stat.value}
                    decimals={stat.decimals}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.2} className="mt-8">
          <div className="rounded-2xl border border-border bg-surface p-4 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-text font-medium">Cumulative PnL (units)</p>
                <p className="text-xs text-text-faint mt-1">
                  {PERFORMANCE_STATS.totalSignals} signals &middot; Sept 2025 &ndash; present
                </p>
              </div>
              <span className="font-mono-tabular text-sm text-mint">
                +{PERFORMANCE_STATS.units.toFixed(2)}u
              </span>
            </div>
            <div className="h-72 sm:h-96 -ml-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={PNL_SERIES} margin={{ top: 10, right: 16, bottom: 0, left: 0 }}>
                  <defs>
                    <linearGradient id="pnlFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2dd4a7" stopOpacity={0.25} />
                      <stop offset="100%" stopColor="#2dd4a7" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#1f2430" vertical={false} />
                  <XAxis
                    dataKey="signal"
                    tick={{ fill: "#565d70", fontSize: 11 }}
                    tickLine={false}
                    axisLine={{ stroke: "#1f2430" }}
                    tickFormatter={(v) => `#${v}`}
                    minTickGap={40}
                  />
                  <YAxis
                    tick={{ fill: "#565d70", fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                    width={36}
                    tickFormatter={(v) => `${v}u`}
                  />
                  <ReferenceLine y={0} stroke="#2a3040" />
                  <Tooltip content={<ChartTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="cumPnl"
                    stroke="#2dd4a7"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4, fill: "#2dd4a7", stroke: "#06070a", strokeWidth: 2 }}
                    isAnimationActive
                    animationDuration={1600}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
