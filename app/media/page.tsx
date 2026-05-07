import Image from "next/image";
import { AnimatedSection } from "@/components/site/animated-section";
import { PageBannerImage } from "@/components/site/page-banner-image";
const mediaGallery = [
  "/images/home-slider-baku-tour.jpeg",
  "/malaysia-tour.jpeg",
  "/champions-2025.jpeg",
  "/academy-group.jpeg",
  "/images/home-slider-pro-squad.png",
  "/images/home-slider-qatar-tour.png",
];

export default function MediaPage() {
  return (
    <div className="section-shell space-y-6 py-8">
      <AnimatedSection>
        <h1 className="text-4xl font-bold text-zinc-950">Media</h1>
        <p className="mt-3 max-w-3xl text-zinc-600">
          Explore our training moments, match highlights, player stories, and event coverage.
        </p>
      </AnimatedSection>
      <AnimatedSection>
        <PageBannerImage
          src="/images/home-slider-baku-tour.jpeg"
          alt="Bulls Baku tour"
        />
      </AnimatedSection>

      <AnimatedSection>
        <h2 className="mb-4 text-2xl font-semibold text-zinc-950">Gallery</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {mediaGallery.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt={`Gallery ${i + 1}`}
              width={500}
              height={300}
              className="h-48 w-full rounded-xl object-cover"
            />
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <h2 className="mb-4 text-2xl font-semibold text-zinc-950">Match Highlights</h2>
        <div className="grid gap-4 lg:grid-cols-2">
          <iframe className="aspect-video w-full rounded-xl" src="https://www.youtube.com/embed/ysz5S6PUM-U" title="Highlight 1" allowFullScreen />
          <iframe className="aspect-video w-full rounded-xl" src="https://www.youtube.com/embed/jNQXAC9IVRw" title="Highlight 2" allowFullScreen />
        </div>
      </AnimatedSection>
    </div>
  );
}
