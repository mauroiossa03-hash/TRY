import { motion } from "framer-motion";

const STAGES = [
  { label: "SCRAPE", subtitle: "Feed live di match e quote" },
  { label: "GROUP STATE", subtitle: "Classifica del girone risolta" },
  { label: "DE-MARGIN", subtitle: "Margine del bookmaker rimosso" },
  { label: "EDGE CHECK", subtitle: "Confronto con la probabilità del modello" },
  { label: "FIRE", subtitle: "Segnale inviato su Telegram" },
];

export default function SignalPipeline() {
  return (
    <div className="w-full max-w-[480px] mx-auto flex flex-col">
      {STAGES.map((stage, i) => {
        const isLast = i === STAGES.length - 1;
        return (
          <div key={stage.label} className="flex flex-col items-stretch">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.12 }}
              className={`rounded-lg border p-3 ${
                isLast
                  ? "bg-mint/10 border-mint/40 text-mint"
                  : "bg-surface border-border text-text"
              }`}
            >
              <div className="font-mono text-sm font-semibold tracking-wide">
                {stage.label}
              </div>
              <div
                className={`text-xs mt-0.5 ${isLast ? "text-mint/80" : "text-text-faint"}`}
              >
                {stage.subtitle}
              </div>
            </motion.div>

            {!isLast && (
              <svg
                width="2"
                height="28"
                viewBox="0 0 2 28"
                className="text-edge mx-auto"
              >
                <motion.path
                  d="M 1 0 V 28"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.3, delay: i * 0.12 + 0.2 }}
                />
              </svg>
            )}
          </div>
        );
      })}
    </div>
  );
}
