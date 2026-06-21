import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Counter from "./Counter";
import { DIVIDER_VIDEO_URL, DIVIDER_FALLBACK_IMAGE } from "../lib/config";

const CALLOUTS = [
  { value: 1240, suffix: "+", label: "Group matches modeled" },
  { value: 2, suffix: "", label: "Live strategies" },
  { value: 0.4, decimals: 1, suffix: "u", prefix: "≥", label: "Min. edge to fire" },
];

export default function VideoDivider() {
  const sectionRef = useRef<HTMLDivElement>(null);
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

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  const showVideo = !isMobile && !videoFailed;

  return (
    <section
      ref={sectionRef}
      className="relative h-[60vh] sm:h-[70vh] overflow-hidden border-y border-border"
    >
      <motion.div className="absolute inset-0 -top-[12%] -bottom-[12%]" style={{ y }}>
        {showVideo ? (
          <video
            className="size-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={DIVIDER_FALLBACK_IMAGE}
            onError={() => setVideoFailed(true)}
          >
            <source src={DIVIDER_VIDEO_URL} type="video/mp4" />
          </video>
        ) : (
          <img
            src={DIVIDER_FALLBACK_IMAGE}
            alt="Close-up table tennis rally"
            className="size-full object-cover"
          />
        )}
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-bg/90 via-bg/35 to-bg/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-bg/55 via-transparent to-bg/55" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-5">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="font-mono text-xs uppercase tracking-[0.18em] text-mint mb-4"
        >
          Discipline over instinct
        </motion.p>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-gradient text-3xl sm:text-5xl font-semibold tracking-tight max-w-3xl leading-tight"
        >
          Every match scenario is a rule. Every rule is backtested first.
        </motion.h3>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 font-mono-tabular">
          {CALLOUTS.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.25 + i * 0.1 }}
            >
              <div className="text-2xl sm:text-3xl text-text font-semibold">
                <Counter
                  value={c.value}
                  decimals={c.decimals ?? 0}
                  prefix={c.prefix}
                  suffix={c.suffix}
                />
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
