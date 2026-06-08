"use client";
import { Gift, Share2 } from "lucide-react";

export default function LoyaltySystem({ t }: { t: any }) {
  const visits = 4;
  const maxVisits = 5;
  const progress = (visits / maxVisits) * 100;

  return (
    <div className="flex flex-col h-full w-full p-6 animate-in slide-in-from-bottom-4 duration-500 overflow-y-auto">
      <div className="mb-8 mt-4">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          {t.loyaltyTitle}
        </h1>
        <p className="text-sm text-muted-foreground">
          {t.loyaltyDesc}
        </p>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 mb-6 shadow-sm relative overflow-hidden">
        <div className="absolute -right-6 -top-6 text-primary/10">
          <Gift className="w-32 h-32" />
        </div>
        <div className="relative z-10">
          <div className="flex items-end justify-between mb-2">
            <h3 className="font-bold text-lg text-foreground">{t.loyaltyCardTitle}</h3>
            <span className="font-bold text-primary">{visits}/{maxVisits}</span>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            {t.loyaltyCardDesc.replace("{n}", String(maxVisits - visits))}
          </p>
          
          <div className="h-4 bg-secondary rounded-full overflow-hidden mb-4 border border-border">
            <div 
              className="h-full bg-gradient-to-r from-primary/80 to-primary rounded-full transition-all duration-1000"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs font-medium px-1">
            <span className="text-muted-foreground">{t.loyaltyStart}</span>
            <span className="text-primary font-bold">{t.loyaltyGift}</span>
          </div>
        </div>
      </div>

      <div className="bg-secondary/30 border border-border rounded-2xl p-6 flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-card border border-border rounded-full flex items-center justify-center mb-4">
          <Share2 className="w-8 h-8 text-foreground" />
        </div>
        <h3 className="font-bold text-foreground mb-2 text-lg">{t.shareTitle}</h3>
        <p className="text-sm text-muted-foreground mb-6">
          {t.shareDesc}
        </p>
        <button className="w-full bg-card border border-border text-foreground font-bold rounded-xl py-4 flex items-center justify-center transition-all hover:bg-border/50 active:scale-[0.98]">
          <Share2 className="w-5 h-5 mr-2" />
          {t.shareBtn}
        </button>
      </div>
    </div>
  );
}
