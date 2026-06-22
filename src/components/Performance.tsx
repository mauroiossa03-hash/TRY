import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";
import SplitFlap from "./SplitFlap";
import EquityCurveBall from "./EquityCurveBall";
import { PNL_SERIES, PERFORMANCE_STATS } from "../lib/mockData";
import { PERFORMANCE_BG_PHOTO } from "../lib/config";

const STAT_CARDS = [
  {
    label: "Cumulative units",
    value: `+${PERFORMANCE_STATS.units.toFixed(2)}u`,
  },
  {
    label: "Win rate",
    value: `${(PERFORMANCE_STATS.winRate * 100).toFixed(1)}%`,
  },
  {
    label: "ROI",
    value: `+${(PERFORMANCE_STATS.roi * 100).toFixed(1)}%`,
  },
  {
    label: "Avg. odds taken",
    value: PERFORMANCE_STATS.avgOdds.toFixed(2),
  },
];

export default function Performance() {
  return (
    <section id="performance" className="relative py-24 sm:py-32 bg-bg border-t border-border">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Performance"
          title="Tracked since day one. No survivorship bias."
          description="Every signal we've sent is logged here — wins, losses, and the cumulative result. Mock data shown below; swap in your own tracked figures."
        />

        <ScrollReveal delay={0.05} className="relative mt-14 rounded-3xl overflow-hidden">
          <div
            className="absolute inset-0 bg-cover"
            style={{
              backgroundImage: `url(${PERFORMANCE_BG_PHOTO})`,
              backgroundSize: "220% auto",
              backgroundPosition: "center 32%",
            }}
          />
          <div className="absolute inset-0 bg-black/65" />

          <div className="relative z-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5 p-5 sm:p-6">
            {STAT_CARDS.map((stat) => (
              <div
                key={stat.label}
                className="group rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm p-6 hover:border-mint/40 hover:-translate-y-1 transition-all duration-300"
              >
                <p className="text-xs uppercase tracking-wide text-white/55 mb-3">
                  {stat.label}
                </p>
                <SplitFlap
                  value={stat.value}
                  className="text-3xl text-white font-semibold"
                  cellClassName="rounded-sm bg-white/10 border border-white/20 px-1 mr-0.5"
                />
              </div>
            ))}
          </div>
        </ScrollReveal>

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
            <EquityCurveBall data={PNL_SERIES} className="h-72 sm:h-96" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
