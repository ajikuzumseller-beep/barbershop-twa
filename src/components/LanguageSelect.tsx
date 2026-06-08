"use client";
import { Globe } from "lucide-react";

interface LanguageSelectProps {
  onSelect: (lang: string) => void;
  t: any;
}

export default function LanguageSelect({ onSelect, t }: LanguageSelectProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-card border border-border flex items-center justify-center shadow-sm">
          <Globe className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          {t.langTitle}
        </h1>
        <p className="text-sm text-muted-foreground text-center">
          {t.langSubtitle}
        </p>
      </div>

      <div className="w-full space-y-3">
        <button
          onClick={() => onSelect("qr")}
          className="w-full bg-card border border-border text-foreground hover:bg-border/50 transition-colors p-4 rounded-xl flex items-center justify-between"
        >
          <span className="font-medium">Qaraqalpaq</span>
          <span className="text-sm font-bold text-muted-foreground bg-secondary px-2 py-1 rounded-md">QR</span>
        </button>
        <button
          onClick={() => onSelect("uz")}
          className="w-full bg-card border border-border text-foreground hover:bg-border/50 transition-colors p-4 rounded-xl flex items-center justify-between"
        >
          <span className="font-medium">O'zbek</span>
          <span className="text-sm font-bold text-muted-foreground bg-secondary px-2 py-1 rounded-md">UZ</span>
        </button>
        <button
          onClick={() => onSelect("ru")}
          className="w-full bg-card border border-border text-foreground hover:bg-border/50 transition-colors p-4 rounded-xl flex items-center justify-between"
        >
          <span className="font-medium">Русский</span>
          <span className="text-sm font-bold text-muted-foreground bg-secondary px-2 py-1 rounded-md">RU</span>
        </button>
      </div>
    </div>
  );
}
