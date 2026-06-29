import { createContext, useContext, type ReactNode } from "react";
import { usePerformance, type PerformanceStats } from "./usePerformance";
import type { PnlPoint } from "./mockData";

interface PerformanceContextValue {
  series: PnlPoint[];
  stats: PerformanceStats;
  isMock: boolean;
  loading: boolean;
  error: string | null;
}

const PerformanceContext = createContext<PerformanceContextValue | null>(null);

// Runs usePerformance ONCE and shares the result so the hero badge,
// the demo banner, and the performance section all agree on whether
// the numbers on screen are real or demo.
export function PerformanceProvider({ children }: { children: ReactNode }) {
  const value = usePerformance();
  return (
    <PerformanceContext.Provider value={value}>
      {children}
    </PerformanceContext.Provider>
  );
}

export function usePerformanceContext(): PerformanceContextValue {
  const ctx = useContext(PerformanceContext);
  if (!ctx) {
    throw new Error("usePerformanceContext must be used within PerformanceProvider");
  }
  return ctx;
}
