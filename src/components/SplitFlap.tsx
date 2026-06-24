import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useReducedMotion } from "../lib/useReducedMotion";

const DIGITS = "0123456789";
const TICKS = 9;
const TICK_MS = 55;
const STAGGER_MS = 30;

function digitSequence(target: string) {
  const targetIdx = DIGITS.indexOf(target);
  if (targetIdx === -1) return null;
  const startIdx = (((targetIdx - (TICKS - 1)) % 10) + 10) % 10;
  return Array.from({ length: TICKS }, (_, t) => DIGITS[(startIdx + t) % 10]);
}

interface SplitFlapProps {
  value: string;
  className?: string;
  cellClassName?: string;
}

export default function SplitFlap({ value, className = "", cellClassName = "" }: SplitFlapProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reducedMotion = useReducedMotion();
  const startedRef = useRef(false);
  const [display, setDisplay] = useState<string[]>(() =>
    value.split("").map((c) => (DIGITS.includes(c) ? "0" : c)),
  );

  useEffect(() => {
    if (!inView || startedRef.current || reducedMotion) return;
    startedRef.current = true;

    const targetChars = value.split("");
    const timeouts: number[] = [];
    targetChars.forEach((target, i) => {
      const seq = digitSequence(target);
      if (!seq) return;
      seq.forEach((char, t) => {
        const id = window.setTimeout(() => {
          setDisplay((prev) => {
            const next = [...prev];
            next[i] = char;
            return next;
          });
        }, i * STAGGER_MS + t * TICK_MS);
        timeouts.push(id);
      });
    });
    return () => timeouts.forEach(clearTimeout);
  }, [inView, value, reducedMotion]);

  const shown = reducedMotion ? value.split("") : display;

  return (
    <span ref={ref} className={`inline-flex ${className}`}>
      {shown.map((c, i) => (
        <span key={i} className={`inline-block overflow-hidden ${cellClassName}`}>
          <span key={c} className="flap-char inline-block">
            {c}
          </span>
        </span>
      ))}
    </span>
  );
}
