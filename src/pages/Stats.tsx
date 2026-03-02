import { BarChart3 } from "lucide-react";

const Stats = () => (
  <div className="container mx-auto min-h-[60vh] px-4 py-12">
    <h1 className="mb-2 text-3xl font-black tracking-tight text-foreground">Player Statistics</h1>
    <p className="mb-8 text-muted-foreground">Batting, bowling, and fielding leaderboards</p>
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-20">
      <BarChart3 className="mb-4 h-12 w-12 text-muted-foreground/40" />
      <p className="text-lg font-semibold text-muted-foreground">Coming soon</p>
      <p className="text-sm text-muted-foreground/70">Full player statistics and awards tracking</p>
    </div>
  </div>
);

export default Stats;
