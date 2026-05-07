import Link from "next/link";
import {
  academyFacebookUrl,
  academyInstagramUrl,
  academyTiktokUrl,
  academyWhatsAppUrl,
  navLinks,
} from "@/lib/site-data";
import { siteHeaderGradient } from "@/lib/site-theme";
import { cn } from "@/lib/utils";

export function Footer() {
  return (
    <footer
      className={cn(
        "site-footer mt-0 border-t border-white/10 py-7 shadow-[0_-10px_36px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)]",
        siteHeaderGradient,
      )}
    >
      <div className="section-shell grid gap-8 md:grid-cols-2">
        <div>
          <h3 className="font-[var(--font-poppins)] text-xl font-bold text-white">
            BULLS FOOTBALL ACADEMY
          </h3>
          <p className="mt-2 text-sm text-white/85">
            WE LEAD BY EXAMPLE. NOT BY WORDS.
          </p>
          <p className="mt-1 text-xs font-bold tracking-widest text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]">
            WE ARE A TEAM
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <Link
              href={academyWhatsAppUrl}
              target="_blank"
              className="text-white/90 transition hover:text-white hover:underline"
            >
              WhatsApp
            </Link>
            <Link
              href={academyInstagramUrl}
              target="_blank"
              className="text-white/90 transition hover:text-white hover:underline"
            >
              Instagram
            </Link>
            <Link
              href={academyFacebookUrl}
              target="_blank"
              className="text-white/90 transition hover:text-white hover:underline"
            >
              Facebook
            </Link>
            <Link
              href={academyTiktokUrl}
              target="_blank"
              className="text-white/90 transition hover:text-white hover:underline"
            >
              TikTok
            </Link>
          </div>
        </div>
        <div className="flex flex-nowrap items-center gap-x-4 overflow-x-auto pb-1 text-sm [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="shrink-0 font-bold text-white/90 transition hover:text-white hover:underline"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
