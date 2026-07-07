import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Send, LineChart, ShieldCheck, ArrowRight, Plus } from "lucide-react";
import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";
import { TELEGRAM_URL } from "../lib/config";

const FEATURES = [
  {
    icon: Send,
    title: "Messaggi su Telegram in tempo reale",
    description:
      "Ogni segnale arriva sul canale nel momento in cui i nostri modelli confermano un vantaggio — prima che le quote di mercato si aggiustino.",
  },
  {
    icon: LineChart,
    title: "PnL tracciato ed accessibile",
    description:
      "Ogni risultato è registrato insieme al segnale che l'ha generato. Le pagine delle performance rispecchiano il canale, sempre consultabili.",
  },
  {
    icon: Send,
    title: "Supporto clienti H24",
    description:
      "Domande, dubbi o problemi di accesso: una linea diretta sempre attiva, ogni giorno della settimana.",
  },
  {
    icon: ShieldCheck,
    title: "Ricerca di un edge prima dell'implementazione",
    description:
      "Le strategie sono validate in backtest e forward-test in isolamento prima di operare con capitale reale.",
  },
];

export default function ServiceSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="service" aria-labelledby="service-heading" className="relative py-24 sm:py-32 bg-bg-soft border-t border-border">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          id="service-heading"
          eyebrow="Il Servizio"
          title="Non diamo dritte. Costruiamo modelli."
          description="Gli iscritti ricevono segnali automatici e data-driven sul tennistavolo — con lo stesso rigore e la stessa trasparenza di un trading desk quantitativo."
        />

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5 items-start">
          {FEATURES.map((feature, i) => {
            const open = openIndex === i;
            return (
              <ScrollReveal key={feature.title} delay={i * 0.08}>
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => setOpenIndex(open ? null : i)}
                  className={`group w-full text-left rounded-2xl border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 ${
                    open ? "border-mint/50" : "border-border hover:border-edge"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className={`inline-flex items-center justify-center size-10 rounded-lg mb-4 transition-colors ${
                      open ? "bg-mint text-white" : "bg-mint/10 text-mint group-hover:bg-mint group-hover:text-white"
                    }`}>
                      <feature.icon className="size-5" />
                    </div>
                    <Plus
                      className={`size-4 text-text-faint transition-transform duration-300 ${open ? "rotate-45" : ""}`}
                    />
                  </div>
                  <h3 className="text-text font-medium">{feature.title}</h3>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.p
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: "auto", opacity: 1, marginTop: 8 }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden text-sm text-text-dim leading-relaxed"
                      >
                        {feature.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </button>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal delay={0.25} className="mt-14 flex flex-wrap items-center justify-center gap-4">
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-mint px-6 py-3.5 text-base font-medium text-white hover:bg-mint-dim transition-colors glow-mint"
          >
            Entra nel canale GRATIS
            <ArrowRight className="size-4" />
          </a>
          <a
            href="#performance"
            className="inline-flex items-center gap-2 rounded-full border border-edge px-6 py-3.5 text-base font-medium text-text hover:bg-surface-2 transition-colors"
          >
            Guarda le performance 📈
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
