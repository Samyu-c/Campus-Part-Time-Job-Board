import { motion } from "framer-motion";
import { mockRecentResults } from "@/data/mockData";
import { CheckCircle2 } from "lucide-react";

export function RecentResults() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="cricket-card"
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-extrabold uppercase tracking-wider text-foreground">
          Recent Results
        </h3>
        <a href="/fixtures" className="text-xs font-semibold text-primary hover:underline">
          All Matches →
        </a>
      </div>

      <div className="space-y-3">
        {mockRecentResults.map((r) => (
          <div key={r.id} className="rounded-lg border border-border/50 p-3">
            <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
              <span>{r.date}</span>
              <span className="flex items-center gap-1 text-win">
                <CheckCircle2 className="h-3 w-3" />
                Completed
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div>
                <span className="font-semibold text-foreground">{r.teamA}</span>
                <span className="stat-mono ml-2 text-muted-foreground">{r.teamAScore}</span>
              </div>
              <span className="text-xs text-muted-foreground">vs</span>
              <div className="text-right">
                <span className="stat-mono mr-2 text-muted-foreground">{r.teamBScore}</span>
                <span className="font-semibold text-foreground">{r.teamB}</span>
              </div>
            </div>
            <p className="mt-2 text-xs font-medium text-primary">{r.result}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
