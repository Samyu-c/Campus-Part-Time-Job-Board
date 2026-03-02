import { motion } from "framer-motion";
import { mockNextMatch } from "@/data/mockData";
import { CalendarDays, Clock, MapPin } from "lucide-react";

export function NextMatchCountdown() {
  const m = mockNextMatch;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      className="cricket-card border-accent/20"
    >
      <div className="mb-3 flex items-center gap-2">
        <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-gold-dark">
          Next Match
        </span>
        <span className="text-xs text-muted-foreground">#{m.matchNumber}</span>
      </div>

      <div className="mb-4 flex items-center justify-center gap-6">
        <div className="text-center">
          <p className="text-lg font-extrabold text-foreground">{m.teamA}</p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
          <span className="text-xs font-bold text-muted-foreground">VS</span>
        </div>
        <div className="text-center">
          <p className="text-lg font-extrabold text-foreground">{m.teamB}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <CalendarDays className="h-3.5 w-3.5" /> {m.date}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" /> {m.time}
        </span>
        <span className="flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5" /> {m.venue}
        </span>
      </div>
    </motion.div>
  );
}
