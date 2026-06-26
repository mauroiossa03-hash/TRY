import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import type { ComponentType } from "react";

interface RedirectPageProps {
  icon: ComponentType<{ className?: string }>;
  brandColor: string;
  label: string;
  handle: string;
  description: string;
  url: string;
}

export default function RedirectPage({
  icon: Icon,
  brandColor,
  label,
  handle,
  description,
  url,
}: RedirectPageProps) {
  const [opened, setOpened] = useState(false);

  return (
    <main className="relative min-h-screen flex items-center justify-center bg-bg bg-grid px-5 py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg/95 to-bg" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="relative z-10 w-full max-w-md rounded-2xl border border-border bg-surface p-8 sm:p-10 text-center"
      >
        <div
          className="mx-auto mb-6 inline-flex size-16 items-center justify-center rounded-2xl"
          style={{ backgroundColor: `${brandColor}1a`, color: brandColor }}
        >
          <Icon className="size-8" />
        </div>

        <p className="font-mono text-xs uppercase tracking-[0.18em] text-text-faint mb-2">
          Continue to {label}
        </p>
        <h1 className="text-2xl font-semibold text-text mb-2">{handle}</h1>
        <p className="text-sm text-text-dim leading-relaxed mb-8">{description}</p>

        <div className="h-1 w-full rounded-full bg-surface-2 overflow-hidden mb-6">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: brandColor }}
            initial={{ width: "0%" }}
            animate={{ width: opened ? "100%" : "0%" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setOpened(true)}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: brandColor }}
        >
          Open {label} now
          <ArrowUpRight className="size-3.5" />
        </a>

        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-1.5 text-xs text-text-faint hover:text-text-dim transition-colors"
        >
          <ArrowLeft className="size-3.5" />
          Back to home
        </Link>
      </motion.div>
    </main>
  );
}
