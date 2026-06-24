import { Check, ArrowUpRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";
import { TELEGRAM_URL } from "../lib/config";

const PLANS = [
  {
    name: "Monthly",
    price: "49",
    period: "/mo",
    description: "Full access, billed monthly. Cancel anytime.",
    highlight: false,
    features: [
      "All live signals (3rd-Match + 6th-Decider)",
      "Entry, odds, tag, and PnL on every signal",
      "Real-time Telegram delivery",
      "Access to performance dashboard",
    ],
  },
  {
    name: "Quarterly",
    price: "39",
    period: "/mo",
    billedAs: "billed €117 every 3 months",
    description: "Most members choose this plan.",
    highlight: true,
    features: [
      "Everything in Monthly",
      "Priority access to new verified strategies",
      "Weekly strategy performance recap",
      "Direct line for support questions",
    ],
  },
  {
    name: "Annual",
    price: "29",
    period: "/mo",
    billedAs: "billed €348 every 12 months",
    description: "Best value for committed members.",
    highlight: false,
    features: [
      "Everything in Quarterly",
      "Locked-in rate for 12 months",
      "Early access to new tournament coverage",
      "Quarterly 1:1 performance review",
    ],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" aria-labelledby="pricing-heading" className="relative py-24 sm:py-32 bg-bg-soft border-t border-border overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at top, color-mix(in srgb, var(--color-mint) 8%, transparent), transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          id="pricing-heading"
          align="center"
          eyebrow="Pricing"
          title="Subscribe. Get verified. Get signals."
          description="No lifetime deals, no discretionary upsells — just a subscription to a tracked, transparent signal feed."
        />

        <div className="mt-14 grid lg:grid-cols-3 gap-6 items-start">
          {PLANS.map((plan, i) => (
            <ScrollReveal key={plan.name} delay={i * 0.1}>
              <div
                className={`relative h-full rounded-2xl border p-7 sm:p-8 transition-all duration-300 hover:-translate-y-1 ${
                  plan.highlight
                    ? "border-mint/40 bg-gradient-to-b from-mint/[0.07] to-surface glow-mint"
                    : "border-border bg-surface hover:border-edge"
                }`}
              >
                {plan.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-mint px-3 py-1 text-xs font-medium text-white">
                    Most popular
                  </span>
                )}
                <h3 className="text-text font-medium text-lg">{plan.name}</h3>
                <p className="text-sm text-text-dim mt-1 mb-6">{plan.description}</p>
                <div className="flex items-baseline gap-1">
                  <span className="font-mono-tabular text-4xl text-text font-semibold">
                    €{plan.price}
                  </span>
                  <span className="text-text-faint text-sm">{plan.period}</span>
                </div>
                {plan.billedAs && (
                  <p className="text-xs text-text-faint mt-1.5 font-mono">{plan.billedAs}</p>
                )}

                <ul className="mt-7 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-text-dim">
                      <Check className="size-4 text-mint shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href={TELEGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-colors ${
                    plan.highlight
                      ? "bg-mint text-white hover:bg-mint-dim"
                      : "border border-edge text-text hover:bg-surface-2"
                  }`}
                >
                  Subscribe via Telegram
                  <ArrowUpRight className="size-3.5" />
                </a>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.25} className="mt-10 text-center">
          <p className="text-xs text-text-faint max-w-xl mx-auto">
            Subscriptions are processed through our Telegram bot. Signals are
            for informational purposes only and do not constitute financial
            advice. Past performance does not guarantee future results.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
