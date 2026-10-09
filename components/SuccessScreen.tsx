"use client";

import React from "react";
import { HOSPITAL_SHORT_NAME } from "@/lib/config";

interface SuccessScreenProps {
  onReset: () => void;
}

export function SuccessScreen({ onReset }: SuccessScreenProps) {
  return (
    <div className="w-full text-center py-6 px-2 animate-fadeIn max-w-md mx-auto">
      {/* Decorative success check emblem */}
      <div className="w-16 h-16 rounded-full bg-hospital-light border border-hospital-border flex items-center justify-center mx-auto mb-4 shadow-soft">
        <svg
          className="w-8 h-8 text-hospital-primary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2.5"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h2 className="text-xl sm:text-2xl font-bold text-hospital-dark tracking-tight leading-snug">
        Thank you for sharing your experience.
      </h2>

      <p className="mt-3 text-sm text-hospital-secondary leading-relaxed max-w-sm mx-auto">
        Your feedback helps us improve the experience for every patient and family we serve.
      </p>

      <p className="mt-2 text-xs text-hospital-secondary/80">
        You can close this page after submitting your review.
      </p>

      <div className="mt-8 pt-4 border-t border-hospital-border/60">
        <button
          type="button"
          onClick={onReset}
          className="w-full py-3.5 px-6 rounded-xl font-semibold text-sm sm:text-base bg-white border border-hospital-border text-hospital-dark hover:bg-hospital-light/30 transition-all duration-150 active:scale-[0.99] shadow-sm min-h-[48px]"
        >
          Return to {HOSPITAL_SHORT_NAME}
        </button>
      </div>
    </div>
  );
}
