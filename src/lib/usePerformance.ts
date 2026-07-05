import { useEffect, useMemo, useState } from "react";
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

// "ALL" or a strategy tag (e.g. "S1", "S4").
export type StrategyFilter = string;

interface UsePerformanceResult {
  series: PnlPoint[];
  stats: PerformanceStats;
  recentSignals: RecentSignal[];
  isMock: boolean;
  loading: boolean;
  error: string | null;
  strategy: StrategyFilter;
  setStrategy: (s: StrategyFilter) => void;
  availableStrategies: string[]; // distinct tags found in the data
}

const MOCK_STATS: PerformanceStats = {
  totalSignals: PERFORMANCE_STATS.totalSignals,
  winRate: PERFORMANCE_STATS.winRate,
  units: PERFORMANCE_STATS.units,
};

interface BetRow {
  id?: number | string;
  date: string;
  pnl: number;
  result: string;
  tag?: string;
  tournament?: string;
  matchup?: string;
  odds?: number;
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

function deriveFromRows(rows: BetRow[]): { series: PnlPoint[]; stats: PerformanceStats } {
  let cum = 0;
  const series: PnlPoint[] = rows.map((row, i) => {
    cum += Number(row.pnl);
    return {
      signal: i + 1,
      date: row.date,
      cumPnl: Math.round(cum * 100) / 100,
    };
  });

  const wins = rows.filter((r) => r.result === "win").length;
  const decided = rows.filter((r) => r.result === "win" || r.result === "loss").length;

  return {
    series,
    stats: {
      totalSignals: rows.length,
      winRate: decided > 0 ? wins / decided : 0,
      units: series.length > 0 ? series[series.length - 1].cumPnl : 0,
      sinceDate: rows[0]?.date,
      lastDate: rows[rows.length - 1]?.date,
    },
  };
}

export function usePerformance(): UsePerformanceResult {
  const [rows, setRows] = useState<BetRow[] | null>(null); // null = no real data
  const [loading, setLoading] = useState(supabaseConfigured);
  const [error, setError] = useState<string | null>(null);
  const [strategy, setStrategy] = useState<StrategyFilter>("ALL");

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

        const fetched = (data ?? []) as BetRow[];

        // Empty table -> keep mock so the page never looks broken.
        if (fetched.length > 0) setRows(fetched);
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

  const isMock = rows === null;

  // Distinct strategy tags present in the real data (hidden while on mock).
  const availableStrategies = useMemo(() => {
    if (!rows) return [];
    const tags = new Set<string>();
    for (const r of rows) if (r.tag) tags.add(r.tag);
    return Array.from(tags).sort();
  }, [rows]);

  // Series + stats derived from the current strategy filter.
  const { series, stats } = useMemo(() => {
    if (!rows) return { series: PNL_SERIES, stats: MOCK_STATS };
    const filtered =
      strategy === "ALL" ? rows : rows.filter((r) => r.tag === strategy);
    if (filtered.length === 0) return deriveFromRows(rows); // safety fallback
    return deriveFromRows(filtered);
  }, [rows, strategy]);

  // Live preview: last 4 settled rows overall, newest first — intentionally
  // NOT affected by the strategy filter so the table stays a global feed.
  const recentSignals = useMemo<RecentSignal[]>(() => {
    if (!rows) return [];
    return rows
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
  }, [rows]);

  return {
    series,
    stats,
    recentSignals,
    isMock,
    loading,
    error,
    strategy,
    setStrategy,
    availableStrategies,
  };
}
