import { motion } from "framer-motion";
import { mockPointsTable } from "@/data/mockData";

export function PointsTablePreview() {
  const top4 = mockPointsTable.slice(0, 4);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="cricket-card"
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-extrabold uppercase tracking-wider text-foreground">
          Standings
        </h3>
        <a href="/tournaments" className="text-xs font-semibold text-primary hover:underline">
          Full Table →
        </a>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-xs text-muted-foreground">
              <th className="pb-2 text-left font-medium">#</th>
              <th className="pb-2 text-left font-medium">Team</th>
              <th className="pb-2 text-center font-medium">P</th>
              <th className="pb-2 text-center font-medium">W</th>
              <th className="pb-2 text-center font-medium">Pts</th>
              <th className="pb-2 text-right font-medium">NRR</th>
            </tr>
          </thead>
          <tbody>
            {top4.map((team, i) => (
              <tr key={team.shortName} className="border-b border-border/50 last:border-0">
                <td className="py-2.5 text-xs text-muted-foreground">{team.rank}</td>
                <td className="py-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{team.logo}</span>
                    <span className="font-semibold text-foreground">{team.shortName}</span>
                  </div>
                </td>
                <td className="py-2.5 text-center stat-mono text-muted-foreground">{team.played}</td>
                <td className="py-2.5 text-center stat-mono font-bold text-foreground">{team.won}</td>
                <td className="py-2.5 text-center">
                  <span className="stat-mono rounded-full bg-primary/10 px-2 py-0.5 font-bold text-primary">
                    {team.points}
                  </span>
                </td>
                <td className={`py-2.5 text-right stat-mono text-sm ${
                  team.nrr.startsWith('+') ? 'text-win' : 'text-loss'
                }`}>
                  {team.nrr}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
