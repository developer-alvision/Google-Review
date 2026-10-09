"use client";

import React, { useState } from "react";

interface FeedbackFormProps {
  feedback: string;
  rating: number;
  onFeedbackChange: (val: string) => void;
  onSubmit: () => void;
  isLoading?: boolean;
}

export function FeedbackForm({
  feedback,
  rating,
  onFeedbackChange,
  onSubmit,
  isLoading = false,
}: FeedbackFormProps) {
  const [touched, setTouched] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const trimmed = feedback.trim();
  const minLength = 10;
  const isRatingValid = rating > 0;
  const isFeedbackValid = trimmed.length >= minLength;
  const isFormValid = isRatingValid && isFeedbackValid;

  const validate = (): boolean => {
    setTouched(true);

    if (!isRatingValid) {
      setErrorMessage("Please select a star rating above.");
      return false;
    }

    if (trimmed.length === 0) {
      setErrorMessage("Please tell us a little about your experience before continuing.");
      return false;
    }

    if (trimmed.length < minLength) {
      setErrorMessage("Please add a little more detail so we can understand your experience.");
      return false;
    }

    setErrorMessage(null);
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full mt-6" noValidate>
      {/* Title & Guidance */}
      <div className="text-left mb-2">
        <label
          htmlFor="feedback-input"
          className="text-sm font-semibold text-hospital-dark block"
        >
          Tell us about your experience
        </label>
        <p
          id="feedback-desc"
          className="text-xs text-hospital-secondary mt-0.5 leading-relaxed"
        >
          Share your experience in your own words. We&apos;ll help make your feedback clear and easy to read.
        </p>
      </div>

      {/* Textarea container */}
      <div className="relative">
        <textarea
          id="feedback-input"
          aria-describedby="feedback-desc feedback-privacy"
          aria-invalid={touched && !isFeedbackValid}
          rows={4}
          value={feedback}
          onChange={(e) => {
            onFeedbackChange(e.target.value);
            if (errorMessage) {
              setErrorMessage(null);
            }
          }}
          onBlur={() => setTouched(true)}
          placeholder="Example: The doctor explained everything clearly and the staff were very supportive."
          className={`w-full p-3.5 rounded-xl border text-sm text-hospital-dark placeholder:text-gray-400 focus:outline-none transition-all duration-150 resize-y min-h-[110px] leading-relaxed bg-white ${
            touched && !isFeedbackValid && feedback.length > 0
              ? "border-red-400 focus:ring-2 focus:ring-red-200"
              : "border-hospital-border focus:border-hospital-primary focus:ring-2 focus:ring-hospital-primary/20"
          }`}
        />

        {/* Character count guidance */}
        <div className="flex justify-between items-center px-1 mt-1 text-[11px] text-hospital-secondary">
          <span>
            {trimmed.length < minLength ? (
              <span className="text-hospital-secondary">
                Minimum {minLength} characters ({trimmed.length}/{minLength})
              </span>
            ) : (
              <span className="text-emerald-700 font-medium">
                ✓ Ready ({trimmed.length} characters)
              </span>
            )}
          </span>
        </div>
      </div>

      {/* Error notification banner */}
      {errorMessage && (
        <div
          role="alert"
          className="mt-2.5 p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2 animate-fadeIn"
        >
          <svg
            className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Privacy note */}
      <div
        id="feedback-privacy"
        className="mt-3 p-2.5 rounded-lg bg-hospital-subtle/60 border border-hospital-border/80 flex items-start gap-2"
      >
        <svg
          className="w-4 h-4 text-hospital-primary flex-shrink-0 mt-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
        <p className="text-[11px] sm:text-xs text-hospital-secondary text-left leading-normal">
          <strong className="font-semibold text-hospital-dark">Privacy reminder:</strong> Please avoid sharing sensitive personal or medical information.
        </p>
      </div>

      {/* Primary Continue Button */}
      <div className="mt-6">
        <button
          type="submit"
          disabled={!isFormValid || isLoading}
          className={`w-full py-3.5 px-6 rounded-xl font-semibold text-sm sm:text-base transition-all duration-150 shadow-sm flex items-center justify-center gap-2 min-h-[48px] ${
            isFormValid && !isLoading
              ? "bg-hospital-primary hover:bg-hospital-primaryHover text-white shadow-soft active:scale-[0.99] cursor-pointer"
              : "bg-gray-200 text-gray-400 cursor-not-allowed border border-gray-200"
          }`}
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
              <span>Preparing your review...</span>
            </>
          ) : (
            <>
              <span>Continue</span>
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </>
          )}
        </button>

        {!isFormValid && (
          <p className="text-[11px] text-hospital-secondary text-center mt-2">
            {!isRatingValid && trimmed.length < minLength
              ? "Select a star rating and share your experience to continue"
              : !isRatingValid
              ? "Please select your star rating to continue"
              : "Please enter at least 10 characters to continue"}
          </p>
        )}
      </div>
    </form>
  );
}
