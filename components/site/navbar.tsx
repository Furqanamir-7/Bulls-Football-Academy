"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  academyPhoneTel,
  academyWhatsAppUrl,
  navLinks,
} from "@/lib/site-data";
import { siteHeaderGradient, siteHeaderShadow } from "@/lib/site-theme";
import { cn } from "@/lib/utils";

const headerCtaClass =
  "inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg bg-white px-2.5 py-2 text-xs font-bold text-[#1a0408] shadow-sm transition hover:bg-white/90 sm:gap-2 sm:px-3.5 sm:text-sm";

export function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg
      className={cn("h-4 w-4 shrink-0 sm:h-[18px] sm:w-[18px]", className)}
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.883 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
      />
    </svg>
  );
}

function HeaderContactActions({ dense }: { dense?: boolean }) {
  return (
    <>
      <a href={academyPhoneTel} className={headerCtaClass} aria-label="Call now">
        <Phone className="h-4 w-4 shrink-0 sm:h-[18px] sm:w-[18px]" aria-hidden />
        <span className={dense ? "max-[400px]:hidden" : ""}>Call now</span>
      </a>
      <a
        href={academyWhatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(headerCtaClass, "text-[#128C7E]")}
        aria-label="Message on WhatsApp"
      >
        <WhatsAppGlyph className="text-[#128C7E]" />
        <span className={dense ? "max-[400px]:hidden" : ""}>WhatsApp</span>
      </a>
    </>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-white/10 backdrop-blur-sm",
        siteHeaderGradient,
        siteHeaderShadow,
      )}
    >
      <nav className="section-shell flex h-20 items-center justify-between gap-2 sm:gap-3">
        <Link href="/" className="flex min-w-0 shrink items-center gap-2 sm:gap-3">
          <Image
            src="/logo-main.png"
            alt="BULLS logo"
            width={50}
            height={50}
            className="h-10 w-10 shrink-0 object-contain sm:h-12 sm:w-12"
            priority
          />
          <span className="truncate font-[var(--font-poppins)] text-base font-bold text-white sm:text-lg">
            BULLS FC
          </span>
        </Link>

        <div className="flex min-w-0 flex-1 items-center justify-end gap-2 sm:gap-3">
          <div className="hidden items-center gap-6 lg:flex">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md px-2 py-1 text-sm font-bold text-white/90 transition-colors hover:bg-black/20 hover:text-white",
                  pathname === item.href ? "bg-black/25 text-white ring-1 ring-white/25" : "",
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-2">
              <HeaderContactActions dense />
            </div>
            <button
              type="button"
              className="shrink-0 rounded-lg border border-white/40 p-2 text-white lg:hidden hover:bg-black/10"
              onClick={() => setOpen((prev) => !prev)}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="border-t border-white/10 bg-gradient-to-b from-[#24060a] via-[#6e121c] to-[#1a0408] lg:hidden"
        >
          <div className="section-shell grid gap-3 py-4">
            <div className="grid grid-cols-2 gap-2">
              <a
                href={academyPhoneTel}
                className={cn(headerCtaClass, "w-full py-3 text-sm")}
                onClick={() => setOpen(false)}
              >
                <Phone className="h-[18px] w-[18px]" aria-hidden />
                Call now
              </a>
              <a
                href={academyWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(headerCtaClass, "w-full py-3 text-sm text-[#128C7E]")}
                onClick={() => setOpen(false)}
              >
                <WhatsAppGlyph className="text-[#128C7E]" />
                WhatsApp
              </a>
            </div>
            <div className="h-px bg-white/10" />
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-lg px-2 py-2 text-sm font-bold text-white/90 transition hover:bg-black/20 hover:text-white",
                  pathname === item.href ? "bg-black/25 text-white ring-1 ring-white/20" : "",
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </header>
  );
}
