import { useEffect, useState } from "react";
import { supabase, supabaseConfigured } from "./supabaseClient";
import { PNL_SERIES, PERFORMANCE_STATS, type PnlPoint } from "./mockData";

export interface PerformanceStats {
  totalSignals: number;
  winRate: number; // 0..1
  units: number;
  sinceDate?: string;
  lastDate?: string;
}

interface UsePerformanceResult {
  series: PnlPoint[];
  stats: PerformanceStats;
  isMock: boolean;
  loading: boolean;
  error: string | null;
}

const MOCK_STATS: PerformanceStats = {
  totalSignals: PERFORMANCE_STATS.totalSignals,
  winRate: PERFORMANCE_STATS.winRate,
  units: PERFORMANCE_STATS.units,
};

interface BetRow {
  date: string;
  pnl: number;
  result: string;
}

export function usePerformance(): UsePerformanceResult {
  const [series, setSeries] = useState<PnlPoint[]>(PNL_SERIES);
  const [stats, setStats] = useState<PerformanceStats>(MOCK_STATS);
  const [isMock, setIsMock] = useState(true);
  const [loading, setLoading] = useState(supabaseConfigured);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase) return; // not configured -> keep mock, no spinner

    let cancelled = false;

    (async () => {
      try {
        const { data, error: qErr } = await supabase
          .from("public_bets")
          .select("date, pnl, result")
          .in("result", ["win", "loss", "void"])
          .order("date", { ascending: true })
          .order("id", { ascending: true });

        if (qErr) throw qErr;
        if (cancelled) return;

        const rows = (data ?? []) as BetRow[];

        // Empty table -> keep mock so the page never looks broken.
        if (rows.length === 0) {
          setLoading(false);
          return;
        }

        // Build cumulative curve in units.
        let cum = 0;
        const mapped: PnlPoint[] = rows.map((row, i) => {
          cum += Number(row.pnl);
          return {
            signal: i + 1,
            date: row.date,
            cumPnl: Math.round(cum * 100) / 100,
          };
        });

        const wins = rows.filter((r) => r.result === "win").length;
        const decided = rows.filter(
          (r) => r.result === "win" || r.result === "loss"
        ).length;

        setSeries(mapped);
        setStats({
          totalSignals: rows.length,
          winRate: decided > 0 ? wins / decided : 0,
          units: mapped[mapped.length - 1].cumPnl,
          sinceDate: rows[0].date,
          lastDate: rows[rows.length - 1].date,
        });
        setIsMock(false);
        setLoading(false);
      } catch (e) {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : "fetch failed");
        setLoading(false); // keep mock data on error
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return { series, stats, isMock, loading, error };
}
