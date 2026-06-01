// src/components/home/HeroImagePreload.tsx
import { HERO_IMAGES } from "@/components/home/HeroBackgroundSlideshow";

export function HeroImagePreload() {
  return (
    <>
      {HERO_IMAGES.slice(1).map(({ src }) => (
        <link
          key={src}
          rel="preload"
          as="image"
          href={src}
          fetchPriority="low"
          imageSrcSet={`${src} 1x`}
        />
      ))}
    </>
  );
}
