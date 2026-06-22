import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { HERO_VIDEO_URL, HERO_FALLBACK_IMAGE, TELEGRAM_URL } from "../lib/config";
import SplitFlap from "./SplitFlap";

export default function Hero() {
  const [videoFailed, setVideoFailed] = useState(false);
  const [isMobile, setIsMobile] = useState(
    () =>
      window.matchMedia("(max-width: 640px)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setIsMobile(mq.matches || reduceMotion.matches);
    mq.addEventListener("change", onChange);
    reduceMotion.addEventListener("change", onChange);
    return () => {
      mq.removeEventListener("change", onChange);
      reduceMotion.removeEventListener("change", onChange);
    };
  }, []);

  const showVideo = !isMobile && !videoFailed;

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
      {showVideo ? (
        <video
          className="absolute inset-0 size-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={HERO_FALLBACK_IMAGE}
          onError={() => setVideoFailed(true)}
        >
          <source src={HERO_VIDEO_URL} type="video/mp4" />
        </video>
      ) : (
        <img
          src={HERO_FALLBACK_IMAGE}
          alt="Table tennis rally"
          className="absolute inset-0 size-full object-cover"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/55 to-black/85" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/15 to-black/70" />

      <div className="relative z-10 mx-auto max-w-4xl w-full px-5 sm:px-8 pt-24 pb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 mb-8"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full rounded-full bg-mint opacity-75 animate-ping" />
            <span className="relative inline-flex size-2 rounded-full bg-mint" />
          </span>
          <span className="font-mono text-xs tracking-wide text-white/80">
            LIVE &middot; Czech Liga Pro &amp; TT Cup &middot; 86 signals tracked
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-white text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05]"
        >
          Quant signals for table tennis. Tracked like a trading desk.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.22, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mt-6 text-lg sm:text-xl text-white/75 max-w-2xl mx-auto leading-relaxed"
        >
          We model structural inefficiencies in round-robin group-stage
          dynamics and deliver edge-verified entries straight to your
          Telegram — entry, odds, strategy tag, and PnL, every time.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.34, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
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
            className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3.5 text-base font-medium text-white hover:bg-white/10 transition-colors"
          >
            View track record
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 flex flex-wrap justify-center gap-x-10 gap-y-4"
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
                className="text-2xl text-mint font-semibold justify-center"
                cellClassName="rounded-sm bg-white/10 border border-white/20 px-1 mr-0.5"
              />
              <div className="text-xs text-white/50 mt-2 uppercase tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="size-5 text-white/60" />
      </motion.div>
    </section>
  );
}
