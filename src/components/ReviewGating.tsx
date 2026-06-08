"use client";
import { Star } from "lucide-react";
import { useState } from "react";

export default function ReviewGating({ t }: { t: any }) {
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleRate = (stars: number) => {
    setRating(stars);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full p-6 animate-in zoom-in duration-500 text-center">
        <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-6">
          <Star className="w-10 h-10 text-primary fill-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">{t.reviewThanksTitle}</h2>
        <p className="text-muted-foreground">{t.reviewThanksDesc}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-6 animate-in fade-in duration-500">
      <h2 className="text-2xl font-bold text-foreground mb-2 text-center">{t.reviewTitle}</h2>
      <p className="text-muted-foreground text-sm text-center mb-10">{t.reviewDesc}</p>

      <div className="flex space-x-2 mb-10">
        {[1, 2, 3, 4, 5].map((star) => (
          <button 
            key={star} 
            onClick={() => handleRate(star)}
            className="p-1 transition-transform active:scale-90"
          >
            <Star className={`w-10 h-10 transition-colors ${rating >= star ? "text-primary fill-primary" : "text-border"}`} />
          </button>
        ))}
      </div>

      {rating > 0 && rating <= 3 && (
        <div className="w-full animate-in slide-in-from-bottom-4 space-y-4">
          <h3 className="font-medium text-foreground text-center">{t.reviewBad}</h3>
          <textarea 
            className="w-full bg-card border border-border rounded-xl p-4 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/50"
            rows={4}
            placeholder={t.reviewPlaceholder}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
          <button 
            onClick={() => setSubmitted(true)}
            className="w-full bg-primary text-primary-foreground font-bold rounded-xl py-4 transition-all active:scale-[0.98]"
          >
            {t.reviewSend}
          </button>
        </div>
      )}

      {rating >= 4 && (
        <div className="w-full animate-in slide-in-from-bottom-4 space-y-4 text-center">
          <div className="bg-primary/10 border border-primary/20 rounded-xl p-6 mb-4">
            <h3 className="font-bold text-primary mb-2 text-lg">{t.reviewGoodTitle}</h3>
            <p className="text-sm text-muted-foreground">{t.reviewGoodDesc}</p>
          </div>
          <button 
            onClick={() => setSubmitted(true)}
            className="w-full bg-primary text-primary-foreground font-bold rounded-xl py-4 flex items-center justify-center transition-all active:scale-[0.98] shadow-lg shadow-primary/20"
          >
            {t.reviewYandex}
          </button>
        </div>
      )}
    </div>
  );
}
