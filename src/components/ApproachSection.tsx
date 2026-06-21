import { Trophy, GitBranch, Calculator, Target } from "lucide-react";
import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";

const STEPS = [
  {
    icon: Trophy,
    step: "01",
    title: "Tournament focus",
    description:
      "We exclusively model Czech Liga Pro and TT Cup — high-frequency, round-robin formats with rich historical data and consistent structure.",
  },
  {
    icon: GitBranch,
    step: "02",
    title: "Group-stage structure",
    description:
      "Round-robin groups create predictable sequences: players carry win/loss records into each subsequent match, shaping motivation and matchup dynamics that markets underprice.",
  },
  {
    icon: Calculator,
    step: "03",
    title: "De-marginalized pricing",
    description:
      "We strip bookmaker margin from quoted odds to recover true implied probability, then compare it against our modeled win probability for each scenario.",
  },
  {
    icon: Target,
    step: "04",
    title: "Edge-gated signals",
    description:
      "A signal only fires when the gap between modeled probability and market-implied probability clears our minimum edge threshold — filtered to specific match scenarios and odds bands.",
  },
];

export default function ApproachSection() {
  return (
    <section id="approach" className="relative py-24 sm:py-32 bg-bg border-t border-border">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="What We Do"
          title="The edge lives in round-robin group dynamics."
          description="Single-elimination markets are heavily scrutinized. Round-robin group stages — where every player faces every other player in sequence — create structural inefficiencies that are far less efficiently priced."
        />

        <div className="mt-16 grid lg:grid-cols-2 gap-6">
          {STEPS.map((item, i) => (
            <ScrollReveal key={item.step} delay={i * 0.08}>
              <div className="relative rounded-2xl border border-border bg-surface p-7 sm:p-8 hover:border-edge transition-colors h-full">
                <div className="flex items-start justify-between mb-6">
                  <div className="inline-flex items-center justify-center size-11 rounded-xl bg-surface-2 border border-edge text-mint">
                    <item.icon className="size-5" />
                  </div>
                  <span className="font-mono-tabular text-3xl text-text-faint/50 font-semibold">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-lg text-text font-medium mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-text-dim leading-relaxed">
                  {item.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3} className="mt-10">
          <div className="rounded-2xl border border-mint/20 bg-mint/5 p-6 sm:p-8 flex flex-col sm:flex-row gap-6 sm:items-center sm:justify-between">
            <p className="text-text-dim text-sm sm:text-base max-w-2xl">
              <span className="text-text font-medium">No discretionary picks.</span>{" "}
              Every signal traces back to a model, a scenario definition, and
              a backtest. If a strategy can't be verified out-of-sample, it
              doesn't go live.
            </p>
            <div className="flex gap-8 font-mono-tabular shrink-0">
              <div>
                <div className="text-xl text-text font-semibold">2</div>
                <div className="text-xs text-text-faint uppercase tracking-wide">Live strategies</div>
              </div>
              <div>
                <div className="text-xl text-text font-semibold">1</div>
                <div className="text-xs text-text-faint uppercase tracking-wide">In verification</div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
