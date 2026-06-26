import { useState } from "react";
import { X } from "lucide-react";
import { IS_MOCK_DATA } from "../lib/mockData";

const STORAGE_KEY = "qb-demo-banner-dismissed";

export default function DemoBanner() {
  const [dismissed, setDismissed] = useState(
    () => localStorage.getItem(STORAGE_KEY) === "1",
  );

  if (!IS_MOCK_DATA || dismissed) return null;

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    setDismissed(true);
  };

  return (
    <div className="sticky top-16 z-40 mt-16 bg-amber/10 border-b border-amber/30">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-2 flex items-center justify-between gap-4">
        <p className="font-mono text-xs text-amber">
          DATI DEMO — i numeri di performance qui sotto sono illustrativi, non risultati reali
        </p>
        <button
          aria-label="Chiudi l'avviso sui dati demo"
          onClick={dismiss}
          className="text-amber hover:opacity-70 transition-opacity shrink-0"
        >
          <X className="size-4" />
        </button>
      </div>
    </div>
  );
}
