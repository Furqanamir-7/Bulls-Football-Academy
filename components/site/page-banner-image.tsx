import Image from "next/image";

type PageBannerImageProps = {
  src: string;
  alt: string;
};

export function PageBannerImage({ src, alt }: PageBannerImageProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border-2 border-[#D91F26] bg-zinc-950 shadow-[0_0_0_1px_rgba(217,31,38,0.2),0_8px_30px_rgba(0,0,0,0.12)] ring-1 ring-[#D91F26]/40">
      <div className="relative aspect-[1024/459] w-full">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-center"
          sizes="(max-width: 1280px) 100vw, 1280px"
        />
        <div
          className="pointer-events-none absolute inset-2 rounded-xl border border-[#D91F26]/80 shadow-[0_0_0_1px_rgba(217,31,38,0.35),0_0_18px_rgba(217,31,38,0.2)]"
          aria-hidden
        />
      </div>
    </div>
  );
}
