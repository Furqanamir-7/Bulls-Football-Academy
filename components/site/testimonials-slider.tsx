"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Card, type CardVariant } from "@/components/ui/card";

const testimonials = [
  { name: "Parent of U14 Player", quote: "Bulls transformed my son from shy to fearless on the pitch." },
  { name: "Senior Team Player", quote: "Elite drills, intense sessions, and tactical clarity every week." },
  { name: "Youth Athlete", quote: "Great coaches, match exposure, and real professional standards." },
];

export function TestimonialsSlider({ variant = "default" }: { variant?: CardVariant }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <Card variant={variant} className="flex min-h-[220px] flex-col p-6">
      <div className="mb-4 flex items-center gap-2">
        <span className="h-[3px] w-8 rounded bg-[#D91F26]" />
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">Player Voice</p>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="flex min-h-[130px] flex-1 flex-col justify-between"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
        >
          <p
            className={cn(
              "text-lg",
              variant === "light" ? "text-zinc-600" : "text-zinc-200",
            )}
          >
            &ldquo;{testimonials[index].quote}&rdquo;
          </p>
          <p className="mt-3 text-sm font-semibold text-[#D91F26]">
            {testimonials[index].name}
          </p>
        </motion.div>
      </AnimatePresence>
      <div className="mt-4 flex items-center gap-2">
        {testimonials.map((_, dotIndex) => (
          <span
            key={dotIndex}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              dotIndex === index ? "w-6 bg-[#D91F26]" : "w-1.5 bg-white/25",
            )}
          />
        ))}
      </div>
    </Card>
  );
}
