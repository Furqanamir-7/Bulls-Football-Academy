"use client";

import Link from "next/link";
import { ChevronRight, Phone } from "lucide-react";
import { WhatsAppGlyph } from "@/components/site/navbar";
import { academyPhoneTel, academyWhatsAppUrl } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const iconRed = "text-[#D91F26]";

/**
 * Right-edge vertical strip (mirrors common FAB layouts): optional contact shortcut,
 * WhatsApp, and direct call — black chrome, brand-red icons.
 */
export function ContactFloat() {
  const rowClass =
    "flex h-14 w-14 shrink-0 items-center justify-center bg-black transition-colors hover:bg-zinc-950 active:bg-zinc-900";

  return (
    <div
      className={cn(
        "site-contact-float pointer-events-auto flex -translate-y-1/2 flex-col overflow-hidden rounded-l-2xl rounded-r-none border border-white/15 bg-black shadow-[0_12px_40px_rgba(0,0,0,0.5)]",
      )}
    >
      {/* Top row — visual match to reference (arrow); links to full contact page */}
      <Link
        href="/contact"
        className={cn(rowClass, "border-b border-white/12")}
        aria-label="Open contact page"
      >
        <ChevronRight className={cn("h-5 w-5", iconRed)} strokeWidth={2.25} aria-hidden />
      </Link>

      <Link
        href={academyWhatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(rowClass, "border-b border-white/12")}
        aria-label="Chat on WhatsApp"
      >
        <WhatsAppGlyph className={cn("h-7 w-7", iconRed)} />
      </Link>

      <a href={academyPhoneTel} className={rowClass} aria-label="Call the academy">
        <Phone className={cn("h-7 w-7", iconRed)} strokeWidth={2.25} aria-hidden />
      </a>
    </div>
  );
}
