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
      description="Entra nel canale per ricevere segnali live sul tennistavolo con vantaggio verificato e piena trasparenza su entrata, quote e PnL."
      url={TELEGRAM_URL}
    />
  );
}
