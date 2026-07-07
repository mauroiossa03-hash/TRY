import { useState } from "react";
import { Plus } from "lucide-react";
import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";

interface FaqItem {
  q: string;
  a: React.ReactNode;
}

const ITEMS: FaqItem[] = [
  {
    q: "Come ricevo i segnali?",
    a: (
      <>
        Su Telegram, in tempo reale. Ogni segnale arriva come messaggio con un
        formato fisso: match, stake, quota di riferimento e giocata. Nessuna
        interpretazione richiesta — apri, leggi, decidi.
      </>
    ),
  },
  {
    q: "Quanti segnali arrivano al giorno?",
    a: (
      <>
        Dipende dai mercati. Si gioca solo quando una strategia valida un
        segnale: alcuni giorni possono essere 0, altri 1&ndash;4. Non forziamo
        mai un segnale per riempire la giornata — la selettività è parte del
        vantaggio.
      </>
    ),
  },
  {
    q: "Che differenza c'è tra canale gratuito e abbonamento?",
    a: (
      <>
        Il canale gratuito pubblica i segnali di una sola strategia.
        L'abbonamento sblocca tutte le strategie attive, ciascuna tracciata
        separatamente con il proprio PnL.
      </>
    ),
  },
  {
    q: "Perché proprio il tennistavolo?",
    a: (
      <>
        Perché è un mercato poco seguito. Meno attenzione dai bookmaker
        significa quote più spesso mal prezzate, e la struttura a gironi rende
        il contesto di ogni match modellabile in modo sistematico. È lì che
        nasce il vantaggio statistico.
      </>
    ),
  },
  {
    q: "Il track record è verificabile?",
    a: (
      <>
        Assolutamente sì. Ogni segnale viene regolato e registrato con il suo
        PnL — vittorie e sconfitte, senza selezioni a posteriori. Trovi tutto
        nella{" "}
        <a href="/#performance" className="text-mint hover:underline">
          sezione Performance
        </a>
        , alimentata dagli stessi dati dei segnali inviati.
      </>
    ),
  },
  {
    q: "Su quale bookmaker trovo le quote?",
    a: (
      <>
        Le quote di riferimento sono di bet365; Goldbet, Sisal o operatori
        equivalenti offrono gli stessi mercati. Non abbiamo alcuna affiliazione
        con bookmaker — la scelta dell'operatore è tua.
      </>
    ),
  },
  {
    q: "Quanto capitale serve per seguire i segnali?",
    a: (
      <>
        Ragioniamo in unità, non in euro: consigliamo un bankroll di almeno 10
        unità. Con 100&euro; di bankroll, 1 unità = 10&euro;. Il valore
        dell'unità è personale — c'è chi gioca 50&euro; a unità e chi 150 — ma
        la proporzione resta la stessa per tutti.
      </>
    ),
  },
  {
    q: "Garantite profitti?",
    a: (
      <>
        No, e diffida di chi lo fa. I risultati passati non assicurano
        performance future. Quello che garantiamo è il metodo: strategie
        fisse, tracking trasparente, nessuna decisione emotiva.
      </>
    ),
  },
];

function FaqRow({ item, open, onToggle, index }: {
  item: FaqItem;
  open: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <div className="border border-border rounded-2xl bg-surface overflow-hidden transition-colors hover:border-edge">
      <button
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`faq-panel-${index}`}
        className="flex w-full items-center justify-between gap-4 px-5 sm:px-6 py-5 text-left"
      >
        <span className="text-sm sm:text-base font-medium text-text">
          {item.q}
        </span>
        <Plus
          className={`size-4 shrink-0 text-mint transition-transform duration-300 ${
            open ? "rotate-45" : ""
          }`}
        />
      </button>
      <div
        id={`faq-panel-${index}`}
        role="region"
        className={`grid transition-all duration-300 ease-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-5 sm:px-6 pb-5 text-sm text-text-dim leading-relaxed">
            {item.a}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative py-24 sm:py-32 bg-bg border-t border-border"
    >
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <SectionHeading
          id="faq-heading"
          align="center"
          eyebrow="FAQ"
          title="Domande frequenti."
          description="Tutto quello che c'è da sapere prima di entrare nel canale."
        />

        <div className="mt-14 space-y-3">
          {ITEMS.map((item, i) => (
            <ScrollReveal key={item.q} delay={i * 0.04}>
              <FaqRow
                item={item}
                index={i}
                open={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
