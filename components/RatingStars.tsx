"use client";

import React, { useState } from "react";

interface RatingStarsProps {
  rating: number; // 0 means unselected
  onChange: (rating: number) => void;
  error?: string | null;
}

export function RatingStars({ rating, onChange, error }: RatingStarsProps) {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const displayRating = hoverRating !== null ? hoverRating : rating;

  const handleKeyDown = (e: React.KeyboardEvent, starValue: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onChange(starValue);
    } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(5, (rating || 0) + 1);
      onChange(next);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      const prev = Math.max(1, (rating || 1) - 1);
      onChange(prev);
    }
  };

  return (
    <div className="w-full">
      <div className="text-center mb-3">
        <h3
          id="rating-label"
          className="text-base sm:text-lg font-semibold text-hospital-dark"
        >
          How would you rate your overall experience?
        </h3>
        <p className="text-xs text-hospital-secondary mt-0.5">
          Tap a star to rate your visit
        </p>
      </div>

      {/* Interactive 5-star buttons */}
      <div
        role="radiogroup"
        aria-labelledby="rating-label"
        aria-required="true"
        className="flex items-center justify-center gap-2 sm:gap-3 py-2"
      >
        {[1, 2, 3, 4, 5].map((starValue) => {
          const isFilled = starValue <= displayRating;

          return (
            <button
              key={starValue}
              type="button"
              role="radio"
              aria-checked={rating === starValue}
              aria-label={`${starValue} out of 5 stars`}
              tabIndex={0}
              onClick={() => onChange(starValue)}
              onMouseEnter={() => setHoverRating(starValue)}
              onMouseLeave={() => setHoverRating(null)}
              onKeyDown={(e) => handleKeyDown(e, starValue)}
              className="p-2 sm:p-2.5 rounded-full transition-transform duration-150 transform hover:scale-110 active:scale-95 focus-visible:ring-2 focus-visible:ring-hospital-primary focus-visible:outline-none min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <svg
                className={`w-9 h-9 sm:w-10 sm:h-10 transition-colors duration-150 ${
                  isFilled
                    ? "text-hospital-primary drop-shadow-[0_2px_4px_rgba(217,79,112,0.25)]"
                    : "text-gray-300 hover:text-gray-400"
                }`}
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            </button>
          );
        })}
      </div>

      {/* Rating indicator */}
      <div className="text-center mt-2 min-h-[24px]">
        {rating > 0 ? (
          <p className="text-sm font-semibold text-hospital-primary animate-fadeIn">
            Your rating: <span className="underline decoration-hospital-light">{rating} out of 5</span>
          </p>
        ) : (
          <p className="text-xs text-hospital-secondary">
            Please choose a rating to continue
          </p>
        )}
      </div>

      {/* Validation error */}
      {error && (
        <p className="text-xs text-red-600 text-center mt-1 animate-fadeIn" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
