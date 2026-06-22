import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";
import TerminalLog from "./TerminalLog";

export default function EngineLog() {
  return (
    <section className="relative py-24 sm:py-32 bg-bg border-t border-border">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <SectionHeading
          align="center"
          eyebrow="Under The Hood"
          title="Watch the engine think."
          description="Every signal traces a fixed pipeline — scrape, resolve group state, price the edge, fire. Nothing discretionary happens in between."
        />
        <ScrollReveal delay={0.15} className="mt-12">
          <TerminalLog />
        </ScrollReveal>
      </div>
    </section>
  );
}
