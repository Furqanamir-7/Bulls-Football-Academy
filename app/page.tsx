import Image from "next/image";
import Link from "next/link";
import { Users, Trophy, MapPin, ShieldCheck, Globe, Medal } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedSection } from "@/components/site/animated-section";
import { TestimonialsSlider } from "@/components/site/testimonials-slider";
import { HomeImageSlider } from "@/components/site/home-image-slider";
import { Card } from "@/components/ui/card";
import { getProgramCards } from "@/lib/get-program-cards";
import { ProgramGalleryCard } from "@/components/site/program-gallery-card";
import {
  homeHeroLogoSrc,
  siteCtaOnRedClass,
  siteHeaderGradientVertical,
  siteHeaderShadow,
} from "@/lib/site-theme";

export default function Home() {
  const programCards = getProgramCards();

  const cardMediaPlaceholderClass =
    "relative h-48 w-full overflow-hidden rounded-xl bg-zinc-900";

  return (
    <div className="space-y-10 bg-[#f4eee6] pb-12 [background-image:radial-gradient(circle_at_14%_18%,rgba(173,139,108,0.10),transparent_34%),radial-gradient(circle_at_82%_24%,rgba(195,170,145,0.12),transparent_38%),radial-gradient(circle_at_62%_76%,rgba(160,132,108,0.08),transparent_42%),repeating-linear-gradient(0deg,rgba(120,98,78,0.022)_0px,rgba(120,98,78,0.022)_1px,transparent_1px,transparent_4px),repeating-linear-gradient(90deg,rgba(120,98,78,0.016)_0px,rgba(120,98,78,0.016)_1px,transparent_1px,transparent_5px)]">
      <section
        className={cn(
          /* Pull up over main pt-20 so light-theme white main bg does not show as a gap under the fixed header */
          "-mt-20 pt-20",
          "relative flex min-h-[min(560px,65vh)] items-center border-b border-white/10",
          siteHeaderGradientVertical,
          siteHeaderShadow,
        )}
      >
        {/* Hero background image from desktop-provided asset */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <Image
            src="/images/hero/bulls-background-picture.jpeg"
            alt=""
            fill
            quality={72}
            className="object-cover object-center opacity-[0.26] md:opacity-[0.34]"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(122,21,32,0.14)_0%,rgba(26,4,8,0.34)_58%,rgba(26,4,8,0.62)_100%)]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a0408]/58 via-[#1a0408]/16 to-[#1a0408]/52" />
        </div>
        <div className="section-shell relative z-10 grid items-center gap-8 py-8 lg:grid-cols-2">
          <div>
            <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
              BULLS FOOTBALL ACADEMY
            </h1>
            <p className="mt-5 text-lg font-semibold tracking-wide text-white/90 sm:text-xl">
              WE LEAD BY EXAMPLE. NOT BY WORDS.
            </p>
            <p className="mt-2 text-sm font-bold tracking-widest text-[#D91F26] drop-shadow-sm">
              WE ARE A TEAM
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/contact" className={siteCtaOnRedClass}>
                Join Now
              </Link>
              <Link href="/programs" className={siteCtaOnRedClass}>
                Explore Programs
              </Link>
            </div>
          </div>
          <div className="flex justify-center">
            <Image
              src={homeHeroLogoSrc}
              alt="BULLS Football Club & Academy logo"
              width={520}
              height={520}
              className="h-auto w-full max-w-[260px] object-contain drop-shadow-[0_12px_32px_rgba(0,0,0,0.35)] sm:max-w-[320px] lg:max-w-[380px]"
              priority
            />
          </div>
        </div>
      </section>
      <AnimatedSection>
        <section className="section-shell space-y-4 pt-2">
          <HomeImageSlider tone="light" layout="embedded" />
          <div className="rounded-2xl border border-zinc-200/60 bg-white/10 px-5 py-5 shadow-sm shadow-zinc-900/[0.08] backdrop-blur-[1px]">
            <p className="mx-auto max-w-3xl text-center text-sm leading-relaxed text-zinc-600 sm:text-base">
              BULLS FOOTBALL ACADEMY is where disciplined training meets fearless match mentality.
              Join a high-performance environment built for long-term player growth.
            </p>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection>
        <section className="section-shell space-y-4">
          <div className="flex items-center gap-3 pb-0">
            <span className="h-[3px] w-9 rounded bg-[#D91F26]" />
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">Academy Highlights</p>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { icon: Users, title: "500+", text: "Active Players", image: "/images/stats/active-players.jpg" },
              { icon: Trophy, title: "35", text: "Championship Wins", image: "/images/stats/championship-wins.jpg" },
              { icon: MapPin, title: "6", text: "Training Centres", image: "/images/stats/training-centres-purple.jpg" },
              { icon: ShieldCheck, title: "18", text: "Certified Coaches", image: "/images/stats/certified-coaches.png" },
            ].map((item) => (
              <Card key={item.title} className="overflow-hidden p-3 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-zinc-900/[0.12]">
                <div className={cardMediaPlaceholderClass}>
                  <Image
                    src={item.image}
                    alt={item.text}
                    fill
                    className="object-cover object-center opacity-80"
                    sizes="(max-width: 640px) 50vw, 25vw"
                    quality={62}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/15" />
                </div>
                <div className="space-y-1 px-2 pb-2 pt-4">
                  <div className="flex items-center gap-2 text-zinc-300">
                    <item.icon className="h-4 w-4 text-[#D91F26]" />
                    <p className="text-xs uppercase tracking-wide">Academy Stats</p>
                  </div>
                  <p className="text-3xl font-bold">{item.title}</p>
                  <p className="text-zinc-300">{item.text}</p>
                </div>
              </Card>
            ))}
          </div>
          <div className="mx-auto grid max-w-2xl grid-cols-2 gap-4">
            {[
              { icon: Globe, title: "3", text: "International Tours", image: "/images/stats/international-tours.jpg" },
              { icon: Medal, title: "4", text: "International Trophies", image: "/images/stats/international-trophies.jpg" },
            ].map((item) => (
              <Card key={item.title} className="overflow-hidden p-3 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-zinc-900/[0.12]">
                <div className={cardMediaPlaceholderClass}>
                  <Image
                    src={item.image}
                    alt={item.text}
                    fill
                    className="object-cover object-center opacity-80"
                    sizes="(max-width: 640px) 50vw, 25vw"
                    quality={62}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/15" />
                </div>
                <div className="space-y-1 px-2 pb-2 pt-4">
                  <div className="flex items-center gap-2 text-zinc-300">
                    <item.icon className="h-4 w-4 text-[#D91F26]" />
                    <p className="text-xs uppercase tracking-wide">Academy Stats</p>
                  </div>
                  <p className="text-3xl font-bold">{item.title}</p>
                  <p className="text-zinc-300">{item.text}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection>
        <section className="border-y border-zinc-200/70 bg-white/10 py-9">
          <div className="section-shell grid gap-4 lg:grid-cols-3">
            <Card className="p-6 md:p-7 lg:col-span-2">
              <div className="mb-4 flex items-center gap-3">
                <span className="h-[3px] w-10 rounded bg-[#D91F26]" />
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">Who We Are</p>
              </div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">About BULLS</h2>
              <p className="mt-4 text-zinc-300">
                We build complete footballers through elite coaching, tactical intelligence, and professional discipline.
              </p>
              <p className="mt-2 text-zinc-300">
                From first-touch basics to advanced game IQ, every training block is designed to improve technical quality,
                confidence under pressure, and team-first mentality.
              </p>
              <Link href="/about" className="mt-5 inline-flex items-center font-semibold underline-offset-2 hover:underline">
                Learn More
              </Link>
            </Card>
            <TestimonialsSlider />
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection>
        <section className="section-shell">
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2">
          {programCards.map((program) => (
            <ProgramGalleryCard key={program.title} program={program} variant="featured" />
          ))}
          </div>
        </section>
      </AnimatedSection>

    </div>
  );
}
