import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Counter from "./Counter";
import Logo from "./Logo";

const CALLOUTS = [
  { value: 1240, suffix: "+", label: "Match di girone modellati" },
  { value: 2, suffix: "", label: "Strategie live" },
];

export default function VideoDivider() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [reduceMotion, setReduceMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const textY = useTransform(scrollYProgress, [0, 1], reduceMotion ? ["0%", "0%"] : ["8%", "-8%"]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[60vh] sm:h-[70vh] overflow-hidden border-y border-border bg-bg-soft"
    >
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <Logo decorative className="h-[180%] w-auto opacity-[0.06]" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-bg-soft via-transparent to-bg-soft" />

      <motion.div
        style={{ y: textY }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-5"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="font-mono text-xs uppercase tracking-[0.18em] text-mint mb-4"
        >
          Disciplina, non istinto
        </motion.p>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-gradient text-3xl sm:text-5xl font-semibold tracking-tight max-w-3xl leading-tight"
        >
          Ogni scenario di match è una regola. Ogni regola è prima validata in backtest.
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
                  decimals={0}
                  suffix={c.suffix}
                />
              </div>
              <div className="text-xs text-text-faint mt-1 uppercase tracking-wide">
                {c.label}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
