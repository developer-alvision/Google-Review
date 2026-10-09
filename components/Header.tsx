import React from "react";
import { HOSPITAL_NAME, HOSPITAL_SHORT_NAME } from "@/lib/config";

export function Header() {
  return (
    <header className="w-full pt-6 pb-4 px-4 text-center">
      {/* Visual medical placeholder container - clean & easily replaceable with official logo */}
      <div className="flex flex-col items-center justify-center">
        {/* Text-based logo placeholder badge */}
        <div
          className="inline-flex items-center justify-center px-3.5 py-1.5 rounded-full bg-hospital-light border border-hospital-border mb-2.5 shadow-sm transition-transform active:scale-95"
          aria-label={`${HOSPITAL_SHORT_NAME} Emblem`}
        >
          {/* Subtle medical cross icon */}
          <svg
            className="w-4 h-4 text-hospital-primary mr-1.5 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 2a1 1 0 011 1v6h6a1 1 0 110 2h-6v6a1 1 0 11-2 0v-6H3a1 1 0 110-2h6V3a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-xs font-bold tracking-widest text-hospital-primary uppercase">
            {HOSPITAL_SHORT_NAME}
          </span>
        </div>

        {/* Official Hospital Name */}
        <h1 className="text-lg sm:text-xl font-bold tracking-tight text-hospital-dark leading-snug max-w-sm sm:max-w-md mx-auto">
          {HOSPITAL_NAME}
        </h1>
        <p className="text-xs font-medium text-hospital-secondary mt-0.5">
          Patient Experience & Feedback
        </p>
      </div>
    </header>
  );
}
