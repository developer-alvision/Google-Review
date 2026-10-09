/**
 * JMHG AI Polish Service Layer
 *
 * Strict Guardrails:
 * 1. Improve grammar, spelling, punctuation, and readability only.
 * 2. Strictly preserve original meaning, sentiment, claims, and enthusiasm.
 * 3. Never fabricate praise, claims, facts, or experiences.
 * 4. Never increase sentiment or rating.
 * 5. Safe client-server separation: API keys are never exposed in browser code.
 * 6. Always fallback to original text if the service is unreachable.
 */

export interface PolishFeedbackRequest {
  feedback: string;
  rating?: number;
  categories?: string[];
}

export interface PolishFeedbackResult {
  polishedText: string;
  originalText: string;
  isPolished: boolean;
  error?: string;
}

export const AI_POLISH_SYSTEM_PROMPT = `Improve grammar, spelling, punctuation and readability of the customer's feedback. Preserve the customer's original meaning, sentiment, claims and level of enthusiasm. Do not add praise, facts, experiences, recommendations or claims that the customer did not provide. Do not increase the rating or sentiment. Return only the polished feedback.`;

/**
 * Local / Client fallback grammar & formatting cleanser.
 * Used when offline, during network errors, or when no external AI API key is configured.
 * Strictly preserves the user's words, intent, and claims.
 */
export function localFallbackPolish(text: string): string {
  if (!text || typeof text !== "string") return "";

  let cleaned = text
    .replace(/\r\n/g, "\n")
    // Fix multiple consecutive spaces
    .replace(/[ \t]+/g, " ")
    // Fix space before punctuation
    .replace(/\s+([.,!?;:])/g, "$1")
    // Ensure space after punctuation if followed by a letter
    .replace(/([.,!?;:])([a-zA-Z])/g, "$1 $2")
    .trim();

  // Capitalize sentence beginnings
  cleaned = cleaned.replace(/(^\s*|[.!?]\s+)([a-z])/g, (_, prefix, char) => {
    return prefix + char.toUpperCase();
  });

  // Capitalize isolated 'i'
  cleaned = cleaned.replace(/\bi\b/g, "I");

  // If ending lacks terminal punctuation, ensure a period if it looks like a complete sentence
  if (cleaned.length > 5 && !/[.!?]$/.test(cleaned)) {
    cleaned += ".";
  }

  return cleaned;
}

/**
 * Calls the secure backend API endpoint /api/polish-feedback.
 * Returns the polished feedback string or gracefully falls back to original text.
 */
export async function polishFeedback(
  request: PolishFeedbackRequest
): Promise<PolishFeedbackResult> {
  const original = request.feedback.trim();

  if (!original) {
    return {
      polishedText: "",
      originalText: "",
      isPolished: false,
    };
  }

  try {
    const response = await fetch("/api/polish-feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        feedback: original,
        rating: request.rating,
        categories: request.categories,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error ${response.status}`);
    }

    const data = await response.json();
    if (data && typeof data.polishedText === "string" && data.polishedText.trim()) {
      return {
        polishedText: data.polishedText.trim(),
        originalText: original,
        isPolished: data.isPolished ?? true,
      };
    }

    // If server returned empty, fallback
    return {
      polishedText: localFallbackPolish(original),
      originalText: original,
      isPolished: true,
    };
  } catch (err: unknown) {
    const errorMsg =
      err instanceof Error ? err.message : "Unknown error connecting to polish service";

    // Graceful fallback: polish locally without breaking the user experience
    const fallbackText = localFallbackPolish(original);

    return {
      polishedText: fallbackText || original,
      originalText: original,
      isPolished: false,
      error: errorMsg,
    };
  }
}
