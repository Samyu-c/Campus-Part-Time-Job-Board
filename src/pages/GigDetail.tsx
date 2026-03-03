import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Users, MapPin, Sparkles, Brain, Send } from "lucide-react";
import { mockGigs, mockApplications } from "@/data/campusData";
import { useAuth } from "@/contexts/AuthContext";
import { ApplicationCard } from "@/components/ApplicationCard";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const GigDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const gig = mockGigs.find((g) => g.id === id);

  const [bio, setBio] = useState("");
  const [resume, setResume] = useState("");
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);

  if (!gig) {
    return (
      <div className="container mx-auto max-w-3xl px-4 py-16 text-center">
        <p className="text-muted-foreground">Gig not found.</p>
        <button onClick={() => navigate("/gigs")} className="mt-4 text-sm font-semibold text-primary hover:underline">Back to Gig Board</button>
      </div>
    );
  }

  const applications = mockApplications.filter((a) => a.gigId === gig.id);
  const isProfessor = user?.role === "professor";
  const isOwner = user?.id === gig.postedBy;

  const handleApply = () => {
    if (!bio || !resume) {
      toast.error("Please fill in your bio and resume");
      return;
    }
    setApplying(true);
    // Simulate AI scoring
    setTimeout(() => {
      setApplying(false);
      setApplied(true);
      toast.success("Application submitted! AI Match Score: 76/100");
    }, 1500);
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <button onClick={() => navigate(-1)} className="mb-6 flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        {/* Header */}
        <div className="mb-6 rounded-xl border border-border bg-card p-6">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">{gig.type}</span>
            <span className={`rounded-md px-2.5 py-0.5 text-xs font-semibold ${gig.status === "Open" ? "bg-accent/10 text-accent" : "bg-muted text-muted-foreground"}`}>{gig.status}</span>
            {gig.payAmount && <span className="rounded-md bg-accent/10 px-2.5 py-0.5 font-mono text-xs font-bold text-accent">{gig.payAmount}</span>}
          </div>

          <h1 className="font-display text-2xl font-bold text-foreground mb-2">{gig.title}</h1>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">{gig.description}</p>

          <div className="mb-4 flex flex-wrap gap-1.5">
            {gig.skillsRequired.map((skill) => (
              <Badge key={skill} variant="secondary">{skill}</Badge>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{gig.department}</span>
            <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{gig.applicants} applied</span>
            <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />Deadline: {gig.deadline}</span>
            <span className="flex items-center gap-1"><Sparkles className="h-3.5 w-3.5" />{gig.payType}</span>
          </div>

          <div className="mt-4 border-t border-border pt-4">
            <p className="text-xs text-muted-foreground">Posted by <span className="font-medium text-foreground">{gig.postedByName}</span> · {gig.createdAt}</p>
          </div>
        </div>

        {/* Apply form (student) */}
        {isAuthenticated && user?.role === "student" && gig.status === "Open" && !applied && (
          <div className="mb-6 rounded-xl border border-border bg-card p-6">
            <h2 className="font-display mb-4 text-lg font-bold text-foreground flex items-center gap-2">
              <Send className="h-5 w-5 text-primary" /> Apply for this Gig
            </h2>
            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-xs font-semibold text-foreground">Short Bio</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell the professor why you're a great fit..."
                  rows={3}
                  className="w-full rounded-lg border border-input bg-background p-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-foreground">Resume / Skills Summary</label>
                <textarea
                  value={resume}
                  onChange={(e) => setResume(e.target.value)}
                  placeholder="Paste your resume or describe your key skills and projects..."
                  rows={4}
                  className="w-full rounded-lg border border-input bg-background p-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <button
                onClick={handleApply}
                disabled={applying}
                className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-primary text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
              >
                {applying ? (
                  <>
                    <Brain className="h-4 w-4 animate-spin" />
                    AI is scoring your match...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Submit Application
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {applied && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="mb-6 rounded-xl border border-accent/30 bg-accent/5 p-6 text-center">
            <Brain className="mx-auto mb-2 h-8 w-8 text-accent" />
            <h3 className="font-display text-lg font-bold text-foreground">Application Submitted!</h3>
            <p className="mt-1 text-sm text-muted-foreground">Your AI Match Score: <span className="font-mono font-bold text-accent">76</span>/100</p>
            <p className="mt-2 text-xs text-muted-foreground">The professor will review your application soon.</p>
          </motion.div>
        )}

        {!isAuthenticated && gig.status === "Open" && (
          <div className="mb-6 rounded-xl border border-border bg-muted/50 p-6 text-center">
            <p className="text-sm text-muted-foreground">
              <button onClick={() => navigate("/login")} className="font-semibold text-primary hover:underline">Sign in</button> to apply for this gig.
            </p>
          </div>
        )}

        {/* Applications (professor view) */}
        {isOwner && applications.length > 0 && (
          <div>
            <h2 className="font-display mb-4 text-lg font-bold text-foreground">Applications ({applications.length})</h2>
            <div className="space-y-3">
              {applications
                .sort((a, b) => b.matchScore - a.matchScore)
                .map((app, i) => (
                  <ApplicationCard
                    key={app.id}
                    application={app}
                    viewAs="professor"
                    index={i}
                    onAccept={(id) => toast.success(`Accepted ${app.studentName}`)}
                    onReject={(id) => toast.info(`Rejected ${app.studentName}`)}
                  />
                ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default GigDetail;
