// src/components/home/Gallery.tsx
import { getLocale } from "next-intl/server";

import { getGalleryImages } from "@/lib/cms/fetchers";
import { GALLERY_IMAGES, type Locale } from "@/lib/constants";

import { GalleryClient } from "./GalleryClient";

export { GallerySkeleton } from "./GallerySkeleton";

export async function Gallery() {
  const locale = (await getLocale()) as Locale;

  let images: { id: string; image: string }[];

  try {
    const dbImages = await getGalleryImages("home", locale);

    if (dbImages && dbImages.length > 0) {
      images = dbImages.map((v) => ({ id: v.id, image: v.url }));
    } else {
      images = GALLERY_IMAGES.map((v) => ({ id: v.id, image: v.image }));
    }
  } catch (error) {
    console.error({ action: "gallery_server_fetch_failed", error });
    images = GALLERY_IMAGES.map((v) => ({ id: v.id, image: v.image }));
  }

  return <GalleryClient images={images} />;
}
