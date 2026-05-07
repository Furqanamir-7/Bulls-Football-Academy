import { Card } from "@/components/ui/card";
import { AnimatedSection } from "@/components/site/animated-section";
import { ProgramGalleryCard } from "@/components/site/program-gallery-card";
import { getProgramCards } from "@/lib/get-program-cards";
import { PageBannerImage } from "@/components/site/page-banner-image";

export default function ProgramsPage() {
  const programCards = getProgramCards();

  return (
    <div className="section-shell space-y-5 py-8">
      <AnimatedSection>
        <h1 className="text-4xl font-bold text-zinc-950">Programs</h1>
      </AnimatedSection>
      <AnimatedSection>
        <PageBannerImage
          src="/champions-2025.jpeg"
          alt="Bulls KL Soccer Championship 2025 Malaysia"
        />
      </AnimatedSection>
      <div className="grid gap-4 md:grid-cols-2">
        {programCards.map((program) => (
          <AnimatedSection key={program.title}>
            <div id={program.slug} className="scroll-mt-24 md:scroll-mt-28">
              <ProgramGalleryCard program={program} variant="page" />
            </div>
          </AnimatedSection>
        ))}
      </div>

      <AnimatedSection>
        <Card className="p-6">
          <h2 className="text-2xl font-semibold text-[#D91F26]">Bulls Academy</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {["EARLY YEARS", "U8", "U10", "U12", "U15", "U18", "OPEN AGE"].map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/25 bg-black/25 px-4 py-2 text-sm font-semibold text-white"
              >
                {item}
              </span>
            ))}
          </div>
        </Card>
      </AnimatedSection>

      <AnimatedSection>
        <Card className="p-6">
          <h2 className="text-2xl font-semibold text-[#D91F26]">Bulls Events</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {[
              "Ramadan League",
              "Azadi Cup",
              "Bulls Game Changers League",
              "Winter Cup",
              "Intra Academy League",
              "Parents vs Bulls",
            ].map((item) => (
              <span
                key={item}
                className="rounded-xl border border-white/35 bg-white/10 px-4 py-2 text-sm font-semibold text-white"
              >
                {item}
              </span>
            ))}
          </div>
        </Card>
      </AnimatedSection>

    </div>
  );
}
