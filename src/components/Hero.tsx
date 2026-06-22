import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { HERO_TABLE_PHOTO, TELEGRAM_URL } from "../lib/config";
import BackgroundPaths from "./BackgroundPaths";
import SplitFlap from "./SplitFlap";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const ballLeft = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    ["20%", "50%", "78%", "46%", "22%"],
  );
  const ballTop = useTransform(
    scrollYProgress,
    [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1],
    ["62%", "40%", "60%", "38%", "58%", "40%", "60%", "42%", "62%"],
  );
  const ballScale = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0.85, 1.1, 0.85, 1.1, 0.85],
  );

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden bg-bg">
      <div className="absolute inset-0 bg-grid opacity-60" />
      <BackgroundPaths className="z-[5] opacity-70" />

      <div className="relative z-10 mx-auto max-w-7xl w-full px-5 sm:px-8 pt-24 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="inline-flex items-center gap-2 rounded-full border border-edge bg-surface px-4 py-1.5 mb-8"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full rounded-full bg-mint opacity-75 animate-ping" />
                <span className="relative inline-flex size-2 rounded-full bg-mint" />
              </span>
              <span className="font-mono text-xs tracking-wide text-text-dim">
                LIVE &middot; Czech Liga Pro &amp; TT Cup &middot; 86 signals tracked
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="text-gradient text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05]"
            >
              Quant signals for table tennis. Tracked like a trading desk.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.22, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="mt-6 text-lg sm:text-xl text-text-dim max-w-xl leading-relaxed"
            >
              We model structural inefficiencies in round-robin group-stage
              dynamics and deliver edge-verified entries straight to your
              Telegram — entry, odds, strategy tag, and PnL, every time.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.34, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-mint px-6 py-3.5 text-base font-medium text-white hover:bg-mint-dim transition-colors glow-mint"
              >
                Get signals on Telegram
                <ArrowUpRight className="size-4" />
              </a>
              <a
                href="#performance"
                className="inline-flex items-center gap-2 rounded-full border border-edge px-6 py-3.5 text-base font-medium text-text hover:border-text-dim hover:bg-surface-2 transition-colors"
              >
                View track record
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-16 flex flex-wrap gap-x-10 gap-y-4"
            >
              {[
                { label: "Win rate", value: "59.4%" },
                { label: "Signals tracked", value: "86" },
                { label: "Cumulative units", value: "+15.3u" },
                { label: "Avg. odds", value: "1.94" },
              ].map((stat) => (
                <div key={stat.label}>
                  <SplitFlap
                    value={stat.value}
                    className="text-2xl text-mint font-semibold"
                    cellClassName="rounded-sm bg-surface-2 border border-edge px-1 mr-0.5"
                  />
                  <div className="text-xs text-text-faint mt-2 uppercase tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            <div className="relative rounded-[2rem] overflow-hidden border border-border bg-surface shadow-2xl ring-1 ring-edge rotate-[2deg]">
              <img
                src={HERO_TABLE_PHOTO}
                alt="Table tennis table mid-rally"
                className="w-full h-auto object-cover"
              />
              <motion.div
                className="absolute size-3 rounded-full bg-white shadow-[0_0_10px_2px_rgba(255,255,255,0.8)] ring-1 ring-edge"
                style={{ left: ballLeft, top: ballTop, scale: ballScale }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="size-5 text-text-faint" />
      </motion.div>
    </section>
  );
}
