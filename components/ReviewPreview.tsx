"use client";

import React, { useState } from "react";
import { CategoryOption } from "@/lib/config";

interface ReviewPreviewProps {
  rating: number;
  selectedCategories: CategoryOption[];
  originalFeedback: string;
  polishedFeedback: string;
  isPolished: boolean;
  aiErrorMessage?: string | null;
  onEdit: () => void;
  finalFeedback: string;
  onFinalFeedbackChange: (text: string) => void;
}

export function ReviewPreview({
  rating,
  selectedCategories,
  originalFeedback,
  polishedFeedback,
  isPolished,
  aiErrorMessage,
  onEdit,
  finalFeedback,
  onFinalFeedbackChange,
}: ReviewPreviewProps) {
  const [showOriginal, setShowOriginal] = useState(false);

  const toggleOriginal = () => {
    if (showOriginal) {
      // Switching back to polished
      onFinalFeedbackChange(polishedFeedback || originalFeedback);
      setShowOriginal(false);
    } else {
      // Switching to original
      onFinalFeedbackChange(originalFeedback);
      setShowOriginal(true);
    }
  };

  return (
    <div className="w-full text-left animate-fadeIn">
      {/* Header */}
      <div className="text-center mb-5">
        <h2 className="text-xl sm:text-2xl font-bold text-hospital-dark tracking-tight">
          Your feedback
        </h2>
        <p className="mt-1.5 text-xs sm:text-sm text-hospital-secondary max-w-sm mx-auto leading-relaxed">
          Here&apos;s a clearer version of what you shared. Make sure it accurately reflects your experience before continuing.
        </p>
      </div>

      {/* AI Fallback Notice if applicable */}
      {aiErrorMessage && (
        <div
          role="status"
          className="mb-4 p-3 rounded-xl bg-amber-50/80 border border-amber-200/80 text-xs text-amber-800 flex items-start gap-2.5"
        >
          <svg
            className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <p className="font-medium">
              We couldn&apos;t polish your feedback right now. You can continue with your original feedback.
            </p>
          </div>
        </div>
      )}

      {/* Main Review Card */}
      <div className="bg-white border border-hospital-border rounded-2xl p-4 sm:p-5 shadow-soft">
        {/* Rating summary */}
        <div className="flex items-center justify-between pb-3.5 border-b border-hospital-border/60">
          <div className="flex items-center gap-1.5" aria-label={`Rating: ${rating} out of 5 stars`}>
            {[1, 2, 3, 4, 5].map((s) => (
              <svg
                key={s}
                className={`w-5 h-5 ${
                  s <= rating ? "text-hospital-primary" : "text-gray-200"
                }`}
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
            <span className="ml-1 text-xs font-semibold text-hospital-dark">
              {rating}.0 / 5
            </span>
          </div>

          <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-hospital-light text-hospital-primary border border-hospital-border">
            Verified Customer
          </span>
        </div>

        {/* Selected categories tags */}
        {selectedCategories.length > 0 && (
          <div className="pt-3 pb-2 flex flex-wrap gap-1.5">
            {selectedCategories.map((cat) => (
              <span
                key={cat}
                className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-hospital-bg text-hospital-dark border border-hospital-border/80"
              >
                {cat}
              </span>
            ))}
          </div>
        )}

        {/* Feedback text display */}
        <div className="mt-3 relative">
          <div className="p-3.5 rounded-xl bg-hospital-bg/50 border border-hospital-border/50 text-sm sm:text-base text-hospital-dark leading-relaxed font-normal whitespace-pre-wrap min-h-[80px]">
            &ldquo;{finalFeedback}&rdquo;
          </div>

          {/* Toggle between polished and original if different */}
          {isPolished && originalFeedback.trim() !== polishedFeedback.trim() && (
            <div className="mt-2.5 flex items-center justify-between text-xs text-hospital-secondary">
              <span className="flex items-center gap-1 text-hospital-secondary">
                <svg
                  className="w-3.5 h-3.5 text-hospital-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {showOriginal ? "Showing original feedback" : "Polished for clarity & grammar"}
              </span>

              <button
                type="button"
                onClick={toggleOriginal}
                className="text-hospital-primary hover:underline font-medium text-xs focus:outline-none"
              >
                {showOriginal ? "View polished version" : "View original"}
              </button>
            </div>
          )}
        </div>

        {/* Edit Button */}
        <div className="mt-4 pt-3 border-t border-hospital-border/60 flex justify-end">
          <button
            type="button"
            onClick={onEdit}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-hospital-primary hover:text-hospital-primaryHover hover:underline py-1 px-2 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-hospital-primary"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
            <span>Edit my feedback</span>
          </button>
        </div>
      </div>
    </div>
  );
}
