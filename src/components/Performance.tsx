import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";
import EquityCurveBall from "./EquityCurveBall";
import Logo from "./Logo";
import { SIGNAL_EXAMPLES } from "../lib/mockData";
import { usePerformanceContext } from "../lib/PerformanceContext";

function resultBadge(result: string) {
  if (result === "win") return "bg-red/10 text-red border-red/30";
  if (result === "loss") return "bg-text/[0.06] text-text-dim border-text/20";
  return "bg-amber/10 text-amber border-amber/30";
}

const MONTHS_IT = [
  "gen", "feb", "mar", "apr", "mag", "giu",
  "lug", "ago", "set", "ott", "nov", "dic",
];

function fmtMonthYear(iso?: string): string | null {
  if (!iso) return null;
  const d = new Date(iso + "T00:00:00Z");
  if (Number.isNaN(d.getTime())) return null;
  return `${MONTHS_IT[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

export default function Performance() {
  const {
    series,
    stats,
    isMock,
    loading,
    strategy,
    setStrategy,
    availableStrategies,
    recentSignals,
  } = usePerformanceContext();

  const signals = recentSignals.length > 0 ? recentSignals : SIGNAL_EXAMPLES;

  const since = fmtMonthYear(stats.sinceDate) ?? (isMock ? "set 2025" : "—");
  const last = fmtMonthYear(stats.lastDate) ?? (isMock ? "oggi" : "—");

  // Filter tabs appear only when real data carries strategy tags.
  const showFilter = !isMock && availableStrategies.length > 1;
  const filterOptions = ["ALL", ...availableStrategies];
  const filterLabel = (s: string) => (s === "ALL" ? "Tutte" : s);

  const statCards = [
    {
      label: "Strategie live",
      value: "3",
    },
    {
      label: "Tasso di vincita",
      value: `${(stats.winRate * 100).toFixed(1)}%`,
    },
    {
      label: "Tracciato da",
      value: since,
    },
  ];

  return (
    <section id="performance" aria-labelledby="performance-heading" className="relative py-24 sm:py-32 bg-bg border-t border-border">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          id="performance-heading"
          eyebrow="Performance"
          title="Tracking in tempo reale."
        />

        <ScrollReveal delay={0.05} className="relative mt-14 rounded-3xl overflow-hidden border border-border bg-bg-soft">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
            <Logo decorative className="h-[165%] w-auto opacity-20" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-white/45 via-white/10 to-white/30" />

          <div className="relative z-10 grid sm:grid-cols-3 gap-5 p-5 sm:p-6">
            {statCards.map((stat) => (
              <div
                key={stat.label}
                className="group rounded-2xl border border-border bg-white/70 backdrop-blur-sm p-6 hover:border-mint/40 hover:-translate-y-1 transition-all duration-300"
              >
                <p className="text-xs uppercase tracking-wide text-text-faint mb-3">
                  {stat.label}
                </p>
                <span className="text-3xl text-text font-semibold tabular-nums">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2} className="mt-8">
          <div className="rounded-2xl border border-border bg-surface p-4 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <p className="text-sm text-text font-medium">PnL cumulativo (unità)</p>
                <p className="text-xs text-text-faint mt-1">
                  {stats.totalSignals} segnali &middot; {since} &ndash; {last}
                  {showFilter && strategy !== "ALL" && (
                    <span className="text-mint"> &middot; {strategy}</span>
                  )}
                </p>
              </div>
              <div className="flex items-center gap-4">
                {showFilter && (
                  <div
                    role="tablist"
                    aria-label="Filtra per strategia"
                    className="flex items-center rounded-full border border-border bg-bg-soft p-1"
                  >
                    {filterOptions.map((opt) => (
                      <button
                        key={opt}
                        role="tab"
                        aria-selected={strategy === opt}
                        onClick={() => setStrategy(opt)}
                        className={`rounded-full px-3.5 py-1.5 font-mono text-xs transition-colors ${
                          strategy === opt
                            ? "bg-mint text-white"
                            : "text-text-dim hover:text-text"
                        }`}
                      >
                        {filterLabel(opt)}
                      </button>
                    ))}
                  </div>
                )}
                <span className="font-mono-tabular text-sm text-mint">
                  {stats.units >= 0 ? "+" : ""}{stats.units.toFixed(2)}u
                </span>
              </div>
            </div>
            <EquityCurveBall data={series} className="h-72 sm:h-96" />
            {loading && (
              <p className="mt-4 text-xs text-text-faint">Caricamento dati…</p>
            )}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.25} className="mt-8">
          <div className="rounded-2xl border border-border bg-surface overflow-hidden">
            <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-border">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-red animate-pulse" />
                <span className="font-mono text-xs text-text-dim tracking-wide">
                  #segnali &middot; anteprima live
                </span>
              </div>
              <span className="text-xs text-text-faint font-mono-tabular">
                Quantitative Betting
              </span>
            </div>
            <div className="divide-y divide-border">
              {signals.map((sig, i) => (
                <ScrollReveal key={sig.id} delay={i * 0.06}>
                  <div className="flex flex-wrap items-center gap-4 px-5 sm:px-6 py-4 hover:bg-surface-2/60 transition-colors">
                    <span className="font-mono text-xs text-text-faint w-20 shrink-0">
                      {sig.id}
                    </span>
                    {sig.tag && (
                      <span className="text-xs font-medium rounded-full border border-edge px-2.5 py-1 text-text-dim shrink-0">
                        {sig.tag}
                      </span>
                    )}
                    <span className="text-sm text-text flex-1 min-w-[180px]">
                      {sig.matchup || "Segnale regolato"}
                      {sig.tournament && (
                        <span className="text-text-faint"> &middot; {sig.tournament}</span>
                      )}
                    </span>
                    {sig.odds > 0 && (
                      <span className="font-mono-tabular text-sm text-text-dim hidden sm:inline">
                        @ {sig.odds.toFixed(2)}
                      </span>
                    )}
                    <span
                      className={`font-mono-tabular text-xs rounded-md border px-2 py-1 ${resultBadge(sig.result)}`}
                    >
                      {sig.pnl > 0 ? "+" : ""}
                      {sig.pnl.toFixed(2)}u
                    </span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
