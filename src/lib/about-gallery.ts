import { type Locale } from "./constants";

export type AboutGalleryCategory =
  | "office-environment"
  | "customer-service"
  | "team"
  | "consultation"
  | "signage"
  | "office-culture"
  | "external-event";

export type AboutGalleryUsage =
  | "hero"
  | "office-presence"
  | "gallery"
  | "skip";

type LocalizedText = Record<Locale, string>;

export interface AboutGalleryImage {
  originalFilename: `${number}.webp`;
  src: `/images/gallery/${number}.webp`;
  seoFilename: string;
  alt: LocalizedText;
  title: LocalizedText;
  caption: LocalizedText;
  category: AboutGalleryCategory;
  usage: AboutGalleryUsage;
  sortOrder: number;
  priority?: boolean;
  skipReason?: LocalizedText;
}

function localized(en: string, ur: string): LocalizedText {
  return { en, ur };
}

export const ABOUT_GALLERY_IMAGES: readonly AboutGalleryImage[] = [
  {
    originalFilename: "1.webp",
    src: "/images/gallery/1.webp",
    seoFilename: "the-flight-centre-office-desk-portrait-gujranwala.webp",
    alt: localized(
      "A team member seated at a desk inside The Flight Centre office in Gujranwala",
      "گوجرانوالہ میں دی فلائٹ سنٹر کے دفتر کے اندر ایک ڈیسک پر بیٹھا ٹیم ممبر",
    ),
    title: localized("Office desk portrait", "دفتر کے ڈیسک کی تصویر"),
    caption: localized(
      "A working desk inside The Flight Centre office.",
      "دی فلائٹ سنٹر کے دفتر کے اندر ایک ورک ڈیسک۔",
    ),
    category: "office-environment",
    usage: "gallery",
    sortOrder: 5,
  },
  {
    originalFilename: "2.webp",
    src: "/images/gallery/2.webp",
    seoFilename: "the-flight-centre-walk-in-service-desk-gujranwala.webp",
    alt: localized(
      "Walk-in clients speaking with staff inside The Flight Centre office in Gujranwala",
      "گوجرانوالہ میں دی فلائٹ سنٹر کے دفتر کے اندر اسٹاف سے بات کرتے ہوئے واک اِن کلائنٹس",
    ),
    title: localized("Walk-in service desk", "واك اِن سروس ڈیسک"),
    caption: localized(
      "A daily office scene with staff desks and visiting clients.",
      "اسٹاف ڈیسک اور آنے والے کلائنٹس کے ساتھ دفتر کا روزمرہ منظر۔",
    ),
    category: "customer-service",
    usage: "office-presence",
    sortOrder: 2,
  },
  {
    originalFilename: "3.webp",
    src: "/images/gallery/3.webp",
    seoFilename: "the-flight-centre-jinnah-stadium-office-signage-gujranwala.webp",
    alt: localized(
      "The Flight Centre office signboard outside the Jinnah Stadium location in Gujranwala",
      "گوجرانوالہ میں جناح اسٹیڈیم لوکیشن کے باہر دی فلائٹ سنٹر کا سائن بورڈ",
    ),
    title: localized("Jinnah Stadium office signage", "جناح اسٹیڈیم آفس سائن بورڈ"),
    caption: localized(
      "Street-facing signage for The Flight Centre office in Gujranwala.",
      "گوجرانوالہ میں دی فلائٹ سنٹر آفس کی سڑک کی جانب موجود سائن ایج۔",
    ),
    category: "signage",
    usage: "office-presence",
    sortOrder: 3,
  },
  {
    originalFilename: "4.webp",
    src: "/images/gallery/4.webp",
    seoFilename: "the-flight-centre-main-office-reception-floor-gujranwala.webp",
    alt: localized(
      "Reception and customer seating area inside The Flight Centre main office in Gujranwala",
      "گوجرانوالہ میں دی فلائٹ سنٹر کے مین آفس کے اندر ریسیپشن اور کسٹمر سیٹنگ ایریا",
    ),
    title: localized("Main office reception floor", "مین آفس ریسیپشن فلور"),
    caption: localized(
      "The main reception floor where staff assist walk-in travel clients.",
      "مین ریسیپشن فلور جہاں اسٹاف واک اِن ٹریول کلائنٹس کی رہنمائی کرتا ہے۔",
    ),
    category: "customer-service",
    usage: "hero",
    sortOrder: 1,
    priority: true,
  },
  {
    originalFilename: "5.webp",
    src: "/images/gallery/5.webp",
    seoFilename: "the-flight-centre-front-desk-team-gujranwala.webp",
    alt: localized(
      "The Flight Centre front-desk team seated at service counters in the Gujranwala office",
      "گوجرانوالہ آفس میں سروس کاؤنٹرز پر بیٹھا دی فلائٹ سنٹر کا فرنٹ ڈیسک اسٹاف",
    ),
    title: localized("Front desk team", "فرنٹ ڈیسک ٹیم"),
    caption: localized(
      "The front desk prepared for flight, tour and visa enquiries.",
      "فلائٹس، ٹورز اور ویزا انکوائریز کے لیے تیار فرنٹ ڈیسک۔",
    ),
    category: "customer-service",
    usage: "gallery",
    sortOrder: 1,
  },
  {
    originalFilename: "6.webp",
    src: "/images/gallery/6.webp",
    seoFilename: "the-flight-centre-office-team-portrait-gujranwala.webp",
    alt: localized(
      "The Flight Centre staff members gathered for a group portrait inside the office",
      "دی فلائٹ سنٹر کے اسٹاف ممبرز دفتر کے اندر گروپ پورٹریٹ کے لیے اکٹھے کھڑے ہیں",
    ),
    title: localized("Office team portrait", "آفس ٹیم پورٹریٹ"),
    caption: localized(
      "A team portrait taken inside The Flight Centre office.",
      "دی فلائٹ سنٹر کے دفتر کے اندر لی گئی ٹیم کی تصویر۔",
    ),
    category: "team",
    usage: "gallery",
    sortOrder: 3,
  },
  {
    originalFilename: "7.webp",
    src: "/images/gallery/7.webp",
    seoFilename: "the-flight-centre-office-consultation-session-gujranwala.webp",
    alt: localized(
      "A consultation session taking place inside The Flight Centre office in Gujranwala",
      "گوجرانوالہ میں دی فلائٹ سنٹر کے دفتر کے اندر جاری ایک مشاورتی نشست",
    ),
    title: localized("Consultation in progress", "مشاورت جاری ہے"),
    caption: localized(
      "A discussion taking place inside the office consultation area.",
      "دفتر کے مشاورتی حصے میں ہونے والی گفتگو۔",
    ),
    category: "consultation",
    usage: "gallery",
    sortOrder: 2,
  },
  {
    originalFilename: "8.webp",
    src: "/images/gallery/8.webp",
    seoFilename: "the-flight-centre-branch-staff-group-photo-gujranwala.webp",
    alt: localized(
      "A larger staff group photo inside The Flight Centre office in Gujranwala",
      "گوجرانوالہ میں دی فلائٹ سنٹر کے دفتر کے اندر اسٹاف کا بڑا گروپ فوٹو",
    ),
    title: localized("Staff group photo", "اسٹاف گروپ فوٹو"),
    caption: localized(
      "A wider team gathering inside the office workspace.",
      "دفتر کے ورک اسپیس کے اندر ٹیم کا ایک بڑا اجتماع۔",
    ),
    category: "office-culture",
    usage: "gallery",
    sortOrder: 4,
  },
  {
    originalFilename: "9.webp",
    src: "/images/gallery/9.webp",
    seoFilename: "the-flight-centre-formal-office-meeting-photo.webp",
    alt: localized(
      "A formal seated meeting taking place in an official room",
      "ایک سرکاری نوعیت کے کمرے میں ہونے والی رسمی نشست",
    ),
    title: localized("Formal meeting", "رسمی ملاقات"),
    caption: localized(
      "A formal meeting photo from an institutional setting.",
      "ادارتی ماحول میں لی گئی ایک رسمی میٹنگ کی تصویر۔",
    ),
    category: "external-event",
    usage: "skip",
    sortOrder: 9,
    skipReason: localized(
      "Skipped for the About page because the setting is not clearly The Flight Centre office.",
      "اباؤٹ پیج کے لیے شامل نہیں کیا گیا کیونکہ مقام واضح طور پر دی فلائٹ سنٹر آفس معلوم نہیں ہوتا۔",
    ),
  },
  {
    originalFilename: "10.webp",
    src: "/images/gallery/10.webp",
    seoFilename: "the-flight-centre-ceremonial-group-presentation-photo.webp",
    alt: localized(
      "A group presentation photo taken inside a formal meeting room",
      "ایک رسمی میٹنگ روم کے اندر لی گئی گروپ پریزنٹیشن تصویر",
    ),
    title: localized("Ceremonial group presentation", "تقریبی گروپ پریزنٹیشن"),
    caption: localized(
      "A ceremonial group photo from a formal visit.",
      "رسمی دورے کی ایک تقریبی گروپ تصویر۔",
    ),
    category: "external-event",
    usage: "skip",
    sortOrder: 10,
    skipReason: localized(
      "Skipped because it reads as an event photo rather than an office or service-environment image.",
      "اس لیے شامل نہیں کیا گیا کیونکہ یہ دفتر یا سروس ماحول کے بجائے ایک تقریب کی تصویر محسوس ہوتی ہے۔",
    ),
  },
  {
    originalFilename: "11.webp",
    src: "/images/gallery/11.webp",
    seoFilename: "the-flight-centre-conference-room-discussion-photo.webp",
    alt: localized(
      "A conference room discussion with participants seated around a table",
      "ایک کانفرنس روم میں میز کے گرد بیٹھے شرکا کے ساتھ گفتگو",
    ),
    title: localized("Conference room discussion", "کانفرنس روم گفتگو"),
    caption: localized(
      "A formal discussion taking place around a conference table.",
      "کانفرنس ٹیبل کے گرد ہونے والی ایک رسمی گفتگو۔",
    ),
    category: "external-event",
    usage: "skip",
    sortOrder: 11,
    skipReason: localized(
      "Skipped because the room appears to be an external venue rather than The Flight Centre office.",
      "اس لیے شامل نہیں کیا گیا کیونکہ یہ کمرہ دی فلائٹ سنٹر آفس کے بجائے بیرونی مقام لگتا ہے۔",
    ),
  },
  {
    originalFilename: "12.webp",
    src: "/images/gallery/12.webp",
    seoFilename: "the-flight-centre-meeting-room-group-photo.webp",
    alt: localized(
      "A small group standing inside a meeting room",
      "میٹنگ روم کے اندر کھڑا ایک چھوٹا گروپ",
    ),
    title: localized("Meeting room group photo", "میٹنگ روم گروپ فوٹو"),
    caption: localized(
      "A standing group photo taken in a meeting room.",
      "میٹنگ روم میں لی گئی ایک گروپ تصویر۔",
    ),
    category: "external-event",
    usage: "skip",
    sortOrder: 12,
    skipReason: localized(
      "Skipped because the image is not clearly tied to the office, front desk or daily service environment.",
      "اس لیے شامل نہیں کیا گیا کیونکہ یہ تصویر واضح طور پر دفتر، فرنٹ ڈیسک یا روزمرہ سروس ماحول سے منسلک نہیں ہے۔",
    ),
  },
  {
    originalFilename: "13.webp",
    src: "/images/gallery/13.webp",
    seoFilename: "the-flight-centre-group-photo-building-entrance.webp",
    alt: localized(
      "A large group standing outside a building entrance",
      "عمارت کے دروازے کے باہر کھڑا ایک بڑا گروپ",
    ),
    title: localized("Outdoor group photo", "آؤٹ ڈور گروپ فوٹو"),
    caption: localized(
      "A large outdoor group photo in front of a building entrance.",
      "عمارت کے داخلی دروازے کے سامنے لی گئی ایک بڑی آؤٹ ڈور گروپ تصویر۔",
    ),
    category: "external-event",
    usage: "skip",
    sortOrder: 13,
    skipReason: localized(
      "Skipped because the photo does not clearly show The Flight Centre office or an on-site service setting.",
      "اس لیے شامل نہیں کیا گیا کیونکہ تصویر میں دی فلائٹ سنٹر آفس یا آن سائٹ سروس ماحول واضح نظر نہیں آتا۔",
    ),
  },
] as const;

export function getLocalizedGalleryText(text: LocalizedText, locale: Locale) {
  return text[locale] ?? text.en;
}

export function getAboutGalleryImage(originalFilename: AboutGalleryImage["originalFilename"]) {
  return ABOUT_GALLERY_IMAGES.find((image) => image.originalFilename === originalFilename);
}

export const ABOUT_PAGE_GALLERY_IMAGES = ABOUT_GALLERY_IMAGES.filter(
  (image) => image.usage !== "skip",
).sort((left, right) => left.sortOrder - right.sortOrder);
