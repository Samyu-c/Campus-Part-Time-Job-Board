import { motion } from "framer-motion";
import { Calendar, ChevronRight } from "lucide-react";
import { Application } from "@/data/campusData";
import { AIScoreBadge } from "@/components/AIScoreBadge";
import { Badge } from "@/components/ui/badge";

interface ApplicationCardProps {
  application: Application;
  viewAs: "student" | "professor";
  onAccept?: (id: string) => void;
  onReject?: (id: string) => void;
  index?: number;
}

const statusStyles: Record<string, string> = {
  Pending: "bg-secondary text-muted-foreground",
  Accepted: "bg-accent/10 text-accent",
  Rejected: "bg-destructive/10 text-destructive",
  Completed: "bg-primary/10 text-primary",
};

export function ApplicationCard({ application, viewAs, onAccept, onReject, index = 0 }: ApplicationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="gig-card"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="mb-1 flex items-center gap-2">
            <h3 className="font-display text-sm font-bold text-foreground">
              {viewAs === "professor" ? application.studentName : application.gigTitle}
            </h3>
            <span className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold ${statusStyles[application.status]}`}>
              {application.status}
            </span>
          </div>
          {viewAs === "professor" && (
            <p className="text-xs text-muted-foreground">{application.studentDept}</p>
          )}
        </div>
        <AIScoreBadge score={application.matchScore} size="sm" showLabel={false} />
      </div>

      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{application.bio}</p>

      <div className="mt-2 flex flex-wrap gap-1">
        {application.skills.slice(0, 5).map((s) => (
          <Badge key={s} variant="secondary" className="text-[10px]">{s}</Badge>
        ))}
      </div>

      <div className="mt-3 rounded-lg bg-muted/50 p-3">
        <p className="text-xs font-medium text-muted-foreground">
          <span className="font-semibold text-foreground">AI Analysis:</span> {application.matchAnalysis}
        </p>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <Calendar className="h-3.5 w-3.5" />
          Applied {application.appliedAt}
        </span>
        {viewAs === "professor" && application.status === "Pending" && (
          <div className="flex gap-2">
            <button
              onClick={() => onAccept?.(application.id)}
              className="rounded-md bg-accent px-3 py-1.5 text-xs font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
            >
              Accept
            </button>
            <button
              onClick={() => onReject?.(application.id)}
              className="rounded-md bg-destructive/10 px-3 py-1.5 text-xs font-semibold text-destructive transition-colors hover:bg-destructive/20"
            >
              Reject
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
