"use client";

import Link from "next/link";
import { WhatsAppGlyph } from "@/components/site/navbar";
import { academyWhatsAppUrl } from "@/lib/site-data";
import { siteHeaderGradient, siteHeaderShadow } from "@/lib/site-theme";
import { cn } from "@/lib/utils";

/** WhatsApp-only floating action: right edge, vertically centered, distinct from page chrome. */
export function ContactFloat() {
  return (
    <Link
      href={academyWhatsAppUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className={cn(
        "fixed top-1/2 z-[60] flex -translate-y-1/2 items-center justify-center",
        "left-auto",
        "h-14 w-14 sm:h-[3.75rem] sm:w-[3.75rem]",
        "rounded-2xl",
        siteHeaderGradient,
        siteHeaderShadow,
        "border border-white/25 text-white",
        "shadow-[0_10px_38px_rgba(0,0,0,0.42),0_0_0_1px_rgba(255,255,255,0.06)_inset]",
        "transition-all duration-300 ease-out will-change-transform",
        "hover:-translate-x-1 hover:scale-[1.07] hover:brightness-[1.08]",
        "hover:shadow-[0_16px_48px_rgba(122,21,32,0.5),0_0_0_1px_rgba(255,255,255,0.12)_inset]",
        "active:scale-[0.96]",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D91F26]"
      )}
      style={{
        right: "max(1rem, env(safe-area-inset-right, 0px))",
      }}
    >
      <WhatsAppGlyph className="h-7 w-7 shrink-0 sm:h-8 sm:w-8" />
    </Link>
  );
}
