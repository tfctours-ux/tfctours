// src/components/home/HeroBackgroundSlideshow.tsx
import Image from "next/image";

export const HERO_IMAGES: Array<{ src: string; alt: string }> = [
  { src: "/images/hero-1.webp", alt: "Masjid Al-Haram, Makkah — holy site for Umrah pilgrims" },
  { src: "/images/hero-2.webp", alt: "International travel destination — The Flight Centre tour packages" },
  { src: "/images/hero-3.webp", alt: "Masjid-e-Nabawi, Madinah — sacred mosque visited during Umrah" },
  { src: "/images/hero-4.webp", alt: "Scenic travel destination offered by The Flight Centre" },
  { src: "/images/hero-5.webp", alt: "Luxury hotel accommodation — The Flight Centre worldwide hotel bookings" },
];

export function HeroBackgroundLayer({
  activeIndex,
}: {
  activeIndex: number;
}) {
  return (
    <div className="pointer-events-none absolute inset-0">
      {HERO_IMAGES.map(({ src, alt }, idx) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity duration-[1600ms] ease-in-out"
          style={{
            opacity: idx === activeIndex ? 1 : 0,
            ...(idx === activeIndex && {
              animation: "ken-burns 8s ease-out forwards",
              transformOrigin: "center 30%",
            }),
          }}
          aria-hidden="true"
        >
          <Image
            src={src}
            alt={alt}
            fill
            priority={idx === 0}
            fetchPriority={idx === 0 ? "high" : "low"}
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: "center 30%" }}
          />
        </div>
      ))}
    </div>
  );
}
