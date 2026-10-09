import React from "react";

export function HeroSection() {
  return (
    <section className="text-center px-4 pt-2 pb-5 max-w-md mx-auto" aria-labelledby="hero-title">
      {/* Subtle healthcare abstract decorative element (CSS only) */}
      <div className="mb-4 flex flex-col items-center justify-center gap-2">
        <div className="medical-cross-accent" aria-hidden="true" />
        <div className="medical-pulse-line" aria-hidden="true" />
      </div>

      <h2
        id="hero-title"
        className="text-xl sm:text-2xl font-bold text-hospital-dark tracking-tight leading-snug"
      >
        How was your experience with us?
      </h2>

      <p className="mt-2 text-sm text-hospital-secondary leading-relaxed max-w-xs sm:max-w-sm mx-auto">
        Your feedback helps us understand what we&apos;re doing well and where we can improve.
      </p>

      <p className="mt-1.5 text-xs text-hospital-secondary/90 italic">
        Thank you for taking a moment to share your experience.
      </p>
    </section>
  );
}
