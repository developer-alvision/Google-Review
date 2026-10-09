import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { HOSPITAL_NAME, HOSPITAL_SHORT_NAME } from "@/lib/config";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: `Share Your Experience | ${HOSPITAL_NAME}`,
  description: `Share your experience with ${HOSPITAL_NAME} (${HOSPITAL_SHORT_NAME}). Your genuine feedback helps us care better.`,
  keywords: [
    HOSPITAL_SHORT_NAME,
    HOSPITAL_NAME,
    "patient feedback",
    "google review",
    "maternity hospital",
    "patient care",
  ],
  authors: [{ name: HOSPITAL_NAME }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: `Share Your Experience | ${HOSPITAL_NAME}`,
    description: `Share your feedback with ${HOSPITAL_NAME}. We appreciate your time and review.`,
    type: "website",
    locale: "en_IN",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#FFF7F8",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-hospital-bg text-hospital-dark antialiased min-h-screen selection:bg-hospital-light selection:text-hospital-primary">
        {children}
      </body>
    </html>
  );
}
