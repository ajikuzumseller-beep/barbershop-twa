"use client";
import { CheckCircle } from "lucide-react";
import { useState } from "react";

interface TimeSelectProps {
  onSelect: (time: string) => void;
  t: any;
}

export default function TimeSelect({ onSelect, t }: TimeSelectProps) {
  const times = [
    { time: "09:00", available: true },
    { time: "10:00", available: false },
    { time: "11:00", available: true },
    { time: "12:00", available: false },
    { time: "13:00", available: true },
    { time: "14:00", available: true },
    { time: "15:00", available: true },
    { time: "16:00", available: false },
    { time: "17:00", available: true },
    { time: "18:00", available: true },
    { time: "19:00", available: false },
    { time: "20:00", available: true },
  ];

  const [selected, setSelected] = useState<string | null>(null);

  const handleContinue = () => {
    if (selected) onSelect(selected);
  };

  return (
    <div className="flex flex-col h-full w-full p-6 animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      <div className="mb-6 space-y-2 mt-4">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          {t.timeTitle}
        </h1>
        <p className="text-sm text-muted-foreground">
          {t.timeSubtitle}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto pb-24 hide-scrollbar">
        <div className="grid grid-cols-3 gap-3">
          {times.map((timeObj) => {
            const isSelected = selected === timeObj.time;
            return (
              <button
                key={timeObj.time}
                onClick={() => setSelected(timeObj.time)}
                disabled={!timeObj.available}
                className={`flex flex-col items-center justify-center py-4 rounded-xl border transition-all active:scale-95 ${
                  !timeObj.available 
                    ? "bg-secondary/30 border-transparent text-muted-foreground opacity-40 cursor-not-allowed line-through" 
                    : isSelected
                      ? "bg-accent text-accent-foreground border-accent shadow-lg shadow-accent/30 scale-105 z-10"
                      : "bg-card border-border text-foreground hover:bg-border/50"
                }`}
              >
                <span className="font-semibold text-lg">{timeObj.time}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="absolute bottom-6 left-6 right-6">
        <button
          onClick={handleContinue}
          disabled={!selected}
          className="w-full bg-primary text-primary-foreground font-bold text-lg rounded-xl py-4 flex items-center justify-center transition-all disabled:opacity-30 disabled:scale-100 active:scale-[0.98] shadow-lg shadow-primary/20"
        >
          {t.confirm}
          <CheckCircle className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  );
}
