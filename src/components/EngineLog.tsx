import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";
import TerminalLog from "./TerminalLog";
import SignalPipeline from "./SignalPipeline";

export default function EngineLog() {
  return (
    <section aria-labelledby="engine-heading" className="relative py-24 sm:py-32 bg-bg border-t border-border">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          id="engine-heading"
          align="center"
          eyebrow="Sotto il cofano"
          title="Guarda il motore ragionare."
          description="Ogni segnale segue una pipeline fissa — raccolta dati, stato del girone, calcolo del vantaggio, invio. Nessuna decisione discrezionale nel mezzo."
        />
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
