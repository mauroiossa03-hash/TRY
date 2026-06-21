import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";
import { STRATEGIES } from "../lib/mockData";

export default function StrategyMatrix() {
  return (
    <section id="strategies" className="relative py-24 sm:py-32 bg-bg-soft border-t border-border">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Strategy Matrix"
          title="Defined scenarios. Defined odds bands. No improvisation."
          description="Each strategy targets a specific moment in the round-robin sequence, with explicit triggers and odds filters — exactly as a quant desk would document a trading rule."
        />

        <ScrollReveal delay={0.15} className="mt-14">
          <div className="overflow-x-auto rounded-2xl border border-border bg-surface">
            <table className="w-full min-w-[820px] text-left">
              <thead>
                <tr className="border-b border-border text-xs uppercase tracking-wide text-text-faint">
                  <th className="px-6 py-4 font-medium">Strategy</th>
                  <th className="px-6 py-4 font-medium">Scenario</th>
                  <th className="px-6 py-4 font-medium">Trigger</th>
                  <th className="px-6 py-4 font-medium">Odds Filter</th>
                  <th className="px-6 py-4 font-medium">Sample</th>
                  <th className="px-6 py-4 font-medium">Win Rate</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {STRATEGIES.map((s, i) => (
                  <motion.tr
                    key={s.id}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="group hover:bg-surface-2/60 transition-colors"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-xs rounded-md bg-surface-2 border border-edge px-2 py-1 text-mint shrink-0">
                          {s.id}
                        </span>
                        <span className="text-sm text-text font-medium">{s.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-sm text-text-dim">{s.scenario}</td>
                    <td className="px-6 py-5 text-sm text-text-dim max-w-xs">{s.trigger}</td>
                    <td className="px-6 py-5 font-mono-tabular text-sm text-text">{s.oddsFilter}</td>
                    <td className="px-6 py-5 font-mono-tabular text-sm text-text-dim">{s.sampleSize}</td>
                    <td className="px-6 py-5 font-mono-tabular text-sm text-text">{s.winRate}</td>
                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs rounded-full px-2.5 py-1 border ${
                          s.status === "live"
                            ? "bg-mint/10 text-mint border-mint/30"
                            : "bg-amber/10 text-amber border-amber/30"
                        }`}
                      >
                        <span
                          className={`size-1.5 rounded-full ${
                            s.status === "live" ? "bg-mint" : "bg-amber"
                          }`}
                        />
                        {s.status === "live" ? "Live" : "Verifying"}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
