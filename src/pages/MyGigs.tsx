import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Briefcase, Plus, Users, Brain, ChevronRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { mockGigs, mockApplications } from "@/data/campusData";
import { AIScoreBadge } from "@/components/AIScoreBadge";
import { toast } from "sonner";

const MyGigs = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "professor") navigate("/login");
  }, [isAuthenticated, user, navigate]);

  if (!user) return null;

  const myGigs = mockGigs.filter((g) => g.postedBy === user.id);

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-primary" />
            <h1 className="font-display text-2xl font-bold text-foreground">My Gigs</h1>
          </div>
          <button
            onClick={() => toast.info("Post Gig form coming soon! (Demo mode)")}
            className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Plus className="h-4 w-4" /> Post Gig
          </button>
        </div>
        <p className="mb-6 text-sm text-muted-foreground">Manage your posted gigs and review applicants</p>
      </motion.div>

      {myGigs.length === 0 ? (
        <div className="py-16 text-center">
          <Briefcase className="mx-auto mb-3 h-10 w-10 text-muted-foreground/40" />
          <p className="text-muted-foreground">You haven't posted any gigs yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {myGigs.map((gig, i) => {
            const apps = mockApplications.filter((a) => a.gigId === gig.id);
            const avgScore = apps.length ? Math.round(apps.reduce((s, a) => s + a.matchScore, 0) / apps.length) : 0;

            return (
              <motion.div
                key={gig.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link to={`/gigs/${gig.id}`} className="block">
                  <div className="gig-card group">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="mb-1 flex items-center gap-2">
                          <h3 className="font-display text-base font-bold text-foreground group-hover:text-primary transition-colors">
                            {gig.title}
                          </h3>
                          <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                            gig.status === "Open" ? "bg-accent/10 text-accent" : gig.status === "In Progress" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                          }`}>
                            {gig.status}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">{gig.department} · Deadline: {gig.deadline}</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
                    </div>

                    <div className="mt-3 flex items-center gap-6">
                      <div className="flex items-center gap-1.5 text-sm">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="font-mono font-bold text-foreground">{apps.length}</span>
                        <span className="text-xs text-muted-foreground">applicants</span>
                      </div>
                      {apps.length > 0 && (
                        <div className="flex items-center gap-1.5 text-sm">
                          <Brain className="h-4 w-4 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">Avg Score:</span>
                          <AIScoreBadge score={avgScore} size="sm" showLabel={false} />
                        </div>
                      )}
                      <span className="text-xs text-muted-foreground">
                        {apps.filter((a) => a.status === "Pending").length} pending
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyGigs;
