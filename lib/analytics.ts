/**
 * Abstract Analytics Architecture
 *
 * Prepared for plug-and-play integration with Google Analytics (gtag),
 * PostHog, Vercel Analytics, or custom telemetry.
 *
 * Adheres strictly to healthcare privacy:
 * Never logs or tracks personal data, patient medical info, or feedback text.
 */

export type AnalyticsEventType =
  | "page_view"
  | "rating_selected"
  | "feedback_started"
  | "feedback_submitted"
  | "review_copied"
  | "google_opened";

export interface AnalyticsEventPayload {
  rating?: number;
  categoryCount?: number;
  feedbackLength?: number;
  source?: "qr_scan" | "direct" | "unknown";
  polishedUsed?: boolean;
  [key: string]: unknown;
}

export function trackEvent(
  event: AnalyticsEventType,
  payload?: AnalyticsEventPayload
): void {
  try {
    // 1. Console debug logging during development
    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console
      console.log(`[Analytics Event] ${event}`, payload ?? {});
    }

    // 2. Google Analytics (gtag.js) compatibility if present on window
    if (typeof window !== "undefined" && typeof (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag === "function") {
      (window as unknown as { gtag: (...args: unknown[]) => void }).gtag("event", event, payload);
    }

    // 3. PostHog compatibility if present on window
    if (typeof window !== "undefined" && (window as unknown as { posthog?: { capture: (...args: unknown[]) => void } }).posthog) {
      (window as unknown as { posthog: { capture: (...args: unknown[]) => void } }).posthog.capture(event, payload);
    }

    // 4. Custom dispatch event for external listeners
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("jmhg_analytics", {
          detail: { event, payload, timestamp: Date.now() },
        })
      );
    }
  } catch (error) {
    // Fail silently so analytics errors never interrupt patient experience
    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console
      console.error("[Analytics] Error tracking event:", error);
    }
  }
}
