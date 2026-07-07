import ScrollReveal from "./ScrollReveal";
import TerminalLog from "./TerminalLog";
import SignalPipeline from "./SignalPipeline";
import Logo from "./Logo";

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

      </div>
    </section>
  );
}
