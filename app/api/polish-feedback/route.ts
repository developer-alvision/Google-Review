import { NextResponse } from "next/server";
import { AI_POLISH_SYSTEM_PROMPT, localFallbackPolish } from "@/lib/ai";

export const runtime = "nodejs";

/**
 * Production-ready serverless API route for feedback polishing.
 *
 * Supported environment variables:
 * - GEMINI_API_KEY / AI_API_KEY
 * - OPENAI_API_KEY
 * - GROQ_API_KEY
 *
 * If no key is configured in the environment, it uses the local grammar engine
 * and returns the polished text safely without failing or exposing errors to the user.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);

    if (!body || typeof body.feedback !== "string") {
      return NextResponse.json(
        { error: "Invalid request: feedback string is required." },
        { status: 400 }
      );
    }

    const rawFeedback = body.feedback.trim();

    if (rawFeedback.length < 5) {
      return NextResponse.json(
        {
          error: "Feedback is too short to polish.",
          polishedText: rawFeedback,
          originalText: rawFeedback,
          isPolished: false,
        },
        { status: 400 }
      );
    }

    // Safety limit to avoid huge payload abuse
    const sanitizedFeedback = rawFeedback.slice(0, 2000);

    // Check for configured AI keys
    const geminiKey = process.env.GEMINI_API_KEY || process.env.AI_API_KEY;
    const openaiKey = process.env.OPENAI_API_KEY;
    const groqKey = process.env.GROQ_API_KEY;

    // 1. If Gemini API key is configured
    if (geminiKey) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: `${AI_POLISH_SYSTEM_PROMPT}\n\nCustomer Feedback:\n"${sanitizedFeedback}"`,
                    },
                  ],
                },
              ],
              generationConfig: {
                temperature: 0.2,
                maxOutputTokens: 500,
              },
            }),
          }
        );

        if (response.ok) {
          const result = await response.json();
          const candidateText =
            result.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

          if (candidateText) {
            // Strip any accidental wrapping quotes the model may return
            const cleanText = candidateText.replace(/^["']|["']$/g, "").trim();
            return NextResponse.json({
              polishedText: cleanText,
              originalText: rawFeedback,
              isPolished: true,
              provider: "gemini",
            });
          }
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error("[AI Polish API] Gemini provider error:", err);
      }
    }

    // 2. If OpenAI API key is configured
    if (openaiKey) {
      try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openaiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              { role: "system", content: AI_POLISH_SYSTEM_PROMPT },
              { role: "user", content: sanitizedFeedback },
            ],
            temperature: 0.2,
            max_tokens: 500,
          }),
        });

        if (response.ok) {
          const result = await response.json();
          const content = result.choices?.[0]?.message?.content?.trim();
          if (content) {
            const cleanText = content.replace(/^["']|["']$/g, "").trim();
            return NextResponse.json({
              polishedText: cleanText,
              originalText: rawFeedback,
              isPolished: true,
              provider: "openai",
            });
          }
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error("[AI Polish API] OpenAI provider error:", err);
      }
    }

    // 3. If Groq API key is configured
    if (groqKey) {
      try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${groqKey}`,
          },
          body: JSON.stringify({
            model: "llama-3.1-8b-instant",
            messages: [
              { role: "system", content: AI_POLISH_SYSTEM_PROMPT },
              { role: "user", content: sanitizedFeedback },
            ],
            temperature: 0.2,
            max_tokens: 500,
          }),
        });

        if (response.ok) {
          const result = await response.json();
          const content = result.choices?.[0]?.message?.content?.trim();
          if (content) {
            const cleanText = content.replace(/^["']|["']$/g, "").trim();
            return NextResponse.json({
              polishedText: cleanText,
              originalText: rawFeedback,
              isPolished: true,
              provider: "groq",
            });
          }
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error("[AI Polish API] Groq provider error:", err);
      }
    }

    // 4. Default / Local Smart Grammar Polish Engine
    // Ensures the app works 100% reliably out of the box before any API key is configured!
    const localPolished = localFallbackPolish(sanitizedFeedback);

    return NextResponse.json({
      polishedText: localPolished,
      originalText: rawFeedback,
      isPolished: true,
      provider: "local-grammar-engine",
    });
  } catch (error: unknown) {
    const errorMsg =
      error instanceof Error ? error.message : "Internal server error";

    return NextResponse.json(
      {
        error: errorMsg,
        message: "We couldn't polish your feedback right now. You can continue with your original feedback.",
      },
      { status: 500 }
    );
  }
}
