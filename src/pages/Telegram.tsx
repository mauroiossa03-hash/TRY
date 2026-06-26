import { Send } from "lucide-react";
import RedirectPage from "./RedirectPage";
import { TELEGRAM_URL } from "../lib/config";
import { useDocTitle } from "../lib/useDocTitle";

export default function Telegram() {
  useDocTitle("Telegram — Quantitative Betting");

  return (
    <RedirectPage
      icon={Send}
      brandColor="#229ed9"
      label="Telegram"
      handle="@quantitativebetting"
      description="Join the channel to receive live, edge-verified table tennis signals with full entry, odds, and PnL transparency."
      url={TELEGRAM_URL}
    />
  );
}
