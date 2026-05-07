import * as React from "react";
import { siteHeaderGradientVertical, siteHeaderShadow } from "@/lib/site-theme";
import { cn } from "@/lib/utils";

export type CardVariant = "default" | "light";

export function Card({
  className,
  variant = "default",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { variant?: CardVariant }) {
  return (
    <div
      className={cn(
        variant === "light"
          ? cn(
              "rounded-2xl border border-zinc-200 bg-white text-zinc-900 shadow-md shadow-zinc-900/[0.07]",
              "[&_p]:text-zinc-600",
              "[&_.text-zinc-300]:!text-zinc-600 [&_.text-zinc-400]:!text-zinc-500 [&_.text-zinc-200]:!text-zinc-700",
            )
          : cn(
              "rounded-2xl border border-white/10 text-white",
              siteHeaderGradientVertical,
              siteHeaderShadow,
              "[&_h1]:!text-white [&_h2]:!text-white [&_h3]:!text-white [&_h4]:!text-white",
              "[&_p]:!text-white/95 [&_.text-zinc-300]:!text-white/90 [&_.text-zinc-400]:!text-white/85 [&_.text-zinc-200]:!text-white",
              "[&_a]:!text-white [&_a]:underline-offset-2 hover:[&_a]:!text-white hover:[&_a]:brightness-110",
            ),
        className
      )}
      {...props}
    />
  );
}
