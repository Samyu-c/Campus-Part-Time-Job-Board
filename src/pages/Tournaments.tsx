import { Trophy } from "lucide-react";

const Tournaments = () => (
  <div className="container mx-auto min-h-[60vh] px-4 py-12">
    <h1 className="mb-2 text-3xl font-black tracking-tight text-foreground">Tournaments</h1>
    <p className="mb-8 text-muted-foreground">Browse and manage cricket tournaments</p>
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-20">
      <Trophy className="mb-4 h-12 w-12 text-muted-foreground/40" />
      <p className="text-lg font-semibold text-muted-foreground">Coming soon</p>
      <p className="text-sm text-muted-foreground/70">Tournament management will be available after backend setup</p>
    </div>
  </div>
);

export default Tournaments;
