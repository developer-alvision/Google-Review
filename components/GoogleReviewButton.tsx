"use client";

import React, { useState } from "react";
import { GOOGLE_REVIEW_URL } from "@/lib/config";
import { trackEvent } from "@/lib/analytics";

interface GoogleReviewButtonProps {
  feedbackText: string;
  rating: number;
  onProceedToSuccess: () => void;
}

export function GoogleReviewButton({
  feedbackText,
  rating,
  onProceedToSuccess,
}: GoogleReviewButtonProps) {
  const [copiedStatus, setCopiedStatus] = useState<"idle" | "success" | "error">("idle");
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);

  /**
   * Robust clipboard copy supporting modern navigator.clipboard
   * and fallback textarea for older mobile browsers / webviews.
   */
  const copyToClipboard = async (text: string): Promise<boolean> => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch {
      // Proceed to fallback
    }

    // Fallback for non-https / older webviews
    try {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      textarea.style.top = "0";
      textarea.setAttribute("readonly", "");
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      const successful = document.execCommand("copy");
      document.body.removeChild(textarea);
      return successful;
    } catch {
      return false;
    }
  };

  const handleCopyAndOpenGoogle = async () => {
    // Determine destination URL
    const destination = GOOGLE_REVIEW_URL.trim();
    const finalUrl =
      destination === "PASTE_GOOGLE_REVIEW_URL_HERE" || !destination
        ? "https://www.google.com/search?q=Jyothsna+Maternity+%26+General+Hospital+reviews"
        : destination;

    // Open target window immediately within user click gesture to avoid mobile popup blockers
    let popupWindow: Window | null = null;
    if (typeof window !== "undefined") {
      popupWindow = window.open(finalUrl, "_blank", "noopener,noreferrer");
    }

    // Copy to clipboard
    const success = await copyToClipboard(feedbackText);

    if (success) {
      setCopiedStatus("success");
      setCopiedNotification("Your feedback has been copied. You can now paste it into Google.");
      trackEvent("review_copied", { rating, feedbackLength: feedbackText.length });
    } else {
      setCopiedStatus("error");
      setCopiedNotification(
        "Your feedback couldn't be copied automatically. Please use the Copy button below."
      );
    }

    trackEvent("google_opened", { rating });

    // Fallback if popup was blocked by browser
    if (!popupWindow && typeof window !== "undefined") {
      window.location.href = finalUrl;
    }

    // Transition to success/confirmation screen after a brief delay
    setTimeout(() => {
      onProceedToSuccess();
    }, 1200);
  };

  const handleCopyOnly = async () => {
    const success = await copyToClipboard(feedbackText);
    if (success) {
      setCopiedStatus("success");
      setCopiedNotification("Your feedback has been copied. You can now paste it into Google.");
      trackEvent("review_copied", { rating, feedbackLength: feedbackText.length });
      setTimeout(() => {
        setCopiedNotification(null);
      }, 4000);
    } else {
      setCopiedStatus("error");
      setCopiedNotification(
        "Your feedback couldn't be copied automatically. Please use the Copy button below."
      );
    }
  };

  return (
    <div className="w-full mt-5 space-y-3">
      {/* Confirmation / Error notification */}
      {copiedNotification && (
        <div
          role="status"
          className={`p-3 rounded-xl text-xs flex items-start gap-2.5 animate-fadeIn ${
            copiedStatus === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {copiedStatus === "success" ? (
            <svg
              className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
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
          )}
          <span className="font-medium leading-relaxed">{copiedNotification}</span>
        </div>
      )}

      {/* Prominent Primary Button */}
      <button
        type="button"
        onClick={handleCopyAndOpenGoogle}
        className="w-full py-4 px-6 rounded-xl font-semibold text-sm sm:text-base bg-hospital-primary hover:bg-hospital-primaryHover text-white shadow-soft transition-all duration-150 active:scale-[0.99] flex items-center justify-center gap-2.5 cursor-pointer min-h-[52px]"
      >
        <svg
          className="w-5 h-5 flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
          />
        </svg>
        <span>Copy Feedback &amp; Open Google</span>
      </button>

      {/* Secondary Copy Button */}
      <button
        type="button"
        onClick={handleCopyOnly}
        className="w-full py-3 px-4 rounded-xl font-medium text-xs sm:text-sm bg-white text-hospital-dark border border-hospital-border hover:bg-hospital-light/40 transition-colors flex items-center justify-center gap-2 min-h-[44px]"
      >
        <svg
          className="w-4 h-4 text-hospital-secondary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
        <span>Copy feedback</span>
      </button>

      <p className="text-[11px] text-hospital-secondary text-center leading-normal pt-1">
        A new tab will open Google Reviews where you can paste your text and submit.
      </p>
    </div>
  );
}
