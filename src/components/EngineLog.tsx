import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import TerminalLog from "./TerminalLog";
import SignalPipeline from "./SignalPipeline";
import Counter from "./Counter";
import Logo from "./Logo";

const CALLOUTS = [
  { value: 2, suffix: "", label: "Strategie live" },
  { value: 1240, prefix: "+", suffix: "", label: "Match di girone modellati" },
];

export default function EngineLog() {
  return (
    <section
      aria-labelledby="engine-heading"
      className="relative py-24 sm:py-32 bg-bg border-t border-border overflow-hidden"
    >
      {/* paddle emblem backdrop (moved from the old divider section) */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <Logo decorative className="h-[150%] w-auto opacity-[0.06]" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-bg via-transparent to-bg" />

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
        <ScrollReveal className="text-center mx-auto max-w-2xl">
          <div className="flex items-center justify-center gap-2 mb-4 font-mono text-xs tracking-[0.18em] text-mint uppercase">
            <span className="h-px w-6 bg-mint" />
            Sotto il cofano
          </div>
          <h2
            id="engine-heading"
            className="text-gradient text-3xl sm:text-4xl font-semibold tracking-tight"
          >
            Disciplina e Metodo, non Emozioni.
          </h2>
          <p className="mt-4 text-text-dim text-base sm:text-lg leading-relaxed">
            Ogni segnale segue una pipeline fissa — raccolta dati, stato del
            girone, calcolo del vantaggio, invio. Nessuna decisione
            discrezionale nel mezzo.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid lg:grid-cols-2 gap-8 items-center">
          <ScrollReveal delay={0.1} className="flex items-center justify-center overflow-hidden rounded-2xl border border-border bg-surface p-8">
            <SignalPipeline />
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <TerminalLog />
          </ScrollReveal>
        </div>

        {/* stats moved below the engine */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-16 gap-y-8 font-mono-tabular">
          {CALLOUTS.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl sm:text-4xl text-text font-semibold">
                <Counter value={c.value} decimals={0} prefix={c.prefix} suffix={c.suffix} />
              </div>
              <div className="text-xs text-text-faint mt-1 uppercase tracking-wide">
                {c.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
