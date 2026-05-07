import Image from "next/image";
import { coaches, type CoachEntry } from "@/lib/site-data";
import { Card } from "@/components/ui/card";
import { AnimatedSection } from "@/components/site/animated-section";
import { cn } from "@/lib/utils";
import { siteHeaderGradientVertical, siteHeaderShadow } from "@/lib/site-theme";

function MoreCoachCard({ coach }: { coach: CoachEntry }) {
  return (
    <AnimatedSection>
      <Card className="relative overflow-hidden border-white/15">
        <div className="absolute inset-x-0 top-0 z-10 h-0.5 bg-gradient-to-r from-transparent via-white/35 to-transparent opacity-90" />
        <div className="relative aspect-[4/5] w-full overflow-hidden border-b border-white/15 bg-black/25">
          <Image
            src={coach.image}
            alt={coach.name}
            fill
            className="object-contain object-center"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
        <div className="relative border-t border-white/10 bg-black/20 px-4 py-4 text-center">
          <div className="mx-auto mb-3 h-px max-w-[4rem] bg-white/20" />
          <h2 className="text-lg font-semibold tracking-tight text-white">{coach.name}</h2>
          <p className="mt-1.5 text-sm text-white/90">{coach.role}</p>
        </div>
      </Card>
    </AnimatedSection>
  );
}

export default function CoachesPage() {
  const featuredCoach =
    coaches.find((coach) =>
      coach.name.toLowerCase().includes("mudasar"),
    ) ?? coaches[0];
  const getCoachByName = (name: string) =>
    coaches.find((coach) => coach.name.toLowerCase() === name.toLowerCase());
  const priorityCoaches = [
    getCoachByName("Mujahid Ali Khan"),
    getCoachByName("Abdullah Rajput"),
    getCoachByName("Ejaz Ali"),
  ].filter((coach): coach is (typeof coaches)[number] => Boolean(coach));
  const secondaryCoaches = coaches.filter(
    (coach) =>
      coach.name !== featuredCoach.name &&
      !priorityCoaches.some((priority) => priority.name === coach.name),
  );
  const secondaryRestCoaches = secondaryCoaches.slice(3);

  return (
    <div className="section-shell py-8 pb-14">
      <div
        className={cn(
          "relative rounded-3xl border border-white/10 p-5 sm:p-7 md:p-9",
          siteHeaderGradientVertical,
          siteHeaderShadow,
        )}
      >
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl border border-white/10"
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent sm:inset-x-10" />

        <div className="space-y-7">
          <AnimatedSection>
            <header className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#D91F26]">
                Bulls Football Academy
              </p>
              <h1 className="mt-3 text-4xl font-bold text-white md:text-5xl">Our Coaches</h1>
              <div className="mx-auto mt-6 flex items-center justify-center gap-3">
                <span className="h-px w-10 bg-white/30 sm:w-14" />
                <span className="h-1.5 w-1.5 rotate-45 border border-[#D91F26] bg-[#D91F26]/15" />
                <span className="h-px w-10 bg-white/30 sm:w-14" />
              </div>
            </header>
          </AnimatedSection>

          <AnimatedSection>
            {/* Same layout as Core Coach posters, centered and scaled up */}
            <div className="mx-auto w-full max-w-md md:max-w-xl lg:max-w-2xl xl:max-w-3xl">
              <Card className="relative overflow-hidden border-white/15 shadow-xl shadow-black/45 ring-1 ring-white/[0.08]">
                <div className="absolute inset-x-0 top-0 z-10 h-0.5 bg-gradient-to-r from-transparent via-white/45 to-transparent opacity-95" />
                <div className="relative aspect-[4/5] w-full overflow-hidden border-b border-white/15 bg-black/25">
                  <Image
                    src={featuredCoach.image}
                    alt={featuredCoach.name}
                    fill
                    priority
                    className="object-contain object-center"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 640px, 768px"
                  />
                </div>
                <div className="relative border-t border-white/10 bg-black/20 px-5 py-6 text-center sm:px-8 sm:py-7 md:py-8">
                  <div className="mx-auto mb-4 h-px max-w-[4rem] bg-white/25 sm:mb-5" />
                  <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl md:text-3xl">
                    {featuredCoach.name}
                  </h2>
                  <p className="mt-3 text-base font-semibold leading-snug text-[#D91F26] sm:text-lg md:text-xl">
                    {featuredCoach.role}
                  </p>
                </div>
              </Card>
            </div>
          </AnimatedSection>

          <div className="relative flex items-center py-2">
            <div className="h-px flex-1 bg-white/20" />
            <div className="flex items-center gap-3 px-4">
              <span className="h-1 w-1 rounded-full bg-[#D91F26]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/70">
                Individual profiles
              </span>
              <span className="h-1 w-1 rounded-full bg-[#D91F26]" />
            </div>
            <div className="h-px flex-1 bg-white/20" />
          </div>

          <AnimatedSection>
            <div className="relative rounded-2xl border border-white/10 bg-black/15 p-4 sm:p-5">
              <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              <div className="pointer-events-none absolute inset-x-5 bottom-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <div className="mb-4 flex items-center gap-3 px-1">
                <span className="h-px flex-1 bg-white/20" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/65">
                  Core Coaches
                </span>
                <span className="h-px flex-1 bg-white/20" />
              </div>
              <div className="grid gap-6 md:grid-cols-3">
              {priorityCoaches.map((coach) => (
                <AnimatedSection key={coach.name}>
                  <Card className="relative overflow-hidden border-white/15">
                    <div className="absolute inset-x-0 top-0 z-10 h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-90" />
                    <div className="relative aspect-[4/5] w-full overflow-hidden border-b border-white/15 bg-black/25">
                      {coach.portraitZoom != null && coach.portraitZoom > 1 ? (
                        <div
                          className="absolute inset-0 will-change-transform"
                          style={{
                            transform: `scale(${coach.portraitZoom})`,
                            transformOrigin: coach.portraitOrigin ?? "50% 45%",
                          }}
                        >
                          <Image
                            src={coach.image}
                            alt={coach.name}
                            fill
                            className="object-cover object-center"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        </div>
                      ) : (
                        <Image
                          src={coach.image}
                          alt={coach.name}
                          fill
                          className="object-contain object-center"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      )}
                    </div>
                    <div className="relative border-t border-white/10 bg-black/20 px-4 py-4 text-center">
                      <div className="mx-auto mb-3 h-px max-w-[4rem] bg-white/20" />
                      <h2 className="text-lg font-semibold tracking-tight text-white">{coach.name}</h2>
                      <p className="mt-1.5 text-sm text-white/90">{coach.role}</p>
                    </div>
                  </Card>
                </AnimatedSection>
              ))}
              </div>
            </div>
          </AnimatedSection>

          {secondaryCoaches.length > 0 && (
            <AnimatedSection>
              <div className="relative rounded-2xl border border-white/10 bg-black/15 p-4 sm:p-5">
                <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                <div className="mb-4 flex items-center gap-3 px-1">
                  <span className="h-px flex-1 bg-white/15" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/60">
                    More Coaches
                  </span>
                  <span className="h-px flex-1 bg-white/15" />
                </div>
                <div className="flex flex-col gap-6 md:gap-8">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {secondaryCoaches.slice(0, 3).map((coach) => (
                      <MoreCoachCard key={coach.name} coach={coach} />
                    ))}
                  </div>
                  {secondaryRestCoaches.length > 0 &&
                    (secondaryRestCoaches.length === 2 ? (
                      /* Same width as a column in md:grid-cols-3 gap-6, grouped and centered */
                      <div className="flex flex-col gap-6 md:flex-row md:flex-wrap md:justify-center md:gap-6">
                        {secondaryRestCoaches.map((coach) => (
                          <div
                            key={coach.name}
                            className="min-w-0 w-full shrink-0 md:w-[calc((100%-3rem)/3)]"
                          >
                            <MoreCoachCard coach={coach} />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        {secondaryRestCoaches.map((coach) => (
                          <MoreCoachCard key={coach.name} coach={coach} />
                        ))}
                      </div>
                    ))}
                </div>
              </div>
            </AnimatedSection>
          )}
        </div>

        <div className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent sm:inset-x-10" />
      </div>
    </div>
  );
}
