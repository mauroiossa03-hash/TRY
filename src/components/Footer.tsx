import { Link } from "react-router-dom";
import { BRAND_NAME, TELEGRAM_URL, INSTAGRAM_URL } from "../lib/config";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg-soft">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="size-2 rounded-full bg-mint" />
            <span className="font-mono text-sm tracking-[0.18em] text-text">
              {BRAND_NAME}
            </span>
          </div>
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
            <li><Link to="/telegram" className="hover:text-text transition-colors">Telegram Channel</Link></li>
            <li><Link to="/instagram" className="hover:text-text transition-colors">Instagram</Link></li>
            <li><a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:text-text transition-colors">Direct Telegram Link</a></li>
            <li><a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:text-text transition-colors">Direct Instagram Link</a></li>
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
