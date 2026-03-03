import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Briefcase, FileText, Users, TrendingUp, ArrowRight, Brain, Shield } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { mockGigs, mockApplications, mockOutPasses } from "@/data/campusData";
import { AIScoreBadge } from "@/components/AIScoreBadge";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate("/login");
  }, [isAuthenticated, navigate]);

  if (!user) return null;

  const isStudent = user.role === "student";

  // Student stats
  const myApps = mockApplications.filter((a) => a.studentId === user.id);
  const myPasses = mockOutPasses.filter((p) => p.studentId === user.id);

  // Professor stats
  const myGigs = mockGigs.filter((g) => g.postedBy === user.id);
  const gigsApps = mockApplications.filter((a) => myGigs.some((g) => g.id === a.gigId));

  const stats = isStudent
    ? [
        { label: "Applications", value: myApps.length, icon: FileText, color: "text-primary" },
        { label: "Accepted", value: myApps.filter((a) => a.status === "Accepted").length, icon: TrendingUp, color: "text-accent" },
        { label: "Avg AI Score", value: myApps.length ? Math.round(myApps.reduce((s, a) => s + a.matchScore, 0) / myApps.length) : 0, icon: Brain, color: "text-campus-amber" },
        { label: "Passes", value: myPasses.length, icon: Shield, color: "text-primary" },
      ]
    : [
        { label: "Posted Gigs", value: myGigs.length, icon: Briefcase, color: "text-primary" },
        { label: "Total Applicants", value: gigsApps.length, icon: Users, color: "text-accent" },
        { label: "Pending Review", value: gigsApps.filter((a) => a.status === "Pending").length, icon: FileText, color: "text-campus-amber" },
        { label: "Avg AI Score", value: gigsApps.length ? Math.round(gigsApps.reduce((s, a) => s + a.matchScore, 0) / gigsApps.length) : 0, icon: Brain, color: "text-campus-rose" },
      ];

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      {/* Welcome */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground">
          Welcome, {user.name.split(" ")[0]} 👋
        </h1>
        <p className="mt-1 text-muted-foreground">
          {isStudent ? "Track your applications and campus passes" : "Manage your gigs and review applicants"}
        </p>
      </motion.div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="gig-card flex items-center gap-3"
          >
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted ${stat.color}`}>
              <stat.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="font-mono text-xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="mb-8 grid gap-4 md:grid-cols-2">
        <Link
          to="/gigs"
          className="gig-card flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Briefcase className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-display text-sm font-bold text-foreground">
                {isStudent ? "Browse Open Gigs" : "Post a New Gig"}
              </h3>
              <p className="text-xs text-muted-foreground">
                {isStudent ? `${mockGigs.filter((g) => g.status === "Open").length} gigs available` : "Create a new opportunity"}
              </p>
            </div>
          </div>
          <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
        </Link>

        <Link
          to={isStudent ? "/my-applications" : "/my-gigs"}
          className="gig-card flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
              <FileText className="h-5 w-5 text-accent" />
            </div>
            <div>
              <h3 className="font-display text-sm font-bold text-foreground">
                {isStudent ? "My Applications" : "Review Applications"}
              </h3>
              <p className="text-xs text-muted-foreground">
                {isStudent
                  ? `${myApps.filter((a) => a.status === "Pending").length} pending`
                  : `${gigsApps.filter((a) => a.status === "Pending").length} awaiting review`}
              </p>
            </div>
          </div>
          <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Recent activity */}
      <div>
        <h2 className="font-display mb-4 text-lg font-bold text-foreground">Recent Activity</h2>
        <div className="space-y-3">
          {(isStudent ? myApps : gigsApps).slice(0, 4).map((app, i) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center justify-between rounded-xl border border-border bg-card p-4"
            >
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-foreground">
                  {isStudent ? app.gigTitle : app.studentName}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {isStudent ? `Applied ${app.appliedAt}` : `${app.studentDept} · Applied ${app.appliedAt}`}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <AIScoreBadge score={app.matchScore} size="sm" showLabel={false} />
                <span className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                  app.status === "Accepted" ? "bg-accent/10 text-accent"
                  : app.status === "Rejected" ? "bg-destructive/10 text-destructive"
                  : app.status === "Completed" ? "bg-primary/10 text-primary"
                  : "bg-secondary text-muted-foreground"
                }`}>
                  {app.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
