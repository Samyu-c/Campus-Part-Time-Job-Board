import { motion } from "framer-motion";
import { mockTopRunScorers, mockTopWicketTakers } from "@/data/mockData";
import { Award } from "lucide-react";

export function TopPerformers() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="grid gap-4 sm:grid-cols-2"
    >
      {/* Top Run Scorers */}
      <div className="cricket-card">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-accent/20">
            <Award className="h-4 w-4 text-gold" />
          </div>
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-foreground">
            Orange Cap
          </h3>
        </div>
        <div className="space-y-3">
          {mockTopRunScorers.map((p) => (
            <div key={p.name} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className={`stat-mono text-sm font-bold ${p.rank === 1 ? 'text-gold' : 'text-muted-foreground'}`}>
                  {p.rank}
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {p.name}
                    {p.cap === "orange" && <span className="ml-1.5 text-xs">🧡</span>}
                  </p>
                  <p className="text-xs text-muted-foreground">{p.team}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="stat-mono text-sm font-extrabold text-foreground">{p.runs}</p>
                <p className="text-xs text-muted-foreground">SR {p.sr}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Wicket Takers */}
      <div className="cricket-card">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10">
            <Award className="h-4 w-4 text-primary" />
          </div>
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-foreground">
            Purple Cap
          </h3>
        </div>
        <div className="space-y-3">
          {mockTopWicketTakers.map((p) => (
            <div key={p.name} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className={`stat-mono text-sm font-bold ${p.rank === 1 ? 'text-primary' : 'text-muted-foreground'}`}>
                  {p.rank}
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {p.name}
                    {p.cap === "purple" && <span className="ml-1.5 text-xs">💜</span>}
                  </p>
                  <p className="text-xs text-muted-foreground">{p.team}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="stat-mono text-sm font-extrabold text-foreground">{p.wickets}</p>
                <p className="text-xs text-muted-foreground">Econ {p.econ}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
