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
  note?: string;
}

function mapResult(r?: string): RecentSignal["result"] {
  if (r === "win" || r === "loss" || r === "void") return r;
  return "open";
}

// Notes look like "Kolar V. vs Ruzicka J. @2.37".
// Pull out the matchup ("A vs B") and the odds. The pick is intentionally
// NOT inferred — the note doesn't record which side was backed.
function parseNote(note?: string): { matchup: string; odds: number } {
  if (!note) return { matchup: "", odds: 0 };
  const oddsMatch = note.match(/@\s*([0-9]+(?:[.,][0-9]+)?)/);
  const odds = oddsMatch ? Number(oddsMatch[1].replace(",", ".")) : 0;
  const matchup = note
    .replace(/@\s*[0-9]+(?:[.,][0-9]+)?.*$/, "") // drop "@odds" and anything after
    .trim();
  return { matchup, odds };
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
          .select("*")
          .in("result", ["win", "loss", "void"])
          .order("date", { ascending: true })
          .order("id", { ascending: true });

        if (qErr) throw qErr;
        if (cancelled) return;

        const rows = (data ?? []) as (BetRow & SignalRow)[];

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

        // Build the live preview from the SAME rows as the graph — the last 4,
        // newest first — so the table can never diverge from the chart.
        // Descriptive columns (matchup/tag/tournament/odds) are rendered only
        // if they exist on the row; otherwise the cell is omitted on the UI side.
        const recent: RecentSignal[] = rows
          .slice(-4)
          .reverse()
          .map((s) => {
            const parsed = parseNote(s.note);
            return {
              id:
                s.id != null
                  ? typeof s.id === "number"
                    ? `SIG-${String(s.id).padStart(4, "0")}`
                    : String(s.id)
                  : "",
              tag: s.tag ?? "",
              tournament: s.tournament ?? "",
              matchup: s.matchup || parsed.matchup,
              odds: Number(s.odds ?? 0) || parsed.odds,
              result: mapResult(s.result),
              pnl: Number(s.pnl ?? 0),
            };
          });
        setRecentSignals(recent);
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
