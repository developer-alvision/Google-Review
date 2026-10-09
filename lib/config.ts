/**
 * Hospital & Review Configuration
 * 
 * Update GOOGLE_REVIEW_URL with the official Google Maps / Business Profile review link.
 * You can also set NEXT_PUBLIC_GOOGLE_REVIEW_URL in your .env or Vercel dashboard.
 */

export const HOSPITAL_NAME = "Jyothsna Maternity & General Hospital";
export const HOSPITAL_SHORT_NAME = "JMHG";

// Default placeholder as requested. Replace this or configure NEXT_PUBLIC_GOOGLE_REVIEW_URL
export const GOOGLE_REVIEW_URL =
  process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL || "PASTE_GOOGLE_REVIEW_URL_HERE";

export const HOSPITAL_TAGLINE =
  "Excellence in maternity, women's health, and comprehensive general healthcare.";

export const HOSPITAL_WEBSITE = "https://jmgh.in";

export const CATEGORY_OPTIONS = [
  "Doctor consultation",
  "Staff support",
  "Communication",
  "Cleanliness",
  "Waiting experience",
  "Overall care",
  "Other",
] as const;

export type CategoryOption = (typeof CATEGORY_OPTIONS)[number];
