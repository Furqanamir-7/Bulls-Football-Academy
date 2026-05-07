import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { AnimatedSection } from "@/components/site/animated-section";
import { cn } from "@/lib/utils";
import { siteCtaOnRedClass } from "@/lib/site-theme";
import { PageBannerImage } from "@/components/site/page-banner-image";
export default function InternationalToursPage() {
  return (
    <div className="section-shell space-y-6 py-8">
      <AnimatedSection>
        <h1 className="text-4xl font-bold text-zinc-950">International Tours</h1>
        <p className="mt-3 max-w-3xl text-zinc-600">
          Our international tours expose players to elite environments, different football cultures,
          and high-tempo match standards that accelerate development.
        </p>
      </AnimatedSection>
      <AnimatedSection>
        <PageBannerImage
          src="/images/home-slider-qatar-tour.png"
          alt="Bulls FC tour to Qatar PSG FA"
        />
      </AnimatedSection>

      <AnimatedSection>
        <h2 className="mb-3 text-2xl font-semibold text-zinc-950">Past Tours</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <Image key={n} src={`/images/tour-${n}.jpg`} alt={`Tour ${n}`} width={500} height={300} className="h-52 w-full rounded-xl object-cover" />
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <Card className="p-6">
          <h2 className="text-2xl font-semibold text-[#D91F26]">Upcoming Tours</h2>
          <div className="mt-3 space-y-2 text-zinc-300">
            <p>Spain Elite Camp - July 2026 (Barcelona and Valencia)</p>
            <p>UK Club Immersion - October 2026 (London and Manchester)</p>
            <p>Dubai Winter Challenge - December 2026</p>
          </div>
          <p className="mt-4 text-sm text-zinc-400">
            Includes coaching sessions, friendly matches, academy visits, and player performance reports.
          </p>
          <Link href="/contact" className={cn(siteCtaOnRedClass, "mt-5")}>
            Register Interest
          </Link>
        </Card>
      </AnimatedSection>
      <AnimatedSection>
        <h2 className="mb-3 text-2xl font-semibold text-zinc-950">Tour Gallery Options</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[4, 5, 6, 7].map((n) => (
            <Image
              key={n}
              src={`/images/tour-${n}.jpg`}
              alt={`Tour option ${n}`}
              width={420}
              height={260}
              className="h-40 w-full rounded-xl object-cover"
            />
          ))}
        </div>
      </AnimatedSection>
    </div>
  );
}
