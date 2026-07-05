import { Check, ArrowUpRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";
import { TELEGRAM_URL } from "../lib/config";

const PLANS = [
  {
    name: "Mensile",
    price: "49",
    period: "/mese",
    description: "Accesso completo, fatturato mensilmente. Disdici quando vuoi.",
    highlight: true,
    features: [
      "Tutti i segnali live (3ª partita + 6ª decisiva)",
      "Entrata, quota, tag e PnL su ogni segnale",
      "Consegna su Telegram in tempo reale",
      "Accesso alla dashboard delle performance",
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
          eyebrow="Prezzi"
          title="Abbonati ORA per ricevere tutti i segnali."
          description="Il canale gratuito mostra una sola strategia. Con l'abbonamento ricevi i segnali di tutte le strategie attive — tracciati e trasparenti, senza offerte a vita né upsell discrezionali."
        />

        <div className="mt-14 max-w-md mx-auto">
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
                    Più scelto
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
                  Abbonati su Telegram
                  <ArrowUpRight className="size-3.5" />
                </a>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.25} className="mt-10 text-center">
          <p className="text-xs text-text-faint max-w-xl mx-auto">
            Gli abbonamenti sono gestiti tramite il nostro bot Telegram. I
            segnali hanno solo scopo informativo e non costituiscono consulenza
            finanziaria. I risultati passati non garantiscono risultati futuri.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
