"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type SlideItem = {
  src: string;
  alt: string;
  fit?: "cover" | "contain";
  outlined?: boolean;
};

const slides: SlideItem[] = [
  {
    src: "/images/home-slider-baku-tour.jpeg",
    alt: "Bulls Baku tour — team on pitch with Pakistan and Azerbaijan flags",
    fit: "cover",
    outlined: true,
  },
  {
    src: "/malaysia-tour.jpeg",
    alt: "Bulls tour to Malaysia",
    fit: "cover",
    outlined: true,
  },
  {
    src: "/champions-2025.jpeg",
    alt: "Bulls KL Soccer Championship 2025 Malaysia champions banner",
    fit: "cover",
    outlined: true,
  },
  {
    src: "/academy-group.jpeg",
    alt: "Bulls academy group photo",
    fit: "cover",
    outlined: true,
  },
  {
    src: "/images/home-slider-manchester-city-tour.png",
    alt: "Bulls FC tour to Manchester City Football School",
    fit: "cover",
    outlined: true,
  },
  {
    src: "/images/home-slider-pro-squad.png",
    alt: "Bulls FC Pro Squad promotion poster",
    fit: "cover",
    outlined: true,
  },
  {
    src: "/images/home-slider-qatar-tour.png",
    alt: "Bulls FC Tour to Qatar PSG FA",
    fit: "cover",
    outlined: true,
  },
];

export function HomeImageSlider({
  tone = "dark",
  layout = "default",
}: {
  tone?: "dark" | "light";
  /** Use inside a parent `section-shell` to avoid double padding / extra vertical gap. */
  layout?: "default" | "embedded";
}) {
  const [index, setIndex] = useState(0);
  const currentSlide = slides[index];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const prev = () =>
    setIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  const next = () => setIndex((prevIndex) => (prevIndex + 1) % slides.length);

  const inner = (
    <>
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl border",
          tone === "light"
            ? "border-zinc-200 bg-zinc-50 shadow-md shadow-zinc-900/[0.06]"
            : "border-zinc-800 bg-zinc-950/60",
        )}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.src}
            initial={{ opacity: 0.2 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.2 }}
            transition={{ duration: 0.35 }}
            className="relative aspect-[1024/461] w-full"
          >
            <Image
              src={currentSlide.src}
              alt={currentSlide.alt}
              fill
              sizes="(max-width: 768px) 100vw, 1280px"
              quality={76}
              className={
                currentSlide.fit === "contain"
                  ? "object-contain"
                  : "object-cover"
              }
            />
            {currentSlide.outlined && (
              <div
                className="pointer-events-none absolute inset-1 rounded-xl border border-[#D91F26]/80 shadow-[0_0_0_1px_rgba(217,31,38,0.35),0_0_22px_rgba(217,31,38,0.35)]"
                aria-hidden
              />
            )}
            <div
              className={cn(
                "pointer-events-none absolute inset-0 bg-gradient-to-t to-transparent",
                tone === "light" ? "from-black/10" : "from-black/20",
              )}
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-y-0 left-2 right-2 flex items-center justify-between sm:left-3 sm:right-3">
          <button
            type="button"
            onClick={prev}
            className={cn(
              "pointer-events-auto rounded-lg border p-2 backdrop-blur transition hover:border-[#D91F26] hover:text-[#D91F26]",
              tone === "light"
                ? "border-zinc-300 bg-white/85 text-zinc-800 shadow-sm"
                : "border-zinc-700 bg-black/70 text-zinc-200",
            )}
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={next}
            className={cn(
              "pointer-events-auto rounded-lg border p-2 backdrop-blur transition hover:border-[#D91F26] hover:text-[#D91F26]",
              tone === "light"
                ? "border-zinc-300 bg-white/85 text-zinc-800 shadow-sm"
                : "border-zinc-700 bg-black/70 text-zinc-200",
            )}
            aria-label="Next slide"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="flex justify-center gap-2">
        {slides.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={cn(
              "h-2.5 w-8 rounded-full transition",
              i === index
                ? "bg-[#D91F26]"
                : tone === "light"
                  ? "bg-zinc-300 hover:bg-zinc-400"
                  : "bg-zinc-700 hover:bg-zinc-500",
            )}
          />
        ))}
      </div>
    </>
  );

  if (layout === "embedded") {
    return <div className="w-full space-y-3">{inner}</div>;
  }

  return (
    <section className="section-shell space-y-4">{inner}</section>
  );
}
