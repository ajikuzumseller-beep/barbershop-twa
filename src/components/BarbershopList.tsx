"use client";
import { MapPin, Scissors } from "lucide-react";

interface BarbershopListProps {
  onSelect: (id: string) => void;
  t: any;
}

export default function BarbershopList({ onSelect, t }: BarbershopListProps) {
  const branches = [
    { id: "1", name: "Luxe Barber City", address: "Garetskiy 42", distance: "1.2 km" },
    { id: "2", name: "Gentlemen's Club", address: "Nókis City", distance: "3.5 km" },
    { id: "3", name: "Royal Cuts", address: "Doslıq pr.", distance: "5.0 km" },
  ];

  return (
    <div className="flex flex-col h-full w-full p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6 space-y-2 mt-4">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          {t.branchTitle}
        </h1>
        <p className="text-sm text-muted-foreground">
          {t.branchSubtitle}
        </p>
      </div>

      <div className="flex flex-col space-y-4 overflow-y-auto pb-6">
        {branches.map((branch) => (
          <button
            key={branch.id}
            onClick={() => onSelect(branch.id)}
            className="flex items-center p-4 bg-card border border-border rounded-xl text-left hover:bg-border/50 transition-all active:scale-[0.98]"
          >
            <div className="w-12 h-12 rounded-lg bg-background border border-border flex items-center justify-center mr-4 shrink-0 shadow-sm">
              <Scissors className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground truncate">{branch.name}</h3>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <MapPin className="w-3 h-3 mr-1 shrink-0" />
                <span className="truncate">{branch.address}</span>
              </div>
            </div>
            <div className="ml-2 text-xs font-medium text-accent">
              {branch.distance}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
