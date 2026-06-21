import { Send, Eye, LineChart, ShieldCheck } from "lucide-react";
import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";
import { SIGNAL_EXAMPLES } from "../lib/mockData";

const FEATURES = [
  {
    icon: Send,
    title: "Real-time Telegram delivery",
    description:
      "Every signal hits the channel the moment our models confirm an edge — before market odds adjust.",
  },
  {
    icon: Eye,
    title: "Full transparency",
    description:
      "Entry, odds taken, strategy tag, and stake sizing are published with every signal. No black box.",
  },
  {
    icon: LineChart,
    title: "Tracked PnL, always",
    description:
      "Every result is logged against the signal that produced it. Performance pages mirror the channel.",
  },
  {
    icon: ShieldCheck,
    title: "Edge-verified before launch",
    description:
      "Strategies are backtested and forward-tested in isolation before they're trusted with live capital.",
  },
];

function resultBadge(result: string) {
  if (result === "win")
    return "bg-mint/10 text-mint border-mint/30";
  if (result === "loss")
    return "bg-red/10 text-red border-red/30";
  return "bg-amber/10 text-amber border-amber/30";
}

export default function ServiceSection() {
  return (
    <section id="service" className="relative py-24 sm:py-32 bg-bg-soft border-t border-border">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="The Service"
          title="A signal desk, not a tipster group."
          description="Members subscribe to receive automated, data-driven betting signals for table tennis — delivered with the same rigor and transparency you'd expect from a quant trading desk."
        />

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((feature, i) => (
            <ScrollReveal key={feature.title} delay={i * 0.08}>
              <div className="group h-full rounded-2xl border border-border bg-surface p-6 hover:border-edge hover:-translate-y-1 transition-all duration-300">
                <div className="inline-flex items-center justify-center size-10 rounded-lg bg-mint/10 text-mint mb-4 group-hover:bg-mint group-hover:text-[#03130f] transition-colors">
                  <feature.icon className="size-5" />
                </div>
                <h3 className="text-text font-medium mb-2">{feature.title}</h3>
                <p className="text-sm text-text-dim leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.2} className="mt-16">
          <div className="rounded-2xl border border-border bg-surface overflow-hidden">
            <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-border">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-mint animate-pulse" />
                <span className="font-mono text-xs text-text-dim tracking-wide">
                  #signal-feed &middot; live preview
                </span>
              </div>
              <span className="text-xs text-text-faint font-mono-tabular">
                @{`spinedge_signals`}
              </span>
            </div>
            <div className="divide-y divide-border">
              {SIGNAL_EXAMPLES.map((sig, i) => (
                <ScrollReveal key={sig.id} delay={i * 0.06}>
                  <div className="flex flex-wrap items-center gap-4 px-5 sm:px-6 py-4 hover:bg-surface-2/60 transition-colors">
                    <span className="font-mono text-xs text-text-faint w-20 shrink-0">
                      {sig.id}
                    </span>
                    <span className="text-xs font-medium rounded-full border border-edge px-2.5 py-1 text-text-dim shrink-0">
                      {sig.tag}
                    </span>
                    <span className="text-sm text-text flex-1 min-w-[180px]">
                      {sig.matchup}
                      <span className="text-text-faint"> &middot; {sig.tournament}</span>
                    </span>
                    <span className="font-mono-tabular text-sm text-text-dim hidden sm:inline">
                      @ {sig.odds.toFixed(2)}
                    </span>
                    <span
                      className={`font-mono-tabular text-xs rounded-md border px-2 py-1 ${resultBadge(sig.result)}`}
                    >
                      {sig.result === "win" ? "+" : ""}
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
