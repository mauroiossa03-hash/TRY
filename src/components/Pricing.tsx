import { Check, X, ArrowUpRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";
import { TELEGRAM_URL } from "../lib/config";

type Feature = { label: string; included: boolean };

type Plan = {
  name: string;
  price: string;
  period: string;
  description: string;
  highlight: boolean;
  badge?: string;
  cta: string;
  features: Feature[];
};

const PLANS: Plan[] = [
  {
    name: "Prova gratis",
    price: "0",
    period: "",
    description: "Testa il servizio senza impegno, per un periodo limitato.",
    highlight: false,
    cta: "Entra nel canale GRATIS",
    features: [
      { label: "1 sola strategia (per un periodo limitato)", included: false },
      { label: "Entrata, quota, tag e PnL su ogni segnale", included: true },
      { label: "Consegna su Telegram in tempo reale", included: true },
      { label: "Accesso alla dashboard delle performance", included: true },
      { label: "Supporto clienti", included: false },
      { label: "Chat di gruppo", included: false },
    ],
  },
  {
    name: "Mensile",
    price: "49",
    period: "/mese",
    description: "Accesso completo, fatturato mensilmente. Disdici quando vuoi.",
    highlight: true,
    badge: "Più scelto",
    cta: "Abbonati su Telegram",
    features: [
      { label: "Accesso ai segnali di tutte le strategie", included: true },
      { label: "Entrata, quota, tag e PnL su ogni segnale", included: true },
      { label: "Consegna su Telegram in tempo reale", included: true },
      { label: "Accesso alla dashboard delle performance", included: true },
      { label: "Supporto clienti", included: true },
      { label: "Chat di gruppo", included: true },
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

        <div className="mt-14 grid gap-6 sm:grid-cols-2 max-w-3xl mx-auto items-stretch">
          {PLANS.map((plan, i) => (
            <ScrollReveal key={plan.name} delay={i * 0.1}>
              <div
                className={`relative h-full rounded-2xl border p-7 sm:p-8 transition-all duration-300 hover:-translate-y-1 ${
                  plan.highlight
                    ? "border-mint/40 bg-gradient-to-b from-mint/[0.07] to-surface glow-mint"
                    : "border-border bg-surface hover:border-edge"
                }`}
              >
                {plan.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-mint px-3 py-1 text-xs font-medium text-white">
                    {plan.badge}
                  </span>
                )}
                <h3 className="text-text font-medium text-lg">{plan.name}</h3>
                <p className="text-sm text-text-dim mt-1 mb-6">{plan.description}</p>
                <div className="flex items-baseline gap-1">
                  <span className="font-mono-tabular text-4xl text-text font-semibold">
                    €{plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-text-faint text-sm">{plan.period}</span>
                  )}
                </div>

                <ul className="mt-7 space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature.label}
                      className={`flex items-start gap-2.5 text-sm ${
                        feature.included ? "text-text-dim" : "text-text-faint"
                      }`}
                    >
                      {feature.included ? (
                        <Check className="size-4 text-mint shrink-0 mt-0.5" />
                      ) : (
                        <X className="size-4 text-text-faint shrink-0 mt-0.5" />
                      )}
                      {feature.label}
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
                  {plan.cta}
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
