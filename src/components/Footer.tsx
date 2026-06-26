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
            Quantitative betting signals for table tennis round-robin
            markets. Tracked, verified, delivered live.
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wider text-text-faint mb-3">
            Navigate
          </p>
          <ul className="space-y-2 text-sm text-text-dim">
            <li><a href="/#service" className="hover:text-text transition-colors">The Service</a></li>
            <li><a href="/#approach" className="hover:text-text transition-colors">What We Do</a></li>
            <li><a href="/#performance" className="hover:text-text transition-colors">Performance</a></li>
            <li><a href="/#pricing" className="hover:text-text transition-colors">Pricing</a></li>
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wider text-text-faint mb-3">
            Connect
          </p>
          <ul className="space-y-2 text-sm text-text-dim">
            <li><a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:text-text transition-colors">Telegram Channel</a></li>
            <li><a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:text-text transition-colors">Instagram</a></li>
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wider text-text-faint mb-3">
            Disclaimer
          </p>
          <p className="text-sm text-text-dim">
            Signals are statistical estimates, not guarantees. Betting
            involves risk of loss. Must be of legal age in your
            jurisdiction. Bet responsibly.
          </p>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-text-faint">
          <span>&copy; {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.</span>
          <span className="font-mono">v1.0 / edge-verified</span>
        </div>
      </div>
    </footer>
  );
}
