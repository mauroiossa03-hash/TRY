import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";
import EquityCurveBall from "./EquityCurveBall";
import Logo from "./Logo";
import { usePerformanceContext } from "../lib/PerformanceContext";

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
  const { series, stats, isMock, loading } = usePerformanceContext();

  const since = fmtMonthYear(stats.sinceDate) ?? (isMock ? "set 2025" : "—");
  const last = fmtMonthYear(stats.lastDate) ?? (isMock ? "oggi" : "—");

  const statCards = [
    {
      label: "Unità cumulative",
      value: `${stats.units >= 0 ? "+" : ""}${stats.units.toFixed(2)}u`,
    },
    {
      label: "Tasso di vincita",
      value: `${(stats.winRate * 100).toFixed(1)}%`,
    },
    {
      label: "Scommesse regolate",
      value: `${stats.totalSignals}`,
    },
    {
      label: "Tracciato da",
      value: since,
    },
  ];

  const description = isMock
    ? "Ogni segnale regolato viene registrato qui — vincite, perdite e risultato cumulativo in unità. Dati dimostrativi in attesa del collegamento ai risultati reali."
    : "Ogni segnale regolato viene registrato qui — vincite, perdite e risultato cumulativo in unità. Dati reali, aggiornati automaticamente.";

  return (
    <section id="performance" aria-labelledby="performance-heading" className="relative py-24 sm:py-32 bg-bg border-t border-border">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          id="performance-heading"
          eyebrow="Performance"
          title="Tracciato dal primo giorno."
          description={description}
        />

        <ScrollReveal delay={0.05} className="relative mt-14 rounded-3xl overflow-hidden border border-border bg-bg-soft">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
            <Logo decorative className="h-[165%] w-auto opacity-20" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-white/45 via-white/10 to-white/30" />

          <div className="relative z-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5 p-5 sm:p-6">
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
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-text font-medium">PnL cumulativo (unità)</p>
                <p className="text-xs text-text-faint mt-1">
                  {stats.totalSignals} segnali &middot; {since} &ndash; {last}
                </p>
              </div>
              <span className="font-mono-tabular text-sm text-mint">
                {stats.units >= 0 ? "+" : ""}{stats.units.toFixed(2)}u
              </span>
            </div>
            <EquityCurveBall data={series} className="h-72 sm:h-96" />
            {loading && (
              <p className="mt-4 text-xs text-text-faint">Caricamento dati…</p>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
