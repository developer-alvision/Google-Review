"use client";

import React from "react";
import { CATEGORY_OPTIONS, CategoryOption } from "@/lib/config";

interface CategorySelectorProps {
  selectedCategories: CategoryOption[];
  onToggleCategory: (category: CategoryOption) => void;
}

export function CategorySelector({
  selectedCategories,
  onToggleCategory,
}: CategorySelectorProps) {
  return (
    <fieldset className="w-full mt-6">
      <legend className="text-sm font-semibold text-hospital-dark block text-left mb-1.5">
        What stood out about your experience?
      </legend>
      <p className="text-xs text-hospital-secondary text-left mb-3">
        Select all that apply (optional)
      </p>

      <div
        className="flex flex-wrap gap-2 justify-start"
        role="group"
        aria-label="Experience categories"
      >
        {CATEGORY_OPTIONS.map((category) => {
          const isSelected = selectedCategories.includes(category);

          return (
            <button
              key={category}
              type="button"
              role="checkbox"
              aria-checked={isSelected}
              onClick={() => onToggleCategory(category)}
              className={`text-xs sm:text-sm font-medium px-3.5 py-2 rounded-full border transition-all duration-150 min-h-[38px] flex items-center justify-center gap-1.5 ${
                isSelected
                  ? "bg-hospital-primary text-white border-hospital-primary shadow-sm"
                  : "bg-white text-hospital-dark border-hospital-border hover:border-hospital-primary/40 hover:bg-hospital-light/30"
              }`}
            >
              {isSelected && (
                <svg
                  className="w-3.5 h-3.5 flex-shrink-0 animate-scaleIn text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="3"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
              <span>{category}</span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
