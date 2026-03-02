import { motion } from "framer-motion";
import { mockLiveMatch } from "@/data/mockData";

export function LiveMatchWidget() {
  const m = mockLiveMatch;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="cricket-card overflow-hidden"
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="live-pulse text-xs font-bold uppercase tracking-wider text-live">
            Live
          </span>
          <span className="text-xs text-muted-foreground">
            Match #{m.matchNumber} · {m.venue}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {/* Team B (bowled first) */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{m.teamB.logo}</span>
            <div>
              <p className="text-sm font-bold text-foreground">{m.teamB.name}</p>
              <p className="text-xs text-muted-foreground">1st Innings</p>
            </div>
          </div>
          <div className="text-right">
            <p className="stat-mono text-lg text-foreground">
              {m.teamB.score}/{m.teamB.wickets}
            </p>
            <p className="stat-mono text-xs text-muted-foreground">
              ({m.teamB.overs} ov)
            </p>
          </div>
        </div>

        {/* Team A (batting) */}
        <div className="flex items-center justify-between rounded-lg bg-primary/5 p-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{m.teamA.logo}</span>
            <div>
              <p className="text-sm font-bold text-foreground">{m.teamA.name}</p>
              <p className="text-xs text-muted-foreground">
                Batting · {m.currentBatsman}*
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="stat-mono text-lg font-extrabold text-primary">
              {m.teamA.score}/{m.teamA.wickets}
            </p>
            <p className="stat-mono text-xs text-muted-foreground">
              ({m.teamA.overs} ov)
            </p>
          </div>
        </div>

        {/* Match info bar */}
        <div className="flex items-center justify-between rounded-md bg-muted px-3 py-2">
          <div className="flex gap-4">
            <span className="text-xs text-muted-foreground">
              CRR: <span className="stat-mono font-bold text-foreground">{m.crr}</span>
            </span>
            <span className="text-xs text-muted-foreground">
              RRR: <span className="stat-mono font-bold text-foreground">{m.rrr}</span>
            </span>
          </div>
          <p className="text-xs font-medium text-primary">
            Need {m.target - m.teamA.score} runs from {(20 * 6 - Math.floor(m.teamA.overs) * 6 - Math.round((m.teamA.overs % 1) * 10))} balls
          </p>
        </div>
      </div>
    </motion.div>
  );
}
