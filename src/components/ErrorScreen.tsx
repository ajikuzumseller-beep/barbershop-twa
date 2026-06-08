"use client";
import { AlertCircle, RefreshCcw } from "lucide-react";

export default function ErrorScreen({ onRetry, t }: { onRetry: () => void; t: any }) {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-6 animate-in fade-in duration-500 text-center">
      <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mb-6">
        <AlertCircle className="w-10 h-10 text-destructive" />
      </div>
      <h1 className="text-2xl font-bold tracking-tight text-foreground mb-2">{t.errorTitle}</h1>
      <p className="text-sm text-muted-foreground mb-8">
        {t.errorDesc}
      </p>
      <button 
        onClick={onRetry}
        className="w-full bg-card border border-border text-foreground font-medium rounded-xl py-4 flex items-center justify-center hover:bg-border/50 active:scale-[0.98] transition-all"
      >
        <RefreshCcw className="w-5 h-5 mr-2" />
        {t.backToHome}
      </button>
    </div>
  );
}
