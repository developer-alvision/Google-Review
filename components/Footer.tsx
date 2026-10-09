import React from "react";
import { HOSPITAL_NAME } from "@/lib/config";

export function Footer() {
  return (
    <footer className="w-full py-6 px-4 text-center mt-auto border-t border-hospital-border/40">
      <p className="text-xs font-semibold text-hospital-dark">
        {HOSPITAL_NAME}
      </p>
      <p className="text-[11px] text-hospital-secondary mt-1">
        Thank you for helping us improve.
      </p>
      <p className="text-[10px] text-hospital-secondary/60 mt-2">
        Patient feedback is gathered directly and objectively. Reviews are published directly to Google.
      </p>
    </footer>
  );
}
