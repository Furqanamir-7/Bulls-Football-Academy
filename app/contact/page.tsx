import Link from "next/link";
import { ContactForm } from "@/components/site/contact-form";
import { AnimatedSection } from "@/components/site/animated-section";
import { Card } from "@/components/ui/card";
import { PageBannerImage } from "@/components/site/page-banner-image";
import {
  academyFacebookUrl,
  academyInstagramUrl,
  academyTiktokUrl,
  academyWhatsAppUrl,
} from "@/lib/site-data";
export default function ContactPage() {
  return (
    <div className="section-shell space-y-5 py-8">
      <AnimatedSection>
        <h1 className="text-4xl font-bold text-zinc-950">Contact Us</h1>
        <p className="mt-3 max-w-3xl text-zinc-600">
          Reach out for trial sessions, admissions, sponsorship opportunities, tournament partnerships,
          and academy collaborations.
        </p>
      </AnimatedSection>
      <AnimatedSection>
        <PageBannerImage
          src="/images/home-slider-pro-squad.png"
          alt="Bulls FC Pro Squad"
        />
      </AnimatedSection>
      <div className="grid gap-4 lg:grid-cols-2">
        <AnimatedSection>
          <ContactForm />
        </AnimatedSection>
        <AnimatedSection>
          <Card className="space-y-4 p-6">
            <p className="text-zinc-200">Phone: +92 311 4888358</p>
            <p className="text-zinc-200">Email: info@bullsfootballacademy.com</p>
            <p className="text-zinc-200">Head Quarter: Royal Arena</p>
            <p className="text-zinc-200">
              Address: Park, Sector B Street Number 2, Askari 11 Sector B,
              Lahore, Pakistan
            </p>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3403.5905692622614!2d74.43346437475041!3d31.452936774244957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190975b20bd141%3A0x2edefec089a4e46e!2sRoyal%20Arena!5e0!3m2!1sen!2s!4v1775748163660!5m2!1sen!2s"
              className="h-60 w-full rounded-xl border-0"
              loading="lazy"
            />
            <div className="flex gap-4 text-sm">
              <Link
                href={academyWhatsAppUrl}
                target="_blank"
                className="text-[#D91F26] hover:underline"
              >
                WhatsApp
              </Link>
              <Link
                href={academyInstagramUrl}
                target="_blank"
                className="text-[#D91F26] hover:underline"
              >
                Instagram
              </Link>
              <Link
                href={academyFacebookUrl}
                target="_blank"
                className="text-[#D91F26] hover:underline"
              >
                Facebook
              </Link>
              <Link
                href={academyTiktokUrl}
                target="_blank"
                className="text-[#D91F26] hover:underline"
              >
                TikTok
              </Link>
            </div>
          </Card>
        </AnimatedSection>
      </div>
      <AnimatedSection>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            "Book your first trial session",
            "Get complete fee structure details",
            "Ask about nearest training centre",
          ].map((item) => (
            <Card key={item} className="p-5 text-zinc-200">
              {item}
            </Card>
          ))}
        </div>
      </AnimatedSection>
    </div>
  );
}
