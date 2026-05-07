"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Expand,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import type { ProgramCard } from "@/lib/site-data";
import { Card } from "@/components/ui/card";
import { siteHeaderGradientVertical } from "@/lib/site-theme";
import { cn } from "@/lib/utils";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useState,
} from "react";
import { createPortal } from "react-dom";

function useBodyScrollLocked(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [locked]);
}

export function ProgramGalleryCard({
  program,
  variant,
}: {
  program: ProgramCard;
  variant: "page" | "featured";
}) {
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const slides = useMemo(() => {
    const rest = program.galleryImages ?? [];
    const list = [program.previewImage, ...rest];
    return Array.from(new Set(list));
  }, [program.galleryImages, program.previewImage]);

  const slideCount = slides.length;
  const active = slides[index] ?? "";

  useBodyScrollLocked(open);

  const close = useCallback(() => {
    setOpen(false);
    setIndex(0);
  }, []);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft")
        setIndex((i) => (i - 1 + slideCount) % slideCount);
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % slideCount);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, slideCount, close]);

  const openGallery = useCallback(() => {
    setIndex(0);
    setOpen(true);
  }, []);

  /** Cinematic fullscreen gallery: blurred backdrop wash, hero crossfade, filmstrip dock */
  const modal =
    mounted && open ? (
      createPortal(
        <div
          className="fixed inset-0 flex justify-center overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#D91F26]/35"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 2147483646,
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          tabIndex={-1}
        >
          <button
            type="button"
            aria-label="Close gallery"
            className={cn(
              "fixed inset-0",
              siteHeaderGradientVertical,
              "brightness-[0.88] saturate-110 shadow-[inset_0_0_100px_rgba(0,0,0,0.35)]",
            )}
            style={{ position: "fixed", inset: 0, zIndex: 2147483645 }}
            onClick={close}
          />
          {/* Extra depth: richer maroon wash (matches site cards) */}
          <div
            className={cn(
              "pointer-events-none fixed inset-0 bg-gradient-to-b from-[#1a0408]/90 via-[#5c101c]/82 to-[#120308]/95",
            )}
            style={{ position: "fixed", inset: 0, zIndex: 2147483645 }}
            aria-hidden
          />
          {/* Blurred ambience (current slide) — tinted toward Bulls red */}
          <div
            className="pointer-events-none fixed inset-0 overflow-hidden opacity-[0.88]"
            style={{ position: "fixed", inset: 0, zIndex: 2147483645 }}
            aria-hidden
          >
            <AnimatePresence mode="wait">
              {active ? (
                <motion.div
                  key={active}
                  className="absolute inset-[-8%]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.55 }}
                >
                  <Image
                    src={active}
                    alt=""
                    fill
                    className="scale-110 object-cover blur-[76px] saturate-[1.12] brightness-[0.72] hue-rotate-[-8deg]"
                    sizes="100vw"
                    priority={false}
                    quality={28}
                  />
                </motion.div>
              ) : null}
            </AnimatePresence>
            <div
              className="absolute inset-0 bg-gradient-to-b from-[#7a1520]/45 via-transparent to-[#1a0408]/70 mix-blend-multiply"
              aria-hidden
            />
          </div>
          {/* Burgundy vignette */}
          <div
            className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_88%_72%_at_50%_42%,rgba(217,31,38,0.14)_0%,transparent_38%,rgba(26,4,8,0.82)_74%,rgba(8,2,6,0.97)_118%)]"
            style={{ position: "fixed", inset: 0, zIndex: 2147483645 }}
            aria-hidden
          />

          <div
            className="relative z-10 my-auto flex min-h-[min-content] w-full max-w-[min(100%,1180px)] touch-manipulation flex-col gap-5 px-3 py-8 sm:gap-6 sm:px-6 sm:py-10"
            style={{ zIndex: 2147483646 }}
          >
            <header className="flex shrink-0 items-start justify-between gap-4">
              <div className="min-w-0 space-y-3">
                <div
                  className="h-[3px] w-14 rounded-full bg-gradient-to-r from-[#D91F26] to-transparent sm:w-20"
                  aria-hidden
                />
                <div>
                  <p
                    id={titleId}
                    className="text-lg font-semibold leading-snug tracking-tight text-white [font-family:var(--font-poppins),system-ui,sans-serif] sm:text-xl"
                  >
                    {program.title}
                  </p>
                  <p className="mt-1 line-clamp-2 max-w-xl text-xs leading-relaxed text-white/50 sm:line-clamp-3 sm:text-sm">
                    {program.description}
                  </p>
                </div>
                <div className="flex flex-wrap items-end gap-x-4 gap-y-3">
                  <div className="flex items-baseline gap-2 tabular-nums">
                    <span className="text-4xl font-extralight tracking-tighter text-white sm:text-5xl">
                      {String(slideCount > 0 ? index + 1 : 0).padStart(2, "0")}
                    </span>
                    <span className="pb-1 text-lg text-white/30">/</span>
                    <span className="pb-1 text-sm font-medium text-white/45 sm:text-base">
                      {String(slideCount).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="h-[3px] flex-1 min-w-[6rem] max-w-[12rem] self-center rounded-full bg-[#1a0408]/90 shadow-[inset_0_1px_3px_rgba(0,0,0,0.45)] ring-1 ring-white/[0.08]">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-[#651018] via-[#D91F26] to-[#ff4d54]"
                      initial={false}
                      animate={{
                        width: `${slideCount > 0 ? ((index + 1) / slideCount) * 100 : 0}%`,
                      }}
                      transition={{ type: "spring", stiffness: 280, damping: 34 }}
                    />
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={close}
                className={cn(
                  "inline-flex size-11 shrink-0 items-center justify-center rounded-2xl border border-[#D91F26]/35 bg-[#1a0408]/80 text-white backdrop-blur-xl",
                  "shadow-[0_12px_32px_-8px_rgba(0,0,0,0.55)] transition-colors hover:border-[#D91F26]/55 hover:bg-[#2c060c]/90",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D91F26]",
                )}
                aria-label="Close gallery"
              >
                <X className="size-5 opacity-90" />
              </button>
            </header>

            <div className="relative flex min-h-0 flex-1 flex-col items-center justify-center">
              <div className="absolute inset-x-0 top-[42%] z-20 flex -translate-y-1/2 justify-between px-0 sm:inset-x-2">
                <button
                  type="button"
                  onClick={() =>
                    slideCount > 1 &&
                    setIndex((i) => (i - 1 + slideCount) % slideCount)
                  }
                  className={cn(
                    "inline-flex size-12 items-center justify-center rounded-full border border-[#D91F26]/25 bg-[#1a0408]/70 text-white backdrop-blur-md",
                    "shadow-[0_14px_40px_-12px_rgba(0,0,0,0.5)] transition-all hover:border-[#D91F26]/55 hover:bg-[#2c060c]/85 sm:size-[3.25rem]",
                    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D91F26]",
                    slideCount <= 1 && "pointer-events-none opacity-25",
                  )}
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="size-6 opacity-95" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    slideCount > 1 && setIndex((i) => (i + 1) % slideCount)
                  }
                  className={cn(
                    "inline-flex size-12 items-center justify-center rounded-full border border-[#D91F26]/25 bg-[#1a0408]/70 text-white backdrop-blur-md",
                    "shadow-[0_14px_40px_-12px_rgba(0,0,0,0.5)] transition-all hover:border-[#D91F26]/55 hover:bg-[#2c060c]/85 sm:size-[3.25rem]",
                    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D91F26]",
                    slideCount <= 1 && "pointer-events-none opacity-25",
                  )}
                  aria-label="Next photo"
                >
                  <ChevronRight className="size-6 opacity-95" />
                </button>
              </div>

              <div className="relative aspect-[4/3] w-full max-h-[min(68dvh,calc(100dvh-240px))] max-w-[min(100%,1040px)] overflow-hidden rounded-[1.35rem] sm:aspect-video sm:rounded-[1.5rem]">
                <div
                  className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-t from-[#1a0408]/50 via-transparent to-[#D91F26]/[0.06]"
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-[#D91F26]/20 shadow-[0_28px_80px_-14px_rgba(0,0,0,0.65),0_0_0_1px_rgba(217,31,38,0.08)_inset]"
                  aria-hidden
                />
                <AnimatePresence mode="wait">
                  {slideCount > 0 && active ? (
                    <motion.div
                      key={active}
                      className="absolute inset-0"
                      initial={{ opacity: 0, scale: 0.985 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.99 }}
                      transition={{
                        duration: 0.42,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <Image
                        src={active}
                        alt=""
                        fill
                        className="object-contain object-center"
                        sizes="(max-width: 768px) 96vw, 1040px"
                        priority
                        quality={78}
                      />
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </div>

            {slideCount > 1 ? (
              <div
                className={cn(
                  "rounded-2xl border border-[#D91F26]/22 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl sm:p-3.5",
                  "bg-gradient-to-b from-[#2c060c]/88 to-[#1a0408]/92 ring-1 ring-black/35",
                )}
              >
                <p className="mb-2.5 px-0.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#D91F26]/75">
                  All photos
                </p>
                <div className="flex gap-2.5 overflow-x-auto pb-1 [scrollbar-width:thin] sm:gap-3 sm:justify-center sm:pb-0">
                  {slides.map((src, i) => (
                    <button
                      key={src}
                      type="button"
                      onClick={() => setIndex(i)}
                      className={cn(
                        "relative h-16 w-[5.5rem] shrink-0 snap-center overflow-hidden rounded-xl border-2 transition-[transform,opacity,border-color,box-shadow] duration-300 sm:h-[4.75rem] sm:w-28",
                        "border-transparent opacity-65 hover:border-white/20 hover:opacity-100",
                        i === index &&
                          "scale-[1.02] border-[#D91F26] opacity-100 shadow-[0_0_32px_-2px_rgba(217,31,38,0.65)] ring-2 ring-[#1a0408]/90",
                      )}
                      aria-label={`Show photo ${i + 1}`}
                      aria-current={i === index ? "true" : undefined}
                    >
                      <Image
                        src={src}
                        alt=""
                        fill
                        sizes="112px"
                        className="object-cover"
                        quality={44}
                      />
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>,
        document.body,
      )
    ) : null;

  return (
    <>
      <Card
        className={cn(
          "h-full overflow-hidden p-0 pb-px",
          variant === "featured" &&
            "rounded-3xl transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/35",
        )}
      >
        <div
          role="button"
          tabIndex={0}
          onClick={() => openGallery()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              openGallery();
            }
          }}
          aria-expanded={open}
          aria-haspopup="dialog"
          aria-label={`Open photo gallery for ${program.title}`}
          className={cn(
            "group/card-trigger block w-full cursor-pointer text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D91F26]",
          )}
        >
          <div className="relative aspect-[16/11] w-full overflow-hidden rounded-none border-b border-white/15 bg-black/25 sm:rounded-xl sm:border sm:border-white/15">
            <Image
              src={program.previewImage}
              alt=""
              aria-hidden
              fill
              className="object-cover object-center transition duration-300 group-hover/card-trigger:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={62}
            />
            <div className="absolute inset-x-3 bottom-3 flex flex-wrap items-center justify-between gap-2 sm:inset-x-4 sm:bottom-4">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-black/55 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/95 backdrop-blur-sm">
                <Expand className="size-3.5 text-[#D91F26]" aria-hidden />
                View gallery
              </span>
              <span className="rounded-full border border-white/20 bg-black/45 px-2.5 py-1 text-[11px] font-medium tabular-nums text-white/85 backdrop-blur-sm">
                {slideCount} {slideCount === 1 ? "photo" : "photos"}
              </span>
            </div>
          </div>
        </div>

        <div className={cn(variant === "featured" ? "px-5 pb-4 pt-4" : "p-6")}>
          {variant === "page" ? (
            <h2 className="text-2xl font-semibold !text-[#D91F26]">{program.title}</h2>
          ) : (
            <h3 className="text-xl font-semibold">{program.title}</h3>
          )}
          <p className="mt-2 text-zinc-300">{program.description}</p>

          {variant === "featured" ? (
            <Link
              href={`/programs#${program.slug}`}
              className="mt-4 inline-flex font-semibold underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D91F26]"
            >
              See Program
            </Link>
          ) : (
            <p className="mt-3 text-xs uppercase tracking-[0.2em] text-white/55">
              Click the banner to view photos fullscreen
            </p>
          )}
        </div>
      </Card>

      {modal}
    </>
  );
}
