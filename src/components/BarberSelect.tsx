"use client";
import { Star, ChevronRight } from "lucide-react";

interface BarberSelectProps {
  onSelect: (id: string) => void;
  t: any;
}

export default function BarberSelect({ onSelect, t }: BarberSelectProps) {
  const barbers = [
    { id: "1", name: "Jadore: Ómirbay", exp: `15 ${t.experience}`, rating: 5.0, reviews: 124 },
    { id: "2", name: "Salamat Usta", exp: `8 ${t.experience}`, rating: 4.8, reviews: 89 },
    { id: "3", name: "Damir Barber", exp: `3 ${t.experience}`, rating: 4.9, reviews: 34 },
  ];

  return (
    <div className="flex flex-col h-full w-full p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6 space-y-2 mt-4">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          {t.barberTitle}
        </h1>
        <p className="text-sm text-muted-foreground">
          {t.barberSubtitle}
        </p>
      </div>

      <div className="flex flex-col space-y-4 overflow-y-auto pb-6">
        {barbers.map((barber) => (
          <button
            key={barber.id}
            onClick={() => onSelect(barber.id)}
            className="flex items-center p-4 bg-card border border-border rounded-xl text-left hover:bg-border/50 transition-all active:scale-[0.98]"
          >
            <div className="w-14 h-14 rounded-full bg-secondary border border-border overflow-hidden mr-4 shrink-0 flex items-center justify-center">
              <span className="text-xl font-bold text-muted-foreground">
                {barber.name.charAt(0)}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground truncate">{barber.name}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{barber.exp}</p>
              <div className="flex items-center mt-2">
                <Star className="w-3.5 h-3.5 text-primary fill-primary mr-1" />
                <span className="text-xs font-medium text-foreground">{barber.rating}</span>
                <span className="text-xs text-muted-foreground ml-1">({barber.reviews})</span>
              </div>
            </div>
            <div className="ml-2">
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
