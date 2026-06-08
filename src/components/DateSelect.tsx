"use client";
import { Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";

interface DateSelectProps {
  onSelect: (date: string) => void;
  t: any;
}

export default function DateSelect({ onSelect, t }: DateSelectProps) {
  const today = new Date();
  const dates = Array.from({ length: 14 }).map((_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return {
      dateObj: d,
      dayName: d.toLocaleDateString("en-US", { weekday: "short" }),
      dayNumber: d.getDate(),
      monthName: d.toLocaleDateString("en-US", { month: "short" }),
      fullDate: d.toISOString().split("T")[0],
    };
  });

  const [selected, setSelected] = useState<string | null>(null);

  const handleContinue = () => {
    if (selected) onSelect(selected);
  };

  return (
    <div className="flex flex-col h-full w-full p-6 animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      <div className="mb-6 space-y-2 mt-4">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          {t.dateTitle}
        </h1>
        <p className="text-sm text-muted-foreground">
          {t.dateSubtitle}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto pb-24 hide-scrollbar">
        <div className="grid grid-cols-4 gap-3">
          {dates.map((d) => {
            const isSelected = selected === d.fullDate;
            return (
              <button
                key={d.fullDate}
                onClick={() => setSelected(d.fullDate)}
                className={`flex flex-col items-center justify-center py-4 rounded-2xl border transition-all active:scale-95 ${
                  isSelected 
                    ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20 scale-105 z-10" 
                    : "bg-card border-border text-foreground hover:bg-border/50"
                }`}
              >
                <span className={`text-[11px] font-medium uppercase tracking-wider ${isSelected ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                  {d.dayName}
                </span>
                <span className="text-2xl font-bold my-1">{d.dayNumber}</span>
                <span className={`text-[11px] font-medium uppercase tracking-wider ${isSelected ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                  {d.monthName}
                </span>
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
          {t.continue}
          <CalendarIcon className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  );
}
