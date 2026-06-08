"use client";
import { Calendar, X } from "lucide-react";

export default function ReEngagementCard({ onClose, t }: { onClose?: () => void; t: any }) {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-6 bg-background/80 backdrop-blur-sm animate-in fade-in duration-500 absolute inset-0 z-50">
      <div className="w-full bg-card border border-border rounded-2xl overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-500">
        <button onClick={onClose} className="absolute top-4 right-4 p-1 text-muted-foreground hover:text-foreground">
          <X className="w-5 h-5" />
        </button>
        
        <div className="p-6 pb-4">
          <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-4 border border-accent/20">
            <Calendar className="w-8 h-8 text-accent" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">{t.pushTitle}</h2>
          <p className="text-sm text-muted-foreground mb-2">
            {t.pushDesc}
          </p>
        </div>

        <div className="p-6 bg-secondary/20 border-t border-border space-y-3">
          <button 
            onClick={onClose}
            className="w-full bg-accent text-accent-foreground font-bold rounded-xl py-4 transition-all active:scale-[0.98] shadow-lg shadow-accent/20"
          >
            {t.pushNow}
          </button>
          <button 
            onClick={onClose}
            className="w-full bg-transparent border border-border text-foreground font-medium rounded-xl py-4 transition-all hover:bg-border/50 active:scale-[0.98]"
          >
            {t.pushLater}
          </button>
        </div>
      </div>
    </div>
  );
}
