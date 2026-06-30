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

export interface RecentSignal {
  id: string;
  tag: string;
  tournament: string;
  matchup: string;
  odds: number;
  result: "win" | "loss" | "void" | "open";
  pnl: number;
}

interface UsePerformanceResult {
  series: PnlPoint[];
  stats: PerformanceStats;
  recentSignals: RecentSignal[];
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

interface SignalRow {
  id?: number | string;
  date?: string;
  matchup?: string;
  tag?: string;
  tournament?: string;
  odds?: number;
  result?: string;
  pnl?: number;
}

function mapResult(r?: string): RecentSignal["result"] {
  if (r === "win" || r === "loss" || r === "void") return r;
  return "open";
}

export function usePerformance(): UsePerformanceResult {
  const [series, setSeries] = useState<PnlPoint[]>(PNL_SERIES);
  const [stats, setStats] = useState<PerformanceStats>(MOCK_STATS);
  const [recentSignals, setRecentSignals] = useState<RecentSignal[]>([]);
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

        // Fetch the most recent signals for the live preview table.
        // Best-effort: if the extra columns don't exist, the preview
        // simply keeps its fallback and the rest of the page is unaffected.
        try {
          const { data: sigData, error: sigErr } = await supabase
            .from("public_bets")
            .select("id, date, matchup, tag, tournament, odds, result, pnl")
            .order("date", { ascending: false })
            .order("id", { ascending: false })
            .limit(4);

          if (!sigErr && sigData && !cancelled) {
            const signals = (sigData as SignalRow[])
              .filter((s) => s.matchup)
              .map((s) => ({
                id:
                  typeof s.id === "number"
                    ? `SIG-${String(s.id).padStart(4, "0")}`
                    : String(s.id ?? ""),
                tag: s.tag ?? "",
                tournament: s.tournament ?? "",
                matchup: s.matchup ?? "",
                odds: Number(s.odds ?? 0),
                result: mapResult(s.result),
                pnl: Number(s.pnl ?? 0),
              }));
            if (signals.length > 0) setRecentSignals(signals);
          }
        } catch {
          // ignore — preview falls back to its default
        }
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

  return { series, stats, recentSignals, isMock, loading, error };
}
