"use client";

import { useState } from "react";
import LanguageSelect from "@/components/LanguageSelect";
import BarbershopList from "@/components/BarbershopList";
import BarberSelect from "@/components/BarberSelect";
import DateSelect from "@/components/DateSelect";
import TimeSelect from "@/components/TimeSelect";
import ErrorScreen from "@/components/ErrorScreen";
import ReminderLocation from "@/components/ReminderLocation";
import ReviewGating from "@/components/ReviewGating";
import LoyaltySystem from "@/components/LoyaltySystem";
import ReEngagementCard from "@/components/ReEngagementCard";
import AdminDashboard from "@/components/AdminDashboard";
import { Language, translations } from "@/lib/translations";

import { ArrowLeft, CheckCircle, LayoutDashboard, Settings } from "lucide-react";

type Step = 
  | "language" | "barbershop" | "barber" | "date" | "time" | "success"
  | "error_demo" | "reminder_demo" | "review_demo" | "loyalty_demo" | "admin_demo";

export default function Home() {
  const [step, setStep] = useState<Step>("language");
  const [showReEngagement, setShowReEngagement] = useState(false);
  const [selections, setSelections] = useState({
    language: "qr",
    barbershop: "",
    barber: "",
    date: "",
    time: "",
  });

  const langKey = (selections.language as Language) || "qr";
  const t = translations[langKey];

  const handleLanguageSelect = (lang: string) => {
    setSelections({ ...selections, language: lang });
    setStep("barbershop");
  };

  const handleBarbershopSelect = (id: string) => {
    setSelections({ ...selections, barbershop: id });
    setStep("barber");
  };

  const handleBarberSelect = (id: string) => {
    setSelections({ ...selections, barber: id });
    setStep("date");
  };

  const handleDateSelect = (date: string) => {
    setSelections({ ...selections, date });
    setStep("time");
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleTimeSelect = async (time: string) => {
    const updatedSelections = { ...selections, time };
    setSelections(updatedSelections);
    
    setIsLoading(true);
    try {
      // In a real TWA, initData comes from window.Telegram.WebApp.initData
      // For now we mock it as a string
      const initData = typeof window !== 'undefined' && (window as any).Telegram?.WebApp?.initData 
        ? (window as any).Telegram.WebApp.initData 
        : "mock_init_data";

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...updatedSelections,
          initData
        })
      });

      if (!response.ok) {
        throw new Error('Failed to book');
      }

      setStep("success");
    } catch (error) {
      console.error(error);
      setStep("error_demo");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (step === "barbershop") setStep("language");
    if (step === "barber") setStep("barbershop");
    if (step === "date") setStep("barber");
    if (step === "time") setStep("date");
    if (["error_demo", "reminder_demo", "review_demo", "loyalty_demo", "admin_demo"].includes(step)) {
      setStep("success");
    }
  };

  return (
    <div className="flex flex-col h-full w-full relative">
      {step !== "language" && step !== "success" && (
        <div className="h-14 border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-40 flex items-center px-4">
          <button 
            onClick={handleBack}
            className="p-2 -ml-2 rounded-full hover:bg-border/50 text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>
      )}

      <div className="flex-1 overflow-hidden relative flex flex-col">
        {step === "language" && <LanguageSelect t={t} onSelect={handleLanguageSelect} />}
        {step === "barbershop" && <BarbershopList t={t} onSelect={handleBarbershopSelect} />}
        {step === "barber" && <BarberSelect t={t} onSelect={handleBarberSelect} />}
        {step === "date" && <DateSelect t={t} onSelect={handleDateSelect} />}
        {step === "time" && <TimeSelect t={t} onSelect={handleTimeSelect} />}
        
        {step === "error_demo" && <ErrorScreen t={t} onRetry={() => setStep("success")} />}
        {step === "reminder_demo" && <ReminderLocation t={t} />}
        {step === "review_demo" && <ReviewGating t={t} />}
        {step === "loyalty_demo" && <LoyaltySystem t={t} />}
        {step === "admin_demo" && <AdminDashboard t={t} />}

        {step === "success" && (
          <div className="flex flex-col items-center justify-start h-full p-6 pt-10 text-center animate-in zoom-in duration-500 overflow-y-auto hide-scrollbar">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex shrink-0 items-center justify-center mb-6">
              <CheckCircle className="w-12 h-12 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-2">{t.successTitle}</h2>
            <p className="text-muted-foreground text-sm mb-10">
              {t.successSubtitle}
            </p>
            
            <div className="w-full bg-card border border-border rounded-2xl p-4 mt-auto mb-6 shadow-sm">
              <div className="flex items-center text-muted-foreground mb-4 justify-center">
                <Settings className="w-4 h-4 mr-2" />
                <span className="text-xs font-bold uppercase tracking-wider">{t.demoMenuTitle}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <button onClick={() => setStep("error_demo")} className="p-3 bg-secondary/30 border border-border rounded-xl hover:bg-border/50">{t.demoError}</button>
                <button onClick={() => setStep("reminder_demo")} className="p-3 bg-secondary/30 border border-border rounded-xl hover:bg-border/50">{t.demoGps}</button>
                <button onClick={() => setStep("review_demo")} className="p-3 bg-secondary/30 border border-border rounded-xl hover:bg-border/50">{t.demoReview}</button>
                <button onClick={() => setStep("loyalty_demo")} className="p-3 bg-secondary/30 border border-border rounded-xl hover:bg-border/50">{t.demoLoyalty}</button>
                <button onClick={() => setShowReEngagement(true)} className="p-3 bg-accent text-accent-foreground font-medium rounded-xl shadow-md">{t.demoPush}</button>
                <button onClick={() => setStep("admin_demo")} className="p-3 bg-primary text-primary-foreground font-medium rounded-xl shadow-md flex items-center justify-center"><LayoutDashboard className="w-4 h-4 mr-1"/> {t.demoAdmin}</button>
              </div>
            </div>

            <button
              onClick={() => setStep("language")}
              className="px-6 py-4 border border-border text-foreground bg-secondary/10 rounded-xl hover:bg-border/50 transition-colors text-sm font-medium w-full"
            >
              {t.backToHome}
            </button>
          </div>
        )}
      </div>

      {showReEngagement && <ReEngagementCard t={t} onClose={() => setShowReEngagement(false)} />}
    </div>
  );
}
