import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";
import TerminalLog from "./TerminalLog";
import { CpuArchitecture } from "./ui/cpu-architecture";
import { ENGINE_BLADE_PHOTO } from "../lib/config";

export default function EngineLog() {
  return (
    <section className="relative py-24 sm:py-32 bg-bg border-t border-border">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          align="center"
          eyebrow="Under The Hood"
          title="Watch the engine think."
          description="Every signal traces a fixed pipeline — scrape, resolve group state, price the edge, fire. Nothing discretionary happens in between."
        />
        <div className="mt-12 grid lg:grid-cols-2 gap-8 items-center">
          <ScrollReveal delay={0.1} className="flex items-center justify-center overflow-hidden rounded-2xl border border-border bg-surface p-8">
            <CpuArchitecture
              scale={2.4}
              imageSrc={ENGINE_BLADE_PHOTO}
              imageAlt="Engine processing core"
            />
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <TerminalLog />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
