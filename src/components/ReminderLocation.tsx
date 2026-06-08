"use client";
import { MapPin, Navigation } from "lucide-react";

export default function ReminderLocation({ t }: { t: any }) {
  return (
    <div className="flex flex-col h-full w-full p-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6 space-y-2 mt-4">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          {t.remTitle}
        </h1>
        <p className="text-sm text-muted-foreground">
          {t.remDesc}
        </p>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm mb-6 flex-1 max-h-[300px] relative">
        <div className="absolute inset-0 bg-secondary/50 flex flex-col items-center justify-center">
          <MapPin className="w-12 h-12 text-primary animate-bounce mb-2" />
          <span className="text-xs font-medium text-muted-foreground">{t.mapPlaceholder}</span>
        </div>
      </div>

      <div className="flex items-start p-4 bg-secondary/30 rounded-xl mb-6 border border-border">
        <MapPin className="w-6 h-6 text-primary mr-3 shrink-0 mt-0.5" />
        <div>
          <h3 className="font-semibold text-foreground">Luxe Barber City</h3>
          <p className="text-sm text-muted-foreground mt-1">Garetskiy 42.</p>
        </div>
      </div>

      <div className="mt-auto">
        <button className="w-full bg-primary text-primary-foreground font-bold text-lg rounded-xl py-4 flex items-center justify-center transition-all active:scale-[0.98] shadow-lg shadow-primary/20">
          <Navigation className="w-5 h-5 mr-2" />
          {t.openMap}
        </button>
      </div>
    </div>
  );
}
