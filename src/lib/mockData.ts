// Mock performance data — replace with real tracked results.

export interface PnlPoint {
  signal: number;
  date: string;
  cumPnl: number;
}

function buildSeries(): PnlPoint[] {
  const start = new Date("2025-09-01T00:00:00Z");
  let cum = 0;
  const points: PnlPoint[] = [];
  // deterministic pseudo-random walk biased positive, mimics a real edge
  let seed = 42;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  for (let i = 1; i <= 86; i++) {
    const r = rand();
    let delta: number;
    if (r < 0.58) {
      delta = 0.4 + rand() * 0.9; // win
    } else {
      delta = -(0.5 + rand() * 0.6); // loss
    }
    cum += delta;
    const date = new Date(start);
    date.setDate(date.getDate() + Math.floor(i * 1.6));
    points.push({
      signal: i,
      date: date.toISOString().slice(0, 10),
      cumPnl: Math.round(cum * 100) / 100,
    });
  }
  return points;
}

export const PNL_SERIES = buildSeries();

export const PERFORMANCE_STATS = {
  totalSignals: 86,
  winRate: 0.594,
  units: PNL_SERIES[PNL_SERIES.length - 1].cumPnl,
  roi: 0.182,
  avgOdds: 1.94,
  longestStreak: 7,
};

export interface SignalExample {
  id: string;
  tag: string;
  tournament: string;
  matchup: string;
  entry: string;
  odds: number;
  result: "win" | "loss" | "open";
  pnl: number;
}

export const SIGNAL_EXAMPLES: SignalExample[] = [
  {
    id: "SIG-0231",
    tag: "3rd-Match",
    tournament: "Czech Liga Pro",
    matchup: "Novak M. vs. Sykora P.",
    entry: "Novak M. to win",
    odds: 1.87,
    result: "win",
    pnl: 0.87,
  },
  {
    id: "SIG-0230",
    tag: "6th-Decider",
    tournament: "TT Cup",
    matchup: "Kral J. vs. Dvorak T.",
    entry: "Kral J. to win",
    odds: 2.05,
    result: "win",
    pnl: 1.05,
  },
  {
    id: "SIG-0229",
    tag: "3rd-Match",
    tournament: "Czech Liga Pro",
    matchup: "Benda L. vs. Marek O.",
    entry: "Marek O. to win",
    odds: 2.18,
    result: "loss",
    pnl: -1.0,
  },
  {
    id: "SIG-0228",
    tag: "6th-Decider",
    tournament: "TT Cup",
    matchup: "Horak R. vs. Cerny V.",
    entry: "Horak R. to win",
    odds: 1.74,
    result: "win",
    pnl: 0.74,
  },
];
