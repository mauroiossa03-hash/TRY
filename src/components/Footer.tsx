import Logo from "./Logo";
import { BRAND_NAME, BRAND_TAGLINE, TELEGRAM_URL, INSTAGRAM_URL } from "../lib/config";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg-soft">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <Logo className="size-8 shrink-0" />
            <span className="font-semibold tracking-tight text-base text-text leading-none">
              Quantitative <span className="text-mint">Betting</span>
            </span>
          </div>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-text-faint mb-3">
            {BRAND_TAGLINE}
          </p>
          <p className="text-sm text-text-dim max-w-xs">
            Segnali di scommesse quantitative sui mercati a girone del
            tennistavolo. Tracciati, verificati, consegnati live.
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wider text-text-faint mb-3">
            Naviga
          </p>
          <ul className="space-y-2 text-sm text-text-dim">
            <li><a href="/#service" className="hover:text-text transition-colors">Il Servizio</a></li>
            <li><a href="/#performance" className="hover:text-text transition-colors">Performance</a></li>
            <li><a href="/#pricing" className="hover:text-text transition-colors">Prezzi</a></li>
            <li><a href="/#faq" className="hover:text-text transition-colors">FAQ</a></li>
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wider text-text-faint mb-3">
            Seguici
          </p>
          <ul className="space-y-2 text-sm text-text-dim">
            <li><a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:text-text transition-colors">Canale Telegram</a></li>
            <li><a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:text-text transition-colors">Instagram</a></li>
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wider text-text-faint mb-3">
            Avvertenze
          </p>
          <p className="text-sm text-text-dim">
            I segnali sono stime statistiche, non garanzie. Le scommesse
            comportano il rischio di perdite. Contenuti riservati a un pubblico
            maggiorenne (18+). Gioca responsabilmente.
          </p>
          <p className="text-xs text-text-faint mt-3">
            Quantitative Betting non è un bookmaker, non raccoglie scommesse e
            non gestisce denaro dei clienti. Tutti i contenuti hanno finalità
            informativa e statistica e non costituiscono consulenza finanziaria.
          </p>
          <p className="text-xs text-text-faint mt-3">
            Il gioco può causare dipendenza patologica. Numero verde nazionale
            per le problematiche legate al gioco d'azzardo:{" "}
            <a href="tel:800558822" className="underline hover:text-text-dim transition-colors">
              800&nbsp;558&nbsp;822
            </a>{" "}
            (gratuito).
          </p>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-text-faint">
          <span>&copy; {new Date().getFullYear()} {BRAND_NAME}. Tutti i diritti riservati.</span>
          <span className="flex items-center gap-3">
            <span
              className="inline-flex items-center justify-center rounded-full border border-border px-2 py-0.5 font-mono font-semibold text-text-dim"
              aria-label="Contenuti riservati ai maggiori di 18 anni"
              title="Contenuti riservati ai maggiori di 18 anni"
            >
              18+
            </span>
            <span className="font-mono">v1.0 / vantaggio verificato</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
