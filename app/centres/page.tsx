import { Card } from "@/components/ui/card";
import { AnimatedSection } from "@/components/site/animated-section";
import { PageBannerImage } from "@/components/site/page-banner-image";

const centres = [
  {
    name: "Royal Arena",
    address:
      "Park, Sector B Street Number 2, Askari 11 Sector B, Lahore, Pakistan",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3403.5905692622614!2d74.43346437475041!3d31.452936774244957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190975b20bd141%3A0x2edefec089a4e46e!2sRoyal%20Arena!5e0!3m2!1sen!2s!4v1775684124927!5m2!1sen!2s",
  },
  {
    name: "Askari 11 Natural Grass",
    address: "FC2J+G7P, B, Askari 11 Sector B, Lahore, Pakistan",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3275.3058277121986!2d74.42825943432736!3d31.45165566476339!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190911f8f91ceb%3A0x34650e1d0ef9adae!2sLake%20View%20Park!5e0!3m2!1sen!2s!4v1775718713742!5m2!1sen!2s",
  },
  {
    name: "Askari 1 Centre",
    address: "G9VM+VJJ, Askari I Askari 1, Lahore, Pakistan",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3400.251200595113!2d74.37950948885496!3d31.544720000000012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919056a96aa24a7%3A0x46cdc56893f7ecc4!2sAskari%20Play%20Ground!5e0!3m2!1sen!2s!4v1775684760674!5m2!1sen!2s",
  },
  {
    name: "Askari 5",
    address: "Lane 3, Askari V Askari 5, Lahore, 54660, Pakistan",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3402.0656567839183!2d74.34009267475251!3d31.49487907422565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190598336fdd6f%3A0xdf742ee5773d410c!2sAskari%205%20Futsal%20Ground!5e0!3m2!1sen!2s!4v1775718406694!5m2!1sen!2s",
  },
  {
    name: "Askari 10",
    address: "GCGC+QFP, Sector F Askari X, Lahore, Pakistan",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6801.411180452505!2d74.41541159032522!3d31.53224509683372!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190f335c6ba26d%3A0x15bc254a66fd638d!2sRoyal%20Arena%20for%20Indoor%20Sports!5e0!3m2!1sen!2s!4v1775718440567!5m2!1sen!2s",
  },
  {
    name: "Askari 9",
    address: "G9WV+4MW, Askari IX Block F Askari 9, Lahore, Pakistan",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13600.912500570374!2d74.37618745541987!3d31.54535340000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190500056c6d3b%3A0x5ffc91488746fbe6!2sRoyal%20Arena!5e0!3m2!1sen!2s!4v1775734040155!5m2!1sen!2s",
  },
];

export default function CentresPage() {
  return (
    <div className="section-shell space-y-5 py-8">
      <AnimatedSection>
        <h1 className="text-4xl font-bold text-zinc-950">Training Centres</h1>
        <p className="mt-3 max-w-3xl text-zinc-600">
          Our centres are designed for high-energy training, player safety, and match-focused development.
          Pick your nearest venue and book a trial session.
        </p>
      </AnimatedSection>
      <AnimatedSection>
        <PageBannerImage
          src="/images/home-slider-manchester-city-tour.png"
          alt="Bulls FC tour to Manchester City Football School"
        />
      </AnimatedSection>
      <div className="grid gap-4 lg:grid-cols-2">
        {centres.map((centre) => (
          <AnimatedSection key={centre.name}>
            <Card className="overflow-hidden p-5">
              <h2 className="text-xl font-semibold text-[#D91F26]">{centre.name}</h2>
              <p className="mt-2 text-zinc-300">{centre.address}</p>
              <iframe
                title={`Map: ${centre.name}`}
                src={centre.map}
                className="mt-4 h-60 w-full rounded-xl border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </Card>
          </AnimatedSection>
        ))}
      </div>
      <AnimatedSection>
        <Card className="p-6">
          <h2 className="text-2xl font-semibold text-[#D91F26]">Need a New Centre Near You?</h2>
          <p className="mt-2 text-zinc-300">
            We are expanding. Share your locality in the contact form and we will prioritize trial camps in your area.
          </p>
        </Card>
      </AnimatedSection>
    </div>
  );
}
