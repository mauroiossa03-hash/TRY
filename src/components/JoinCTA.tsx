import { ArrowUpRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { TELEGRAM_URL } from "../lib/config";

export default function JoinCTA() {
  return (
    <section id="join" aria-labelledby="join-heading" className="relative border-t border-border bg-bg-soft py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-5 sm:px-8 text-center">
        <SectionHeading
          id="join-heading"
          align="center"
          eyebrow="Get Started"
          title="Join the signal feed."
          description="Real-time entries, tracked transparently, delivered where you already are."
        />
        <div className="mt-10 rounded-3xl border border-border bg-surface px-8 py-10 sm:px-12 sm:py-14">
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-mint px-7 py-3.5 text-base font-medium text-white hover:bg-mint-dim transition-colors glow-mint"
          >
            Join on Telegram
            <ArrowUpRight className="size-4" />
          </a>
          <p className="mt-4 text-xs text-text-faint">
            Free preview channel · No signup required to peek
          </p>
        </div>
      </div>
    </section>
  );
}
