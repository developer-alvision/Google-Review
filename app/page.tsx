"use client";

import React, { useState, useEffect, useRef } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { RatingStars } from "@/components/RatingStars";
import { CategorySelector } from "@/components/CategorySelector";
import { FeedbackForm } from "@/components/FeedbackForm";
import { ReviewPreview } from "@/components/ReviewPreview";
import { GoogleReviewButton } from "@/components/GoogleReviewButton";
import { SuccessScreen } from "@/components/SuccessScreen";
import { Footer } from "@/components/Footer";
import { CategoryOption } from "@/lib/config";
import { polishFeedback } from "@/lib/ai";
import { trackEvent } from "@/lib/analytics";

type FlowStep = "input" | "preview" | "success";

export default function Home() {
  const [step, setStep] = useState<FlowStep>("input");

  // User input states
  const [rating, setRating] = useState<number>(0);
  const [selectedCategories, setSelectedCategories] = useState<CategoryOption[]>([]);
  const [originalFeedback, setOriginalFeedback] = useState<string>("");
  const [finalFeedback, setFinalFeedback] = useState<string>("");
  const [polishedFeedback, setPolishedFeedback] = useState<string>("");

  // AI & Processing states
  const [isPolishing, setIsPolishing] = useState<boolean>(false);
  const [isPolished, setIsPolished] = useState<boolean>(false);
  const [aiError, setAiError] = useState<string | null>(null);

  // Track if feedback typing was logged
  const feedbackTypingStartedRef = useRef<boolean>(false);

  // Initial page view event
  useEffect(() => {
    trackEvent("page_view", { source: "qr_scan" });
  }, []);

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    trackEvent("rating_selected", { rating: newRating });
  };

  const handleToggleCategory = (category: CategoryOption) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleFeedbackChange = (text: string) => {
    setOriginalFeedback(text);

    if (text.length > 0 && !feedbackTypingStartedRef.current) {
      feedbackTypingStartedRef.current = true;
      trackEvent("feedback_started");
    }
  };

  const handleProceedToPreview = async () => {
    setIsPolishing(true);
    setAiError(null);

    trackEvent("feedback_submitted", {
      rating,
      categoryCount: selectedCategories.length,
      feedbackLength: originalFeedback.trim().length,
    });

    try {
      const result = await polishFeedback({
        feedback: originalFeedback,
        rating,
        categories: selectedCategories,
      });

      if (result.polishedText) {
        setPolishedFeedback(result.polishedText);
        setFinalFeedback(result.polishedText);
        setIsPolished(result.isPolished);
      } else {
        setPolishedFeedback(originalFeedback);
        setFinalFeedback(originalFeedback);
        setIsPolished(false);
      }

      if (result.error) {
        setAiError(
          "We couldn't polish your feedback right now. You can continue with your original feedback."
        );
      }
    } catch {
      setPolishedFeedback(originalFeedback);
      setFinalFeedback(originalFeedback);
      setIsPolished(false);
      setAiError(
        "We couldn't polish your feedback right now. You can continue with your original feedback."
      );
    } finally {
      setIsPolishing(false);
      setStep("preview");
      // Scroll to top of preview smoothly
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const handleEditFeedback = () => {
    setStep("input");
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleResetFlow = () => {
    setStep("input");
    setRating(0);
    setSelectedCategories([]);
    setOriginalFeedback("");
    setFinalFeedback("");
    setPolishedFeedback("");
    setAiError(null);
    setIsPolished(false);
    feedbackTypingStartedRef.current = false;
    trackEvent("page_view");
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-hospital-bg">
      {/* Centered Desktop Layout Container with Card Treatment */}
      <div className="w-full max-w-lg mx-auto flex-1 flex flex-col justify-start px-3 sm:px-4 py-3 sm:py-6">
        {/* Main Content Card */}
        <main
          className="w-full bg-white rounded-3xl sm:shadow-card border border-hospital-border/80 p-4 sm:p-7 flex flex-col items-center transition-all duration-200"
          aria-live="polite"
        >
          <Header />

          {/* STEP 1: FEEDBACK INPUT */}
          {step === "input" && (
            <div className="w-full animate-fadeIn">
              <HeroSection />

              <div className="mt-2 pt-4 border-t border-hospital-border/50">
                <RatingStars rating={rating} onChange={handleRatingChange} />
              </div>

              <CategorySelector
                selectedCategories={selectedCategories}
                onToggleCategory={handleToggleCategory}
              />

              <FeedbackForm
                feedback={originalFeedback}
                rating={rating}
                onFeedbackChange={handleFeedbackChange}
                onSubmit={handleProceedToPreview}
                isLoading={isPolishing}
              />
            </div>
          )}

          {/* STEP 2: REVIEW PREVIEW & GOOGLE CTA */}
          {step === "preview" && (
            <div className="w-full animate-fadeIn pt-2">
              <ReviewPreview
                rating={rating}
                selectedCategories={selectedCategories}
                originalFeedback={originalFeedback}
                polishedFeedback={polishedFeedback}
                isPolished={isPolished}
                aiErrorMessage={aiError}
                onEdit={handleEditFeedback}
                finalFeedback={finalFeedback}
                onFinalFeedbackChange={setFinalFeedback}
              />

              <GoogleReviewButton
                feedbackText={finalFeedback || originalFeedback}
                rating={rating}
                onProceedToSuccess={() => setStep("success")}
              />
            </div>
          )}

          {/* STEP 3: SUCCESS / THANK YOU SCREEN */}
          {step === "success" && (
            <div className="w-full animate-fadeIn">
              <SuccessScreen onReset={handleResetFlow} />
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}
