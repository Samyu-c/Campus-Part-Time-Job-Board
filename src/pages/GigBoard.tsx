import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Briefcase } from "lucide-react";
import { mockGigs, Gig } from "@/data/campusData";
import { GigCard } from "@/components/GigCard";

const gigTypes = ["All", "Research", "Club", "Admin", "Tutoring", "Event"];

const GigBoard = () => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");

  const filtered = mockGigs.filter((g) => {
    const matchSearch = g.title.toLowerCase().includes(search.toLowerCase()) ||
      g.description.toLowerCase().includes(search.toLowerCase()) ||
      g.skillsRequired.some((s) => s.toLowerCase().includes(search.toLowerCase()));
    const matchType = typeFilter === "All" || g.type === typeFilter;
    return matchSearch && matchType;
  });

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-2 flex items-center gap-2">
          <Briefcase className="h-6 w-6 text-primary" />
          <h1 className="font-display text-2xl font-bold text-foreground">Gig Board</h1>
        </div>
        <p className="mb-6 text-sm text-muted-foreground">Find opportunities across campus</p>
      </motion.div>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search gigs, skills..."
            className="h-10 w-full rounded-lg border border-input bg-background pl-10 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {gigTypes.map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                typeFilter === t
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-primary/10 hover:text-primary"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((gig, i) => (
          <GigCard key={gig.id} gig={gig} index={i} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-16 text-center">
          <Briefcase className="mx-auto mb-3 h-10 w-10 text-muted-foreground/40" />
          <p className="text-muted-foreground">No gigs found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default GigBoard;
