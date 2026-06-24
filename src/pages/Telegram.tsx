import { Send } from "lucide-react";
import RedirectPage from "./RedirectPage";
import { TELEGRAM_URL } from "../lib/config";
import { useDocTitle } from "../lib/useDocTitle";

export default function Telegram() {
  useDocTitle("Telegram — SPINEDGE");

  return (
    <RedirectPage
      icon={Send}
      brandColor="#2dd4a7"
      label="Telegram"
      handle="@spinedge_signals"
      description="Join the channel to receive live, edge-verified table tennis signals with full entry, odds, and PnL transparency."
      url={TELEGRAM_URL}
    />
  );
}
