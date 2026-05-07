import Image from "next/image";
import { Card } from "@/components/ui/card";
import { AnimatedSection } from "@/components/site/animated-section";
import { PageBannerImage } from "@/components/site/page-banner-image";
export default function AboutPage() {
  return (
    <div className="section-shell space-y-6 py-8">
      <AnimatedSection>
        <h1 className="text-4xl font-bold text-zinc-950">About Us</h1>
        <p className="mt-3 max-w-3xl text-zinc-600">
          BULLS FOOTBALL ACADEMY is built for players who want professional habits,
          elite coaching standards, and a clear pathway from grassroots to high-level competition.
        </p>
      </AnimatedSection>
      <AnimatedSection>
        <PageBannerImage
          src="/malaysia-tour.jpeg"
          alt="Bulls KL Soccer Championship 2025 Malaysia"
        />
      </AnimatedSection>
      <AnimatedSection>
        <div className="grid gap-5 lg:grid-cols-2 lg:items-stretch">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold text-[#D91F26]">Our Mission</h2>
            <p className="mt-2 text-zinc-300">To produce skilled, disciplined, and confident footballers with world-class training methods.</p>
            <h2 className="mt-6 text-2xl font-semibold text-[#D91F26]">Our Vision</h2>
            <p className="mt-2 text-zinc-300">To become the most trusted football academy and talent pathway in the region.</p>
          </Card>
          <Card className="flex flex-col overflow-hidden p-0">
            <div className="border-b border-white/15 px-6 py-4">
              <h2 className="text-xl font-bold text-white">Academy team</h2>
              <p className="mt-1 text-sm text-white/75">
                Coaches, players, and staff — one standard, one fight, every session.
              </p>
            </div>
            <div className="relative min-h-[240px] flex-1 bg-black lg:min-h-[280px]">
              <Image
                src="/academy-group.jpeg"
                alt="Academy team"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="border-t border-white/15 px-6 py-4">
              <p className="text-center text-sm font-bold tracking-[0.2em] text-[#D91F26]">
                WE ARE A TEAM
              </p>
            </div>
          </Card>
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              title: "One club culture",
              text: "No egos — work rate, respect, and accountability come first.",
            },
            {
              title: "Match-ready training",
              text: "Sessions mirror real game speed, decisions, and pressure.",
            },
            {
              title: "Pathway mindset",
              text: "Clear steps from development groups to competitive exposure.",
            },
          ].map((item) => (
            <Card key={item.title} className="p-5">
              <h3 className="font-bold text-[#D91F26]">{item.title}</h3>
              <p className="mt-2 text-sm text-zinc-300">{item.text}</p>
            </Card>
          ))}
        </div>
      </AnimatedSection>
      <AnimatedSection>
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="p-6">
            <h3 className="text-xl font-semibold">History</h3>
            <p className="mt-2 text-zinc-300">Founded to bridge grassroots football and professional pathways, BULLS has mentored hundreds of players.</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-xl font-semibold">Achievements</h3>
            <p className="mt-2 text-zinc-300">Multiple youth league titles, state-level selections, and international exposure tours.</p>
          </Card>
        </div>
      </AnimatedSection>
      <AnimatedSection>
        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-[#D91F26]">Development Philosophy</h3>
            <p className="mt-2 text-zinc-300">
              We focus on technical excellence, tactical intelligence, physical conditioning,
              and mental resilience to prepare complete footballers.
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-[#D91F26]">Player Pathway</h3>
            <p className="mt-2 text-zinc-300">
              Players progress through structured levels with performance reviews,
              match exposure, and individualized coaching feedback.
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-[#D91F26]">Parent Communication</h3>
            <p className="mt-2 text-zinc-300">
              Regular progress reports and clear goals keep families informed and
              aligned with player development plans.
            </p>
          </Card>
        </div>
      </AnimatedSection>
    </div>
  );
}
